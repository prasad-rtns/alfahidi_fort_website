import { notFound } from "next/navigation";
import { Footer } from "@/components/chrome/footer";
import { Header } from "@/components/chrome/header";
import { BrowserEventRejectionGuard } from "@/components/runtime/browser-event-rejection-guard";
import { isLocale, type Locale } from "@/lib/content/site-content";

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
    <div lang={locale} dir={dir} className="min-h-screen bg-pearl text-ink">
      <BrowserEventRejectionGuard />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
