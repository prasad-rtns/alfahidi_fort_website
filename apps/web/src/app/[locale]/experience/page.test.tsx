import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "@/app/[locale]/experience/page";
import { getTranslations } from "@/lib/i18n/translations";

describe("ExperiencePage", () => {
  it.each(["en", "ar"] as const)("renders %s gallery content and the visit route", async (locale) => {
    const t = getTranslations(locale).experience;
    render(await ExperiencePage({ params: Promise.resolve({ locale }) }));
    expect(screen.getByRole("heading", { name: t.aboutTitle, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.exploreTitle, level: 2 })).toBeInTheDocument();
    for (const gallery of t.galleries) expect(screen.getByRole("heading", { name: gallery.title, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.planYourVisit })).toHaveAttribute("href", `/${locale}/plan-your-visit`);
    expect(screen.getByAltText(t.aboutImageAlt)).toBeInTheDocument();
  });
});
