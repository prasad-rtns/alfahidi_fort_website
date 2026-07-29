import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/chrome/footer";
import { getTranslations } from "@/lib/i18n/translations";

describe("Footer", () => {
  it("renders localized footer content and links", () => {
    const t = getTranslations("en").footer;

    render(<Footer locale="en" />);

    expect(screen.getByText(t.stayConnected)).toBeInTheDocument();
    expect(screen.getByLabelText(t.email)).toHaveAttribute("placeholder", t.email);
    expect(screen.getByRole("button", { name: t.subscribe })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.contactUs })).toHaveAttribute("href", "/en/contact-us");
    expect(screen.getByRole("link", { name: t.faqs })).toHaveAttribute("href", "/en/faq");
    expect(screen.getByText(t.contactTel)).toBeInTheDocument();
  });

  it("uses Arabic translations when the locale is Arabic", () => {
    const t = getTranslations("ar").footer;

    render(<Footer locale="ar" />);

    expect(screen.getByText(t.stayConnected)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.contactUs })).toHaveAttribute("href", "/ar/contact-us");
  });
});
