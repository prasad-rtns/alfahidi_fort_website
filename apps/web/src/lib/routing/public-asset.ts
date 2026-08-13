function normalizeBasePath(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "";

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.APP_BASE_PATH);

export function publicAsset(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith(basePath) || /^[a-z][a-z\d+.-]*:/i.test(path)) {
    return path;
  }

  return `${basePath}${path}`;
}
