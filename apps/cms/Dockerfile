FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
COPY apps/cms/package.json apps/cms/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN npm install --include=dev

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:cms

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3001
RUN addgroup -S payload && adduser -S payload -G payload
COPY --from=builder /app/apps/cms/.next/standalone ./
COPY --from=builder /app/apps/cms/.next/static ./apps/cms/.next/static
COPY --from=builder /app/apps/cms/public ./apps/cms/public
RUN chown -R payload:payload /app
USER payload
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 CMD wget -qO- http://127.0.0.1:3001/health >/dev/null || exit 1
CMD ["node", "apps/cms/server.js"]
