import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
  assetsInclude: ["**/*.svg"],
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(root, "index.html"),
        listen: path.resolve(root, "listen.html"),
        music: path.resolve(root, "music.html"),
        collaborations: path.resolve(root, "collaborations.html"),
        services: path.resolve(root, "services.html"),
        live: path.resolve(root, "live.html"),
        contact: path.resolve(root, "contact.html"),
      },
    },
  },
});
