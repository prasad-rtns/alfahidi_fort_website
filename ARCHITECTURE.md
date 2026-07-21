# Al Fahidi Fort — Digital Experience Platform
## Architecture, Standards & Delivery Plan (Pre-Implementation)

Status: **Design phase — no application code written yet.**

---

## 0. What the reference materials actually show

Before designing anything, the prototype video and Figma reference were inspected directly (37 sampled frames across the 43.7s capture) rather than assumed from the brief. This changes/confirms several architectural decisions below:

| Observed in prototype | Architectural implication |
|---|---|
| Bilingual toggle "`عربي`" in the primary nav | This is a **bilingual EN/AR product with full RTL**, not an English site with a language stub. Drives font strategy, CSS logical properties, Payload localization, and animation mirroring (see §4.6). |
| Sticky header: government crest lockup, "Book Tickets" CTA, search, nav (Experience / Shop / What's on / Visit / Explore), rotated "Al Fahidi Fort" wordmark on the right edge | Header is a persistent, content-driven **Global** in the CMS, not hardcoded markup. |
| Scrolling marquee/ticker bar ("OPEN TODAY: 10:30 AM – 6 PM · DUBAI FREE PORT EXHIBITION UNTIL 29TH JANUARY") | A CMS-editable, schedulable **Announcement** global, rendered as an infinite CSS/GSAP marquee — must respect `prefers-reduced-motion`. |
| Hero: desaturated/blurred archival photo behind a **circular mask that scales in** to reveal a sharp duotone image | A reusable **circle-reveal hero** primitive driven by GSAP + `clip-path`, not a one-off. Needs an SSR-safe placeholder (see §4.3). |
| Archival aerial photograph of the fort paired with a rotating circular artifact image (ceremonial helmet), editorial copy | A **split media/story block** — this is a Payload **block**, reusable across pages, not a page-specific component. |
| Three-card grid ("Origins visions", "Dubai fishing village", "Vernacular architecture") — each a circular-masked photo, exhibition date, "Learn more" | An **Exhibition/Collection card grid** block, backed by a Payload `exhibitions` collection, not static cards. |
| "Power of ceremonials" ↔ "Conservation and care" split section connected by **animated SVG line-draw connectors** across a circle-masked and an arch-masked image | A bespoke pinned scroll section: two content nodes + an SVG path whose `stroke-dashoffset` animates with `ScrollTrigger` scrub. Treated as its own component, not generalized — it's a signature moment, not a pattern reused everywhere. |
| Vertical sticky "Find us on social media" rail + social icons, left edge | Persistent chrome, part of the app shell, CMS-driven links. |
| Arch and circle mask motifs recur (helmet in circle, conservation photo in arch, exhibition cards in circle) | These map to **Gulf/Islamic architectural motifs** (dome, arch, coin/medallion) — codify as a small set of CSS mask utilities, not ad-hoc clip-paths per component. |

This confirms the brief's requirement list (cinematic storytelling, scroll-driven animation, parallax, image-sequence, video transitions, smooth scroll) and adds two decisions the brief didn't state explicitly: **bilingual RTL is a first-class requirement**, and the CMS content model must be **block-based**, because the prototype is clearly composed from a small set of repeating editorial section types, not fixed page templates.

---

## 1. Product & Experience Architecture

### 1.1 Experience principles
1. **Narrative first, chrome second.** Header/ticker/social rail are persistent but visually recessive; content sections carry the cinematic weight.
2. **Every animation must degrade gracefully.** No section may depend on JS for its content to be reachable — GSAP/Lenis enhance an already-readable, already-navigable DOM.
3. **Scroll is the primary input, not a side effect.** Sections are authored against scroll progress (0→1), so the same section component can be pinned, scrubbed, or played passively depending on placement.
4. **Bilingual is symmetric.** Arabic is not a mirrored afterthought — layouts, animation direction, and type scale are validated in both directions before a section is considered done.

### 1.2 Page/section inventory (derived from the prototype)
- **Home** — circle-reveal hero → split archival story → exhibition grid → connected-detail (ceremonials/conservation) → footer.
- **Experience** (landing for "Experience" nav item) — exhibition/collection listing, filterable.
- **Exhibition detail** — single exhibition, image sequence / gallery, related artifacts.
- **What's On** — events calendar (guided tours, workshops), date-based.
- **Visit** — practical info (hours, location, accessibility), map.
- **Shop** — commerce entry point (out of scope for build, but modeled so it can plug into an external commerce provider later — see §7 open items).
- **Book Tickets** — ticketing flow (likely an embedded/external ticketing provider in v1 — see §7).

### 1.3 Reusable section vocabulary (Payload blocks, §5.3)
`Hero.CircleReveal`, `Story.SplitMedia`, `Grid.ExhibitionCards`, `Detail.ConnectedPair`, `Media.ImageSequence`, `Media.VideoTransition`, `RichText`, `CTA.Banner`, `Footer` (global). Every page is an ordered array of these blocks — this is what makes the CMS "production-grade" rather than a set of one-off templates.

---

## 2. System Architecture

```
                                   ┌─────────────────────────┐
                                   │        Visitors          │
                                   └────────────┬─────────────┘
                                                │ HTTPS
                                   ┌────────────▼─────────────┐
                                   │   Nginx (reverse proxy)  │
                                   │  TLS · gzip/br · caching │
                                   │  rate limiting · routing │
                                   └───┬───────────────────┬──┘
                          /admin,/api  │                   │  / (everything else)
                                   ┌───▼───────┐      ┌────▼─────────┐
                                   │ apps/cms  │      │  apps/web    │
                                   │ Payload 3 │◄─────┤  Next.js 15  │
                                   │ (Next.js  │ REST/ │  App Router  │
                                   │  host)    │ GraphQL  ISR/SSG    │
                                   └───┬───────┘      └──────────────┘
                                       │
                                   ┌───▼───────┐      ┌──────────────┐
                                   │ PostgreSQL│      │ Object storage│
                                   │           │      │ (media/video/ │
                                   └───────────┘      │ img-sequences)│
                                                       └──────────────┘
```

Key decisions:
- **Payload CMS 3.x runs as its own Next.js application** (`apps/cms`), separate from the public site (`apps/web`). Payload 3 is architecturally a Next.js plugin, so the CMS *is* a (minimal) Next.js app — this satisfies the box diagram's separation while matching Payload's actual runtime requirement.
- **apps/web never talks to Postgres directly.** It only consumes Payload's REST API (with typed responses generated from Payload's config). This keeps the frontend deployable/scalable independently and keeps a single source of truth for access control.
- **Nginx is the single ingress.** Path-based routing: `/admin*` and `/api*` → CMS container, everything else → web container. Nginx also owns TLS termination, static asset caching headers, and gzip/brotli — the Next.js containers stay stateless.
- **Media (images, image-sequence frame sets, MP4 transition clips) lives in object storage**, not in the Postgres database or container filesystem — required for horizontal scaling and for CDN offload later (Azure Blob, per the target infra).

