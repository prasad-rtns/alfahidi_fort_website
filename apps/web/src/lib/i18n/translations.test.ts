import { describe, expect, it } from "vitest";
import { getTranslations, translations } from "@/lib/i18n/translations";
import contactAr from "@/content/contact/ar.json";
import contactEn from "@/content/contact/en.json";
import commonAr from "@/content/common/ar.json";
import commonEn from "@/content/common/en.json";
import homeAr from "@/content/home/ar.json";
import homeEn from "@/content/home/en.json";
import faqAr from "@/content/faq/ar.json";
import faqEn from "@/content/faq/en.json";
import experienceAr from "@/content/experience/ar.json";
import experienceEn from "@/content/experience/en.json";
import planVisitAr from "@/content/plan-visit/ar.json";
import planVisitEn from "@/content/plan-visit/en.json";

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
    expect(translations.en.faq).toBe(faqEn);
    expect(translations.ar.faq).toBe(faqAr);
    expect(Object.keys(faqAr)).toEqual(Object.keys(faqEn));
    expect(translations.en.header).toBe(commonEn.header);
    expect(translations.ar.footer).toBe(commonAr.footer);
    expect(Object.keys(commonAr.header)).toEqual(Object.keys(commonEn.header));
    expect(Object.keys(commonAr.footer)).toEqual(Object.keys(commonEn.footer));
    expect(translations.en.contact).toBe(contactEn);
    expect(translations.ar.contact).toBe(contactAr);
    expect(Object.keys(contactAr)).toEqual(Object.keys(contactEn));
    expect(translations.en.homeSequence).toBe(homeEn);
    expect(translations.ar.homeSequence).toBe(homeAr);
    expect(Object.keys(homeAr)).toEqual(Object.keys(homeEn));
    expect(homeAr.stories).toHaveLength(homeEn.stories.length);
    homeAr.stories.forEach((story, index) => expect(Object.keys(story)).toEqual(Object.keys(homeEn.stories[index]!)));
    expect(translations.en.experience).toBe(experienceEn);
    expect(translations.ar.experience).toBe(experienceAr);
    expect(Object.keys(experienceAr)).toEqual(Object.keys(experienceEn));
    expect(experienceAr.galleries).toHaveLength(experienceEn.galleries.length);
    expect(translations.en.planVisit).toBe(planVisitEn);
    expect(translations.ar.planVisit).toBe(planVisitAr);
    expect(Object.keys(planVisitAr)).toEqual(Object.keys(planVisitEn));
    expect(planVisitAr.transport).toHaveLength(planVisitEn.transport.length);
    expect(planVisitAr.guidelines).toHaveLength(planVisitEn.guidelines.length);
    expect(planVisitAr.prices).toHaveLength(planVisitEn.prices.length);
  });
});
