// One-shot: rewrite src/data/destinations.ts to reference the local asset
// registry (src/data/images.ts) instead of Commons URLs.
import fs from "node:fs";

const picks = JSON.parse(fs.readFileSync("scripts/picked-files.json", "utf8"));
const map = Object.fromEntries(picks.map(([k, f]) => [f, k]));

let src = fs.readFileSync("src/data/destinations.ts", "utf8");

// Replace every cm("Commons file.jpg") with images.<key>
src = src.replace(/cm\(\s*"([^"]+)"\s*\)/g, (m, file) => {
  const key = map[file];
  if (!key) throw new Error("no key for " + file);
  return "images." + key;
});

// Drop the now-unused URL helper and its comment.
const helperRegex =
  /\/\*\* Builds a Commons image URL[\s\S]*?const cm = \(file: string, width = 1200\) =>\s*`https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\/\$\{encodeURI\(\s*file\s*\)\}\?width=\$\{width\}`;\s*\n\n/;
if (!helperRegex.test(src)) throw new Error("cm helper block not found");
src = src.replace(helperRegex, "");

// Add the registry import before the type import.
src = src.replace(
  'import type {\n  Attraction,\n  Destination,\n} from "../types/destination";',
  'import { destinationImages as images } from "./images";\nimport type {\n  Attraction,\n  Destination,\n} from "../types/destination";'
);

if (!src.includes('from "./images"')) throw new Error("import not added");

fs.writeFileSync("src/data/destinations.ts", src);
const refs = (src.match(/images\.\w+/g) || []).length;
console.log("rewritten, image refs:", refs);
