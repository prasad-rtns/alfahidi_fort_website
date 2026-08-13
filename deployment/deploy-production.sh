#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

REMOTE_USER="${REMOTE_USER:-svcadm}"
REMOTE_HOST="${SERVER_HOST:-}"
REMOTE_DIR="${REMOTE_DIR:-/tmp/alfahidi-fort-website}"
REMOTE_IMAGE_DIR="$REMOTE_DIR/images"

STACK_NAME="${STACK_NAME:-alfahidi-fort}"
SERVICE_NAME="${SERVICE_NAME:-web}"
PUBLISHED_PORT="${WEB_PORT:-3111}"
CONTAINER_PORT="${CONTAINER_PORT:-3000}"
REPLICAS="${REPLICAS:-1}"
APP_BASE_PATH="${APP_BASE_PATH:-/alfahidifort}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-}"
PLACEMENT_CONSTRAINT="${PLACEMENT_CONSTRAINT:-node.role == manager}"
ROLLOUT_TIMEOUT="${ROLLOUT_TIMEOUT:-240}"
WARM_CACHE="${WARM_CACHE:-true}"
WARM_CACHE_LIMIT="${WARM_CACHE_LIMIT:-80}"

IMAGE_REPOSITORY="${IMAGE_REPOSITORY:-alfahidi-fort-website}"
IMAGE_TAG="${IMAGE_TAG:-$(date +%Y%m%d%H%M%S)}"
IMAGE_NAME="${IMAGE_NAME:-${IMAGE_REPOSITORY}:${IMAGE_TAG}}"
NODE_IMAGE="${NODE_IMAGE:-node:24-alpine}"
EXPORT_DIR="${EXPORT_DIR:-$PROJECT_DIR/deployment/.artifacts}"

usage() {
  cat <<'USAGE'
Usage:
  bash ./deployment/deploy-production.sh --host <server-ip>

Required:
  --host, SERVER_HOST       Docker Swarm manager host/IP.

Options:
  --user                   SSH user. Default: svcadm
  --port                   Published host port. Default: 3111
  --stack                  Docker stack name. Default: alfahidi-fort
  --service                Service name inside the stack. Default: web
  --image                  Full image name to build and deploy. Default: alfahidi-fort-website:<timestamp>
  --node-image             Docker base image used for build/runtime. Default: node:24-alpine
  --replicas               Swarm replicas. Default: 1
  --site-url               NEXT_PUBLIC_SITE_URL value. Default: http://<server-host><base-path>
  --base-path              Application base path. Default: /alfahidifort
  --remote-dir             Remote temporary deployment folder. Default: /tmp/alfahidi-fort-website
  --placement-constraint   Swarm placement constraint. Default: node.role == manager
  --rollout-timeout        Seconds to wait for Swarm tasks and HTTP health. Default: 240
  --warm-cache             Warm page and image cache after deployment. Default: true
  --warm-cache-limit       Maximum image optimizer URLs to warm. Default: 80
  -h, --help               Show help.

Examples:
  bash ./deployment/deploy-production.sh --host 172.20.104.100
  SERVER_HOST=172.20.104.100 WEB_PORT=3111 bash ./deployment/deploy-production.sh
  bash ./deployment/deploy-production.sh --host 172.20.104.100 --image alfahidi-fort-website:20260813-1

Notes:
  This script transfers the Docker image as a tar.gz over SSH and loads it on the target Swarm manager.
  With the default placement constraint, the service runs on the manager node where the image is loaded.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --host|--server-host)
      REMOTE_HOST="${2:-}"
      shift 2
      ;;
    --user)
      REMOTE_USER="${2:-}"
      shift 2
      ;;
    --port|--web-port)
      PUBLISHED_PORT="${2:-}"
      shift 2
      ;;
    --stack)
      STACK_NAME="${2:-}"
      shift 2
      ;;
    --service)
      SERVICE_NAME="${2:-}"
      shift 2
      ;;
    --image)
      IMAGE_NAME="${2:-}"
      shift 2
      ;;
    --node-image)
      NODE_IMAGE="${2:-}"
      shift 2
      ;;
    --replicas)
      REPLICAS="${2:-}"
      shift 2
      ;;
    --site-url)
      NEXT_PUBLIC_SITE_URL="${2:-}"
      shift 2
      ;;
    --base-path)
      APP_BASE_PATH="${2:-}"
      shift 2
      ;;
    --remote-dir)
      REMOTE_DIR="${2:-}"
      REMOTE_IMAGE_DIR="$REMOTE_DIR/images"
      shift 2
      ;;
    --placement-constraint)
      PLACEMENT_CONSTRAINT="${2:-}"
      shift 2
      ;;
    --rollout-timeout)
      ROLLOUT_TIMEOUT="${2:-}"
      shift 2
      ;;
    --warm-cache)
      WARM_CACHE="${2:-}"
      shift 2
      ;;
    --warm-cache-limit)
      WARM_CACHE_LIMIT="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      usage
      exit 1
      ;;
  esac
