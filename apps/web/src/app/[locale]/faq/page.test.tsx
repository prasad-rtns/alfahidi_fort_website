import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FaqPage from "@/app/[locale]/faq/page";
import { getTranslations } from "@/lib/i18n/translations";

describe("FaqPage", () => {
  it("renders the English FAQ page from translations", async () => {
    const t = getTranslations("en").faq;

    render(await FaqPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.guide)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.information, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.items[0].question })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(t.items[0].answer)).toBeInTheDocument();
  });

  it("renders the Arabic FAQ page from translations", async () => {
    const t = getTranslations("ar").faq;

    render(await FaqPage({ params: Promise.resolve({ locale: "ar" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.guide)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.items[0].question })).toBeInTheDocument();
  });
});
