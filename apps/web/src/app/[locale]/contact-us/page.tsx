import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/content/site-content";

const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Al%20Fahidi%20Fort%2C%20Dubai";
const contactIcons = [MapPin, Clock, Phone, Mail] as const;
const fortMarkerIconPath =
  "M23.5302 19.3024C23.2984 18.5405 23.0665 17.7785 22.8579 17.0166C22.5797 16.0699 22.3015 15.1233 22.0233 14.1766C21.9074 13.761 21.7683 13.3454 21.6524 12.9298C21.6292 12.8375 21.6524 12.7913 21.7451 12.7682C21.8379 12.7451 21.9074 12.6989 22.0001 12.6758C22.1392 12.6297 22.1392 12.6297 22.0929 12.4911C22.0001 12.1448 21.9074 11.7985 21.7915 11.4521C21.6988 11.1289 21.606 10.7826 21.5133 10.4593C21.4901 10.367 21.4438 10.3208 21.351 10.3669C21.2583 10.39 21.1656 10.4131 21.0728 10.4131C21.0033 10.4131 20.9569 10.4131 20.9338 10.3208C20.8642 10.0899 20.8178 9.85899 20.7483 9.6281C20.5628 8.98161 20.3542 8.31203 20.1687 7.66554C19.9137 6.76507 19.6587 5.8646 19.4037 4.94104C19.3805 4.84868 19.4733 4.75633 19.3805 4.66398C19.4037 4.66398 19.4269 4.66398 19.4501 4.66398C19.6587 4.75633 19.8905 4.80251 20.1224 4.8256C20.6092 4.89486 21.0497 4.77941 21.4669 4.54852C21.8842 4.31763 22.2088 3.99439 22.4174 3.5557C22.6493 3.11701 22.7652 2.65523 22.6724 2.14728C22.5333 1.24681 22.0929 0.600314 21.2583 0.207801C21.0497 0.115445 20.841 0.0692669 20.6092 0H19.8905C19.7514 0.046178 19.5892 0.0923503 19.4501 0.138528C18.6851 0.369418 18.1982 0.877383 17.92 1.61623C17.8505 1.77785 17.8041 1.93947 17.8041 2.1011C17.8041 2.14727 17.8041 2.19345 17.7346 2.21654C17.5955 2.28581 17.4796 2.37816 17.3405 2.44743C15.2309 3.1401 13.1213 3.80968 11.0117 4.50235C9.78299 4.89487 8.55432 5.28737 7.32565 5.70297C5.86516 6.18784 4.38148 6.64963 2.89781 7.1345C1.97051 7.43465 1.04321 7.7348 0.115913 8.05805C0.0695478 8.05805 0.0463649 8.08114 0 8.10423V8.17349C0.115912 8.45056 0.185459 8.75072 0.278189 9.02779C0.556379 9.95135 0.811384 10.8518 1.08957 11.7754C1.29822 12.468 1.50686 13.1838 1.7155 13.8765C2.06324 15.0078 2.38779 16.1392 2.71235 17.2706C3.0369 18.3327 3.33827 19.3947 3.66283 20.4799C4.03375 21.7267 4.40466 22.9966 4.77558 24.2434C4.91468 24.7514 5.05377 25.2363 5.19287 25.7442C5.19287 25.7673 5.19287 25.8135 5.19287 25.8366C5.21605 25.9058 5.19287 25.9289 5.1465 25.9982C4.42785 26.6909 4.24239 27.5221 4.54376 28.4687C4.82195 29.2999 5.72607 30.0849 6.86201 29.9926C7.60384 29.9464 8.20659 29.6001 8.62387 28.9998C9.08752 28.3071 9.15707 27.5452 8.83251 26.7601C8.78615 26.6678 8.80933 26.6216 8.90206 26.5754C8.92524 26.5754 8.97161 26.5523 8.99479 26.5292C9.22662 26.4138 9.48162 26.3676 9.73663 26.2753C10.1539 26.1367 10.5712 25.9751 10.9885 25.8135C11.7303 25.5364 12.4953 25.2593 13.2372 24.9823C14.1413 24.6359 15.0454 24.3127 15.9495 23.9664C16.5059 23.7586 17.0391 23.5738 17.5955 23.366C18.6619 22.9735 19.7283 22.581 20.7947 22.1885C21.606 21.8884 22.3942 21.6113 23.2056 21.3111C23.4375 21.2188 23.6925 21.1264 23.9243 21.0341C23.9707 21.0341 24.017 21.011 23.9938 20.9186C23.8084 20.3645 23.6693 19.8103 23.507 19.2793L23.5302 19.3024Z";

function FortMapMarker() {
  return (
    <span className="pointer-events-none absolute left-[50.5%] top-[58%] flex -translate-x-1/2 -translate-y-full flex-col items-center" aria-hidden="true">
      <span className="flex w-[100px] items-center justify-center rounded-[12px] bg-[#b93c4f] p-4 drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)]">
        <svg className="h-[30px] w-6 mix-blend-screen" fill="none" viewBox="0 0 24 30">
          <path d={fortMarkerIconPath} fill="white" />
        </svg>
      </span>
      <span className="-mt-px h-0 w-0 border-x-[13px] border-t-[18px] border-x-transparent border-t-[#b93c4f]" />
    </span>
  );
}

export default async function ContactUsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getTranslations(locale).contact;

  return (
    <main className="bg-white text-black">
      <section className="relative flex h-[360px] items-center justify-center overflow-hidden pt-24 text-white md:h-[416px]">
        <img src="/assets/contact/contact-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#243646]/65" />
        <h1 className="relative px-5 text-center text-[clamp(2.5rem,6vw,3.75rem)] leading-none">{t.title}</h1>
      </section>

      <section className="px-5 py-16 md:px-9 md:py-20">
        <div className="mx-auto grid max-w-[1368px] gap-12 lg:grid-cols-[1fr_480px] lg:gap-20">
          <div className="relative min-h-[320px] overflow-hidden rounded-[1000px] border border-[#d3d7da] bg-[#d3d7da] md:min-h-[444px]">
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" aria-label={t.openMapsLabel} className="absolute inset-0 block">
              <img src="/assets/contact/contact-map-reference.png" alt={t.mapAlt} className="h-full w-full object-cover" />
              <FortMapMarker />
              <span className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/90 bg-[#243646]/90 px-6 py-3 text-lg text-white shadow-sm">
                <MapPin size={20} strokeWidth={2} aria-hidden="true" />
                {t.openMaps}
              </span>
            </a>
          </div>

          <div className="grid content-start gap-9">
            <div className="grid gap-3 text-[clamp(1rem,1.5vw,1.25rem)] leading-snug">
              <p className="uppercase text-[#7a5135]">{t.guide}</p>
              <h2 className="text-[#243646]">{t.inquiries}</h2>
            </div>

            <div className="h-px bg-[#d3d7da]" />

            <div className="grid gap-7">
              {t.details.map((item, index) => {
                const Icon = contactIcons[index] ?? MapPin;

                return (
                  <div key={item.label} className="flex gap-4">
                    <span className="grid size-6 shrink-0 place-items-center text-[#243646]" aria-hidden="true">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div className="grid gap-1 text-[clamp(1rem,1.45vw,1.25rem)] leading-snug">
                      <p className="text-[clamp(0.95rem,1.3vw,1.125rem)] text-[#7a5135]">{item.label}</p>
                      <p className="whitespace-pre-line text-[#3e332e]">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