---

## 3. Frontend Architecture (`apps/web`)

### 3.1 Rendering strategy
- **Static-first.** Marketing/story pages (Home, Experience, Visit) are statically generated at build time and revalidated via Next.js ISR + on-demand revalidation webhooks fired by Payload on publish. This is non-negotiable given the animation weight — a slow TTFB compounds with heavy client JS.
- **Dynamic only where necessary.** Ticketing/availability and the announcement ticker's "open today" state may need short-lived revalidation (`revalidate: 60`) or client-side fetch for the live clock portion only.
- **No client-side data fetching for content that GSAP will animate.** Content must be present in the initial HTML so ScrollTrigger can measure real layout on mount — fetching content client-side after mount is a common cause of mis-measured scroll triggers and is disallowed.

### 3.2 Animation system architecture
- **Lenis owns the scroll.** A single `SmoothScrollProvider` (client component, mounted once in the root layout) instantiates Lenis, syncs its `scroll` event to `ScrollTrigger.update`, and drives the RAF loop through `gsap.ticker` (not a second competing `requestAnimationFrame`). No component instantiates its own Lenis instance.
- **One GSAP context per section, always cleaned up.** Every animated section is a client component that opens a `gsap.context()` scoped to a ref on mount and `.revert()`s it on unmount/route change. This is the single most important discipline for avoiding the classic "ScrollTrigger duplicate/zombie trigger" bug in Next.js App Router (mount/unmount churn from client-side navigation).
- **Section components are animation-agnostic about position.** A section doesn't know if it's pinned or not — it exposes refs; a thin per-page "choreography" module wires refs to ScrollTrigger configs (pin, scrub, start/end). This keeps the same `Story.SplitMedia` component reusable whether it's pinned (Home) or plays passively (Exhibition detail).
- **`prefers-reduced-motion` is checked once, centrally**, in the SmoothScrollProvider and in a `useReducedMotion()` hook — sections that receive `reducedMotion=true` skip scrub/pin behavior and fall back to simple fade-ins. This is a hard requirement, not a nice-to-have, for a government/tourism site.
- **Parallax** is implemented via ScrollTrigger `scrub` on transform (`y`/`scale`), never on `top`/`left`, to stay off the main thread's layout path.

