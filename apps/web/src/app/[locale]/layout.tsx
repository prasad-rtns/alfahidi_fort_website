import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Footer } from "@/components/chrome/footer";
import { Header } from "@/components/chrome/header";
import { BrowserEventRejectionGuard } from "@/components/runtime/browser-event-rejection-guard";
import { SmoothScrollProvider } from "@/lib/scroll/smooth-scroll-provider";
import { isLocale, type Locale } from "@/lib/content/site-content";
import { getTranslations } from "@/lib/i18n/translations";
import { getSiteUrl } from "@/lib/seo/page-metadata";

const homeLatin = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-home-latin",
  display: "swap"
});

const homeArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-home-arabic",
  display: "swap"
});

// Only the prerendered locales exist; any other value is a 404 and is never rendered on demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getTranslations(locale as Locale);

  return {
    metadataBase: new URL(`${getSiteUrl()}/`),
    title: { default: meta.siteName, template: `%s | ${meta.siteName}` },
    description: meta.description,
    applicationName: meta.siteName
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { a11y } = getTranslations(locale);

  return (
    <html lang={locale} dir={dir} className={`${homeLatin.variable} ${homeArabic.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          {a11y.skipToContent}
        </a>
        <SmoothScrollProvider>
          <div className="min-h-screen bg-pearl text-ink">
            <BrowserEventRejectionGuard />
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
