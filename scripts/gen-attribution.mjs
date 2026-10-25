// One-shot: generates docs/PHOTO-ATTRIBUTION.md from scripts/picked-files.json
// (the key → Commons file name map used by scripts/download-assets.mjs).
import fs from "node:fs";

const picks = JSON.parse(fs.readFileSync("scripts/picked-files.json", "utf8"));

const rows = picks
  .map(([key, file]) => {
    const url =
      "https://commons.wikimedia.org/wiki/File:" + file.replace(/ /g, "_");
    return `- \`${key}\` — [${file}](${url})`;
  })
  .join("\n");

const doc = `# Photo attribution

All destination and attraction photographs in Roam India come from
[Wikimedia Commons](https://commons.wikimedia.org) and are bundled locally
under \`assets/destinations/\` (the app does **not** load them over the
network — see \`scripts/download-assets.mjs\` for the build-time provenance
tool and \`scripts/picked-files.json\` for the source file list).

Most Wikimedia Commons media is available under CC-BY / CC-BY-SA or
public-domain terms. Each file page linked below states the exact licence,
author and source. If you publish this project, keep this attribution
document (or an equivalent credits screen) alongside it.

## Image index

| Key | Commons file |
| --- | --- |
${picks
  .map(([key, file]) => {
    const url =
      "https://commons.wikimedia.org/wiki/File:" + file.replace(/ /g, "_");
    return `| \`${key}\` | [${file}](${url}) |`;
  })
  .join("\n")}
`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/PHOTO-ATTRIBUTION.md", doc);
console.log("wrote docs/PHOTO-ATTRIBUTION.md with", picks.length, "entries");
