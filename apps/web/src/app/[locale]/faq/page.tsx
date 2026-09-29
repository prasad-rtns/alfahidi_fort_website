import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { getTranslations } from "@/lib/i18n/translations";
import { publicAsset } from "@/lib/routing/public-asset";
import type { Locale } from "@/lib/content/site-content";

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).faq;

  return (
    <main className="faq-page bg-white text-black">
      <section className="relative flex h-[416px] items-center justify-center overflow-hidden pt-24 text-white">
        <Image src={publicAsset("/assets/faq/faq-hero.png")} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#243646]/85" />
        <h1 className="relative px-5 text-center text-[clamp(2rem,5vw,3.75rem)] leading-normal">{t.title}</h1>
      </section>

      <section className="px-5 pb-28 pt-8 md:px-9" aria-labelledby="faq-intro-title">
        <div className="mx-auto max-w-[1368px]">
          <div>
            <h2 id="faq-intro-title" className="text-[clamp(2rem,4vw,3.125rem)] leading-[1.08]">{t.title}</h2>
            <p className="mt-3 text-xl leading-6">{t.introFirst}</p>
            <p className="mt-6 text-xl leading-6">{t.introSecond}</p>
            <Link href={`/${locale}/contact-us`} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#243646] px-5 py-2.5 text-lg leading-normal text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]">
              {t.contactUs}
            </Link>
          </div>

          <FaqAccordion items={t.items} />
        </div>
      </section>
    </main>
  );
}