done

normalize_base_path() {
  local value="${1:-}"
  if [ -z "$value" ] || [ "$value" = "/" ]; then
    printf ''
    return
  fi

  value="/${value#/}"
  value="${value%/}"
  printf '%s' "$value"
}

APP_BASE_PATH="$(normalize_base_path "$APP_BASE_PATH")"

if [ -z "$REMOTE_HOST" ]; then
  echo "Missing required server host. Pass --host <ip> or set SERVER_HOST."
  usage
  exit 1
fi

if [ -z "$NEXT_PUBLIC_SITE_URL" ]; then
  NEXT_PUBLIC_SITE_URL="http://${REMOTE_HOST}${APP_BASE_PATH}"
fi

command -v docker >/dev/null 2>&1 || {
  echo "docker is required locally."
  exit 1
}

command -v ssh >/dev/null 2>&1 || {
  echo "ssh is required locally."
  exit 1
}

command -v scp >/dev/null 2>&1 || {
  echo "scp is required locally."
  exit 1
}

cd "$PROJECT_DIR"

if [ ! -f "$PROJECT_DIR/Dockerfile" ]; then
  echo "Missing Dockerfile in $PROJECT_DIR"
  exit 1
fi

if [ ! -f "$PROJECT_DIR/package-lock.json" ]; then
  echo "Missing package-lock.json in $PROJECT_DIR"
  exit 1
fi

mkdir -p "$EXPORT_DIR"

image_tar_name="$(echo "$IMAGE_NAME" | tr '/:' '__').tar.gz"
image_tar_path="$EXPORT_DIR/$image_tar_name"
stack_file_path="$EXPORT_DIR/docker-stack-${STACK_NAME}.yml"

cat > "$stack_file_path" <<EOF
version: "3.8"

services:
  $SERVICE_NAME:
    image: "$IMAGE_NAME"
    environment:
      NODE_ENV: "production"
      HOSTNAME: "0.0.0.0"
      PORT: "$CONTAINER_PORT"
      APP_BASE_PATH: "$APP_BASE_PATH"
      NEXT_PUBLIC_BASE_PATH: "$APP_BASE_PATH"
      NEXT_PUBLIC_SITE_URL: "$NEXT_PUBLIC_SITE_URL"
    ports:
      - target: $CONTAINER_PORT
        published: $PUBLISHED_PORT
        protocol: tcp
        mode: ingress
    deploy:
      replicas: $REPLICAS
      placement:
        constraints:
          - "$PLACEMENT_CONSTRAINT"
      update_config:
        order: start-first
        parallelism: 1
        delay: 10s
        failure_action: rollback
      rollback_config:
        order: stop-first
      restart_policy:
        condition: any
        delay: 5s
        max_attempts: 3
        window: 60s
EOF

