import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactUsPage from "@/app/[locale]/contact-us/page";
import { getTranslations } from "@/lib/i18n/translations";

describe("ContactUsPage", () => {
  it("renders English contact information and Google Maps link", async () => {
    const t = getTranslations("en").contact;

    render(await ContactUsPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.guide)).toBeInTheDocument();
    expect(screen.getByText(t.inquiries)).toBeInTheDocument();
    expect(screen.getByAltText(t.mapAlt)).toHaveAttribute("src", "/assets/contact/contact-map-reference.png");
    expect(screen.getByRole("link", { name: t.openMapsLabel })).toHaveAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=Al%20Fahidi%20Fort%2C%20Dubai"
    );
    expect(screen.getByText(t.openMaps)).toBeInTheDocument();

    for (const item of t.details) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === item.value)).toBeInTheDocument();
    }
  });

  it("renders Arabic contact information", async () => {
    const t = getTranslations("ar").contact;

    render(await ContactUsPage({ params: Promise.resolve({ locale: "ar" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.guide)).toBeInTheDocument();
    expect(screen.getByText(t.details[0].label)).toBeInTheDocument();
    expect(screen.getByText(t.details[0].value)).toBeInTheDocument();
  });
});
