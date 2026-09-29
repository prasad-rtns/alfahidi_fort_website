import type { ReactNode } from "react";
import { AlFahidiEmblem } from "@/components/chrome/brand-assets";

type ErrorCopy = { title: string; description: string; actions: ReactNode };

/**
 * Bilingual full-page error screen, matching the static proxy error pages in
 * deployment/error-pages. Hook-free so it renders from both server and client boundaries.
 */
export function ErrorScreen({ code, en, ar }: { code: string; en: ErrorCopy; ar: ErrorCopy }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(120%_90%_at_85%_0%,#2f4659_0%,#243646_45%,#18252f_100%)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[30vh] -right-[6vw] h-[78vh] text-white opacity-[0.035]">
        <AlFahidiEmblem className="h-full w-auto" />
      </div>

      <header className="relative flex items-center gap-3.5 px-[clamp(20px,5vw,64px)] py-7">
        <AlFahidiEmblem className="h-[46px] w-auto text-[#d3d7da]" title="Al Fahidi Fort" />
        <div className="flex flex-col leading-tight">
          <strong className="text-lg font-semibold">Al Fahidi Fort</strong>
          <span lang="ar" dir="rtl" className="text-[15px] text-[#d3d7da]">
            حصن الفهيدي
          </span>
        </div>
      </header>

      <main id="main-content" className="relative mx-auto grid w-full max-w-[1100px] flex-1 content-center gap-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,64px)] pb-12 pt-6">
        <p aria-hidden="true" className="flex items-end gap-[18px] text-[clamp(5.5rem,20vw,11rem)] font-bold leading-[0.9] tracking-[0.04em] text-transparent [-webkit-text-stroke:2px_#d3d7da]">
          {code}
          <span className="mb-[0.35em] block h-1.5 w-[clamp(48px,8vw,96px)] rounded-md bg-[#995d3e]" />
        </p>
        <div className="grid gap-7 md:grid-cols-2 md:gap-[clamp(24px,5vw,72px)]">
          <section aria-labelledby="error-title-en">
            <h1 id="error-title-en" className="mb-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium leading-tight">
              <span className="sr-only">{`${code}:`}</span> {en.title}
            </h1>
            <p className="mb-6 max-w-[46ch] text-[clamp(1rem,1.4vw,1.125rem)] text-[#e4e8eb]">{en.description}</p>
            <div className="flex flex-wrap gap-3">{en.actions}</div>
          </section>
          {/* Physical left border so the divider sits between the columns although this one is RTL. */}
          <section lang="ar" dir="rtl" aria-labelledby="error-title-ar" className="border-t border-white/20 pt-7 md:border-l md:border-t-0 md:pl-[clamp(24px,5vw,72px)] md:pt-0">
            <h2 id="error-title-ar" className="mb-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium leading-tight">
              {ar.title}
            </h2>
            <p className="mb-6 max-w-[46ch] text-[clamp(1rem,1.4vw,1.125rem)] text-[#e4e8eb]">{ar.description}</p>
            <div className="flex flex-wrap gap-3">{ar.actions}</div>
          </section>
        </div>
      </main>

      <footer className="relative flex flex-wrap justify-between gap-x-6 gap-y-1.5 border-t border-white/10 px-[clamp(20px,5vw,64px)] pb-7 pt-5 text-sm text-[#d3d7da]">
        <span>Al Fahidi Fort · <span lang="ar">حصن الفهيدي</span></span>
        <span>Error {code}</span>
      </footer>
    </div>
  );
}

export const errorPrimaryButton =
  "inline-flex min-h-11 items-center rounded-full border-2 border-white bg-white px-[22px] py-2.5 font-semibold text-[#243646] transition-colors hover:border-[#d3d7da] hover:bg-[#d3d7da] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#c98a67]";
export const errorGhostButton =
  "inline-flex min-h-11 items-center rounded-full border-2 border-[#d3d7da] px-[22px] py-2.5 font-semibold transition-colors hover:bg-[#d3d7da] hover:text-[#243646] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#c98a67]";
