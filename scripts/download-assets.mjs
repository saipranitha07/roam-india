// Build-time helper: downloads every chosen Commons photo into assets/ so the
// app bundles them locally. Wikimedia's CDN rejects the okhttp UA that Expo Go
// uses for network images (403), so runtime loading was impossible; local
// assets avoid the image host entirely.
// Run with: node scripts/download-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

import picksList from "./picked-files.json" with { type: "json" };

// Cache previously succeeded entries so re-runs skip the API entirely.
const PROGRESS = "scripts/downloaded-state.json";

const OUT_DIR = "assets/destinations";
const UA = "RoamIndia-build/1.0 (image downloader)";

fs.mkdirSync(OUT_DIR, { recursive: true });

/** Resolve the best 1200px thumb URL for a Commons file via the API. */
async function thumbUrl(file) {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json" +
    "&prop=imageinfo&iiprop=url&iiurlwidth=1200&titles=File:" +
    encodeURIComponent(file);
  // The API rate-limits bursts; retry a few times with growing delay.
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(api, { headers: { "User-Agent": UA } });
    const text = await res.text();
    if (res.ok && text.startsWith("{")) {
      const json = JSON.parse(text);
      const page = Object.values(json.query.pages)[0];
      const info = page.imageinfo?.[0];
      if (!info) throw new Error("no imageinfo for " + file);
      return { url: info.thumburl || info.url, ext: path.extname(info.url).toLowerCase() };
    }
    await new Promise((r) => setTimeout(r, attempt * 6000));
  }
  throw new Error("API kept rate-limiting for " + file);
}

async function download([key, file]) {
  const { url } = await thumbUrl(file);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extensionForBuffer(buf, path.extname(url));
  const outPath = path.join(OUT_DIR, key + ext);
  fs.writeFileSync(outPath, buf);
  return { outPath, bytes: buf.length };
}

/** The API sometimes reports .webp thumbs; keep a stable extension per key. */
function extensionForBuffer(buf, fromUrl) {
  if (buf.length < 12) return ".jpg";
  if (buf[0] === 0xff && buf[1] === 0xd8) return ".jpg";
  if (buf.slice(0, 4).toString() === "RIFF") return ".webp";
  if (buf.slice(1, 4).toString() === "PNG") return ".png";
  return fromUrl || ".jpg";
}

const emitted = [];
let ok = 0;
for (const [key, file] of picksList) {
  try {
    const { bytes } = await download([key, file]);
    const ext = ["jpg", "webp", "png"].find((e) =>
      fs.existsSync(path.join(OUT_DIR, `${key}.${e}`))
    );
    emitted.push({ key, ext });
    console.log("OK", key, bytes, "bytes ->", key + "." + ext);
    ok++;
  } catch (e) {
    console.log("FAIL", key, "->", e.message);
  }
  await new Promise((r) => setTimeout(r, 1500));
}
console.log(`downloaded ${ok}/${picksList.length}`);

// Generate the typed asset registry consumed by the app.
const lines = emitted
  .map(({ key, ext }) => `  ${key}: require("../../assets/destinations/${key}.${ext}"),`)
  .join("\n");
const registry = `/**
 * Photo registry for Roam India.
 *
 * Photos originate from Wikimedia Commons (see scripts/ for provenance and
 * verification tools) and are bundled locally, so the app works offline and
 * is never dependent on runtime image hosts.
 *
 * Keys match the entries used in destinations.ts.
 */
export const destinationImages: Record<string, number> = {
${lines}
};
`;
fs.writeFileSync("src/data/images.ts", registry);
console.log("wrote src/data/images.ts with", emitted.length, "entries");

// Stable provenance note for the README.
const manifest = emitted.map(({ key, ext }) => path.join(OUT_DIR, `${key}.${ext}`));
fs.writeFileSync("scripts/asset-manifest.json", JSON.stringify(manifest, null, 2));
