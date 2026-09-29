import type { Locale } from "@/lib/content/site-content";
import ar from "@/content/common/ar.json";
import en from "@/content/common/en.json";
import contactAr from "@/content/contact/ar.json";
import contactEn from "@/content/contact/en.json";
import faqAr from "@/content/faq/ar.json";
import faqEn from "@/content/faq/en.json";
import homeAr from "@/content/home/ar.json";
import homeEn from "@/content/home/en.json";
import experienceAr from "@/content/experience/ar.json";
import experienceEn from "@/content/experience/en.json";
import planVisitAr from "@/content/plan-visit/ar.json";
import planVisitEn from "@/content/plan-visit/en.json";

export const translations = {
  en: { ...en, contact: contactEn, faq: faqEn, homeSequence: homeEn, experience: experienceEn, planVisit: planVisitEn },
  ar: { ...ar, contact: contactAr, faq: faqAr, homeSequence: homeAr, experience: experienceAr, planVisit: planVisitAr }
} as const;

export type HomeSequenceTranslation = typeof homeEn;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
