import Link from "next/link";
import { Search } from "lucide-react";
import type { Locale } from "@/lib/content/site-content";

const rightNavItems = ["Plan Your Visit", "FAQ", "Contact Us"];

export function Header({ locale }: { locale: Locale }) {
  const oppositeLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-5 text-smoke md:px-9">
      <div className="mx-auto grid max-w-experience grid-cols-[1fr_auto_1fr] items-end gap-5">
        <div className="flex items-end gap-5 md:gap-7">
          <Link href={`/${locale}`} className="hidden text-[0.72rem] uppercase leading-tight tracking-[0.12em] md:block">
            Government
            <br />
            of Dubai
          </Link>
          <Link
            href={`/${locale}/book`}
            className="rounded-full border border-smoke px-3 py-1.5 text-base transition hover:bg-smoke hover:text-ink md:text-[1.6rem]"
          >
            Book Tickets
          </Link>
          <div className="hidden items-center gap-4 text-[1.6rem] md:flex">
            <Link href={`/${oppositeLocale}`}>{locale === "en" ? "العربية" : "English"}</Link>
            <span className="h-8 w-px bg-smoke" />
            <button aria-label="Search" className="grid h-8 w-8 place-items-center">
              <Search size={18} />
            </button>
          </div>
          <Link href={`/${locale}/experience`} className="hidden text-[1.6rem] md:block">
            Experience
          </Link>
        </div>

        <Link href={`/${locale}`} className="grid justify-items-center font-display leading-none">
          <span className="grid h-[59px] w-9 place-items-center text-3xl">AF</span>
        </Link>

        <div className="flex items-end justify-end gap-5 md:gap-7">
          <nav className="hidden items-end gap-5 text-[1.6rem] lg:flex">
            {rightNavItems.map((item) => (
              <Link key={item} href={`/${locale}/${item.toLowerCase().replaceAll(" ", "-")}`}>
                {item}
              </Link>
            ))}
          </nav>
          <Link href={`/${locale}`} className="hidden font-display text-xl leading-none md:block md:text-[2rem]">
            Al Fahidi Fort
          </Link>
        </div>
      </div>
    </header>
  );
}
