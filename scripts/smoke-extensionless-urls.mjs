#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");
const distDir = path.join(projectRoot, "dist");
const templateFiles = [
  "index.vite.template.html",
  "listen.vite.template.html",
  "music.vite.template.html",
  "collaborations.vite.template.html",
  "services.vite.template.html",
  "live.vite.template.html",
  "contact.vite.template.html",
];
const canonicalRoutes = ["/", "/listen", "/collaborations", "/services", "/live", "/contact"];
const fallbackRoutes = ["listen", "music", "collaborations", "services", "live", "contact"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function read(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function collectFiles(dir, matcher, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(fullPath, matcher, acc);
      continue;
    }
    if (matcher(fullPath)) acc.push(fullPath);
  }
  return acc;
}

function relative(filePath) {
  return path.relative(projectRoot, filePath);
}

function ensureNoMatches(content, regex, message, filePath) {
  const match = content.match(regex);
  assert(!match, `${message}: ${relative(filePath)} (${match?.[0] ?? "match"})`);
}

async function runStaticChecks() {
  const sourceFiles = await collectFiles(
    srcDir,
    (filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".html"),
  );
  const templatePaths = templateFiles.map((name) => path.join(projectRoot, name));
  const filesToCheck = [...sourceFiles, ...templatePaths];

  for (const filePath of filesToCheck) {
    const content = await read(filePath);
    ensureNoMatches(content, /to=["']\/[a-z-]+\.html["']/g, "Found internal .html route link", filePath);
    ensureNoMatches(content, /href=["']\/[a-z-]+\.html["']/g, "Found internal .html route href", filePath);
    ensureNoMatches(content, /(?:href|to)=["'](listen|music|live|services|contact|collaborations)["']/g, "Found route-relative internal page link", filePath);
    ensureNoMatches(content, /src=["']img\//g, "Found relative internal image source", filePath);
    ensureNoMatches(content, /(?:href|xlink:href)=["']img\/icons\.svg#/g, "Found relative sprite href", filePath);
  }
}

async function runMetaChecks() {
  for (const template of templateFiles) {
    const templatePath = path.join(projectRoot, template);
    const content = await read(templatePath);
    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
    const ogMatch = content.match(/<meta property="og:url" content="([^"]+)"/);
    assert(canonicalMatch, `Missing canonical tag in ${template}`);
    assert(ogMatch, `Missing og:url tag in ${template}`);
    assert(canonicalMatch[1] === ogMatch[1], `canonical and og:url differ in ${template}`);
    assert(!canonicalMatch[1].endsWith(".html"), `Canonical URL uses .html in ${template}`);
    assert(canonicalMatch[1].startsWith("https://gorfmusic.com"), `Unexpected host in ${template}: ${canonicalMatch[1]}`);
  }
}

async function runDistChecks() {
  const indexExists = await fs
    .access(path.join(distDir, "index.html"))
    .then(() => true)
    .catch(() => false);
  assert(indexExists, "dist/index.html is missing (build first)");

  for (const route of fallbackRoutes) {
    const routeHtml = path.join(distDir, `${route}.html`);
    const routeIndex = path.join(distDir, route, "index.html");
    const htmlExists = await fs.access(routeHtml).then(() => true).catch(() => false);
    const indexExistsForRoute = await fs.access(routeIndex).then(() => true).catch(() => false);
    assert(htmlExists, `Missing dist/${route}.html`);
    assert(indexExistsForRoute, `Missing dist/${route}/index.html fallback`);
  }
}

async function runHttpChecks() {
  const baseUrl = process.env.SMOKE_BASE_URL;
  if (!baseUrl) return;

  const normalizedBase = baseUrl.replace(/\/$/, "");
  const checks = [
    { path: "/index.html", status: 301, location: "/" },
    { path: "/music", status: 301, location: "/listen" },
    { path: "/music/", status: 301, location: "/listen" },
    { path: "/music.html", status: 301, location: "/listen" },
    ...canonicalRoutes
      .filter((route) => route !== "/")
      .flatMap((route) => [
        { path: `${route}.html`, status: 301, location: route },
        { path: `${route}/`, status: 301, location: route },
      ]),
  ];

  for (const check of checks) {
    const response = await fetch(`${normalizedBase}${check.path}`, { redirect: "manual" });
    assert(response.status === check.status, `Unexpected status for ${check.path}: ${response.status}`);
    const location = response.headers.get("location") || "";
    assert(
      location === check.location || location === `${normalizedBase}${check.location}`,
      `Unexpected redirect location for ${check.path}: ${location}`,
    );
  }
}

async function run() {
  await runStaticChecks();
  await runMetaChecks();
  await runDistChecks();
  await runHttpChecks();
  console.log("Smoke checks passed for extensionless URL migration.");
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
