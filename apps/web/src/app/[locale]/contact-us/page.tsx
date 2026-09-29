import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Globe2, Instagram, Phone, Twitter, Youtube } from "lucide-react";
import { ContactMap } from "@/components/contact/contact-map";
import { getTranslations } from "@/lib/i18n/translations";
import { emailContactUrl, httpsContactUrl, telephoneContactUrl } from "@/lib/routing/contact-links";
import { publicAsset } from "@/lib/routing/public-asset";
import type { Locale } from "@/lib/content/site-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale).contact;
  return { title: `${t.title} | ${t.fortName}`, description: t.introFirst };
}

export default async function ContactUsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).contact;
  const socialLinks = [
    { label: t.instagramLabel, href: httpsContactUrl(t.instagramUrl), Icon: Instagram },
    { label: t.xLabel, href: httpsContactUrl(t.xUrl), Icon: Twitter },
    { label: t.facebookLabel, href: httpsContactUrl(t.facebookUrl), Icon: Facebook },
    { label: t.youtubeLabel, href: httpsContactUrl(t.youtubeUrl), Icon: Youtube }
  ] as const;

  return (
    <main className="contact-page bg-white text-black">
      <section className="relative flex h-[390px] items-center justify-center overflow-hidden pt-20 text-white md:h-[416px]">
        <Image src={publicAsset("/assets/contact/contact-hero.png")} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#243646]/65" />
        <h1 className="relative px-5 text-center text-[clamp(2.75rem,6vw,3.75rem)] leading-none">{t.title}</h1>
      </section>

      <section className="px-5 pb-14 pt-8 md:px-9 md:pb-16">
        <div className="mx-auto max-w-[1368px]">
          <div className="max-w-[1050px]">
            <h2 className="text-[clamp(2.25rem,4vw,3rem)] leading-tight text-[#243646]">{t.title}</h2>
            <div className="mt-4 text-xl leading-6">
              <p>{t.introFirst}</p>
              <p>{t.introSecond}</p>
            </div>
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-[minmax(320px,495px)_minmax(0,1fr)]">
            <div className="grid gap-8">
              <section className="min-w-0 rounded-3xl border border-[#d3d7da] bg-[#f9fafb] p-6 md:p-8" aria-labelledby="contact-touch-title">
                <h3 id="contact-touch-title" className="text-2xl font-medium leading-tight">{t.getInTouch}</h3>
                <div className="mt-6 grid gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#d3d7da] bg-white" aria-hidden="true"><Globe2 size={20} /></span>
                    <div className="min-w-0 text-xl leading-6">
                      <p className="text-[#7a5135]">{t.emailLabel}</p>
                      <a className="inline-block max-w-full break-all hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]" href={emailContactUrl(t.email)} dir="ltr">{t.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#d3d7da] bg-white" aria-hidden="true"><Phone size={20} /></span>
                    <div className="text-xl leading-6">
                      <p className="text-[#7a5135]">{t.telephoneLabel}</p>
                      <a className="inline-block hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]" href={telephoneContactUrl(t.telephone)} dir="ltr">{t.telephone}</a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-[#d3d7da] bg-[#f9fafb] p-6 md:p-8" aria-labelledby="contact-follow-title">
                <h3 id="contact-follow-title" className="text-2xl font-medium leading-tight">{t.followUs}</h3>
                <p className="mt-6 text-xl leading-6">{t.followDescription}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}, ${t.opensInNewTab}`} className="grid size-11 place-items-center rounded-xl border border-[#d3d7da] bg-white transition hover:border-[#243646] hover:text-[#7a5135] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]">
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <section className="min-w-0 rounded-3xl border border-[#d3d7da] bg-[#f9fafb] px-6 py-6 md:px-8" aria-labelledby="contact-visit-title">
              <h3 id="contact-visit-title" className="text-2xl font-medium leading-tight">{t.visitUs}</h3>
              <div className="mt-6 grid gap-2.5">
                <p className="text-2xl leading-tight text-[#243646]">{t.fortName}</p>
                <p className="text-xl leading-6">{t.addressLineOne}</p>
                <p className="text-xl leading-6">{t.addressLineTwo}</p>
              </div>
              <a href={httpsContactUrl(t.directionsUrl)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#243646] bg-[#243646] px-5 py-2 text-lg text-white transition hover:bg-white hover:text-[#243646] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]">
                {t.getDirections}
                <span className="sr-only">, {t.openMapsLabel}, {t.opensInNewTab}</span>
              </a>
              <ContactMap src={publicAsset("/assets/contact/contact-map-reference.png")} alt={t.mapAlt} zoomInLabel={t.zoomIn} zoomOutLabel={t.zoomOut} zoomLevelLabel={t.zoomLevel} />
            </section>
          </div>
        </div>
      </section>

      <section className="bg-[#243646] px-5 py-16 text-white md:px-9" aria-labelledby="planning-help-title">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <h2 id="planning-help-title" className="text-2xl font-medium leading-tight">{t.planningTitle}</h2>
          <p className="max-w-[850px] text-base leading-5">{t.planningDescription}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href={`/${locale}/plan-your-visit`} className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white bg-white px-5 py-2 text-lg text-[#243646] transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t.planYourVisit}</Link>
            <Link href={`/${locale}/faq`} className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white bg-white px-5 py-2 text-lg text-[#243646] transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t.faqs}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