### 3.3 Image sequence & video transitions
- Image-sequence "scrubbing" (canvas-drawn frame-by-frame playback tied to scroll, as used for hero/product-style reveals) is implemented as a dedicated `<ImageSequencePlayer>` client component:
  - Frames are pre-generated (build-time or CMS-side processing) into a numbered, size-capped set (e.g., WebP, ~150–250KB/frame at target resolution) — never raw video frames extracted client-side.
  - A small preloader loads a low-frame-count placeholder strip first (e.g., every 5th frame) so scrubbing is responsive before the full set finishes loading, then backfills.
  - Rendering target is `<canvas>`, not swapping `<img>` elements, to avoid decode jank at scroll speed.
- Video transitions (short MP4/WebM clips used as section-to-section transitions) use native `<video>` with `preload="metadata"`, are muted/`playsinline` (autoplay policy compliance), and are triggered by ScrollTrigger `onEnter`/`onLeaveBack` rather than scrubbed frame-by-frame (scrubbing native video via `currentTime` is unreliable across browsers and is reserved for the canvas image-sequence approach instead).
- All heavy media sections lazy-mount (Next.js dynamic import, `ssr: false` only for the canvas/video layer itself — surrounding text content stays server-rendered).

### 3.4 Three.js boundary
Three.js is scoped to a single, explicitly justified use case if/when one exists (e.g., an interactive 3D artifact viewer on an exhibition detail page) — not used for ambient background effects, which GSAP/CSS handles more cheaply. Any Three.js scene is its own lazy-loaded client component with its own dispose lifecycle (geometries/materials/renderer explicitly disposed on unmount) to avoid WebGL context leaks across client-side navigations.

### 3.5 State & data
- Server Components fetch content directly from the Payload REST API at build/request time.
- Minimal client state: language/direction, reduced-motion flag, mobile nav open/closed, Lenis instance — handled with small context providers, not a global store. No Redux/Zustand needed at this scope; introduce one only if a real cross-cutting client state need emerges (e.g., a persistent ticket-cart).

### 3.6 Internationalization & RTL
- `next-intl` (or Next.js built-in i18n routing) with locale segments `/en/...` and `/ar/...`.
- `dir="rtl"` set at the `<html>` level for `ar`; all custom layout CSS uses logical properties (`margin-inline-start`, not `margin-left`) so mirroring is automatic rather than duplicated.
- Animation direction (e.g., parallax offsets, line-draw connectors, marquee scroll direction) is mirrored per-locale via a signed multiplier read from direction context, not hardcoded.
- Two font stacks loaded via `next/font`: a Latin display/serif for EN headings + an Arabic-appropriate face (e.g., a Kufi/Naskh-style variable font) for AR, matched for x-height/weight so the two locales feel like one brand.
- Payload collections use field-level localization (`localized: true`) for editorial text; media assets are shared across locales unless a field explicitly needs a locale-specific image.

