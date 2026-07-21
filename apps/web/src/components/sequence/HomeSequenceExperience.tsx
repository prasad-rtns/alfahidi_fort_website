"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Facebook, Instagram, Search, Twitter } from "lucide-react";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap.config";
import svgPaths from "@/components/reference-home/svg-1qdr0cemfv";
import { getHomeSequence } from "@/lib/home-sequence-service";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";
import type { HomeSequencePayload } from "@/types/home-sequence";

type RequestState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: HomeSequencePayload }
  | { status: "error"; data: null };

type StoryCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  variant: "portrait" | "wide" | "circle";
};

const assets = {
  hero: "/assets/home/8ab53a40f6f21db6e5a8469000a2cd38a9fe5cbe.png",
  verticalLogo: "/assets/home/c835b8583dd9faa532e167e3eea5630c2f4231fe.png",
  marker: "/assets/home/817cfed82c580c1797e98cd2899a66a237a596c0.png",
  ceremonials: "/assets/home/ddf3929089901f919ccb5cec8bcef57269bad28d.png",
  fort: "/assets/home/356eeb935f5a39de2e9ab67426a8bc8942bce0d9.png",
  origins: "/assets/home/a54ffe563d6773bc2f60c942869ba6f6d13be927.png",
  fishing: "/assets/home/a414256e0f2e38adbace65848e8d7ac41adebc32.png",
  architecture: "/assets/home/48674090da258a61c791cd00ca04f0ab5eae5098.png",
  trade: "/assets/home/d236e945a5044c14489b2e7ea53c5604cf70cc94.png",
  conservation: "/assets/home/e9323ff8ffb7ccb4f690c77098e1e1820215ab23.png",
  guidedObject: "/assets/home/ca9b0d43c0a9a3e9707c0ffbdcb128a1d40e4f45.png",
  ceremonialStone: "/assets/home/c7d7122132398baf8c2664cd0d16250039849475.png"
};

const tickerItems = [
  "DUBAI FREE PORT EXHIBITION UNTIL 29TH JANUARY",
  "OPEN TODAY: 10:30 AM - 6 PM",
  "MORE EVENTS ON SUNDAY",
  "DUBAI FREE PORT"
];

const primaryStories: StoryCard[] = [
  {
    eyebrow: "Exhibition until 28 JAN",
    title: "Power of ceremonials",
    description: "Explore ceremonial objects and the stories of authority, identity and public life that surround them.",
    image: assets.ceremonials,
    imageAlt: "Ceremonial object from the Al Fahidi Fort exhibition",
    variant: "portrait"
  },
  {
    eyebrow: "Exhibition until 29 JAN",
    title: "A place where history meets future",
    description: "Discover the fort through archival views and the evolving urban fabric that grew around it.",
    image: assets.fort,
    imageAlt: "Historic Al Fahidi Fort exhibition installation",
    variant: "wide"
  }
];

const secondaryStories: StoryCard[] = [
  {
    eyebrow: "Exhibition until 29 JAN",
    title: "Origins and visions",
    description: "Stories of people, trade and ideas that helped shape the place.",
    image: assets.origins,
    imageAlt: "Historic scene representing the origins of the district",
    variant: "circle"
  },
  {
    eyebrow: "Exhibition until 29 JAN",
    title: "Dubai fishing village",
    description: "A visual history of the settlement, its shoreline and its communities.",
    image: assets.fishing,
    imageAlt: "Dubai fishing village scene",
    variant: "circle"
  },
  {
    eyebrow: "Exhibition until 29 JAN",
    title: "Vernacular architecture",
    description: "Materials and building traditions adapted to climate, culture and daily life.",
    image: assets.architecture,
    imageAlt: "Traditional architectural material",
    variant: "circle"
  }
];

