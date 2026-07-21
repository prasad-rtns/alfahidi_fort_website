import type { CmsPage } from "@/lib/cms/types";

export async function getCmsPage(slug: string, locale: string): Promise<CmsPage | null> {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001";
  const url = new URL("/api/pages/home", cmsUrl);
  url.searchParams.set("slug", slug);
  url.searchParams.set("locale", locale);

  try {
    const response = await fetch(url, {
      cache: "no-store"
    });

    if (!response.ok) return null;

    return (await response.json()) as CmsPage;
  } catch {
    return null;
  }
}

export function mediaUrl(media: { url: string | null } | null | undefined) {
  return media?.url ?? "";
}