---

## 4. Backend/CMS Architecture (`apps/cms` — Payload 3 + PostgreSQL)

### 4.1 Why Payload, and how it's used here
Payload gives a code-first, TypeScript-native content model (fits the "coding standards" requirement better than a GUI-first CMS), a built-in admin UI, first-class Postgres support, and native localization — all needed for a bilingual, block-based, editor-maintained site that a non-developer content team will run after launch.

### 4.2 Collections
| Collection | Purpose | Notable fields |
|---|---|---|
| `pages` | Route-driven pages built from the block vocabulary (§1.3) | `slug`, `locale`-aware `title`, `layout: blocks[]`, SEO group |
| `exhibitions` | Exhibition/collection entries shown in grids and detail pages | title, dates (`startDate`/`endDate`), cover media, circular/arch mask variant, related artifacts |
| `artifacts` | Individual museum objects (e.g., the ceremonial helmet) | title, era, media (incl. multi-angle for future 3D), provenance text |
| `events` | "What's On" calendar entries (guided tours, workshops) | title, recurrence rule or explicit dates, capacity, location |
| `media` | Payload's upload collection | image, plus a `mediaType` discriminator for `imageSequenceSet` (grouped frames) and `transitionVideo` |
| `navigation` (or global) | Header nav items, footer links, social links | ordered items, locale-aware labels |
| `users` | CMS editors/admins | role-based access (`admin`, `editor`) |

### 4.3 Globals
- `siteSettings` — site title, default SEO, government branding assets.
- `announcementTicker` — the marquee bar: message(s), active date range, opening hours override, on/off toggle.
- `header` — sticky nav content + CTA label/link ("Book Tickets").
- `footer` — social links, address, credits.

### 4.4 Blocks (drive the `layout` field on `pages`)
`heroCircleReveal`, `storySplitMedia`, `exhibitionCardGrid`, `connectedDetailPair`, `imageSequence`, `videoTransition`, `richText`, `ctaBanner`. Each block's schema is the single source of truth for what the corresponding frontend component needs as props — the frontend never invents fields the CMS doesn't model.

### 4.5 Access control & publishing
- Draft/publish workflow via Payload's versioning (`drafts: { autosave: true }`) so editors can preview before going live.
- Public API access is read-only for published content; all writes require authenticated CMS sessions.
- **On-publish webhook** calls Next.js's on-demand revalidation endpoint (a small internal API route protected by a shared secret) so static pages update within seconds of a publish, without a full rebuild.

### 4.6 API shape
- REST for the frontend's server-side fetches (simpler caching semantics with Next.js `fetch` + `next: { revalidate }`).
- GraphQL available from Payload out of the box — kept as an option for any future admin tooling or complex nested queries, not required by `apps/web` day one.

---

## 5. Folder Structure

