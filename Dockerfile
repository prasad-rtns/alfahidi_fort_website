# Base image pinned by digest (multi-arch index of node:24-alpine) for reproducible, tamper-evident
# builds. To take Node/Alpine security patches: docker pull node:24-alpine, then update the digest.
ARG NODE_IMAGE=node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1
FROM ${NODE_IMAGE} AS base
WORKDIR /app
ARG APP_BASE_PATH=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --include=dev

FROM deps AS builder
COPY . .
ARG APP_BASE_PATH=""
# Public origin including the base path, inlined into canonical/hreflang/Open Graph URLs at build time.
ARG NEXT_PUBLIC_SITE_URL=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build:web \
  && find apps/web/.next -name "*.map" -type f -delete

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ARG APP_BASE_PATH=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH
# The runtime only needs node: drop package managers to shrink the attack surface.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
    /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-* \
  && addgroup -S nextjs && adduser -S nextjs -G nextjs
# Application files stay root-owned (read-only for the runtime user); only the image cache is writable.
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
RUN mkdir -p apps/web/.next/cache && chown -R nextjs:nextjs apps/web/.next/cache
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD base_path="${APP_BASE_PATH:-}"; if [ -n "$base_path" ] && [ "$base_path" != "/" ]; then base_path="/${base_path#/}"; base_path="${base_path%/}"; else base_path=""; fi; wget -qO- "http://127.0.0.1:3000${base_path}/en" >/dev/null || exit 1
CMD ["node", "apps/web/server.js"]
