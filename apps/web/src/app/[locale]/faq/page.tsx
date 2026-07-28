import { FaqAccordion } from "@/components/faq/faq-accordion";
import { getTranslations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/content/site-content";

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).faq;

  return (
    <main className="bg-white text-black">
      <section className="relative flex h-[440px] items-center justify-center overflow-hidden pt-24 text-white md:h-[480px]">
        <img src="/assets/faq/faq-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#243646]/85" />
        <h1 className="relative px-5 text-center text-[clamp(2.5rem,6vw,5.6rem)] leading-none">{t.title}</h1>
      </section>

      <section className="px-5 py-16 md:px-9 md:py-20">
        <div className="mx-auto max-w-[1368px]">
          <div>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-medium uppercase tracking-wide text-[#7a5135]">{t.guide}</p>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.125rem)] leading-tight">{t.information}</h2>
          </div>

          <FaqAccordion items={t.items} />
        </div>
      </section>
    </main>
  );
}
