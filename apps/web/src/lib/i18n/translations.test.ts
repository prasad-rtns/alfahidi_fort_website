import { describe, expect, it } from "vitest";
import { getTranslations, translations } from "@/lib/i18n/translations";

describe("translations", () => {
  it("returns English translations", () => {
    expect(getTranslations("en")).toBe(translations.en);
    expect(getTranslations("en").header.contactUs).toBe("Contact Us");
  });

  it("returns Arabic translations", () => {
    expect(getTranslations("ar")).toBe(translations.ar);
    expect(getTranslations("ar").header.language).toBe("English");
  });

  it("keeps shared page translation structures aligned", () => {
    expect(translations.ar.faq.items).toHaveLength(translations.en.faq.items.length);
    expect(translations.ar.contact.details).toHaveLength(translations.en.contact.details.length);
    expect(translations.ar.homeSequence.secondaryStories).toHaveLength(translations.en.homeSequence.secondaryStories.length);
  });
});
