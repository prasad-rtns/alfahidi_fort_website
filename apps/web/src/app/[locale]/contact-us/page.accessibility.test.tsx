import axe from "axe-core";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactUsPage from "@/app/[locale]/contact-us/page";
import type { Locale } from "@/lib/content/site-content";

describe("Contact Us accessibility", () => {
  it.each(["en", "ar"] as const)("has no detectable WCAG 2.2 A/AA violations in %s", async (locale: Locale) => {
    const { container } = render(await ContactUsPage({ params: Promise.resolve({ locale }) }), {
      wrapper: ({ children }) => <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>{children}</div>
    });

    const results = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      // JSDOM has no canvas layout, so contrast is checked in the browser review.
      rules: { "color-contrast": { enabled: false } }
    });

    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  });
});
