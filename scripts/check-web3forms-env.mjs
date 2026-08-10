import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const env = loadEnv("production", root, "VITE_WEB3FORMS_ACCESS_KEY");
const key = (env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();

if (key.length < 20) {
  console.error(
    "Production deploy requires VITE_WEB3FORMS_ACCESS_KEY in the Vite production environment.",
  );
  process.exit(1);
}

console.log("Web3Forms production key is configured.");
