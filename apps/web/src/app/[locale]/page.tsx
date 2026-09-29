import type { Metadata } from "next";
import { HomeSequenceExperience } from "@/components/sequence/HomeSequenceExperience";
import type { Locale } from "@/lib/content/site-content";
import { getTranslations } from "@/lib/i18n/translations";
import { buildPageMetadata, summarize } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const translations = getTranslations(locale);
  return buildPageMetadata({ locale, pagePath: "", title: translations.meta.siteName, description: summarize(translations.homeSequence.heroDescription) });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <HomeSequenceExperience locale={locale} />;
}
