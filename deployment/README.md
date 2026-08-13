# Production Deployment

This folder contains a single deployment script for the Al Fahidi Fort website Docker Swarm deployment.

## Prerequisites

- Run the script from a machine with `docker`, `ssh`, and `scp`.
- SSH access to the Swarm manager must work for the target user, for example:
  ```bash
  ssh svcadm@172.20.104.100
  ```
- Docker Swarm must already be active on the target server.
- The SSH user must be able to run Docker, either directly or through passwordless `sudo docker`.

## Deploy

From the project root:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100
```

The default published URL is:

```text
http://172.20.104.100/alfahidifort/en
```

## Configurable Values

You can configure the server and deployment without editing the script:

```bash
SERVER_HOST=172.20.104.100 WEB_PORT=3111 bash ./deployment/deploy-production.sh
```

Common options:

```bash
bash ./deployment/deploy-production.sh \
  --host 172.20.104.100 \
  --user svcadm \
  --port 3111 \
  --stack alfahidi-fort \
  --rollout-timeout 240 \
  --warm-cache true \
  --node-image node:24-alpine \
  --image alfahidi-fort-website:prod-20260813
```

## Base Path Configuration

The base path is configurable through:

```text
APP_BASE_PATH
NEXT_PUBLIC_BASE_PATH
```

For production deployment, change only `APP_BASE_PATH` when running the deployment script. The script passes it into the Docker build as `NEXT_PUBLIC_BASE_PATH`.

Default production base path:

```text
/alfahidifort
```

Default local base path:

```text
empty
```

That means local development is not impacted and still runs at `/en`.

To deploy with a different base path:

```bash
APP_BASE_PATH=/museum bash ./deployment/deploy-production.sh --host 172.20.104.100
```

To deploy without any base path:

```bash
APP_BASE_PATH= bash ./deployment/deploy-production.sh --host 172.20.104.100
```

Important: the Next.js base path is a build-time setting. After changing `APP_BASE_PATH`, rebuild and redeploy the image with the deployment script.

The Swarm service listens internally through the published port `3111`, and Nginx exposes it publicly under the configured base path.

### Git Bash Build Note

When running from Git Bash on Windows, values that start with `/` can be converted before Docker receives them. The deployment script avoids that by passing the build-time base path without the leading slash; the app normalizes it back to `/alfahidifort` during the Next.js build.

If you run a manual Docker build from Git Bash, use:

```bash
docker build --build-arg APP_BASE_PATH=alfahidifort -t alfahidi-fort-website:test .
```

Without this guard, Next.js can fail during `next build` with:

```text
TypeError: Missing parameter name at 2
```

### Docker Hub DNS Or Proxy Issue

If the build fails while loading metadata for `node:24-alpine`, the app build has not started yet. Docker cannot reach Docker Hub:

```text
failed to resolve source metadata for docker.io/library/node:24-alpine
lookup registry-1.docker.io: no such host
```

First check Docker Hub/DNS from the local build machine:

```bash
docker pull node:24-alpine
```

If Docker Desktop has no Internet/DNS/proxy access but another Node Alpine image is already cached locally, use it temporarily. This is only a workaround while Docker Hub access is down:

```bash
docker images node
bash ./deployment/deploy-production.sh --host 172.20.104.100 --node-image node:20-alpine
```

Equivalent environment variable:

```bash
NODE_IMAGE=node:20-alpine bash ./deployment/deploy-production.sh --host 172.20.104.100
```

After Docker Hub access is restored, return to the default:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100 --node-image node:24-alpine
```

### Files That Use This Setting

- [apps/web/next.config.ts](../apps/web/next.config.ts): reads `NEXT_PUBLIC_BASE_PATH` or `APP_BASE_PATH` and applies Next.js `basePath`.
- [Dockerfile](../Dockerfile): accepts `APP_BASE_PATH` as a Docker build argument and uses it in the healthcheck.
- [docker-compose.yml](../docker-compose.yml): passes `APP_BASE_PATH` for local Docker when needed.
- [deployment/deploy-production.sh](./deploy-production.sh): defaults `APP_BASE_PATH` to `/alfahidifort` for production and passes it to Docker build and Swarm.
- Nginx config: must match the same public path, for example `/alfahidifort/`.

## Local Development

No change is needed for local development:

```bash
npm run dev
```

Local URL remains:

```text
http://localhost:3001/en
```

For local Docker without a base path:

```bash
docker compose up -d --build web
```

Local Docker URL remains:

```text
http://localhost:3111/en
```

For local Docker with the production-style base path:

```bash
APP_BASE_PATH=/alfahidifort NEXT_PUBLIC_SITE_URL=http://localhost:3111/alfahidifort docker compose up -d --build web
```

Then open:

```text
http://localhost:3111/alfahidifort/en
```

## Nginx Reverse Proxy

