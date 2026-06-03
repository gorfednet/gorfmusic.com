# gorfmusic.com

Official marketing site for **Gorf** — listen links, releases, live dates, collaborations, and contact — served from [`gorfmusic.com`](https://gorfmusic.com).

**Repository:** [github.com/gorfednet/gorfmusic.com](https://github.com/gorfednet/gorfmusic.com)

## Stack

- **React 18** + **TypeScript**
- **Vite** — multi-page build (`index.html`, `listen.html`, `music.html`, etc.)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **MUI** + **Emotion** — Material icons / themed primitives where used
- **react-router** — client routing inside each HTML shell
- **motion** — light reveal / interaction polish

Design iteration historically tracked in Figma ([Modern Website for Gorf](https://www.figma.com/design/2liRV5RsWe9BQt8GQEFoHZ/Modern-Website-for-Gorf)); component attribution for bundled imagery lives in [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).

## Prerequisites

- **Node.js** LTS (Node 20+ recommended)
- **npm** (lockfile is `package-lock.json`; prefer `npm ci` in CI/deploy)

## Setup

```bash
npm ci
```

Copy `.deploy-env.example` to `.deploy-env` only if you use `make deploy` (SMB/rsync targets). Do **not** commit secrets — `.env` and `.deploy-env` are gitignored.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Copies HTML templates → paired `*.html` entrypoints, then runs Vite dev server |
| `npm run build` | Typecheck + prepages + production build + route fallback generation (`scripts/generate-route-fallbacks.mjs`) |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run validate:html` | Validate built HTML (`dist/**/*.html`) |
| `npm run smoke:urls` | Smoke-test extensionless URL behavior |
| `npm run icons` | Regenerate PNG/ICO favicons from `public/favicon.svg` |

## Deploy

Production deploy flow is documented in [DEPLOY.md](./DEPLOY.md) (nginx + SMB/rsync). `Makefile` targets:

- `make build` — security check script (if present), `npm ci`, `npm run build`
- `make deploy` — build then `./deploy-to-smb.sh`

## Repo layout

| Path | Notes |
|------|--------|
| `src/app/` | React app (pages, components, styles, data) |
| `*.vite.template.html` | Source HTML shells; `prepages` copies into committed `*.html` inputs and injects favicon links |
| `public/` | Static assets (images, favicons, etc.). Favicon source: `public/favicon.svg` — regenerate rasters with `npm run icons` |
| `fragments/` | Shared HTML snippets injected at build prep (`head-favicons.html`) |
| `nginx/` | Example vhost for gorfmusic.com |
| `scripts/` | Build helpers, smoke tests |

## Security

See [SECURITY.md](./SECURITY.md) for how to report security-sensitive issues.
