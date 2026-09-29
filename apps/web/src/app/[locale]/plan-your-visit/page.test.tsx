import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlanYourVisitPage, { generateMetadata } from "@/app/[locale]/plan-your-visit/page";
import { getTranslations } from "@/lib/i18n/translations";

describe("PlanYourVisitPage", () => {
  it.each(["en", "ar"] as const)("gives the %s page its own title and a descriptive FAQ link", async (locale) => {
    const t = getTranslations(locale).planVisit;
    expect(await generateMetadata({ params: Promise.resolve({ locale }) })).toMatchObject({ title: t.title });

    render(await PlanYourVisitPage({ params: Promise.resolve({ locale }) }));
    expect(screen.getByRole("link", { name: `${t.clickHere}: ${t.faqs}` })).toHaveAttribute("href", `/${locale}/faq`);
  });

  it.each(["en", "ar"] as const)("renders %s visit details and usable links", async (locale) => {
    const t = getTranslations(locale).planVisit;
    render(await PlanYourVisitPage({ params: Promise.resolve({ locale }) }));
    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.openingHours })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.gettingHere })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.accessibility })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.visitorInformation })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.tickets })).toBeInTheDocument();
    expect(screen.getByText(t.prices[0]!.value)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: t.bookTickets })[0]).toHaveAttribute("href", "#tickets");
    expect(screen.getAllByRole("link", { name: t.bookTickets })[1]).toHaveAttribute("href", `/${locale}/contact-us`);
    expect(screen.getAllByRole("link", { name: new RegExp(t.getDirections) })[0]).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: t.faqs })).toHaveAttribute("href", `/${locale}/faq`);
  });
});
