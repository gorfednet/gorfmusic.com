import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const assetDirectory = path.resolve("dist/assets");
const maxChunkBytes = 500_000;
const entries = await readdir(assetDirectory, { withFileTypes: true });
const javascriptFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".js"));

if (javascriptFiles.length === 0) {
  throw new Error(`No JavaScript chunks found in ${assetDirectory}. Run the production build first.`);
}

const chunks = await Promise.all(
  javascriptFiles.map(async ({ name }) => ({
    name,
    bytes: (await stat(path.join(assetDirectory, name))).size,
  })),
);

chunks.sort((a, b) => b.bytes - a.bytes);
const oversized = chunks.filter(({ bytes }) => bytes > maxChunkBytes);
const largest = chunks[0];
const source = (
  await Promise.all(
    javascriptFiles.map(({ name }) =>
      readFile(path.join(assetDirectory, name), "utf8"),
    ),
  )
).join("\n");

console.log(
  `Bundle size check: ${chunks.length} JavaScript chunks; largest is ${largest.name} (${(largest.bytes / 1000).toFixed(2)} kB).`,
);

if (oversized.length > 0) {
  const details = oversized.map(({ name, bytes }) => `${name}: ${(bytes / 1000).toFixed(2)} kB`).join("\n");
  throw new Error(`JavaScript chunks exceed the 500 kB limit:\n${details}`);
}

if (!source.includes("botcheck") || source.includes("company_website")) {
  throw new Error(
    "Contact bundle is missing botcheck or contains the legacy honeypot field.",
  );
}
