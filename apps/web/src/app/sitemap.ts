import type { MetadataRoute } from "next";
import { locales } from "@/lib/content/site-content";
import { absoluteUrl, type PagePath } from "@/lib/seo/page-metadata";

const pages: { path: PagePath; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/plan-your-visit", priority: 0.9 },
  { path: "/experience", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/contact-us", priority: 0.6 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, absoluteUrl(`/${code}${path}`)]))
      }
    }))
  );
}
