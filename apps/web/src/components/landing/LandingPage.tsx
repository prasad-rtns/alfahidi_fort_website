"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMockLandingData } from "@/data/landing";
import type { Locale } from "@/lib/content/site-content";
import type { LandingExhibition, LandingPayload, LandingTour } from "@/types/landing";

type RequestState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: LandingPayload };

export function LandingPage({ locale }: { locale: Locale }) {
  const [state, setState] = useState<RequestState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLandingData() {
      try {
        const response = await fetch(`/api/landing?locale=${locale}`, {
          signal: controller.signal,
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Landing data request failed");
        }

        const data = (await response.json()) as LandingPayload;
        setState({ status: "ready", data });
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "ready", data: getMockLandingData(locale) });
        }
      }
    }

    loadLandingData();

    return () => controller.abort();
  }, [locale]);

  if (state.status === "loading") {
    return <LandingLoading />;
  }

  return <LandingContent data={state.data} />;
}

function LandingLoading() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto flex min-h-screen max-w-experience items-end px-4 pb-20 md:px-9">
        <div className="h-12 w-80 max-w-full animate-pulse rounded-full bg-smoke/20" />
      </div>
    </main>
  );
}

function LandingContent({ data }: { data: LandingPayload }) {
  const tickerText = useMemo(() => [...data.ticker, ...data.ticker].join("    "), [data.ticker]);
  const firstRow = data.exhibitions.slice(0, 3);
  const secondRow = data.exhibitions.slice(3);

  return (
    <main className="overflow-hidden bg-white text-ink">
      <section className="relative min-h-[777px] bg-ink text-smoke">
        <img
          src={data.hero.image.src}
          alt={data.hero.image.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80 [clip-path:ellipse(82%_70%_at_52%_30%)]" />
        <div className="absolute left-[47%] top-20 hidden h-px w-[30rem] rotate-[40deg] bg-smoke/70 md:block" />
        <div className="absolute left-[48%] top-28 hidden h-px w-[25rem] rotate-[96deg] bg-smoke/70 md:block" />
        <img
          src={data.hero.ornament.src}
          alt=""
          aria-hidden="true"
          className="absolute right-8 top-[36rem] hidden h-20 w-20 object-contain opacity-80 md:block"
        />
      </section>

      <div className="relative z-10 mx-auto -mt-[5px] h-[50px] max-w-experience overflow-hidden rounded-full bg-copper text-white">
        <p className="w-max animate-[landing-marquee_28s_linear_infinite] whitespace-pre px-3 py-2 text-[clamp(1rem,2.1vw,1.875rem)]">
          {tickerText}
        </p>
      </div>

      <section className="section-shell grid gap-16 pb-20 pt-8 md:pt-10">
        <div className="grid gap-10 xl:grid-cols-[445px_1fr] xl:items-start">
          {secondRow[0] ? <ExhibitionCard exhibition={secondRow[0]} variant="portrait" /> : null}
          <FeatureExhibition exhibition={data.feature} />
        </div>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {firstRow.map((exhibition) => (
            <ExhibitionCard key={exhibition.id} exhibition={exhibition} variant="circle" />
          ))}
        </div>

        <div className="grid gap-10 xl:grid-cols-[1fr_445px] xl:items-start">
          {secondRow[1] ? <FeatureExhibition exhibition={secondRow[1]} /> : null}
          <TourStack tours={data.tours} />
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}

function FeatureExhibition({ exhibition }: { exhibition: LandingExhibition }) {
  return (
    <article className="grid gap-6">
      <ImageFrame exhibition={exhibition} large />
      <div className="grid gap-6 md:grid-cols-[minmax(0,437px)_minmax(0,1fr)] md:items-start">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.95] text-balance">{exhibition.title}</h2>
          <p className="mt-2 flex gap-2 text-lg md:text-xl">
            <span>Exhibition until</span>
            <span>{exhibition.until}</span>
          </p>
        </div>
        <div className="grid justify-items-start gap-4 md:justify-items-end">
          <p className="max-w-[443px] text-lg leading-snug md:text-xl">{exhibition.description}</p>
          <LearnMoreLink href="#visit" />
        </div>
      </div>
    </article>
  );
}

function ExhibitionCard({
  exhibition,
  variant
}: {
  exhibition: LandingExhibition;
  variant: "circle" | "portrait";
}) {
  return (
    <article className="grid gap-6">
      <ImageFrame exhibition={exhibition} large={variant === "portrait"} />
      <div className="grid justify-items-start gap-4">
        <div>
          <h2 className="font-display text-[clamp(2.35rem,4.1vw,3.7rem)] leading-none text-balance">{exhibition.title}</h2>
          <p className="mt-2 flex gap-2 text-lg md:text-xl">
            <span>Exhibition until</span>
            <span>{exhibition.until}</span>
          </p>
        </div>
        <p className="max-w-[441px] text-lg leading-snug md:text-xl">{exhibition.description}</p>
        <LearnMoreLink href="#visit" />
      </div>
    </article>
  );
}

function ImageFrame({ exhibition, large = false }: { exhibition: LandingExhibition; large?: boolean }) {
  const shapeClass =
    exhibition.shape === "circle"
      ? "aspect-square rounded-full"
      : exhibition.shape === "portrait"
        ? "aspect-square rounded-[999px]"
        : "aspect-[1.96/1] rounded-[300px]";

  return (
    <div className="relative">
      <div className={`overflow-hidden bg-white ${shapeClass}`}>
        <img
          src={exhibition.image.src}
          alt={exhibition.image.alt}
          className={`h-full w-full object-cover ${large ? "scale-105" : ""}`}
        />
      </div>
      <img
        src={exhibition.thumbnail.src}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-0 h-[72px] w-[72px] object-contain md:h-[104px] md:w-[104px]"
      />
    </div>
  );
}

function TourStack({ tours }: { tours: LandingTour[] }) {
  return (
    <section id="visit" className="grid gap-8">
      {tours.map((tour) => (
        <article key={tour.id} className="grid gap-5">
          <div className="aspect-square overflow-hidden rounded-full bg-sand">
            <img src={tour.image.src} alt={tour.image.alt} className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-3">
            <h2 className="font-display text-[clamp(2.2rem,3.7vw,3.5rem)] leading-none">{tour.title}</h2>
            <p className="text-lg leading-snug md:text-xl">{tour.description}</p>
            <LearnMoreLink href="#visit" />
          </div>
        </article>
      ))}
    </section>
  );
}

function LearnMoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-base transition hover:bg-ink hover:text-white md:text-xl"
    >
      <span>Learn more</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#bec3c7] px-4 py-8 text-ink md:px-9">
      <div className="mx-auto flex max-w-experience flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-4xl leading-none md:text-6xl">Al Fahidi Fort</p>
          <p className="mt-2 text-lg">Dubai Museum Experience</p>
        </div>
        <div className="grid gap-2 text-lg md:text-right">
          <Link href="mailto:info@alfahidifort.ae">info@alfahidifort.ae</Link>
          <Link href="tel:+971000000000">+971 00 000 0000</Link>
          <p>Al Fahidi Historical Neighbourhood, Dubai</p>
        </div>
      </div>
    </footer>
  );
}
