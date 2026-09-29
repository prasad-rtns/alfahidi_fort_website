import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactMap } from "@/components/contact/contact-map";
import { PlanVisitRevealImage } from "@/components/plan-visit/plan-visit-reveal-image";
import { getTranslations } from "@/lib/i18n/translations";
import { httpsContactUrl } from "@/lib/routing/contact-links";
import { publicAsset } from "@/lib/routing/public-asset";
import type { Locale } from "@/lib/content/site-content";
import { buildPageMetadata, summarize } from "@/lib/seo/page-metadata";

const transportIcons = ["a5f08.svg", "3ae54.svg", "ea4ed.svg", "e21ab.svg"] as const;
const guidelineIcons = ["d6809.svg", "9e925.svg", "a852d.svg", "1047e.svg", "3ca56.svg"] as const;
const headingClass = "text-[clamp(2.25rem,3.5vw,3.125rem)] font-normal leading-[1.08] text-black";
const bodyClass = "text-xl leading-6";
const focusClass = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";
const darkButton = `inline-flex min-h-11 items-center justify-center rounded-full bg-[#243646] px-5 py-2.5 text-lg text-white ${focusClass}`;
const whiteButton = `inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2.5 text-lg text-[#3e332e] ${focusClass}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale).planVisit;
  return buildPageMetadata({ locale, pagePath: "/plan-your-visit", title: t.title, description: summarize(t.heroParagraphs[0] ?? t.title) });
}

export default async function PlanYourVisitPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).planVisit;
  const directionsUrl = httpsContactUrl(getTranslations(locale).contact.directionsUrl);
  const directionsLabel = `${t.getDirections} (${t.opensInNewTab})`;

  return (
    <main id="main-content" tabIndex={-1} className="plan-visit-page bg-white text-[#3e332e]">
      <section className="relative overflow-hidden bg-[#243646] text-white" aria-labelledby="plan-title">
        <Image src={publicAsset("/assets/plan-visit/5f63f.svg")} alt="" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="relative mx-auto grid min-h-[604px] max-w-[1080px] items-center gap-10 px-6 pb-3 pt-36 md:px-9 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-[510px]">
            <h1 id="plan-title" className="text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-none">{t.title}</h1>
            {t.heroParagraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-xl leading-6">{paragraph}</p>)}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#tickets" className={whiteButton}>{t.bookTickets}</Link>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={directionsLabel} className={`${darkButton} border border-white`}>{t.getDirections}</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[459px] pb-5 sm:ps-10">
            <div className="relative h-[min(75vw,575px)] min-h-[320px] w-full overflow-hidden rounded-[50%_50%_45%_45%/40%_40%_60%_60%]">
              <Image src={publicAsset("/assets/plan-visit/a66ba.webp")} alt={t.heroImageAlt} fill priority sizes="(min-width: 1024px) 459px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 start-0 size-[clamp(130px,18vw,220px)] overflow-hidden rounded-full border-[12px] border-[#7a5135]">
              <Image src={publicAsset("/assets/plan-visit/16221.webp")} alt={t.heroDetailAlt} fill sizes="220px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-6 py-8 md:px-9 lg:grid-cols-2" aria-label={`${t.openingHours} ${t.location}`}>
        <div className="flex flex-col gap-8">
          <PlanVisitRevealImage src={publicAsset("/assets/plan-visit/5969c.webp")} alt={t.exteriorAlt} />
          <div className="rounded-3xl border border-[#d3d7da] bg-[#f9fafb] p-6 md:p-8">
            <h2 className={headingClass}>{t.openingHours}</h2>
            <dl className="mt-6">
              <div className="flex flex-wrap justify-between gap-2 border-b border-[#d3d7da] pb-6 text-xl leading-6"><dt>{t.openDaily}</dt><dd className="font-bold">{t.openTime}</dd></div>
              <div className="mt-3 flex flex-wrap justify-between gap-2 border-b border-[#d3d7da] pb-6 text-xl leading-6"><dt>{t.lastAdmission}</dt><dd className="font-bold">{t.lastAdmissionTime}</dd></div>
            </dl>
            <p className="mt-3 text-base leading-5 text-[#b93c4f]">{t.hoursNote}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-[#d3d7da] bg-[#f9fafb] p-6 md:p-8">
          <h2 className={headingClass}>{t.location}</h2>
          <address className={`mt-6 border-b border-[#d3d7da] pb-6 not-italic ${bodyClass}`}>{t.addressLines.map((line) => <span key={line} className="block">{line}</span>)}</address>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={directionsLabel} className={`mt-6 ${darkButton}`}>{t.getDirections}</a>
          <ContactMap src={publicAsset("/assets/plan-visit/340e0.webp")} alt={t.mapAlt} zoomInLabel={t.zoomIn} zoomOutLabel={t.zoomOut} zoomLevelLabel={t.zoomLevel} heightClassName="h-[324px]" />
        </div>
      </section>

      <section className="bg-[#243646] px-6 py-10 text-white md:px-9" aria-labelledby="getting-here-title">
        <div className="mx-auto grid max-w-[1368px] items-center gap-10 lg:grid-cols-[minmax(0,584px)_minmax(0,458px)] lg:justify-between">
          <div>
            <h2 id="getting-here-title" className={`${headingClass} text-white`}>{t.gettingHere}</h2>
            <p className={`mt-4 ${bodyClass}`}>{t.gettingHereIntro}</p>
            <ul className="mt-6 space-y-6">
              {t.transport.map((item, index) => <li key={item.name} className="flex flex-wrap justify-between gap-4 border-b border-[#374f65] pb-6 sm:flex-nowrap">
                <div className="flex min-w-[150px] items-center gap-2"><Image src={publicAsset(`/assets/plan-visit/${transportIcons[index]}`)} alt="" width={24} height={24} /><h3 className="text-xl leading-6">{item.name}</h3></div>
                <p className="max-w-[300px] text-base leading-5">{item.description}</p>
              </li>)}
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[458px] overflow-hidden rounded-full border-[10px] border-[#374f65]">
            <Image src={publicAsset("/assets/plan-visit/2d725.webp")} alt={t.nightImageAlt} fill sizes="(min-width: 1024px) 458px, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-9 px-6 py-10 md:px-9 lg:grid-cols-2" aria-labelledby="accessibility-title">
        <PlanVisitRevealImage src={publicAsset("/assets/plan-visit/187c8.webp")} alt={t.accessibilityImageAlt} />
        <div><h2 id="accessibility-title" className={headingClass}>{t.accessibility}</h2>{t.accessibilityParagraphs.map((paragraph) => <p key={paragraph} className={`mt-6 ${bodyClass}`}>{paragraph}</p>)}</div>
      </section>

      <section className="bg-[#f2ebe6] px-6 py-16 md:px-9" aria-labelledby="visitor-title">
        <div className="mx-auto max-w-[1206px]">
          <h2 id="visitor-title" className={headingClass}>{t.visitorInformation}</h2>
          <p className={`mt-3 ${bodyClass}`}>{t.visitorIntro}</p>
          <h3 className="mt-8 text-[30px] font-normal leading-8 text-black">{t.visitorGuidelines}</h3>
          <p className={`mt-3 ${bodyClass}`}>{t.guidelinesIntro}</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {t.guidelines.map((item, index) => <div key={item.title} className="border-b border-[#d3d7da] pb-6">
              <div className="flex items-start gap-2"><Image src={publicAsset(`/assets/plan-visit/${guidelineIcons[index]}`)} alt="" width={24} height={24} /><h4 className="text-xl leading-6 text-[#7a5135]">{item.title}</h4></div>
              <p className="mt-4 text-base leading-5 text-black">{item.description}</p>
            </div>)}
            <div className="flex flex-col items-start gap-3"><p className="text-xl leading-9 text-black">{t.detailedGuidelines}</p><Link href={`/${locale}/faq`} aria-label={`${t.clickHere}: ${t.faqs}`} className={`inline-flex min-h-11 items-center rounded-full border border-[#3e332e] bg-white px-5 py-2 text-lg ${focusClass}`}>{t.clickHere}</Link></div>
          </div>
        </div>
      </section>

      <section id="tickets" className="mx-auto grid max-w-[1440px] gap-10 px-6 py-10 md:px-9 lg:grid-cols-2" aria-labelledby="tickets-title">
        <div><h2 id="tickets-title" className={headingClass}>{t.tickets}</h2><p className={`mt-4 ${bodyClass}`}>{t.ticketsIntro}</p><p className={`mt-4 ${bodyClass}`}>{t.purchasePrompt}</p><Link href={`/${locale}/contact-us`} className={`mt-4 inline-flex min-h-11 items-center rounded-full border border-[#3e332e] bg-white px-5 py-2 text-lg ${focusClass}`}>{t.bookTickets}</Link></div>
        <div><dl className="space-y-5">{t.prices.map((price) => <div key={price.label} className="flex flex-wrap justify-between gap-2 border-b border-[#d3d7da] pb-3 text-xl leading-6"><dt>{price.label}</dt><dd className="font-bold">{price.value}</dd></div>)}</dl><p className="mt-5 text-base leading-5">{t.ticketContactNote}</p><Link href={`/${locale}/contact-us`} className={`mt-5 ${darkButton}`}>{t.bookTickets}</Link></div>
      </section>

      <section className="bg-[#243646] px-6 py-10 text-center text-white md:px-9" aria-labelledby="assistance-title">
        <h2 id="assistance-title" className={`${headingClass} text-white`}>{t.needAssistance}</h2>
        <p className={`mx-auto mt-5 max-w-[900px] ${bodyClass}`}>{t.assistanceIntro}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-5"><Link href={`/${locale}/contact-us`} className={whiteButton}>{t.contactUs}</Link><Link href={`/${locale}/faq`} className={`inline-flex min-h-11 items-center rounded-full border-2 border-white px-5 py-2 text-lg ${focusClass}`}>{t.faqs}</Link></div>
      </section>
    </main>
  );
}
