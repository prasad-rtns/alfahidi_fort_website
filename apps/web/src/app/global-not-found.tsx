import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/globals.css";
import { ErrorScreen, errorGhostButton, errorPrimaryButton } from "@/components/errors/error-screen";
import { getTranslations } from "@/lib/i18n/translations";

const en = getTranslations("en");
const ar = getTranslations("ar");

export const metadata: Metadata = {
  title: `${en.notFound.title} | ${en.meta.siteName}`,
  description: en.notFound.description,
  robots: { index: false, follow: false }
};

// Served for every unmatched URL without rendering a route, so unknown paths are never
// generated or cached on demand. The locale is unknown here, so both languages are shown.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <ErrorScreen
          code="404"
          en={{
            title: en.notFound.title,
            description: en.notFound.description,
            actions: (
              <>
                <Link href="/en" className={errorPrimaryButton}>
                  {en.notFound.backHome}
                </Link>
                <Link href="/en/contact-us" className={errorGhostButton}>
                  {en.header.contactUs}
                </Link>
              </>
            )
          }}
          ar={{
            title: ar.notFound.title,
            description: ar.notFound.description,
            actions: (
              <>
                <Link href="/ar" className={errorPrimaryButton}>
                  {ar.notFound.backHome}
                </Link>
                <Link href="/ar/contact-us" className={errorGhostButton}>
                  {ar.header.contactUs}
                </Link>
              </>
            )
          }}
        />
      </body>
    </html>
  );
}