export function HomeSequenceExperience({ fallback }: { fallback: React.ReactNode }) {
  const [state, setState] = useState<RequestState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    async function loadSequence() {
      try {
        const data = await getHomeSequence(controller.signal);
        setState({ status: "ready", data });
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: "error", data: null });
        }
      }
    }

    loadSequence();

    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return <SequenceLoading />;
  }

  if (state.status === "error") {
    return <>{fallback}</>;
  }

  return <AnimatedSequencePage />;
}

function SequenceLoading() {
  return (
    <main className="sequence-loading relative min-h-screen overflow-hidden bg-[#253646] text-[#d3d7da]">
      <img src={assets.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[0.8]" />
      <div className="absolute inset-0 bg-[#253646]/72" />

      <div data-loading-portal className="absolute overflow-hidden rounded-full bg-white/10 shadow-[0_0_28px_rgba(211,215,218,0.2)]">
        <img src={assets.hero} alt="" className="h-full w-full object-cover" />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 size-full text-white/75"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          data-loading-guide
          pathLength="1"
          x1="49.55"
          y1="12.35"
          x2="31.9"
          y2="27.1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.15"
          vectorEffect="non-scaling-stroke"
        />
        <line
          data-loading-guide
          pathLength="1"
          x1="49.55"
          y1="12.35"
          x2="49.95"
          y2="44.4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.15"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="49.55" cy="12.35" r="0.42" fill="currentColor" vectorEffect="non-scaling-stroke" />
        <path
          d="M48.8 8.45H50.25L50.45 11.35H51.08L51.42 8.55H52.05L52.95 15.15"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute left-[6vw] top-[24vh] hidden size-[72px] md:block">
        <span className="absolute inset-0 rounded-full border border-white/55 bg-white/5 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
        <span className="absolute inset-[-8px] rounded-full border border-white/15" />
        <span className="absolute inset-[-3px] grid place-items-center">
          <FloatingMarkerIcon />
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#eceff1] px-[2.6vw] py-4">
        <div className="h-[3.25rem] overflow-hidden rounded-full bg-[#995d3e]" />
      </div>
    </main>
  );
}

function AnimatedSequencePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (reducedMotion) {
      root.dataset.motion = "reduced";
      ScrollTrigger.refresh();
      return;
    }

    root.dataset.motion = "ready";

    const context = gsap.context(() => {
      const heroStage = "[data-sequence-hero]";

      gsap.to("[data-intro-fade]", {
        autoAlpha: 0,
        duration: 1.15,
        delay: 0.15,
        ease: "power2.out"
      });

      gsap.to("[data-marker-halo]", {
        scale: 1.12,
        autoAlpha: 0.72,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to("[data-marker-core]", {
        rotate: 7,
        scale: 1.04,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroStage,
          start: "top top",
          end: "+=320%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      heroTimeline
        .set("[data-guide-arm]", { autoAlpha: 0 }, 0)
        .set("[data-guide-left]", { attr: { x1: 49.55, y1: 12.35, x2: 49.55, y2: 12.35 } }, 0)
        .set("[data-guide-right]", { attr: { x1: 49.55, y1: 12.35, x2: 49.55, y2: 12.35 } }, 0)
        .to(heroStage, { "--portal-x": "31.8%", "--portal-y": "56.6%", "--portal-r": "15.2vw", duration: 0.16, ease: "none" }, 0)
        .to("[data-guide-arm]", { autoAlpha: 1, duration: 0.05, ease: "none" }, 0.06)
        .to("[data-guide-left]", { attr: { x2: 31.9, y2: 27.1 }, duration: 0.1, ease: "none" }, 0.07)
        .to("[data-guide-right]", { attr: { x2: 49.95, y2: 44.4 }, duration: 0.1, ease: "none" }, 0.07)
        .to(heroStage, { "--portal-x": "37%", "--portal-y": "57%", "--portal-r": "17.8vw", duration: 0.14, ease: "none" }, 0.18)
        .to("[data-guide-left]", { attr: { x2: 25.4, y2: 33.8 }, duration: 0.2, ease: "none" }, 0.18)
        .to("[data-guide-right]", { attr: { x2: 54.4, y2: 50.8 }, duration: 0.2, ease: "none" }, 0.18)
        .to(heroStage, { "--portal-x": "55.8%", "--portal-y": "56.2%", "--portal-r": "18.7vw", duration: 0.2, ease: "none" }, 0.34)
        .to("[data-guide-left]", { attr: { x2: 39.4, y2: 48.4 }, duration: 0.2, ease: "none" }, 0.34)
        .to("[data-guide-right]", { attr: { x2: 56.4, y2: 51.7 }, duration: 0.2, ease: "none" }, 0.34)
        .to("[data-guide-arm]", { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.58)
        .to(heroStage, { "--portal-x": "56%", "--portal-y": "55.2%", "--portal-r": "42vw", duration: 0.2, ease: "none" }, 0.64)
        .to("[data-portal-image]", { scale: 1.05, xPercent: -1.8, ease: "none" }, 0)
        .to(heroStage, { "--portal-x": "62%", "--portal-y": "51%", "--portal-r": "96vw", duration: 0.18, ease: "none" }, 0.84)
        .to("[data-dark-wash]", { autoAlpha: 0, ease: "none" }, 0.88)
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, stagger: 0.05, ease: "power2.out" },
          0.9
        )
        .fromTo("[data-corner-mark] span", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, stagger: 0.04, ease: "none" }, 0.18);

      gsap.utils.toArray<HTMLElement>("[data-reveal-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 72, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse"
            },
            delay: (index % 3) * 0.08
          }
        );
      });

      const featureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-dark-feature]",
          start: "top top",
          end: "+=240%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      featureTimeline
        .fromTo("[data-artifact]", { autoAlpha: 0, scale: 0.18 }, { autoAlpha: 1, scale: 1, ease: "none" }, 0.08)
        .fromTo(
          "[data-conservation]",
          { autoAlpha: 0, scaleY: 0.22, scaleX: 0.72 },
          { autoAlpha: 1, scaleY: 1, scaleX: 1, ease: "none" },
          0.25
        )
        .fromTo("[data-feature-line]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0.44)
        .fromTo("[data-feature-cta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.62);
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => context.revert();
  }, [reducedMotion]);

  const tickerText = useMemo(() => [...tickerItems, ...tickerItems].join("    "), []);

  return (
    <main ref={rootRef} className="sequence-page overflow-hidden bg-[#eceff1] text-[#243646]">
      <HeroSequence tickerText={tickerText} />
      <EditorialStories />
      <DarkFeature />
      <ClosingExhibitionBand />
      <SiteFooter />
    </main>
  );
}

