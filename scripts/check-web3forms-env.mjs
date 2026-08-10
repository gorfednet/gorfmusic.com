import { readFile } from "node:fs/promises";

const envPath = new URL("../.env", import.meta.url);

let source;
try {
  source = await readFile(envPath, "utf8");
} catch {
  console.error("Production deploy requires an untracked .env file.");
  process.exit(1);
}

const match = source.match(
  /^\s*VITE_WEB3FORMS_ACCESS_KEY\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s#]+))\s*(?:#.*)?$/m,
);
const key = (match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();

if (key.length < 20) {
  console.error(
    "Production deploy requires VITE_WEB3FORMS_ACCESS_KEY in .env.",
  );
  process.exit(1);
}

console.log("Web3Forms production key is configured.");
