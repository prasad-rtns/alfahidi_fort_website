import Link from "next/link";
import { DubaiCultureMark } from "@/components/chrome/brand-assets";
import { getTranslations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/content/site-content";

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).footer;

  return (
    <footer id="contact-us" className="bg-[#bec3c7] px-5 py-8 text-black md:px-9 md:py-10">
      <div className="mx-auto grid max-w-[1368px] grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
        <div>
          <p className="text-[clamp(0.75rem,1.35vw,1.25rem)] uppercase">{t.stayConnected}</p>
          <p className="mt-1 max-w-[442px] text-[clamp(0.75rem,1.35vw,1.25rem)] leading-snug">{t.updates}</p>
          <form className="mt-5 flex max-w-[520px] rounded-full bg-white" action="#">
            <input className="min-w-0 flex-1 rounded-full border-2 border-[#243646] bg-transparent px-5 py-2 text-[clamp(0.75rem,1.2vw,1.125rem)] outline-none" type="email" placeholder={t.email} aria-label={t.email} />
            <button className="-ml-8 rounded-full border-2 border-[#243646] bg-[#243646] px-5 py-2 text-[clamp(0.75rem,1.2vw,1.125rem)] text-[#d3d7da] md:px-7" type="submit">
              {t.subscribe}
            </button>
          </form>
        </div>

        <div className="justify-self-start text-white md:justify-self-center">
          <DubaiCultureMark />
        </div>

        <div className="text-left text-[clamp(0.75rem,1.35vw,1.25rem)] leading-snug md:text-right">
          <p className="uppercase">
            <Link href={`/${locale}/contact-us`}>{t.contactUs}</Link>
          </p>
          <p className="mt-2">
            <Link href={`/${locale}/faq`}>{t.faqs}</Link> | {t.disclaimer} | {t.terms} | {t.privacy}
          </p>
          <p className="mt-2">{t.contactTel}</p>
        </div>
      </div>
    </footer>
  );
}
