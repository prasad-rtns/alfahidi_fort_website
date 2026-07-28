import type { Locale } from "@/lib/content/site-content";
import { ar } from "@/lib/i18n/ar";
import { en } from "@/lib/i18n/en";

export const translations = {
  en,
  ar
} as const;

export type HomeSequenceTranslation = (typeof en.homeSequence) | (typeof ar.homeSequence);

export function getTranslations(locale: Locale) {
  return translations[locale];
}
