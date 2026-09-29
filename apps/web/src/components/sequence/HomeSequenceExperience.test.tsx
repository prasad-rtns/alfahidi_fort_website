import axe from "axe-core";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { HomeSequenceExperience } from "@/components/sequence/HomeSequenceExperience";
import { getTranslations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/content/site-content";

describe("Home landing content", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it.each(["en", "ar"] as const)("renders editable %s JSON copy in document direction", async (locale: Locale) => {
    const copy = getTranslations(locale).homeSequence;
    document.body.innerHTML = `<div lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">${renderToStaticMarkup(<HomeSequenceExperience locale={locale} />)}</div>`;

    expect(document.querySelector("[dir]")?.getAttribute("dir")).toBe(locale === "ar" ? "rtl" : "ltr");
    expect(document.querySelector("h1")?.textContent).toBe(copy.heroTitle);
    for (const title of [copy.discoverTitle, copy.landmarkTitle, ...copy.stories.map((story) => story.title), copy.oldestTitle, copy.artefactTitle, copy.collectionsTitle, copy.sharedMemoryTitle]) {
      expect(Array.from(document.querySelectorAll("h2, h3")).some((heading) => heading.textContent === title)).toBe(true);
    }
    expect(document.querySelector("#explore")?.textContent).toContain(copy.landmarkDescription);

    const results = await axe.run(document.body, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      rules: { "color-contrast": { enabled: false } }
    });
    expect(results.violations.map(({ id }) => id)).toEqual([]);
  });
});
