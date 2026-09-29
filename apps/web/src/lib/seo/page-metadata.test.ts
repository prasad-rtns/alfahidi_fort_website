import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { absoluteUrl, buildPageMetadata, getSiteUrl, localizedAlternates, summarize } from "@/lib/seo/page-metadata";

describe("page metadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the configured public URL, keeping the base path and dropping trailing slashes", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.ae/alfahidifort/");

    expect(getSiteUrl()).toBe("https://www.example.ae/alfahidifort");
    expect(absoluteUrl("en/faq")).toBe("https://www.example.ae/alfahidifort/en/faq");
  });

  it("falls back to localhost when no public URL is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");

    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("links each page to its translation and an English default", () => {
    expect(localizedAlternates("ar", "/faq")).toEqual({
      canonical: "http://localhost:3000/ar/faq",
      languages: {
        en: "http://localhost:3000/en/faq",
        ar: "http://localhost:3000/ar/faq",
        "x-default": "http://localhost:3000/en/faq"
      }
    });
  });

  it("shortens long descriptions on a word boundary", () => {
    expect(summarize("  Short   copy ")).toBe("Short copy");
    const long = "word ".repeat(60);
    const result = summarize(long, 40);
    expect(result.length).toBeLessThanOrEqual(40);
    expect(result.endsWith("word…")).toBe(true);
  });

  it("uses the bare site name as the home title and templates the others", () => {
    const home = buildPageMetadata({ locale: "en", pagePath: "", title: "Al Fahidi Fort", description: "Home" });
    expect(home.title).toEqual({ absolute: "Al Fahidi Fort" });
    expect(home.openGraph).toMatchObject({ title: "Al Fahidi Fort", locale: "en_AE", alternateLocale: ["ar_AE"] });

    const faq = buildPageMetadata({ locale: "ar", pagePath: "/faq", title: "الأسئلة الشائعة", description: "FAQ" });
    expect(faq.title).toBe("الأسئلة الشائعة");
    expect(faq.openGraph).toMatchObject({ title: "الأسئلة الشائعة | حصن الفهيدي", locale: "ar_AE" });
    expect(faq.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("lists every page in both languages in the sitemap", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(10);
    expect(entries.map((entry) => entry.url)).toContain("http://localhost:3000/ar/plan-your-visit");
    expect(entries[0]?.alternates?.languages).toEqual({ en: "http://localhost:3000/en", ar: "http://localhost:3000/ar" });
  });

  it("points crawlers at the sitemap", () => {
    expect(robots()).toMatchObject({ sitemap: "http://localhost:3000/sitemap.xml" });
  });
});
