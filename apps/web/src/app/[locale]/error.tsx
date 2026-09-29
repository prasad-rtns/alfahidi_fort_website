"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/content/site-content";
import { getTranslations } from "@/lib/i18n/translations";

// Renders inside the locale layout, so the header and footer stay available. Error details
// are never shown to visitors; only the opaque digest is logged for correlation.
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "en";
  const t = getTranslations(locale).error;

  useEffect(() => {
    console.error("Page render failed", error.digest ?? "");
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="grid min-h-[70vh] place-items-center bg-white px-6 pb-16 pt-36 text-center text-[#243646]">
      <div className="max-w-xl">
        <h1 className="text-[clamp(2rem,5vw,3rem)] leading-tight">{t.title}</h1>
        <p className="mt-4 text-lg">{t.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center rounded-full bg-[#243646] px-6 py-2 text-lg text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]">
            {t.retry}
          </button>
          <Link href={`/${locale}`} className="inline-flex min-h-11 items-center rounded-full border border-[#243646] px-6 py-2 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]">
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
