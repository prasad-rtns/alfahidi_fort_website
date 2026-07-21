# Al Fahidi Fort Interactive Website - Phase 0 Architecture

## Target

Build a production-grade tourism and museum storytelling website that closely follows the supplied Al Fahidi Fort prototype: cinematic scroll, circular and arch image masks, animated connector lines, parallax, zoom transitions, image-sequence style movement, and smooth page choreography.

## System Architecture

- `apps/web`: Next.js 15 App Router public site, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, Lenis, and optional Three.js for explicit artifact experiences.
- `apps/cms`: Payload CMS application backed by PostgreSQL. It owns editorial content, media, localization, navigation, announcements, and publishing workflows.
- `packages/shared-types`: shared DTOs and generated Payload types consumed by the web app.
- `infra`: Docker Compose, Nginx reverse proxy, and Postgres initialization.

Nginx is the single ingress. `/admin` and `/api` route to Payload; all public routes route to Next.js web. The web app fetches content from Payload APIs and never connects to PostgreSQL directly.

## Frontend Standards

- Server-render content first, enhance with client-side GSAP animations after hydration.
- One Lenis instance at the root, synchronized with `ScrollTrigger.update`.
- One `gsap.context()` per animated component and always clean up with `ctx.revert()`.
- Respect `prefers-reduced-motion`; content must remain readable without scroll animation.
- Use CSS transforms and opacity for motion. Avoid animating layout properties.
- Keep section components reusable and map them to Payload blocks.
- Use logical CSS where possible so Arabic RTL can be supported cleanly.

## CMS Model

Collections:

- `pages`: localized title, slug, ordered block layout, SEO.
- `exhibitions`: exhibition cards and detail pages.
- `artifacts`: museum objects and future 3D/media metadata.
- `events`: What's On calendar entries.
- `media`: images, sequence frames, transition videos.
- `users`: admin/editor accounts.

Globals:

- `siteSettings`
- `header`
- `announcementTicker`
- `footer`

Blocks:

- `heroCircleReveal`
- `storySplitMedia`
- `exhibitionCardGrid`
- `connectedDetailPair`
- `imageSequence`
- `videoTransition`
- `richText`
- `ctaBanner`

## Folder Structure

```text
apps/
  web/
    src/app/[locale]/
    src/components/chrome/
    src/components/sections/
    src/components/ui/
    src/lib/scroll/
    src/lib/content/
    src/animations/
    public/assets/home/
  cms/
    src/collections/
    src/globals/
    src/blocks/
    src/access/
    src/hooks/
packages/
  shared-types/
infra/
  nginx/
  postgres/
```

## Development Phases

1. Foundations: monorepo, Next.js app, Payload scaffold, Docker/Nginx/Postgres.
2. App shell: header, ticker, social rail, footer, typography, masks.
3. Animation core: Lenis provider, GSAP setup, reduced motion, reusable scroll helpers.
4. Prototype sections: hero circle reveal, story split, exhibition cards, connected detail pair.
5. Media systems: image sequence canvas and video transition players.
6. CMS wiring: replace fixture content with Payload REST data and publish revalidation.
7. Localization: Arabic content, RTL layout, mirrored animation offsets.
8. Performance and QA: Lighthouse, Core Web Vitals, Safari/iOS scroll tests.
9. Production: hardened Docker images, Nginx caching, backups, monitoring.

## Docker Strategy

- Multi-stage Dockerfiles for `web` and `cms`.
- Node 22 Alpine runtime with a non-root user.
- PostgreSQL service with named volume.
- Nginx service for route splitting and static asset cache headers.
- Environment values are read from `.env`; defaults are documented in `.env.example`.
- Local development can run either `npm run dev:web` directly or `docker compose -f infra/docker-compose.yml up --build`.
