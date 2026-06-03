#!/usr/bin/env node
/**
 * Rasterize public/favicon.svg into PNG/ICO assets for the favicon suite.
 * Run: npm run icons
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public");
const svgPath = path.join(publicDir, "favicon.svg");

const outputs = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
];

async function main() {
  const svg = await fs.readFile(svgPath);

  for (const { file, size } of outputs) {
    await sharp(svg).resize(size, size).png().toFile(path.join(publicDir, file));
    console.log(`Wrote public/${file}`);
  }

  const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
  const ico = await toIco([png16, png32]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), ico);
  console.log("Wrote public/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
