import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactUsPage, { generateMetadata } from "@/app/[locale]/contact-us/page";
import contactAr from "@/content/contact/ar.json";
import contactEn from "@/content/contact/en.json";
import { getTranslations } from "@/lib/i18n/translations";

describe("ContactUsPage", () => {
  it("renders the new English contact layout with working destinations", async () => {
    const t = getTranslations("en").contact;
    expect(t).toBe(contactEn);
    render(await ContactUsPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.introFirst)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.getInTouch })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.followUs })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.visitUs })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.planningTitle })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.email })).toHaveAttribute("href", `mailto:${t.email}`);
    expect(screen.getByRole("link", { name: t.telephone })).toHaveAttribute("href", `tel:${t.telephone}`);
    expect(screen.getByRole("link", { name: new RegExp(t.openMapsLabel) })).toHaveAttribute("href", t.directionsUrl);
    expect(screen.getByRole("link", { name: `${t.instagramLabel}, ${t.opensInNewTab}` })).toHaveAttribute("href", t.instagramUrl);
    expect(screen.getByAltText(t.mapAlt)).toHaveAttribute("src", "/assets/contact/contact-map-reference.png");
    expect(screen.getByRole("link", { name: t.planYourVisit })).toHaveAttribute("href", "/en/plan-your-visit");
    expect(screen.getByRole("link", { name: t.faqs })).toHaveAttribute("href", "/en/faq");
  });

  it("renders localized Arabic content and links", async () => {
    const t = getTranslations("ar").contact;
    expect(t).toBe(contactAr);
    const { container } = render(await ContactUsPage({ params: Promise.resolve({ locale: "ar" }) }), { wrapper: ({ children }) => <div lang="ar" dir="rtl">{children}</div> });

    expect(container.querySelector('[lang="ar"][dir="rtl"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(t.introFirst)).toBeInTheDocument();
    expect(screen.getByText(t.addressLineOne)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.faqs })).toHaveAttribute("href", "/ar/faq");
    expect(screen.getByRole("button", { name: t.zoomIn })).toBeInTheDocument();
  });

  it("takes each page title and description from the editable JSON", async () => {
    // The layout's title template appends the localized site name ("%s | Al Fahidi Fort").
    expect(await generateMetadata({ params: Promise.resolve({ locale: "en" }) })).toMatchObject({
      title: contactEn.title,
      description: contactEn.introFirst,
      openGraph: { title: `${contactEn.title} | ${contactEn.fortName}`, locale: "en_AE" },
      alternates: { canonical: "http://localhost:3000/en/contact-us" }
    });
    expect(await generateMetadata({ params: Promise.resolve({ locale: "ar" }) })).toMatchObject({
      title: contactAr.title,
      description: contactAr.introFirst,
      openGraph: { title: `${contactAr.title} | ${contactAr.fortName}`, locale: "ar_AE" },
      alternates: { canonical: "http://localhost:3000/ar/contact-us" }
    });
  });
});
