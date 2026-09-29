import Image from "next/image";
import Link from "next/link";
import { ExperiencePopImage } from "@/components/experience/experience-pop-image";
import { getTranslations } from "@/lib/i18n/translations";
import { publicAsset } from "@/lib/routing/public-asset";
import type { Locale } from "@/lib/content/site-content";

const galleryImages = ["b252e.png", "bc861.webp", "2cf0b.webp", "c0de3.webp"] as const;

export default async function ExperiencePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).experience;

  return (
    <main className="experience-page bg-white pt-24 text-[#3e332e]">
      <section className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-6 py-8 md:px-9 lg:grid-cols-2 lg:gap-16" aria-labelledby="about-fort-title">
        <div className="max-w-[640px]">
          <h1 id="about-fort-title" className="text-[clamp(2.25rem,3vw,2.625rem)] font-normal leading-[1.24] text-black">{t.aboutTitle}</h1>
          {t.aboutParagraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-lg leading-[1.45]">{paragraph}</p>)}
        </div>
        <div className="w-full lg:flex lg:justify-end">
          <ExperiencePopImage src={publicAsset("/assets/experience/b3c40.png")} alt={t.aboutImageAlt} priority />
        </div>
      </section>

      <section className="bg-[#ecebea]" aria-labelledby="about-experience-title">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-6 py-8 md:px-9 lg:grid-cols-2 lg:gap-16">
          <div className="w-full lg:justify-self-start">
            <ExperiencePopImage src={publicAsset("/assets/experience/cea40.png")} alt={t.experienceImageAlt} />
          </div>
          <div className="max-w-[640px]">
            <h2 id="about-experience-title" className="text-[clamp(2.25rem,3vw,2.625rem)] font-normal leading-[1.24] text-black">{t.experienceTitle}</h2>
            {t.experienceParagraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-lg leading-[1.45]">{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 md:px-9" aria-labelledby="explore-fort-title">
        <h2 id="explore-fort-title" className="text-[clamp(2.25rem,3vw,2.625rem)] font-normal leading-[1.24] text-black">{t.exploreTitle}</h2>
        {t.exploreParagraphs.map((paragraph) => <p key={paragraph} className="mt-4 max-w-[1200px] text-lg leading-[1.45]">{paragraph}</p>)}
        <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          {t.galleries.map((gallery, index) => (
            <article key={gallery.title} className="flex flex-col items-start gap-6 sm:flex-row">
              <div className="relative size-[180px] shrink-0 overflow-hidden rounded-full border-8 border-[#374f65]">
                <Image src={publicAsset(`/assets/experience/${galleryImages[index]}`)} alt={gallery.imageAlt} fill sizes="180px" className="object-cover" />
              </div>
              <div>
                <h3 className="text-[22px] font-normal leading-7 text-black">{gallery.title}</h3>
                <p className="mt-1 text-lg leading-6">{gallery.subtitle}</p>
                <p className="mt-4 text-sm leading-5">{gallery.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#243646] px-6 py-12 text-center text-white md:px-9" aria-labelledby="journey-title">
        <p className="text-[22px] leading-[30px]">{t.journeyEyebrow}</p>
        <h2 id="journey-title" className="mx-auto mt-3 max-w-[850px] text-[clamp(2rem,3vw,2.375rem)] font-normal leading-[1.26]">{t.journeyTitle}</h2>
        <p className="mx-auto mt-4 max-w-[850px] text-[22px] leading-[30px]">{t.journeyDescription}</p>
        <Link href={`/${locale}/plan-your-visit`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-white px-6 py-2 text-lg text-[#243646] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{t.planYourVisit}</Link>
      </section>
    </main>
  );
}
