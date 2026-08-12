"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AlFahidiEmblem, AlFahidiWordmark, GovernmentOfDubaiMark } from "@/components/chrome/brand-assets";
import { getTranslations } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/content/site-content";

export function Header({ locale }: { locale: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const oppositeLocale = locale === "en" ? "ar" : "en";
  const homeHref = `/${locale}`;
  const [languageHref, setLanguageHref] = useState(`/${oppositeLocale}`);
  const isHome = pathname === homeHref;
  const showEmblem = isScrolled || isMenuOpen || !isHome;
  const t = getTranslations(locale).header;

  useEffect(() => {
    const updateLanguageHref = () => {
      const currentPath = window.location.pathname;
      const localizedPath = currentPath.replace(new RegExp(`^/${locale}(?=/|$)`), `/${oppositeLocale}`);
      setLanguageHref(`${localizedPath}${window.location.search}${window.location.hash}`);
    };

    updateLanguageHref();
    window.addEventListener("hashchange", updateLanguageHref);

    return () => {
      window.removeEventListener("hashchange", updateLanguageHref);
    };
  }, [homeHref, locale, oppositeLocale, pathname]);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
      setIsMenuOpen(false);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  const navLinks = [
    { href: `${homeHref}#visit`, label: t.planYourVisit, native: false },
    { href: `${homeHref}/faq`, label: t.faq, native: true },
    { href: `${homeHref}/contact-us`, label: t.contactUs, native: true }
  ];

  useEffect(() => {
    router.prefetch(`${homeHref}/faq`);
    router.prefetch(`${homeHref}/contact-us`);
  }, [homeHref, router]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-5 py-4 text-[#d3d7da] transition-colors duration-300 md:px-[2.7vw] md:py-4 ${
        isScrolled || isMenuOpen ? "bg-[#243646] shadow-[0_1px_0_rgba(255,255,255,0.18)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1368px] items-end justify-between gap-4">
        <div className="hidden min-w-0 items-end gap-[clamp(1rem,1.6vw,1.9rem)] lg:flex">
          <Link href={homeHref} aria-label={t.government} className="relative -ml-3 self-center md:-ml-5">
            <GovernmentOfDubaiMark className="h-[30px] w-[94px]" />
          </Link>
          <Link href={`${homeHref}#tickets`} className="self-center rounded-full border border-current px-4 py-1.5 text-[clamp(1rem,1.35vw,1.625rem)] leading-none transition hover:bg-[#d3d7da] hover:text-[#243646]">
            {t.bookTickets}
          </Link>
          <span className="flex items-center gap-4 text-[clamp(1rem,1.35vw,1.625rem)] leading-none">
            <Link href={languageHref}>{t.language}</Link>
            <span className="h-14 w-0.5 shrink-0 self-center bg-[#d3d7da]" aria-hidden="true" />
            <button type="button" aria-label={t.search} className="grid size-8 place-items-center">
              <Search size={20} aria-hidden="true" />
            </button>
          </span>
          <Link href={`${homeHref}#explore`} className="self-center text-[clamp(1rem,1.35vw,1.625rem)] leading-none">
            {t.experience}
          </Link>
        </div>

        <Link
          href={homeHref}
          data-hero-guide-anchor
          className={`hidden shrink-0 self-center transition-opacity duration-300 md:grid ${showEmblem ? "opacity-100" : "opacity-0"}`}
          aria-label={t.home}
        >
          <AlFahidiEmblem className="h-[clamp(2.8rem,3.85vw,3.45rem)] w-[clamp(1.35rem,2.05vw,1.8rem)]" />
        </Link>

        <div className="hidden min-w-0 items-end justify-end gap-[clamp(1rem,1.6vw,1.9rem)] lg:flex">
          <nav className="mr-[clamp(1.8rem,4vw,4.75rem)] flex items-center gap-[clamp(0.9rem,1.4vw,1.25rem)] self-center text-[clamp(1rem,1.35vw,1.625rem)] leading-none">
            {navLinks.map((link) =>
              link.native ? (
                <a key={link.href} href={link.href} className={pathname === link.href ? "underline underline-offset-4" : undefined}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={pathname === link.href ? "underline underline-offset-4" : undefined}>
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <Link href={homeHref} aria-label={t.fort} className="grid justify-items-end gap-1">
            <AlFahidiWordmark className={`h-auto text-[#d3d7da] transition-[width] duration-300 ${isScrolled ? "w-[clamp(130px,11vw,170px)]" : "w-[clamp(145px,12.5vw,185px)]"}`} />
            <span className={`text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold leading-none text-[#d3d7da] transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
              {t.fort}
            </span>
          </Link>
        </div>

        <Link href={homeHref} aria-label={t.government} className="relative -ml-2 lg:hidden">
          <GovernmentOfDubaiMark className="h-8 w-[55px]" />
        </Link>

        <Link href={homeHref} aria-label={t.fort} className="lg:hidden">
          <AlFahidiWordmark className="h-auto w-[120px]" />
        </Link>

        <button
          type="button"
          className="inline-grid size-11 place-items-center rounded-full border border-current text-[#d3d7da] lg:hidden"
          aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <div
          className={`absolute left-0 right-0 top-full grid gap-2 bg-[#243646] px-5 pb-5 pt-2 text-lg font-semibold shadow-[0_16px_32px_rgba(0,0,0,0.18)] transition lg:hidden ${
            isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
          }`}
        >
          <Link href={`${homeHref}#tickets`} onClick={() => setIsMenuOpen(false)} className="rounded-full border border-current px-5 py-2 text-center">
            {t.bookTickets}
          </Link>
          <Link href={`${homeHref}#explore`} onClick={() => setIsMenuOpen(false)} className="border-b border-white/15 py-2">
            {t.experience}
          </Link>
          {navLinks.map((link) =>
            link.native ? (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/15 py-2">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/15 py-2">
                {link.label}
              </Link>
            )
          )}
          <div className="flex items-center justify-between py-2 text-base">
            <Link href={languageHref} onClick={() => setIsMenuOpen(false)}>
              {t.language}
            </Link>
            <Search size={20} aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