```
AlFahidiFort/
├── ARCHITECTURE.md
├── pnpm-workspace.yaml
├── package.json                      # root: shared devDeps, scripts
├── .editorconfig
├── .env.example                      # documents every var; real .env* files gitignored
│
├── apps/
│   ├── web/                          # Next.js 15 public site
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── [locale]/
│   │   │   │   │   ├── layout.tsx            # html dir=, SmoothScrollProvider mount
│   │   │   │   │   ├── page.tsx               # Home
│   │   │   │   │   ├── experience/
│   │   │   │   │   ├── exhibitions/[slug]/
│   │   │   │   │   ├── whats-on/
│   │   │   │   │   ├── visit/
│   │   │   │   │   └── shop/
│   │   │   │   └── api/revalidate/route.ts     # on-publish webhook target
│   │   │   ├── components/
│   │   │   │   ├── chrome/                     # Header, Ticker, SocialRail, Footer
│   │   │   │   ├── sections/                   # one folder per block type (§1.3/4.4)
│   │   │   │   │   ├── hero-circle-reveal/
│   │   │   │   │   ├── story-split-media/
│   │   │   │   │   ├── exhibition-card-grid/
│   │   │   │   │   ├── connected-detail-pair/
│   │   │   │   │   ├── image-sequence/
│   │   │   │   │   └── video-transition/
│   │   │   │   └── ui/                         # buttons, masks, marquee primitive
│   │   │   ├── lib/
│   │   │   │   ├── payload-client.ts           # typed fetch wrapper over Payload REST
│   │   │   │   ├── scroll/                      # Lenis+ScrollTrigger provider & hooks
│   │   │   │   └── i18n/
│   │   │   ├── styles/
│   │   │   └── types/                          # generated Payload types (imported, not duplicated)
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── cms/                          # Payload 3 (Next.js host)
│       ├── src/
│       │   ├── collections/          # pages.ts, exhibitions.ts, artifacts.ts, events.ts, media.ts, users.ts, navigation.ts
│       │   ├── globals/              # siteSettings.ts, announcementTicker.ts, header.ts, footer.ts
│       │   ├── blocks/               # one schema file per block in §4.4
│       │   ├── access/               # reusable access-control functions
│       │   ├── hooks/                # afterChange -> revalidate webhook, etc.
│       │   └── payload.config.ts
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   ├── shared-types/                 # generated Payload types + hand-written shared DTOs
│   └── config/                       # shared tsconfig, eslint, prettier base configs
│
├── infra/
│   ├── docker-compose.yml
│   ├── docker-compose.override.yml   # local-only overrides (hot reload, mailhog, etc.)
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── conf.d/alfahidifort.conf
│   └── postgres/
│       └── init.sql                  # extensions, initial db if needed
│
└── .github/
    └── workflows/                    # ci.yml (lint/typecheck/test/build), deploy.yml
```

`packages/shared-types` is the seam that keeps `apps/web` from drifting out of sync with the CMS schema: Payload generates TypeScript types from its config, published into this package, imported by the frontend. No hand-maintained duplicate interfaces.

---

