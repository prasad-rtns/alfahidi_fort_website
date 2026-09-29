import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/content/site-content";
import { getTranslations } from "@/lib/i18n/translations";

const FALLBACK_SITE_URL = "http://localhost:3000";

/** Public origin including any base path, without a trailing slash (e.g. https://example.ae/alfahidifort). */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configured || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Trims copy to a search-result friendly length on a word boundary. */
export function summarize(text: string, maxLength = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;

  const cut = clean.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}…`;
}

/** Path of a page below the locale segment, e.g. "" for home or "/faq". */
export type PagePath = "" | `/${string}`;

export function localizedAlternates(locale: Locale, pagePath: PagePath) {
  return {
    canonical: absoluteUrl(`/${locale}${pagePath}`),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, absoluteUrl(`/${code}${pagePath}`)])),
      "x-default": absoluteUrl(`/en${pagePath}`)
    }
  };
}

export function buildPageMetadata({
  locale,
  pagePath,
  title,
  description
}: {
  locale: Locale;
  pagePath: PagePath;
  title: string;
  description: string;
}): Metadata {
  const { siteName } = getTranslations(locale).meta;
  const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;

  return {
    title: title === siteName ? { absolute: siteName } : title,
    description,
    alternates: localizedAlternates(locale, pagePath),
    openGraph: {
      type: "website",
      siteName,
      title: fullTitle,
      description,
      url: absoluteUrl(`/${locale}${pagePath}`),
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? ["en_AE"] : ["ar_AE"],
      images: [{ url: absoluteUrl("/og/al-fahidi-fort.jpg"), width: 1200, height: 630, alt: siteName }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/og/al-fahidi-fort.jpg")]
    }
  };
}