echo "Deployment target:"
echo "  Host:       $REMOTE_USER@$REMOTE_HOST"
echo "  Stack:      $STACK_NAME"
echo "  Service:    ${STACK_NAME}_${SERVICE_NAME}"
echo "  Image:      $IMAGE_NAME"
echo "  Node image: $NODE_IMAGE"
echo "  Swarm port: $PUBLISHED_PORT -> $CONTAINER_PORT"
echo "  Base path:  $APP_BASE_PATH"
echo "  Site URL:   $NEXT_PUBLIC_SITE_URL"
echo "  Constraint: $PLACEMENT_CONSTRAINT"
echo "  Timeout:    ${ROLLOUT_TIMEOUT}s"
echo "  Warm cache: $WARM_CACHE"

echo ""
echo "Building Docker image locally..."
# Keep the Docker build arg slashless so Git Bash/MSYS does not rewrite it as a Windows path.
DOCKER_BUILD_APP_BASE_PATH="${APP_BASE_PATH#/}"
docker build --build-arg NODE_IMAGE="$NODE_IMAGE" --build-arg APP_BASE_PATH="$DOCKER_BUILD_APP_BASE_PATH" -t "$IMAGE_NAME" "$PROJECT_DIR"

echo ""
echo "Saving image to $image_tar_path..."
docker save "$IMAGE_NAME" | gzip -c > "$image_tar_path"

echo ""
echo "Preparing remote deployment folder..."
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p '$REMOTE_IMAGE_DIR'"

echo "Copying image and stack file to remote host..."
scp "$image_tar_path" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_IMAGE_DIR/"
scp "$stack_file_path" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/docker-stack.yml"

echo ""
echo "Deploying on remote Swarm manager..."
ssh "$REMOTE_USER@$REMOTE_HOST" "REMOTE_DIR='$REMOTE_DIR' REMOTE_IMAGE_DIR='$REMOTE_IMAGE_DIR' STACK_NAME='$STACK_NAME' SERVICE_NAME='$SERVICE_NAME' IMAGE_TAR='$image_tar_name' PUBLISHED_PORT='$PUBLISHED_PORT' CONTAINER_PORT='$CONTAINER_PORT' APP_BASE_PATH='$APP_BASE_PATH' REPLICAS='$REPLICAS' ROLLOUT_TIMEOUT='$ROLLOUT_TIMEOUT' WARM_CACHE='$WARM_CACHE' WARM_CACHE_LIMIT='$WARM_CACHE_LIMIT' bash -s" <<'EOF'
set -euo pipefail

DOCKER="docker"
if ! docker info >/dev/null 2>&1; then
  DOCKER="sudo -E docker"
fi

if ! $DOCKER info >/dev/null 2>&1; then
  echo "Docker is not available for the current SSH user and sudo fallback failed."
  exit 1
fi

if ! $DOCKER info --format '{{.Swarm.LocalNodeState}}' | grep -qi active; then
  echo "Docker Swarm is not active on this server."
  echo "Initialize or join Swarm before deploying."
  exit 1
fi

cd "$REMOTE_DIR"

full_service="${STACK_NAME}_${SERVICE_NAME}"

echo "Loading image: $REMOTE_IMAGE_DIR/$IMAGE_TAR"
gzip -dc "$REMOTE_IMAGE_DIR/$IMAGE_TAR" | $DOCKER load

echo "Validating rendered stack..."
$DOCKER stack config --compose-file docker-stack.yml > rendered-stack.yml
grep -E '^[[:space:]]+image:' rendered-stack.yml || true

service_existed=0
if $DOCKER service inspect "$full_service" >/dev/null 2>&1; then
  service_existed=1
fi

echo "Deploying stack: $STACK_NAME"
$DOCKER stack deploy --resolve-image never --compose-file docker-stack.yml "$STACK_NAME"

for attempt in $(seq 1 30); do
  if $DOCKER service inspect "$full_service" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

