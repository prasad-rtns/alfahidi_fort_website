import { HomeSequenceExperience } from "@/components/sequence/HomeSequenceExperience";
import type { Locale } from "@/lib/content/site-content";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <HomeSequenceExperience locale={locale} />;
}
