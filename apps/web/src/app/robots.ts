import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/page-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/_next/image"] }],
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
