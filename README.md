# Al Fahidi Fort Website

Cinematic, bilingual (English / Arabic) marketing and visitor website for Al Fahidi Fort (Dubai Museum). The site is a single Next.js application with a scroll-driven home experience, an FAQ page and a Contact Us page, packaged as a Docker image and deployed to an on-premise Docker Swarm behind Nginx.

- Home: `/en`, `/ar` (root `/` redirects to `/en`)
- FAQ: `/en/faq`, `/ar/faq`
- Contact Us: `/en/contact-us`, `/ar/contact-us`
- Production: `http://172.20.104.100/alfahidifort/en`

## Table of Contents

1. [Architecture](#architecture)
2. [Tech Stack](#tech-stack)
3. [Repository Layout](#repository-layout)
4. [Key Components and Modules](#key-components-and-modules)
5. [Prerequisites](#prerequisites)
6. [Local Setup](#local-setup)
7. [Environment Variables](#environment-variables)
8. [Scripts](#scripts)
9. [Testing and Quality Checks](#testing-and-quality-checks)
10. [Docker Setup](#docker-setup)
11. [Deployment](#deployment)
12. [Internationalisation](#internationalisation)
13. [Base Path Handling](#base-path-handling)
14. [Troubleshooting](#troubleshooting)
15. [Known Gaps and Housekeeping](#known-gaps-and-housekeeping)

## Architecture

The project is an npm-workspaces monorepo with one application, `apps/web`. There is no separate backend or CMS today; all page content lives in TypeScript translation files and static assets shipped with the app. Two small Next.js Route Handlers exist under `/api` and return mock JSON, reserved for a future CMS integration.

```
Browser
  |
  |  http://172.20.104.100/alfahidifort/...
  v
Nginx (host, reverse proxy, path prefix /alfahidifort)
  |
  |  http://127.0.0.1:3111
  v
Docker Swarm service  alfahidi-fort_web  (1 replica, manager node)
  |
  |  container port 3000
  v
Next.js 16 standalone server (node apps/web/server.js)
  |-- App Router pages  /[locale], /[locale]/faq, /[locale]/contact-us
  |-- Route Handlers    /api/home-sequence, /api/landing  (mock data)
  |-- Image optimizer   /_next/image (AVIF / WebP, 1 year cache TTL)
  +-- Static assets     /assets/*  (immutable, 1 year cache)
```

Request flow inside the app:

1. `src/app/layout.tsx` is the root layout. It loads Google fonts, global CSS and wraps everything in `SmoothScrollProvider`.
2. `src/app/[locale]/layout.tsx` validates the locale (`en` or `ar`), sets `dir="rtl"` for Arabic, and renders `Header`, the page and `Footer`. It also mounts `BrowserEventRejectionGuard`.
3. Pages are React Server Components that read translations with `getTranslations(locale)` and hand them to client components.
4. The home page renders `HomeSequenceExperience`, a client component that drives the scroll-based hero reveal and story cards with GSAP ScrollTrigger and Lenis smooth scrolling. Animation code is loaded lazily on idle so it does not block first paint, and it is disabled when the visitor prefers reduced motion.

Rendering model: pages are statically generated for both locales at build time (`generateStaticParams`), and the app is built with `output: "standalone"` so the Docker runtime image only contains the server bundle, static files and `public/`.

## Tech Stack

| Area            | Choice                                                                      | Notes                                                                                                |
| --------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Runtime         | Node.js 24                                                                  | Docker image is `node:24-alpine`. Local dev verified on Node 24.13.                                  |
| Package manager | npm 10 workspaces                                                           | `package-lock.json` is the source of truth. A `pnpm-workspace.yaml` exists but pnpm is not used.     |
| Framework       | Next.js 16.2 (App Router)                                                   | Standalone output, Webpack dev server (`next dev --webpack`).                                        |
| UI              | React 19.2, TypeScript 5.9 (strict)                                         | `noUncheckedIndexedAccess` is enabled.                                                               |
| Styling         | Tailwind CSS 3.4, PostCSS, Autoprefixer                                     | Custom palette (`ink`, `smoke`, `sand`, `copper`, `pearl`, `steel`) and `max-w-experience` (1368px). |
| Fonts           | Cormorant Garamond, Inter (next/font), 29LT Azer (Google Fonts CSS)         | 29LT Azer is fetched at runtime from Google Fonts for Arabic.                                        |
| Animation       | GSAP 3 + ScrollTrigger, @gsap/react, Lenis                                  | Loaded on demand from `src/animations`.                                                              |
| Icons           | lucide-react                                                                | Tree-shaken via `optimizePackageImports`.                                                            |
| Images          | next/image with sharp 0.35                                                  | AVIF and WebP output, long cache TTL.                                                                |
| Utilities       | clsx, tailwind-merge                                                        | `cn()` helper in `src/components/ui/cn.ts`.                                                          |
| Testing         | Vitest 4, Testing Library, jsdom, v8 coverage                               | 95 percent thresholds on the covered files.                                                          |
| Formatting      | Prettier 3, EditorConfig                                                    | 2-space indent, LF line endings.                                                                     |
| Containers      | Docker multi-stage build, Docker Compose (local), Docker Swarm (production) | See [Deployment](#deployment).                                                                       |

## Repository Layout

```
.
+-- apps/web/                      Next.js application (workspace @alfahidi/web)
|   +-- public/assets/             Static images: home/, sequence/ (16 frames), faq/, contact/
|   +-- src/
|   |   +-- app/                   App Router: layouts, [locale] pages, api route handlers
|   |   +-- animations/            GSAP / Lenis setup and reusable scroll animation helpers
|   |   +-- components/
|   |   |   +-- chrome/            Header, Footer, brand SVG assets, social rail, marquee
|   |   |   +-- sequence/          HomeSequenceExperience (live home page)
|   |   |   +-- faq/               FaqAccordion
|   |   |   +-- runtime/           BrowserEventRejectionGuard
|   |   |   +-- ui/                cn() class helper
|   |   |   +-- Story, effects, landing, sections, reference-home   (legacy, see Known Gaps)
|   |   +-- config/site.ts         Site name, description, locales
|   |   +-- data/                  Mock payloads served by /api routes
|   |   +-- lib/
|   |   |   +-- i18n/              en.ts, ar.ts, getTranslations()
|   |   |   +-- content/           Locale type guard and legacy home content
|   |   |   +-- routing/           publicAsset() base-path helper
|   |   |   +-- scroll/            SmoothScrollProvider, useReducedMotion
|   |   +-- styles/globals.css     Tailwind layers and global rules
|   |   +-- types/                 Shared TypeScript types
|   +-- next.config.ts             basePath, standalone output, image and cache headers
|   +-- tailwind.config.ts
|   +-- vitest.config.ts
+-- deployment/
|   +-- deploy-production.sh       Build, ship and deploy to Docker Swarm
|   +-- README.md                  Full production runbook (Nginx, scaling, cleanup)
|   +-- .artifacts/                Generated image tarballs and stack files (git-ignored)
+-- Dockerfile                     Multi-stage production image
+-- docker-compose.yml             Local container run
+-- .env.example                   Environment variable template
+-- package.json                   Root workspace scripts
+-- tsconfig.base.json             Shared strict TypeScript settings
```

## Key Components and Modules

Live code paths, in the order a request touches them:

- `src/app/layout.tsx`: root HTML shell, fonts, `SmoothScrollProvider`.
- `src/lib/scroll/smooth-scroll-provider.tsx`: enables Lenis + ScrollTrigger only on the home route, deferred with `requestIdleCallback`, skipped for reduced motion.
- `src/components/runtime/browser-event-rejection-guard.tsx`: swallows unhandled promise rejections whose reason is a DOM `Event` (a browser quirk seen with scroll libraries) so they do not surface as errors.
- `src/app/[locale]/layout.tsx`: locale guard, RTL switch, Header and Footer.
- `src/components/chrome/header.tsx`: responsive navigation, language switcher that rewrites the current path to the other locale, mobile menu.
- `src/components/chrome/footer.tsx`: footer links and brand marks.
- `src/components/sequence/HomeSequenceExperience.tsx`: the home page. Circular hero reveal that tracks the header emblem position, story card rows, guided-tour overlay, all driven by GSAP ScrollTrigger.
- `src/app/[locale]/faq/page.tsx` and `src/components/faq/faq-accordion.tsx`: FAQ hero and accessible accordion.
- `src/app/[locale]/contact-us/page.tsx`: contact hero, map link to Google Maps, opening hours and contact details.
- `src/lib/i18n/`: all copy for both locales. Add or change text here.
- `src/lib/routing/public-asset.ts`: prefixes `/assets/...` URLs with the configured base path. Use it for every static asset reference.
- `src/animations/`: `gsap.config.ts` (plugin registration), `scroll.manager.ts` (Lenis controller and `animateSection` helper), plus fade, parallax, zoom, image-sequence and timeline helpers.
- `src/app/api/home-sequence/route.ts` and `src/app/api/landing/route.ts`: return mock JSON from `src/data`. Not consumed by any page today.

## Prerequisites

For local development:

- Node.js 24.x (LTS). Node 22 also works for the app but the production image uses 24, so prefer matching it.
- npm 10 or newer (bundled with Node 24).
- Git.

For running the site in a container (no local Node.js needed):

- Docker Engine 24 or newer with the Compose v2 plugin (`docker compose`, not `docker-compose`). Docker Desktop 4.x on Windows or macOS includes both. Verified with Docker 29.1.
- Windows: Docker Desktop with the WSL 2 backend enabled, and Git Bash (ships with Git for Windows) for running the shell scripts.
- Internet access from the Docker daemon to pull `node:24-alpine` from Docker Hub. If you are behind a corporate proxy, set it in Docker Desktop under Settings, Resources, Proxies.
- At least 4 GB of memory available to Docker. The `next build` stage is the heaviest step; on Docker Desktop raise the limit under Settings, Resources if the build is killed.
- Around 3 GB of free disk for the build cache, the intermediate stages and the final image.
- Nothing listening on host port 3111 (the default published port), or set `WEB_PORT` to a free port.

For deploying to production, in addition to the above:

- `ssh` and `scp` on the machine running the deployment script. On Windows use Git Bash.
- SSH access to the Swarm manager as a user that can run `docker` directly or through passwordless `sudo docker`.
- Docker Swarm already initialised on the target server (`docker info` shows `Swarm: active`).

## Local Setup

```bash
git clone <repository-url>
cd AlFahidiFort_website

# Install all workspace dependencies from the root
npm install

# Optional: create a local env file (defaults work without it)
cp .env.example .env

# Start the dev server (runs on port 3001)
npm run dev
```

Open `http://localhost:3001/en` (or `/ar`). The dev server uses the Webpack bundler with fast refresh.

To run a production build locally without Docker:

```bash
npm run build
npm run start --workspace @alfahidi/web     # serves on http://localhost:3000/en
```

## Environment Variables

All variables are optional for local development. Copy `.env.example` to `.env` to override them.

| Variable                | Default                                                                   | Purpose                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | `http://localhost:3000` (example file), `http://localhost:3111` (compose) | Public origin used for absolute URLs. The deploy script sets it to `http://<host><base-path>`.                     |
| `NEXT_PUBLIC_BASE_PATH` | empty                                                                     | Build-time Next.js `basePath`. Set by the Dockerfile from `APP_BASE_PATH`.                                         |
| `APP_BASE_PATH`         | empty locally, `/alfahidifort` in production                              | Path prefix the site is served under. Read by `next.config.ts`, the Dockerfile health check and the deploy script. |
| `WEB_PORT`              | `3111` (compose)                                                          | Host port mapped to the container's port 3000.                                                                     |
| `NODE_IMAGE`            | `node:24-alpine`                                                          | Base image for the Docker build.                                                                                   |

The base path is baked in at build time. Changing it requires a rebuild.

## Scripts

Run from the repository root unless noted.

| Command                                           | What it does                                                    |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                                     | Start the Next.js dev server on port 3001.                      |
| `npm run build`                                   | Production build of `apps/web` (standalone output).             |
| `npm run start --workspace @alfahidi/web`         | Serve the production build on port 3000.                        |
| `npm run typecheck`                               | `tsc --noEmit` across workspaces.                               |
| `npm run lint`                                    | Runs `lint` in each workspace that defines it (none currently). |
| `npm run format`                                  | Prettier over ts, tsx, js, json, md, css, yml.                  |
| `npm test --workspace @alfahidi/web`              | Run the Vitest suite once.                                      |
| `npm run test:coverage --workspace @alfahidi/web` | Run tests with v8 coverage and enforce thresholds.              |

## Testing and Quality Checks

Tests live next to the code they cover (`*.test.tsx`, `*.test.ts`) and use Vitest with jsdom and Testing Library. `next/link` and `next/image` are mocked in `apps/web/vitest.setup.ts`.

Covered areas: FAQ and Contact Us pages, Header, Footer, FaqAccordion, BrowserEventRejectionGuard and the i18n modules. Coverage thresholds are 95 percent for branches, functions, lines and statements on those files.

Before opening a pull request:

```bash
npm run typecheck
npm test --workspace @alfahidi/web
npm run build
```

As of this README, typecheck passes and the suite reports 7 files, 23 tests, all passing.

## Docker Setup

Use this path when you want to run the site exactly as production does, or when you do not want to install Node.js locally. Prerequisites are listed under [Prerequisites](#prerequisites).

### Step 1: Check the Docker installation

```bash
docker --version            # 24.0 or newer
docker compose version      # v2.x
docker info                 # must succeed; on Windows confirm "Operating System: Docker Desktop" and WSL 2
docker pull node:24-alpine  # proves Docker Hub access; the build fails later without it
```

### Step 2: Clone the repository

```bash
git clone <repository-url>
cd AlFahidiFort_website
```

No `npm install` is needed. Dependencies are installed inside the image during the build.

### Step 3: Configure environment (optional)

Compose reads a `.env` file in the project root. The defaults work without one.

```bash
cp .env.example .env
```

Values that matter for Docker:

| Variable               | Default in compose      | Effect                                                                 |
| ---------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `WEB_PORT`             | `3111`                  | Host port mapped to the container's port 3000.                         |
| `APP_BASE_PATH`        | empty                   | Path prefix. Leave empty for `/en`; set `/alfahidifort` to mimic prod. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3111` | Public origin. Append the base path when you set one.                  |

### Step 4: Build and start the container

Without a base path (the site answers at the root, like `npm run dev`):

```bash
docker compose up -d --build web
```

With the production-style base path:

```bash
APP_BASE_PATH=/alfahidifort NEXT_PUBLIC_SITE_URL=http://localhost:3111/alfahidifort docker compose up -d --build web
```

The first build takes several minutes because it pulls the base image, runs `npm ci` and `next build`. Later builds reuse the layer cache and are much faster unless `package-lock.json` changes.

### Step 5: Verify

```bash
docker compose ps                       # STATUS should show "healthy" after roughly 30 seconds
docker compose logs -f web              # look for "Ready" from the Next.js server
curl -I http://localhost:3111/en        # expect HTTP/1.1 200
```

Then open `http://localhost:3111/en`, or `http://localhost:3111/alfahidifort/en` if you set the base path. The container's health check requests `/<base-path>/en` every 30 seconds.

### Step 6: Day-to-day commands

```bash
docker compose logs -f web              # follow logs
docker compose restart web              # restart without rebuilding
docker compose up -d --build web        # rebuild after code changes (no hot reload inside Docker)
docker compose down                     # stop and remove the container
docker compose down --rmi local         # also remove the built image
docker builder prune                    # reclaim build cache disk space
```

Code changes are not reflected until you rebuild. For fast iteration use `npm run dev` from [Local Setup](#local-setup) and keep Docker for final verification.

### Building the image manually

If you want the image without Compose, for example to inspect it or push it somewhere:

```bash
# Git Bash on Windows: pass the base path WITHOUT the leading slash (see Troubleshooting)
docker build --build-arg APP_BASE_PATH=alfahidifort -t alfahidi-fort-website:test .

# Linux / macOS / PowerShell: the leading slash is safe
docker build --build-arg APP_BASE_PATH=/alfahidifort -t alfahidi-fort-website:test .

# Run it
docker run --rm -p 3111:3000 -e APP_BASE_PATH=/alfahidifort -e NEXT_PUBLIC_BASE_PATH=/alfahidifort alfahidi-fort-website:test
```

Leave out the build arg entirely for a root-path image. Remember that the base path is baked in at build time, so a root-path image cannot be moved under `/alfahidifort` by setting an env var at run time.

### How the Dockerfile is laid out

| Stage     | Base             | What happens                                                                                                                                                         |
| --------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`    | `node:24-alpine` | Sets `WORKDIR /app` and the `APP_BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` build args.                                                                                    |
| `deps`    | `base`           | Copies the two `package.json` files and the lockfile, runs `npm ci --include=dev`.                                                                                   |
| `builder` | `deps`           | Copies the source and runs `npm run build:web` with `output: "standalone"`.                                                                                          |
| `runner`  | `base`           | Creates a non-root `nextjs` user, copies only `public/`, `.next/standalone` and `.next/static`, exposes 3000, adds the health check, runs `node apps/web/server.js`. |

`.dockerignore` excludes `node_modules`, `.next`, logs, `.env*` files (except the example), the `ignore/` folder and deployment artifacts, so the build context stays small.

## Deployment

Production runs as a Docker Swarm stack on an on-premise server. The full runbook, including the Nginx block, scaling, image cleanup and multi-node notes, is in [deployment/README.md](deployment/README.md). This is the short version.

Target defaults:

| Setting         | Value                                      |
| --------------- | ------------------------------------------ |
| Host            | `172.20.104.100`                           |
| SSH user        | `svcadm`                                   |
| Stack / service | `alfahidi-fort` / `alfahidi-fort_web`      |
| Published port  | `3111` (container `3000`)                  |
| Base path       | `/alfahidifort`                            |
| Replicas        | `1`, constrained to `node.role == manager` |
| Public URL      | `http://172.20.104.100/alfahidifort/en`    |

Deploy from the project root (Git Bash on Windows):

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100
```

What the script does:

1. Builds the Docker image locally with a timestamped tag.
2. Saves it to `deployment/.artifacts/<image>.tar.gz` and generates a Swarm stack file.
3. Copies both to the server over `scp` and loads the image on the Swarm manager.
4. Runs `docker stack deploy` (start-first rolling update with automatic rollback on failure).
5. Waits for the running task count and then curls `http://127.0.0.1:3111/alfahidifort/en` on the server.
6. Warms the Home, FAQ and Contact Us pages plus up to 80 optimized image URLs so the first visitor is not slowed by cold caches.

Useful overrides:

```bash
# Different base path, port or Node base image
APP_BASE_PATH=/museum bash ./deployment/deploy-production.sh --host 172.20.104.100
bash ./deployment/deploy-production.sh --host 172.20.104.100 --port 3111 --node-image node:24-alpine

# Slower server, longer wait; skip cache warming
bash ./deployment/deploy-production.sh --host 172.20.104.100 --rollout-timeout 420 --warm-cache false

# Pin a specific image tag
bash ./deployment/deploy-production.sh --host 172.20.104.100 --image alfahidi-fort-website:prod-20260813
```

Run `bash ./deployment/deploy-production.sh --help` for every option.

Nginx on the server must proxy `/alfahidifort/` to `127.0.0.1:3111` and redirect `/alfahidifort` to `/alfahidifort/en`. The exact block is in the deployment runbook. After editing it:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Checking a live deployment:

```bash
ssh svcadm@172.20.104.100
docker stack services alfahidi-fort
docker service ps alfahidi-fort_web --filter desired-state=running --no-trunc
docker service logs --tail 120 alfahidi-fort_web
```

There is no CI/CD pipeline. Deployments are run manually from a developer machine, and the image is transferred over SSH rather than pushed to a registry.

## Internationalisation

- Supported locales are declared in `src/lib/content/site-content.ts` and `src/config/site.ts` (`en`, `ar`).
- Every page is generated for both locales. Unknown locales return 404.
- Arabic pages render with `dir="rtl"` on the locale wrapper.
- Copy lives in `src/lib/i18n/en.ts` and `src/lib/i18n/ar.ts`. Both files must expose the same shape; `translations.test.ts` guards this.
- The header language toggle swaps the locale segment of the current URL and keeps the rest of the path.

## Base Path Handling

The site is served under `/alfahidifort` in production but at the root locally. Three places cooperate to make that transparent:

- `apps/web/next.config.ts` normalises `NEXT_PUBLIC_BASE_PATH` or `APP_BASE_PATH` and applies Next.js `basePath`, which prefixes routes, `next/link` and `next/image` automatically.
- `src/lib/routing/public-asset.ts` prefixes hand-written `/assets/...` URLs. Always wrap static asset paths with `publicAsset()`.
- `src/lib/scroll/smooth-scroll-provider.tsx` strips the prefix before checking whether the current route is the home page.

## Troubleshooting

- `TypeError: Missing parameter name at 2` during `next build` in Docker: Git Bash converted `/alfahidifort` into a Windows path. Pass the build arg without the leading slash (`APP_BASE_PATH=alfahidifort`). The deploy script already does this.
- `failed to resolve source metadata for docker.io/library/node:24-alpine`: Docker cannot reach Docker Hub. Check `docker pull node:24-alpine`, fix DNS or proxy, or temporarily use a cached image with `--node-image node:20-alpine`.
- Swarm shows `0/1` and tasks stay in `Preparing`: the server is slow to start the container. Re-run with a larger `--rollout-timeout`.
- Port 3001 already in use locally: stop the other process or run `npx next dev -p <port>` inside `apps/web`.
- Old images piling up on the server: see "Stopped Task History" in the deployment runbook for safe cleanup steps.

## Known Gaps and Housekeeping

Items worth knowing before you change things:

- Unused dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion` and `zustand` are declared in `apps/web/package.json` but not imported anywhere. They can be removed to shrink installs.
- Legacy components: `components/Story`, `components/effects`, `components/landing`, `components/sections`, `hooks/`, the home content in `lib/content/site-content.ts` and `data/landing.ts` are not reachable from any route. They are earlier iterations of the home page kept for reference. `components/reference-home` is used only for its SVG path data; the PNGs in that folder duplicate `public/assets/home`.
- Mock APIs: `/api/home-sequence` and `/api/landing` return static JSON and nothing calls them yet. They mark where a CMS could be wired in.
- Port mismatch: `.env.example` lists port 3000, the dev script uses 3001 and Docker Compose publishes 3111. Nothing breaks, but do not rely on the example file for the dev URL.
- No lint config: `npm run lint` is a no-op because no workspace defines a `lint` script. Adding ESLint with `eslint-config-next` is recommended.
- No CI: typecheck, tests and build are run manually. A pipeline that runs the three commands in [Testing and Quality Checks](#testing-and-quality-checks) on every pull request would catch regressions earlier.
- Package manager: only npm is supported. Ignore `pnpm-workspace.yaml` or delete it to avoid confusion.
- Local-only files: browser screenshots, dev logs, `ignore/` (proposals and source HTML) and `deployment/.artifacts/` are git-ignored and should stay that way.
