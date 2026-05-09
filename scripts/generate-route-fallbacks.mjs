#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const routeHtmlFiles = ["listen.html", "music.html", "collaborations.html", "services.html", "live.html", "contact.html"];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureRouteFallbacks() {
  for (const htmlFile of routeHtmlFiles) {
    const source = path.join(distDir, htmlFile);
    if (!(await exists(source))) {
      throw new Error(`Missing expected built page: ${source}`);
    }

    const routeSegment = htmlFile.replace(/\.html$/, "");
    const routeDir = path.join(distDir, routeSegment);
    const destination = path.join(routeDir, "index.html");
    await fs.mkdir(routeDir, { recursive: true });
    await fs.copyFile(source, destination);
  }
}

await ensureRouteFallbacks();