function HeroSequence({ tickerText }: { tickerText: string }) {
  const portalStyle = {
    "--portal-x": "31.8%",
    "--portal-y": "56.6%",
    "--portal-r": "0.1vw"
  } as CSSProperties;

  return (
    <section data-sequence-hero style={portalStyle} className="relative min-h-screen overflow-hidden bg-[#243646] text-[#d3d7da]">
      <img src={assets.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[0.8]" />
      <div data-portal className="absolute inset-0 overflow-hidden">
        <img
          data-portal-image
          src={assets.hero}
          alt="Visitor painting a Dubai Free Port exhibition mural"
          className="h-full w-full object-cover"
        />
      </div>
      <div data-dark-wash className="absolute inset-0 bg-[#243646]/72" />
      <div data-intro-fade className="pointer-events-none absolute inset-0 z-30 bg-[#243646]">
        <img src={assets.hero} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[#243646]/50" />
      </div>

      <HeroHeader />
      <SocialRail />

      <div data-left-marker className="absolute left-[3.8vw] top-[24vh] z-20 hidden size-[88px] md:block">
        <span data-marker-target className="absolute left-0 top-0 size-[72px] will-change-transform">
          <span data-marker-halo className="absolute inset-0 rounded-full border border-white/55 bg-white/5 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
          <span className="absolute inset-[-8px] rounded-full border border-white/15" />
          <span data-marker-core className="absolute inset-[-3px] grid place-items-center text-[#d3d7da] will-change-transform">
            <FloatingMarkerIcon />
          </span>
        </span>
      </div>

      <HeroGuideOverlay />

      <img src={assets.verticalLogo} alt="Al Fahidi Fort" className="absolute right-[2.5vw] top-[16vh] z-20 h-36 w-auto opacity-90" />

      <div className="pointer-events-none absolute inset-x-0 bottom-[9vh] z-10 h-[34vh] bg-gradient-to-t from-[#243646]/55 via-[#243646]/18 to-transparent" />

      <div className="absolute bottom-[11vh] left-[6vw] z-20 max-w-[620px] text-white">
        <p data-hero-copy className="text-base font-semibold opacity-0 md:text-xl">
          Exhibition until <strong>29 JAN</strong>
        </p>
        <p data-hero-copy className="mt-2 max-w-[520px] text-sm font-semibold leading-snug opacity-0 md:text-lg">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
        </p>
        <div data-hero-copy className="mt-4 flex flex-wrap items-end gap-5 opacity-0">
          <h1 className="font-display text-[clamp(3.7rem,7vw,6.4rem)] leading-none text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]">
            Dubai Free Port
          </h1>
          <Link href="#explore" className="mb-2 rounded-full border border-white/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#243646] md:text-base">
            Learn more
          </Link>
        </div>
      </div>

      <div data-corner-mark className="pointer-events-none absolute bottom-[15vh] right-[5vw] z-20 h-28 w-28 opacity-70">
        <span className="absolute bottom-0 right-0 h-px w-full origin-right bg-white/70" />
        <span className="absolute bottom-0 right-0 h-full w-px origin-bottom bg-white/70" />
        <span className="absolute bottom-6 right-1 h-px w-[72%] origin-right rotate-45 bg-white/70" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#eceff1] px-[2.6vw] py-4">
        <div className="overflow-hidden rounded-full bg-[#995d3e] text-white">
          <p className="w-max animate-[landing-marquee_28s_linear_infinite] whitespace-pre px-3 py-2 text-[clamp(1.35rem,2.25vw,2.5rem)] leading-none">
            {tickerText}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroGuideOverlay() {
  return (
    <svg
      data-guide-overlay
      className="pointer-events-none absolute inset-0 z-20 hidden size-full text-white/75 md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        data-guide-arm
        data-guide-left
        x1="49.55"
        y1="12.35"
        x2="49.55"
        y2="12.35"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />
      <line
        data-guide-arm
        data-guide-right
        x1="49.55"
        y1="12.35"
        x2="49.55"
        y2="12.35"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />
      <circle data-guide-dot cx="49.55" cy="12.35" r="0.42" fill="currentColor" vectorEffect="non-scaling-stroke" />
      <path
        d="M48.8 8.45H50.25L50.45 11.35H51.08L51.42 8.55H52.05L52.95 15.15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function FloatingMarkerIcon() {
  return (
    <svg className="size-[78px] overflow-visible drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]" fill="none" viewBox="0 0 78.155 78.155" aria-hidden="true">
      <path d={svgPaths.p3a2c3c60} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
      <path d={svgPaths.pbd94700} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
      <path d={svgPaths.p2ca31cf0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function HeroHeader() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-5 px-[3vw] py-8 text-[#d3d7da]">
      <div className="grid min-w-[150px] gap-0.5 leading-none">
        <span className="font-display text-3xl font-semibold">حكومة دبي</span>
        <span className="text-[10px] font-bold uppercase tracking-wide">Government of Dubai</span>
      </div>

      <nav className="hidden flex-1 items-center justify-center gap-[clamp(1.4rem,3.1vw,4.4rem)] text-[clamp(1rem,1.35vw,1.45rem)] font-semibold md:flex">
        <Link href="#tickets" className="rounded-full border border-current px-7 py-1.5">Book Tickets</Link>
        <span className="flex items-center gap-4">
          <span>عربي</span>
          <span className="h-6 w-px bg-current/40" />
          <Search size={20} aria-hidden="true" />
        </span>
        <Link href="#experience">Experience</Link>
        <Link href="#shop">Shop</Link>
        <Link href="#whats-on">What's on</Link>
        <Link href="#visit">Visit</Link>
        <Link href="#explore" className="underline underline-offset-4">Explore</Link>
      </nav>

      <div className="hidden text-right text-[clamp(2.35rem,4vw,4.25rem)] font-black leading-none tracking-normal text-[#d3d7da] md:block">
        حصن الفهيدي
      </div>
    </header>
  );
}

function SocialRail() {
  return (
    <aside className="absolute bottom-[12vh] left-3 top-[41vh] z-20 hidden w-10 flex-col items-center justify-between text-[#d3d7da] md:flex">
      <p className="rotate-[-90deg] whitespace-nowrap text-lg font-semibold">@alfahidifort</p>
      <div className="grid gap-3">
        <Instagram size={20} aria-label="Instagram" />
        <Facebook size={20} aria-label="Facebook" />
        <Twitter size={20} aria-label="Twitter" />
      </div>
      <p className="rotate-[-90deg] whitespace-nowrap text-lg font-semibold">Find us on social media</p>
    </aside>
  );
}

function EditorialStories() {
  return (
    <section id="explore" className="bg-[#fbfbfb] px-9 py-8 md:py-14">
      <div className="mx-auto grid max-w-[1368px] gap-10">
        <div className="grid grid-cols-[0.74fr_1.52fr] items-start gap-7">
          <FeaturedCeremonialCard />
          <WideHistoryCard />
        </div>

        <div className="grid grid-cols-3 gap-8">
          {secondaryStories.map((story) => (
            <StoryArticle key={story.title} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCeremonialCard() {
  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div className="relative aspect-square overflow-hidden bg-white">
        <span className="absolute left-0 top-0 h-px w-20 bg-[#243646]/60" />
        <span className="absolute left-0 top-0 h-20 w-px bg-[#243646]/60" />
        <span className="absolute left-5 top-0 h-px w-16 origin-left rotate-45 bg-[#243646]/40" />
        <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(155deg,transparent_0,transparent_5px,rgba(36,54,70,0.18)_6px,transparent_7px)]" />
        <img src={assets.guidedObject} alt="Ceremonial exhibition object" className="absolute inset-x-[9%] bottom-[4%] top-[4%] h-[92%] w-[82%] object-contain" />
      </div>
      <div className="grid gap-1">
        <h2 className="text-[clamp(1.35rem,3.6vw,3.55rem)] leading-[0.98] text-black">Power of ceremonials</h2>
        <p className="text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">Exhibition until 29 JAN</p>
        <p className="max-w-[360px] text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">
          Explore ceremonial objects and the stories of authority, identity and public life that surround them.
        </p>
        <Link href="#visit" className="mt-1 w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
          Learn more
        </Link>
      </div>
    </article>
  );
}

function WideHistoryCard() {
  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div className="relative">
        <div className="aspect-[1.95/1] overflow-hidden rounded-[999px] bg-white">
          <img src={assets.fort} alt="Historic Al Fahidi Fort exhibition installation" className="h-full w-full object-cover grayscale" />
        </div>
        <img src={assets.marker} alt="" className="absolute left-0 top-0 size-14 object-contain md:size-24" />
      </div>
      <div className="grid grid-cols-[0.92fr_1.08fr] gap-5">
        <div>
          <h2 className="text-[clamp(1.35rem,3.6vw,3.55rem)] leading-[0.98] text-black">A place where history meets future</h2>
          <p className="mt-1 text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">Exhibition until 29 JAN</p>
        </div>
        <div className="grid content-start gap-3">
          <p className="text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">
            Discover the fort through archival views and the evolving urban fabric that grew around it.
          </p>
          <Link href="#visit" className="w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}

function StoryArticle({ story }: { story: StoryCard }) {
  const maskClass =
    story.variant === "wide"
      ? "aspect-[1.95/1] rounded-[999px]"
      : story.variant === "portrait"
        ? "aspect-[0.76/1] rounded-[999px]"
        : "aspect-square rounded-full";

  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div className="relative">
        <div className={`overflow-hidden bg-[#dde2e3] ${maskClass}`}>
          <img src={story.image} alt={story.imageAlt} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
        </div>
        <img src={assets.marker} alt="" className="absolute left-0 top-0 size-14 object-contain md:size-20" />
      </div>
      <div className="grid gap-1">
        <h2 className="text-[clamp(1.2rem,3.2vw,3.2rem)] leading-[0.98] text-black">{story.title}</h2>
        <p className="text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">{story.eyebrow}</p>
        <p className="max-w-[430px] text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">{story.description}</p>
        <Link href="#visit" className="mt-1 w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
          Learn more
        </Link>
      </div>
    </article>
  );
}

function DarkFeature() {
  return (
    <section data-dark-feature id="visit" className="relative overflow-hidden bg-[#243646] px-9 py-8 text-[#d3d7da] md:py-20">
      <div className="mx-auto grid max-w-[1368px] grid-cols-[0.95fr_1.05fr] items-center gap-8 md:gap-12">
        <div className="relative min-h-[360px] md:min-h-[520px]">
          <span className="absolute left-0 top-0 rounded-full border border-[#d3d7da] px-3 py-0.5 text-[clamp(0.62rem,1.45vw,1rem)] font-semibold">Exhibition</span>
          <span data-feature-line className="absolute left-[2%] top-[9%] h-px w-[58%] origin-left rotate-[31deg] bg-white/45" />
          <span className="absolute left-[2%] top-[7%] hidden h-[52%] w-px rotate-[-5deg] bg-white/30 md:block" />

          <div className="absolute left-[4%] top-[16%] z-10 max-w-[250px]">
            <h2 className="font-display text-[clamp(1.55rem,5vw,5.4rem)] leading-[0.84] text-white">
              Power of ceremonials
            </h2>
            <p className="mt-2 text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-white/75">Exhibition until 29 JAN</p>
            <p className="mt-2 text-[clamp(0.58rem,1.35vw,1rem)] leading-snug text-white/78">
              Ceremonial objects reveal histories of authority, belonging and representation.
            </p>
          </div>

          <div data-artifact className="absolute bottom-0 left-[8%] aspect-square w-[min(48vw,420px)] origin-center rounded-full bg-[#66727e]">
            <img src={assets.guidedObject} alt="Ceremonial exhibition object" className="absolute bottom-[-3%] left-[12%] h-[98%] w-[74%] object-contain" />
          </div>
        </div>

        <div className="relative min-h-[380px] md:min-h-[560px]">
          <span className="absolute left-[5%] top-[22%] h-px w-[40%] origin-left rotate-[-73deg] bg-white/40" />
          <span className="absolute bottom-[17%] right-[2%] h-px w-[42%] origin-right rotate-[-33deg] bg-white/40" />

          <div data-conservation className="absolute right-[5%] top-0 h-[min(55vw,430px)] w-[min(44vw,420px)] origin-bottom overflow-hidden rounded-t-full bg-white/10">
            <img src={assets.conservation} alt="Museum conservation care" className="h-full w-full object-cover" />
          </div>

          <div className="absolute bottom-[6%] left-[10%] max-w-[330px]">
            <h3 className="font-display text-[clamp(1.55rem,5vw,5.7rem)] leading-[0.86] text-white/90">Conservation and care</h3>
            <p className="mt-2 text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-white/70">Exhibition until 29 JAN</p>
            <Link
              data-feature-cta
              href="#guided-tour"
              className="mt-5 inline-flex rounded-full border border-white/70 px-4 py-1 text-[clamp(0.62rem,1.4vw,1rem)] font-semibold text-white transition hover:bg-white hover:text-[#243646]"
            >
              Guide Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingExhibitionBand() {
  return (
    <section id="guided-tour" className="bg-[#e9ebec] px-9 py-8 md:py-16">
      <div className="mx-auto grid max-w-[1368px] grid-cols-[1.25fr_0.75fr] gap-8 md:gap-12">
        <article className="grid gap-6">
          <div className="relative overflow-hidden rounded-full bg-white">
            <img src={assets.trade} alt="Historic exhibition source material" className="aspect-[1.95/1] h-full w-full object-cover grayscale" />
            <img src={assets.marker} alt="" className="absolute left-0 top-0 size-16 object-contain md:size-24" />
          </div>
          <div className="grid grid-cols-[0.95fr_1.05fr] gap-5 md:gap-6">
            <div>
              <h2 className="font-display text-[clamp(1.35rem,4.8vw,5.6rem)] leading-[0.9] text-black">Back to the source</h2>
              <p className="mt-2 text-[clamp(0.58rem,1.4vw,1rem)] font-semibold text-[#243646]">Exhibition until 29 JAN</p>
            </div>
            <div className="grid gap-4">
              <p className="text-[clamp(0.58rem,1.35vw,1.125rem)] leading-snug text-black/85">
                Source material, archival traces and object studies connect the fort story to daily life, trade, craft and conservation.
              </p>
              <Link href="#explore" className="w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,1rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
                Learn more
              </Link>
            </div>
          </div>
        </article>

        <article className="grid content-start gap-6">
          <div className="relative">
            <div className="overflow-hidden rounded-full bg-white">
              <img src={assets.ceremonialStone} alt="Ceremonial exhibition detail" className="aspect-square h-full w-full object-cover" />
            </div>
            <img src={assets.marker} alt="" className="absolute left-0 top-0 size-16 object-contain md:size-24" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(1.35rem,4.8vw,5.6rem)] leading-[0.9] text-black">Power of ceremonials</h2>
            <p className="mt-2 text-[clamp(0.58rem,1.4vw,1rem)] font-semibold text-[#243646]">Exhibition until 29 JAN</p>
            <p className="mt-4 text-[clamp(0.58rem,1.35vw,1.125rem)] leading-snug text-black/85">
              Objects and rituals reveal the symbols, materials and gestures behind public life.
            </p>
            <Link href="#visit" className="mt-5 inline-flex rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,1rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
              Learn more
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#bec3c7] px-9 py-8 text-black md:py-10">
      <div className="mx-auto grid max-w-[1368px] grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10">
        <div>
          <p className="text-[clamp(0.58rem,1.35vw,0.875rem)] font-semibold uppercase">Stay connected</p>
          <p className="mt-2 max-w-[420px] text-[clamp(0.58rem,1.25vw,0.875rem)] leading-snug">Receive email updates on our exhibitions, events, and more.</p>
          <form className="mt-4 flex max-w-[520px] gap-1 rounded-full bg-white p-1" action="#">
            <input className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-1.5 text-[clamp(0.58rem,1.25vw,0.875rem)] outline-none" type="email" placeholder="Email" aria-label="Email" />
            <button className="rounded-full bg-[#243646] px-3 py-1.5 text-[clamp(0.58rem,1.25vw,0.875rem)] font-semibold text-[#d3d7da]" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="text-center font-display text-[clamp(1.4rem,4vw,3rem)] font-black leading-none text-white">
          DUBAI
          <span className="block text-[clamp(0.5rem,1.25vw,0.875rem)] font-semibold tracking-normal">Culture & Arts</span>
        </div>

        <div className="text-right">
          <p className="text-[clamp(0.58rem,1.35vw,0.875rem)] font-semibold uppercase">Contact us</p>
          <p className="mt-2 text-[clamp(0.58rem,1.25vw,0.875rem)]">FAQs | Disclaimer | Terms of use | Privacy Policy</p>
          <p className="mt-2 text-[clamp(0.58rem,1.25vw,0.875rem)]">Contact Us Tel. 80033222</p>
        </div>
      </div>
    </footer>
  );
}
