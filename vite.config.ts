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
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react-router/") || id.includes("/react-helmet-async/")) return "vendor-router";
          if (id.includes("/@mui/") || id.includes("/@emotion/")) return "vendor-mui";
          if (id.includes("/lucide-react/")) return "vendor-icons";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "vendor-react";
          }
          return undefined;
        },
      },
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
