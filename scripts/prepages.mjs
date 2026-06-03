#!/usr/bin/env node
/**
 * Copy *.vite.template.html → *.html and inject shared head fragments.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PLACEHOLDER = "<!-- @include head-favicons -->";

const pairs = [
  ["index.vite.template.html", "index.html"],
  ["listen.vite.template.html", "listen.html"],
  ["music.vite.template.html", "music.html"],
  ["collaborations.vite.template.html", "collaborations.html"],
  ["services.vite.template.html", "services.html"],
  ["live.vite.template.html", "live.html"],
  ["contact.vite.template.html", "contact.html"],
];

async function main() {
  const faviconFragment = await fs.readFile(path.join(root, "fragments/head-favicons.html"), "utf8");

  for (const [srcName, destName] of pairs) {
    const srcPath = path.join(root, srcName);
    let html = await fs.readFile(srcPath, "utf8");

    if (!html.includes(PLACEHOLDER)) {
      throw new Error(`${srcName} is missing ${PLACEHOLDER}`);
    }

    html = html.replace(PLACEHOLDER, faviconFragment.trimEnd());
    await fs.writeFile(path.join(root, destName), html);
    console.log(`${srcName} → ${destName}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
