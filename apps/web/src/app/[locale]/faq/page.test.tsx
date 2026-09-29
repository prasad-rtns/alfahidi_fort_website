import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FaqPage, { generateMetadata } from "@/app/[locale]/faq/page";
import { getTranslations } from "@/lib/i18n/translations";

describe("FaqPage", () => {
  it.each(["en", "ar"] as const)("gives the %s FAQ page its own localized title", async (locale) => {
    const t = getTranslations(locale).faq;
    expect(await generateMetadata({ params: Promise.resolve({ locale }) })).toMatchObject({
      title: t.title,
      alternates: { canonical: `http://localhost:3000/${locale}/faq` }
    });
  });

  it("renders the English FAQ page from translations", async () => {
    const t = getTranslations("en").faq;

    render(await FaqPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(t.introFirst)).toBeInTheDocument();
    expect(screen.getByText(t.introSecond)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.contactUs })).toHaveAttribute("href", "/en/contact-us");
    expect(screen.getByRole("button", { name: t.items[0]!.question })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(t.items[0]!.answer)).toBeInTheDocument();
  });

  it("renders the Arabic FAQ page from translations", async () => {
    const t = getTranslations("ar").faq;

    render(await FaqPage({ params: Promise.resolve({ locale: "ar" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.introFirst)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.contactUs })).toHaveAttribute("href", "/ar/contact-us");
    expect(screen.getByRole("button", { name: t.items[0]!.question })).toBeInTheDocument();
  });
});