Add this block inside the existing `server { ... }` in `/etc/nginx/sites-available/flutter-app`, above the current `location / { ... }` block:

```nginx
# Al Fahidi Fort Next.js app
location = /alfahidifort {
    return 301 /alfahidifort/en;
}

location /alfahidifort/ {
    proxy_pass http://127.0.0.1:3111;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Prefix /alfahidifort;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

Validate and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Public URL:

```text
http://172.20.104.100/alfahidifort/en
```

## What The Script Does

1. Builds the Docker image locally.
2. Saves the image as `deployment/.artifacts/*.tar.gz`.
3. Copies the image and generated Swarm stack file to the target server.
4. Loads the image on the Swarm manager.
5. Deploys the stack with `docker stack deploy`.
6. Waits until the Swarm service has running tasks.
7. Verifies `http://127.0.0.1:3111/alfahidifort/en` on the target server.
8. Warms the Home, FAQ, Contact Us, and image optimizer cache so the first browser request after deployment is faster.

## First Load Performance

The deployment script warms the page and image cache by default after a successful rollout. This avoids the first real user paying the cost of generating `/_next/image` responses.

Default:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100
```

Increase the number of generated image URLs to warm:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100 --warm-cache-limit 120
```

Disable cache warming when needed:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100 --warm-cache false
```

The app also sends long-lived cache headers for `/assets/*`, and Next.js image optimizer output is configured with a long cache TTL.

## If The Service Is Still Preparing

If `docker stack services alfahidi-fort` shows `0/1` and `docker service ps alfahidi-fort_web` shows `Preparing`, Swarm has not started the container yet and port `3111` may not be listening. The deployment script waits up to `240` seconds by default.

To give a slower server more time:

```bash
bash ./deployment/deploy-production.sh --host 172.20.104.100 --rollout-timeout 420
```

To inspect the current deployment manually:

```bash
ssh svcadm@172.20.104.100
docker stack services alfahidi-fort
docker service ps alfahidi-fort_web --no-trunc
docker service logs --tail 120 alfahidi-fort_web
```

## Stopped Task History

Rows shown as `Shutdown` in this command are old Swarm task history, not extra running services:

```bash
docker service ps alfahidi-fort_web --no-trunc
```

They do not receive traffic and normally do not need to be removed. To show only the current running task:

```bash
docker service ps alfahidi-fort_web --filter desired-state=running --no-trunc
```

To reduce how many old `Shutdown` tasks Swarm keeps, update the Swarm task history limit. This is a cluster-level setting:

```bash
docker swarm update --task-history-limit 2
```

Verify:

```bash
docker info --format '{{.Swarm.Cluster.Spec.TaskHistoryRetentionLimit}}'
docker service ps alfahidi-fort_web --no-trunc
```

Old Docker images from earlier deployments are separate from Swarm task history. After confirming the new image is running, list older app images:

```bash
docker images 'alfahidi-fort-website'
```

Remove only images that are no longer used by any running service:

```bash
docker image rm alfahidi-fort-website:20260813035024
```

If Docker reports that a container is still using the old image:

```text
conflict: unable to delete alfahidi-fort-website:<tag> (must be forced) - container <container-id> is using its referenced image
```

Check whether that container is stopped or running:

```bash
docker ps -a --filter id=<container-id>
```

If the container status is `Exited` or `Created`, remove the stopped container first, then remove the image:

```bash
docker rm <container-id>
docker image rm alfahidi-fort-website:<tag>
```

Example:

```bash
docker rm 72fc5947a4b2
docker image rm alfahidi-fort-website:20260813035024
```

To remove all stopped containers safely:

```bash
docker container prune
```

Then retry:

```bash
docker image rm alfahidi-fort-website:20260813035024
```

If the container status is `Up`, do not remove it. First confirm whether the old image is still serving traffic:

```bash
docker ps --filter ancestor=alfahidi-fort-website:20260813035024
docker service ps alfahidi-fort_web --no-trunc
```

## Scale Replicas Without Replacing The Image

SSH into the Swarm manager:

```bash
ssh svcadm@172.20.104.100
```

Check the current service name and replica count:

```bash
docker stack services alfahidi-fort
```

Scale the running service in place, for example to 2 replicas:

```bash
docker service scale alfahidi-fort_web=2
```

Equivalent command:

```bash
docker service update --replicas 2 alfahidi-fort_web
```

Verify rollout status:

```bash
docker service ps alfahidi-fort_web --no-trunc
docker service logs --tail 80 alfahidi-fort_web
```

This does not build or replace the currently deployed image. Docker Swarm only starts additional tasks using the same image already configured on the service.

## Important Note For Multi-Node Swarm

This script transfers the image directly to the Swarm manager instead of pushing to a registry. By default, the service is constrained to the manager node:

```text
node.role == manager
```

For multi-node production with replicas on workers, push the image to a registry or load the image on every worker, then override placement as needed.
