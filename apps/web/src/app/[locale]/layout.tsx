import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Footer } from "@/components/chrome/footer";
import { Header } from "@/components/chrome/header";
import { BrowserEventRejectionGuard } from "@/components/runtime/browser-event-rejection-guard";
import { SmoothScrollProvider } from "@/lib/scroll/smooth-scroll-provider";
import { isLocale, type Locale } from "@/lib/content/site-content";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

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

export const metadata: Metadata = {
  title: "Al Fahidi Fort",
  description: "A cinematic museum and tourism experience for Al Fahidi Fort."
};

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

  return (
    <html lang={locale} dir={dir} className={`${display.variable} ${body.variable} ${homeLatin.variable} ${homeArabic.variable}`}>
      <body>
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