## 6. Development Phases

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 — Foundations** | Monorepo scaffold, tooling (ESLint/Prettier/TS project references), Docker Compose skeleton (web + cms + postgres + nginx), CI pipeline running lint/typecheck on every PR | `docker compose up` serves a placeholder page through Nginx end-to-end |
| **1 — CMS data model** | All collections/globals/blocks from §4 defined in Payload, admin UI usable, seed script with representative content (from the prototype's actual sections) | Editors can create a `pages` entry composed of every block type and see it via the REST API |
| **2 — App shell & design system** | Header, ticker/marquee, social rail, footer, typography scale, color tokens, mask utilities (circle/arch), base layout with locale routing + RTL | Shell renders correctly in both `en` and `ar`, Lighthouse a11y ≥ 95 on a static page |
| **3 — Scroll/animation core** | SmoothScrollProvider (Lenis+ScrollTrigger wiring), reduced-motion handling, the per-section GSAP-context pattern proven on one real section | One fully animated section (e.g., hero circle-reveal) works correctly across mount/unmount and client-side route changes with zero duplicate ScrollTrigger instances |
| **4 — Section build-out** | Implement remaining blocks: story split-media, exhibition card grid, connected-detail pair (SVG line-draw), image-sequence player, video-transition player | Home page fully matches the prototype's choreography at 60fps on a mid-tier laptop |
| **5 — Page assembly & content wiring** | Experience, Exhibition detail, What's On, Visit, Shop landing wired to real CMS content; on-publish revalidation working | All pages navigable, content editor-driven, no hardcoded copy remaining |
| **6 — i18n/RTL hardening** | Full Arabic pass: mirrored animations, font pairing QA, locale-aware SEO metadata | Native-speaker content review sign-off; RTL parity checklist passed |
| **7 — Ticketing integration** | Wire "Book Tickets" CTA to chosen ticketing provider (external redirect vs. embedded flow — see §8 open item) | End-to-end ticket purchase flow (or handoff) verified in staging |
| **8 — Performance & accessibility hardening** | Image/video weight budget audit, code-split verification, keyboard navigation pass, screen-reader pass on animated sections, Core Web Vitals tuning | LCP/CLS/INP within budget on throttled 4G profile |
| **9 — QA & UAT** | Cross-browser/device pass (Safari iOS is the highest-risk target for scroll-linked canvas + video), stakeholder content review | Signed off against the Figma prototype section-by-section |
| **10 — Deployment & observability** | Production Docker images, Nginx TLS, logging/monitoring, backup strategy for Postgres/media, staged rollout | Production smoke test passing, rollback path documented |

Phases 3–4 are the highest-risk, highest-effort phases and should not be compressed — this is where "looks like a video" either succeeds or becomes janky scroll-jacking.

---

## 7. Coding Standards

### 7.1 General
- **TypeScript strict mode** (`strict: true`, `noUncheckedIndexedAccess: true`) across every package; no `any` without an inline justification comment.
- Shared `tsconfig.base.json` and `eslint.config` in `packages/config`, extended (not copy-pasted) by each app.
- Prettier is the only formatting authority; no formatting debates in review.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`) — enables changelog generation and keeps CI/deploy tooling simple later.

### 7.2 React/Next.js
- Server Components by default; a component becomes a Client Component only when it needs browser APIs, animation refs, or interactivity — the boundary is marked at the leaf, not hoisted up the tree.
- One component = one responsibility. Section components (§3.2) never fetch data themselves when rendered inside a server-rendered page — data flows down as typed props from the page's server fetch.
- No inline `style={{}}` for anything animatable — GSAP targets classes/refs; Tailwind handles static styling. Mixing the two on the same property is a common source of animation bugs and is disallowed.

### 7.3 Animation-specific rules (given this project's risk profile)
- Every `gsap.context()` / `ScrollTrigger.create()` must have a matching cleanup in the component's effect return — enforced via code review checklist, not just convention.
- No animation logic in `useEffect` bodies directly inside page components — always inside the owning section component.
- Every scroll-scrubbed or pinned section must specify explicit `start`/`end` in viewport-relative units that have been tested at common breakpoints (mobile/tablet/desktop) — no "looks right on my monitor" merges.
- Any new animated section must be authored with `prefers-reduced-motion` fallback from the start, not retrofitted.

### 7.4 CMS-specific
- Every Payload field that holds editorial copy is `localized: true` by default unless there's a specific reason it shouldn't be (shared media, structural config).
- Collection/global schemas are the contract — frontend types are generated from them, never hand-duplicated.
- Access control functions live in `access/` and are unit-tested; no inline `access: () => true` in production collections without an explicit comment explaining why public write access is intended (it almost never is).

### 7.5 Testing
- Unit/component tests (Vitest + React Testing Library) for non-animated logic (data transforms, CMS client, i18n utilities).
- Playwright for critical-path e2e (navigation, ticket CTA, language switch, form submissions) — not for pixel-perfect animation assertions, which are brittle; animation correctness is verified visually per §6 phase gates.
- CI runs lint + typecheck + unit tests + build on every PR; Playwright runs against a preview deployment, not inline in the fast PR loop.

---

## 8. Docker Strategy

### 8.1 Principles
- **Multi-stage builds** for both apps: `deps` → `builder` → slim `runner` stage (Next.js `output: 'standalone'`), so production images ship only what's needed to run, not the full `node_modules`/build toolchain.
- **Environment-based configuration only** — no environment-specific code branches. A single image is built once per release and promoted through environments (dev → staging → prod) with different `.env`/secrets injected at deploy time, not rebuilt per environment.
- **Non-root containers**, pinned base image versions, `.dockerignore` covering `node_modules`, `.next`, `.git`.

### 8.2 Services (`infra/docker-compose.yml`)
| Service | Image basis | Notes |
|---|---|---|
| `web` | `apps/web/Dockerfile` (Node 20-alpine, standalone output) | Reads `PAYLOAD_API_URL` at runtime |
| `cms` | `apps/cms/Dockerfile` (Node 20-alpine) | Runs Payload's Next.js host; owns Postgres connection + media adapter config |
| `postgres` | `postgres:16-alpine` | Named volume for data; healthcheck gates `cms` startup |
| `nginx` | `nginx:alpine` | Mounts `infra/nginx/`, terminates TLS in staging/prod, path-routes `/admin`,`/api` → cms, else → web |

Local development adds a `docker-compose.override.yml` with bind mounts + `next dev`/Payload dev mode for hot reload, so the base compose file stays the same shape as production.

### 8.3 Environment configuration
- `.env.example` at the repo root documents every variable across both apps (DB connection string, Payload secret, media storage credentials, public site URL per locale, revalidation webhook secret) — real secrets are never committed, and staging/prod secrets are injected via the hosting platform's secret manager rather than files.
- Media storage is environment-swappable: local Docker Compose uses Payload's local-disk upload adapter for speed; staging/prod use the S3-compatible adapter pointed at Azure Blob (per the target infra roadmap) — the collection schema doesn't change, only the adapter config.

### 8.4 Path to target infra (Azure)
Docker Compose is the development and single-VM/staging deployment mechanism. The compose service boundaries (`web`, `cms`, `postgres`, `nginx`) map directly onto the eventual Azure Container Apps (or AKS) services, and the Nginx routing rules become the Container Apps ingress/AKS Ingress rules — so no re-architecture is needed when that migration happens, only a deployment-target change. Azure Blob replaces local media storage using the same adapter interface (§8.3).

---

## 9. Non-Functional Requirements & Budgets

- **Performance budget:** LCP < 2.5s, CLS < 0.1, INP < 200ms on a throttled mid-tier mobile profile, even with the hero circle-reveal in play (the hero's *first paint* must not wait on the animation library).
- **Accessibility:** WCAG 2.1 AA; every scroll-driven section has a non-animated, fully navigable equivalent for keyboard/screen-reader users and for `prefers-reduced-motion`.
- **SEO:** Because content is heavy on scroll-linked visuals, all editorial text (titles, exhibition descriptions, dates) must be present in server-rendered HTML — animations layer on top, they never gate content visibility to crawlers.
- **Media weight:** Explicit per-page budget for total image-sequence + video weight (to be set after Phase 4 prototyping against real assets); enforced via a CI bundle/asset-size check, not left to review discretion.

---

## 10. Open Items to Confirm Before Phase 0

1. **Ticketing**: is "Book Tickets" a real transactional flow to build, or a redirect/embed of an existing government ticketing system? This materially changes Phase 7 scope.
2. **Shop**: in-scope for this build, or an external commerce redirect?
3. **Content source-of-truth for launch**: is real exhibition/artifact content (copy, archival photography, image-sequence source video) available, or does Phase 1 need placeholder/lorem content (as seen in the prototype) until content team delivery?
4. **Hosting target for v1**: the brief lists Azure Container Apps/AKS/Blob as "later" — confirm what v1 actually deploys to (single VM with Docker Compose? Azure App Service? Container Apps from day one?) since this affects how much of §8.4 to build now versus defer.
5. **Analytics/consent**: any requirement for a cookie-consent banner (likely yes, for a UAE government site) — affects the app shell in Phase 2.

---

*This document is the reference baseline for Phases 0–10. It should be updated (not left stale) as decisions in §10 are resolved and as real content/assets replace the prototype's placeholders.*
