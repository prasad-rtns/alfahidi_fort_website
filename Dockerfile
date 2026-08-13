ARG NODE_IMAGE=node:24-alpine
FROM ${NODE_IMAGE} AS base
WORKDIR /app
ARG APP_BASE_PATH=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --include=dev
RUN cp -R apps/web/node_modules/caniuse-lite node_modules/caniuse-lite

FROM deps AS builder
COPY . .
ARG APP_BASE_PATH=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH
RUN npm run build:web

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ARG APP_BASE_PATH=""
ENV APP_BASE_PATH=$APP_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$APP_BASE_PATH
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
RUN chown -R nextjs:nextjs /app
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD base_path="${APP_BASE_PATH:-}"; if [ -n "$base_path" ] && [ "$base_path" != "/" ]; then base_path="/${base_path#/}"; base_path="${base_path%/}"; else base_path=""; fi; wget -qO- "http://127.0.0.1:3000${base_path}/en" >/dev/null || exit 1
CMD ["node", "apps/web/server.js"]