if ! $DOCKER service inspect "$full_service" >/dev/null 2>&1; then
  echo "Service was not created: $full_service"
  exit 1
fi

if [ "$service_existed" -eq 1 ]; then
  echo "Forcing service refresh so reused image tags are redeployed..."
  $DOCKER service update --detach=true --force "$full_service" >/dev/null
fi

echo "Waiting for service tasks to run: $full_service"
deadline=$((SECONDS + ROLLOUT_TIMEOUT))
running_tasks=0
while [ "$SECONDS" -lt "$deadline" ]; do
  running_tasks="$($DOCKER service ps "$full_service" --filter desired-state=running --format '{{.CurrentState}}' | grep -c '^Running' || true)"
  if [ "$running_tasks" -ge "$REPLICAS" ]; then
    break
  fi
  sleep 5
done

if [ "$running_tasks" -lt "$REPLICAS" ]; then
  echo "Timed out waiting for $REPLICAS running task(s). Current running tasks: $running_tasks"
  echo ""
  echo "Service tasks:"
  $DOCKER service ps "$full_service" --no-trunc || true
  echo ""
  echo "Recent service logs:"
  $DOCKER service logs --tail 120 "$full_service" || true
  exit 1
fi

echo ""
echo "Service list:"
$DOCKER stack services "$STACK_NAME"

echo ""
echo "Service tasks:"
$DOCKER service ps "$full_service" --no-trunc || true

echo ""
echo "Recent service logs:"
$DOCKER service logs --tail 80 "$full_service" || true

echo ""
echo "Checking local HTTP endpoint on the Swarm node..."
health_url="http://127.0.0.1:${PUBLISHED_PORT}${APP_BASE_PATH}/en"
deadline=$((SECONDS + ROLLOUT_TIMEOUT))
until curl -fsS "$health_url" >/dev/null; do
  if [ "$SECONDS" -ge "$deadline" ]; then
    echo "Health check failed after ${ROLLOUT_TIMEOUT}s: $health_url"
    echo ""
    echo "Service tasks:"
    $DOCKER service ps "$full_service" --no-trunc || true
    echo ""
    echo "Recent service logs:"
    $DOCKER service logs --tail 120 "$full_service" || true
    exit 1
  fi
  sleep 5
done

echo "Health check passed: $health_url"

if [ "$WARM_CACHE" = "true" ]; then
  echo ""
  echo "Warming page and image cache..."
  base_url="http://127.0.0.1:${PUBLISHED_PORT}${APP_BASE_PATH}"
  html_cache_file="$(mktemp)"
  image_cache_file="$(mktemp)"
  trap 'rm -f "$html_cache_file" "$image_cache_file"' EXIT

  for page_path in "/en" "/en/faq" "/en/contact-us"; do
    page_url="${base_url}${page_path}"
    echo "  Page: $page_url"
    if curl -fsS -H "Accept: text/html" "$page_url" >> "$html_cache_file"; then
      printf '\n' >> "$html_cache_file"
    else
      echo "  Warning: cache warm page request failed: $page_url"
    fi
  done

  grep -o "${APP_BASE_PATH}/_next/image?[^\"'<> ]*" "$html_cache_file" \
    | sed 's/&amp;/\&/g' \
    | sort -u \
    | head -n "$WARM_CACHE_LIMIT" > "$image_cache_file" || true

  warmed_images=0
  while IFS= read -r image_path; do
    [ -n "$image_path" ] || continue
    if curl -fsS -H "Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" "http://127.0.0.1:${PUBLISHED_PORT}${image_path}" >/dev/null; then
      warmed_images=$((warmed_images + 1))
    else
      echo "  Warning: cache warm image request failed: $image_path"
    fi
  done < "$image_cache_file"

  echo "Cache warm completed. Images warmed: $warmed_images"
fi

echo "Deployment completed successfully."
EOF

echo ""
echo "Production deployment completed."
echo "Open: http://$REMOTE_HOST$APP_BASE_PATH/en"
