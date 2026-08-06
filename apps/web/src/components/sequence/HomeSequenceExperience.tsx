"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Facebook, Instagram, Menu, Search, Twitter, X } from "lucide-react";
import svgPaths from "@/components/reference-home/svg-1qdr0cemfv";
import { getTranslations, type HomeSequenceTranslation } from "@/lib/i18n/translations";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";
import type { Locale } from "@/lib/content/site-content";

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

type SequenceCopy = HomeSequenceTranslation;

const HERO_GUIDE_FALLBACK_ANCHOR_X = 65.7;
const HERO_GUIDE_FALLBACK_ANCHOR_Y = 7.35;
const HERO_GUIDE_ICON_WIDTH = 2.65;
const HERO_GUIDE_ICON_HEIGHT = 6.5;

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

export function HomeSequenceExperience({ locale }: { locale: Locale }) {
  return <AnimatedSequencePage locale={locale} />;
}

function SequenceLoading() {
  return (
    <main className="sequence-loading relative min-h-screen overflow-hidden bg-[#253646] text-[#d3d7da]">
      <img src={assets.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[0.8]" />
      <div className="absolute inset-0 bg-[#253646]/72" />

      {/* <div data-loading-portal className="absolute overflow-hidden rounded-full bg-white/10 shadow-[0_0_28px_rgba(211,215,218,0.2)]">
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
          x1="48.95"
          y1="7.35"
          x2="25.9"
          y2="33.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.15"
          strokeDasharray="0.2 1.05"
          vectorEffect="non-scaling-stroke"
        />
        <line
          data-loading-guide
          pathLength="1"
          x1="48.95"
          y1="7.35"
          x2="43.1"
          y2="39.2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.15"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="48.95" cy="7.35" r="0.42" fill="currentColor" vectorEffect="non-scaling-stroke" />
        <GuideTopIcon />
      </svg> */}

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

function AnimatedSequencePage({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const t = getTranslations(locale).homeSequence;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanupAnimations: (() => void) | undefined;
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const startAnimations = async () => {
      const { gsap, registerGsap, ScrollTrigger } = await import("@/animations/gsap.config");

      if (cancelled) return;

      registerGsap();

      if (window.location.hash) {
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      if (reducedMotion) {
        root.dataset.motion = "reduced";
        ScrollTrigger.refresh();
        return;
      }

      root.dataset.motion = "ready";

    const markerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.querySelectorAll<HTMLElement>("[data-scroll-marker]").forEach((marker) => {
            marker.dataset.markerVisible = entry.isIntersecting ? "true" : "false";
          });
        });
      },
      {
        root: null,
        rootMargin: "-6% 0px -6% 0px",
        threshold: 0.08
      }
    );

    root.querySelectorAll<HTMLElement>("[data-marker-zone]").forEach((zone) => {
      markerObserver.observe(zone);
    });

    const popImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          (entry.target as HTMLElement).dataset.popVisible = entry.isIntersecting ? "true" : "false";
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.06
      }
    );

    root.querySelectorAll<HTMLElement>("[data-pop-image]").forEach((image) => {
      popImageObserver.observe(image);
    });

    const featureLineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          const isVisible = entry.isIntersecting ? "true" : "false";
          section.dataset.linesVisible = isVisible;
          section.dataset.featureVisualsVisible = isVisible;
        });
      },
      {
        root: null,
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.18
      }
    );

    const updateFeatureLineState = (section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.18 ? "true" : "false";
      section.dataset.linesVisible = isVisible;
      section.dataset.featureVisualsVisible = isVisible;
    };

    const featureLineSections = root.querySelectorAll<HTMLElement>("[data-dark-feature]");

    featureLineSections.forEach((section) => {
      updateFeatureLineState(section);
      featureLineObserver.observe(section);
    });

    const refreshFeatureLines = () => {
      featureLineSections.forEach(updateFeatureLineState);
    };

    window.addEventListener("scroll", refreshFeatureLines, { passive: true });
    window.addEventListener("resize", refreshFeatureLines);

    let guideAnchor = {
      x: HERO_GUIDE_FALLBACK_ANCHOR_X,
      y: HERO_GUIDE_FALLBACK_ANCHOR_Y
    };
    let guideAnchorFrame = 0;

    const measureHeroGuideAnchor = () => {
      const anchor = document.querySelector<HTMLElement>("[data-hero-guide-anchor]");
      const overlay = root.querySelector<SVGSVGElement>("[data-guide-overlay]");

      if (!anchor || !overlay) return guideAnchor;

      const anchorRect = anchor.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();

      if (anchorRect.width === 0 || overlayRect.width === 0 || overlayRect.height === 0) {
        return guideAnchor;
      }

      return {
        x: ((anchorRect.left + anchorRect.width / 2 - overlayRect.left) / overlayRect.width) * 100,
        y: ((anchorRect.top + anchorRect.height / 2) / overlayRect.height) * 100
      };
    };

    const applyHeroGuideAnchor = ({ resetArms = false } = {}) => {
      guideAnchor = measureHeroGuideAnchor();

      const emblem = root.querySelector<SVGSVGElement>("[data-guide-emblem]");
      const dot = root.querySelector<SVGCircleElement>("[data-guide-dot]");

      emblem?.setAttribute("x", String(guideAnchor.x - HERO_GUIDE_ICON_WIDTH / 2));
      emblem?.setAttribute("y", String(guideAnchor.y - HERO_GUIDE_ICON_HEIGHT / 2));
      dot?.setAttribute("cx", String(guideAnchor.x));
      dot?.setAttribute("cy", String(guideAnchor.y));

      root.querySelectorAll<SVGLineElement>("[data-guide-arm]").forEach((line) => {
        line.setAttribute("x1", String(guideAnchor.x));
        line.setAttribute("y1", String(guideAnchor.y));

        if (resetArms) {
          line.setAttribute("x2", String(guideAnchor.x));
          line.setAttribute("y2", String(guideAnchor.y));
        }
      });
    };

    const resetHeroGuideArms = () => {
      applyHeroGuideAnchor({ resetArms: true });
      gsap.set("[data-guide-arm]", { autoAlpha: 0 });
    };

    const scheduleHeroGuideAnchor = () => {
      window.cancelAnimationFrame(guideAnchorFrame);
      guideAnchorFrame = window.requestAnimationFrame(() => applyHeroGuideAnchor());
    };

    const parsePercent = (value: string, fallback: number) => {
      const parsed = Number.parseFloat(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const parseRadiusPx = (value: string) => {
      const parsed = Number.parseFloat(value);
      if (!Number.isFinite(parsed)) return window.innerWidth * 0.146;
      if (value.trim().endsWith("vw")) return window.innerWidth * (parsed / 100);
      if (value.trim().endsWith("px")) return parsed;
      return window.innerWidth * (parsed / 100);
    };

    const applyHeroGuidePortalEdges = () => {
      applyHeroGuideAnchor();

      const heroStageElement = root.querySelector<HTMLElement>("[data-sequence-hero]");
      const overlay = root.querySelector<SVGSVGElement>("[data-guide-overlay]");
      const leftLine = root.querySelector<SVGLineElement>("[data-guide-left]");
      const rightLine = root.querySelector<SVGLineElement>("[data-guide-right]");
      if (!heroStageElement || !overlay || !leftLine || !rightLine) return;

      const overlayRect = overlay.getBoundingClientRect();
      if (overlayRect.width === 0 || overlayRect.height === 0) return;

      const portalStyles = getComputedStyle(heroStageElement);
      const centerX = parsePercent(portalStyles.getPropertyValue("--portal-x"), 55.9);
      const centerY = parsePercent(portalStyles.getPropertyValue("--portal-y"), 54.6);
      const radiusPx = parseRadiusPx(portalStyles.getPropertyValue("--portal-r"));
      const anchorX = (guideAnchor.x / 100) * overlayRect.width;
      const anchorY = (guideAnchor.y / 100) * overlayRect.height;
      const circleX = (centerX / 100) * overlayRect.width;
      const circleY = (centerY / 100) * overlayRect.height;
      const dx = anchorX - circleX;
      const dy = anchorY - circleY;
      const distance = Math.hypot(dx, dy);

      if (distance <= radiusPx) return;

      const baseAngle = Math.atan2(dy, dx);
      const tangentAngle = Math.acos(radiusPx / distance);
      const tangentA = {
        x: circleX + radiusPx * Math.cos(baseAngle + tangentAngle),
        y: circleY + radiusPx * Math.sin(baseAngle + tangentAngle)
      };
      const tangentB = {
        x: circleX + radiusPx * Math.cos(baseAngle - tangentAngle),
        y: circleY + radiusPx * Math.sin(baseAngle - tangentAngle)
      };
      const leftPixelPoint = tangentA.x < tangentB.x ? tangentA : tangentB;
      const rightPixelPoint = tangentA.x < tangentB.x ? tangentB : tangentA;
      const leftPoint = {
        x: (leftPixelPoint.x / overlayRect.width) * 100,
        y: (leftPixelPoint.y / overlayRect.height) * 100
      };
      const rightPoint = {
        x: (rightPixelPoint.x / overlayRect.width) * 100,
        y: (rightPixelPoint.y / overlayRect.height) * 100
      };

      leftLine.setAttribute("x2", String(leftPoint.x));
      leftLine.setAttribute("y2", String(leftPoint.y));
      rightLine.setAttribute("x2", String(rightPoint.x));
      rightLine.setAttribute("y2", String(rightPoint.y));
    };

    const guideAnchorElement = document.querySelector<HTMLElement>("[data-hero-guide-anchor]");
    const guideAnchorObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleHeroGuideAnchor);

    if (guideAnchorElement) {
      guideAnchorObserver?.observe(guideAnchorElement);
    }

    resetHeroGuideArms();
    window.addEventListener("resize", scheduleHeroGuideAnchor);

    let replayHeroIntroOnReturn: (() => void) | null = null;

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

      gsap.to("[data-marker-target]", {
        keyframes: [
          { x: 14, y: -12, duration: 0.9 },
          { x: 24, y: 6, duration: 0.9 },
          { x: 9, y: 16, duration: 0.8 },
          { x: 0, y: 0, duration: 0.8 }
        ],
        repeat: -1,
        ease: "sine.inOut"
      });

      const heroTimeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        onUpdate: applyHeroGuidePortalEdges
      });

      heroTimeline
        .set(heroStage, { "--portal-x": "31.8%", "--portal-y": "54.6%", "--portal-r": "0.1vw" }, 0)
        .set("[data-portal-image]", { scale: 1, xPercent: 0 }, 0)
        .set("[data-dark-wash]", { autoAlpha: 1 }, 0)
        .set("[data-hero-copy]", { autoAlpha: 0, y: 34 }, 0)
        .call(resetHeroGuideArms, undefined, 0)
        .set("[data-corner-mark] span", { scaleX: 0, scaleY: 0 }, 0)
        .to(heroStage, { "--portal-r": "14.6vw", duration: 0.36, ease: "power2.out" }, 0.65)
        .call(resetHeroGuideArms, undefined, 0.73)
        .to("[data-guide-arm]", { autoAlpha: 1, duration: 0.01, ease: "none" }, 0.74)
        .to(heroStage, { "--portal-x": "37%", "--portal-r": "14.6vw", duration: 1.1, ease: "power1.inOut" }, 0.65)
        .to(heroStage, { "--portal-x": "55.9%", "--portal-y": "54.6%", "--portal-r": "14.6vw", duration: 0.75, ease: "power1.inOut" }, 1.75)
        .to(heroStage, { "--portal-r": "33.6vw", duration: 0.6, ease: "power2.inOut" }, 2.5)
        .to("[data-guide-arm]", { autoAlpha: 0, duration: 0.35, ease: "sine.out" }, 2.78)
        .to("[data-portal-image]", { scale: 1.05, xPercent: -1.8, duration: 4.5, ease: "sine.inOut" }, 0)
        .to(heroStage, { "--portal-x": "62%", "--portal-y": "51%", "--portal-r": "96vw", duration: 1.15, ease: "power2.inOut" }, 3.1)
        .to("[data-dark-wash]", { autoAlpha: 0, duration: 0.45, ease: "sine.out" }, 4.15)
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          4.15
        )
        .to("[data-corner-mark] span", { scaleX: 1, scaleY: 1, duration: 0.35, stagger: 0.04, ease: "sine.out" }, 4.15);

      let hasLeftHero = false;
      let previousScrollY = window.scrollY;

      replayHeroIntroOnReturn = () => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < previousScrollY;
        const replayLine = Math.max(180, window.innerHeight * 0.34);

        if (currentScrollY > window.innerHeight * 0.9) {
          hasLeftHero = true;
        }

        if (hasLeftHero && isScrollingUp && currentScrollY < replayLine && !heroTimeline.isActive()) {
          hasLeftHero = false;
          resetHeroGuideArms();
          heroTimeline.invalidate().restart(true, false);
        }

        previousScrollY = currentScrollY;
      };

      window.addEventListener("scroll", replayHeroIntroOnReturn, { passive: true });

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
    }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanupAnimations = () => {
        window.removeEventListener("scroll", refreshFeatureLines);
        window.removeEventListener("resize", refreshFeatureLines);
        window.removeEventListener("resize", scheduleHeroGuideAnchor);
        window.cancelAnimationFrame(guideAnchorFrame);
        guideAnchorObserver?.disconnect();
        if (replayHeroIntroOnReturn) {
          window.removeEventListener("scroll", replayHeroIntroOnReturn);
        }
        markerObserver.disconnect();
        popImageObserver.disconnect();
        featureLineObserver.disconnect();
        context.revert();
      };
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(startAnimations, { timeout: 1500 });
    } else {
      timeoutId = globalThis.setTimeout(startAnimations, 350);
    }

    return () => {
      cancelled = true;
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      cleanupAnimations?.();
    };
  }, [reducedMotion]);

  const tickerText = useMemo(() => [...t.tickerItems, ...t.tickerItems].join("    "), [t.tickerItems]);

  return (
    <main ref={rootRef} className="sequence-page overflow-hidden bg-[#eceff1] text-[#243646]">
      <HeroSequence tickerText={tickerText} copy={t} />
      <EditorialStories copy={t} />
      <DarkFeature copy={t} />
      <ClosingExhibitionBand copy={t} />
    </main>
  );
}

function HeroSequence({ tickerText, copy }: { tickerText: string; copy: SequenceCopy }) {
  const portalStyle = {
    "--portal-x": "31.8%",
    "--portal-y": "54.6%",
    "--portal-r": "0.1vw"
  } as CSSProperties;

  return (
    <section id="tickets" data-sequence-hero style={portalStyle} className="relative min-h-screen overflow-hidden bg-[#243646] text-[#d3d7da]">
      <img src={assets.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[0.8]" />
      <div data-portal className="absolute inset-0 overflow-hidden">
        <img
          data-portal-image
          src={assets.hero}
          alt={copy.heroImageAlt}
          className="h-full w-full object-cover"
        />
      </div>
      <div data-dark-wash className="absolute inset-0 bg-[#243646]/72" />
      <div data-intro-fade className="pointer-events-none absolute inset-0 z-10 bg-[#243646]">
        <img src={assets.hero} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[#243646]/50" />
      </div>

      <SocialRail copy={copy} />

      <div data-left-marker className="absolute left-[4.8vw] top-[20vh] z-20 hidden size-[88px] md:block">
        <span data-marker-target className="absolute left-0 top-0 size-[72px] will-change-transform">
          <span data-marker-halo className="absolute inset-0 rounded-full border border-white/55 bg-white/5 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
          <span className="absolute inset-[-8px] rounded-full border border-white/15" />
          <span data-marker-core className="absolute inset-[-3px] grid place-items-center text-[#d3d7da] will-change-transform">
            <FloatingMarkerIcon />
          </span>
        </span>
      </div>

      <HeroGuideOverlay />

      <img src={assets.verticalLogo} alt="" className="absolute right-4 top-[18vh] z-20 h-24 w-auto opacity-80 md:right-[2.5vw] md:top-[16vh] md:h-36 md:opacity-90" />

      <div className="pointer-events-none absolute inset-x-0 bottom-[9vh] z-10 h-[34vh] bg-gradient-to-t from-[#243646]/55 via-[#243646]/18 to-transparent" />

      <div className="absolute left-5 right-5 top-[28vh] z-20 max-w-[620px] text-white md:left-[6vw] md:right-auto md:top-[27vh]">
        <p data-hero-copy className="text-base font-semibold opacity-0 md:text-xl">
          {copy.heroEyebrow} <strong>{copy.heroDate}</strong>
        </p>
        <p data-hero-copy className="mt-2 max-w-[520px] text-sm font-semibold leading-snug opacity-0 md:text-lg">
          {copy.heroDescription}
        </p>
        <div data-hero-copy className="mt-4 flex flex-wrap items-end gap-5 opacity-0">
          <h1 className="font-display text-[clamp(2.6rem,15vw,6.4rem)] leading-none text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]">
            {copy.heroTitle}
          </h1>
          <Link href="#explore" className="mb-1 rounded-full border border-white/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#243646] md:mb-2 md:px-5 md:text-base">
            {copy.learnMore}
          </Link>
        </div>
      </div>

      <div data-corner-mark className="pointer-events-none absolute bottom-[15vh] right-5 z-20 h-20 w-20 opacity-70 md:right-[5vw] md:h-28 md:w-28">
        <span className="absolute bottom-0 right-0 h-px w-full origin-right bg-white/70" />
        <span className="absolute bottom-0 right-0 h-full w-px origin-bottom bg-white/70" />
        <span className="absolute bottom-6 right-1 h-px w-[72%] origin-right rotate-45 bg-white/70" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#eceff1] px-3 py-3 md:px-[2.6vw] md:py-4">
        <div className="overflow-hidden rounded-full bg-[#995d3e] text-white">
          <p className="w-max animate-[landing-marquee_28s_linear_infinite] whitespace-pre px-3 py-2 text-[clamp(1rem,6vw,2.5rem)] leading-none">
            {tickerText}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroGuideOverlay() {
  const clipId = `${useId().replace(/:/g, "")}-hero-emblem`;

  return (
    <svg
      data-guide-overlay
      className="pointer-events-none absolute inset-0 z-20 hidden size-full text-white/75 md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <svg
        data-guide-emblem
        x={HERO_GUIDE_FALLBACK_ANCHOR_X - HERO_GUIDE_ICON_WIDTH / 2}
        y={HERO_GUIDE_FALLBACK_ANCHOR_Y - HERO_GUIDE_ICON_HEIGHT / 2}
        width={HERO_GUIDE_ICON_WIDTH}
        height={HERO_GUIDE_ICON_HEIGHT}
        viewBox="0 0 36 59"
        preserveAspectRatio="none"
        overflow="visible"
      >
        <FortEmblemPaths clipId={clipId} includeDot={false} />
      </svg>
      <line
        data-guide-arm
        data-guide-left
        x1={HERO_GUIDE_FALLBACK_ANCHOR_X}
        y1={HERO_GUIDE_FALLBACK_ANCHOR_Y}
        x2={HERO_GUIDE_FALLBACK_ANCHOR_X}
        y2={HERO_GUIDE_FALLBACK_ANCHOR_Y}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.15"
        strokeDasharray="0.2 1.05"
        vectorEffect="non-scaling-stroke"
      />
      <line
        data-guide-arm
        data-guide-right
        x1={HERO_GUIDE_FALLBACK_ANCHOR_X}
        y1={HERO_GUIDE_FALLBACK_ANCHOR_Y}
        x2={HERO_GUIDE_FALLBACK_ANCHOR_X}
        y2={HERO_GUIDE_FALLBACK_ANCHOR_Y}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />
      <circle data-guide-dot cx={HERO_GUIDE_FALLBACK_ANCHOR_X} cy={HERO_GUIDE_FALLBACK_ANCHOR_Y} r="0.42" fill="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function FortEmblemPaths({ clipId, includeDot = true }: { clipId: string; includeDot?: boolean }) {
  return (
    <>
      <g clipPath={`url(#${clipId})`}>
        <path d={svgPaths.pc43c700} fill="white" />
        {includeDot ? <path d={svgPaths.p1ff74880} fill="white" /> : null}
        <path d={svgPaths.p12623b00} fill="white" />
        <path d={svgPaths.p1baffc80} fill="white" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect fill="white" height="59" width="36" />
        </clipPath>
      </defs>
    </>
  );
}

function GuideTopIcon() {
  return (
    <g data-guide-icon aria-hidden="true">
      <path
        d="M50.85 5.25H51.75L52.05 7.35H52.62L53.22 10.95"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M51.95 5.25H52.68L52.68 7.35"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.15"
        vectorEffect="non-scaling-stroke"
      />
    </g>
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

function AlFahidiFortEmblem({ isScrolled }: { isScrolled: boolean }) {
  const clipId = `${useId().replace(/:/g, "")}-nav-emblem`;

  return (
    <span data-hero-guide-anchor className="relative grid h-[clamp(2.8rem,3.85vw,3.45rem)] w-[clamp(1.35rem,2.05vw,1.8rem)] shrink-0 place-items-center self-center">
      <svg
        className={`block size-full transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 36 59"
        aria-hidden="true"
      >
        <FortEmblemPaths clipId={clipId} />
      </svg>
    </span>
  );
}

function HeroHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { href: "#experience", label: "Experience" },
    { href: "#whats-on", label: "What's on" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact-us", label: "Contact Us" }
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-3 px-5 py-4 text-[#d3d7da] transition-colors duration-300 md:gap-5 md:px-[2.7vw] md:py-4 ${
        isScrolled || isMenuOpen ? "bg-[#243646] shadow-[0_1px_0_rgba(255,255,255,0.18)]" : "bg-transparent"
      }`}
    >
      <div className="grid min-w-[118px] gap-0.5 leading-none md:min-w-[150px]">
        <span className="font-display text-xl font-semibold md:text-3xl">حكومة دبي</span>
        <span className="text-[10px] font-bold uppercase tracking-wide">Government of Dubai</span>
      </div>

      <nav className="hidden flex-1 items-center justify-center gap-[clamp(1rem,2.05vw,2.55rem)] text-[clamp(1rem,1.28vw,1.35rem)] font-semibold md:flex">
        <Link href="#tickets" className="rounded-full border border-current px-7 py-1.5">Book Tickets</Link>
        <span className="flex items-center gap-4">
          <span>عربي</span>
          <span className="h-6 w-px bg-current/40" />
          <Search size={20} aria-hidden="true" />
        </span>
        <Link href="#experience">Experience</Link>
         <AlFahidiFortEmblem isScrolled={isScrolled} />
        <Link href="#whats-on">What's on</Link>
        <Link href="#faq">FAQ</Link>
        <Link href="#contact-us" className="underline underline-offset-4">Contact Us</Link>
      </nav>

      <div className="hidden min-w-[clamp(160px,18vw,300px)] text-right font-black leading-none tracking-normal text-[#d3d7da] md:block">
        <span className={`block transition-[font-size] duration-300 ${isScrolled ? "text-[clamp(2.25rem,3.2vw,3.7rem)]" : "text-[clamp(2.35rem,4vw,4.25rem)]"}`}>
          حصن الفهيدي
        </span>
        <span className={`mt-1 block text-[clamp(1rem,1.35vw,1.45rem)] font-semibold leading-none transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
          Al Fahidi Fort
        </span>
      </div>

      <button
        type="button"
        className="inline-grid size-11 place-items-center rounded-full border border-current text-[#d3d7da] md:hidden"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div
        className={`absolute left-0 right-0 top-full grid gap-2 bg-[#243646] px-5 pb-5 pt-2 text-lg font-semibold shadow-[0_16px_32px_rgba(0,0,0,0.18)] transition md:hidden ${
          isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <Link href="#tickets" onClick={() => setIsMenuOpen(false)} className="rounded-full border border-current px-5 py-2 text-center">
          Book Tickets
        </Link>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="border-b border-white/15 py-2">
            {link.label}
          </Link>
        ))}
        <div className="flex items-center justify-between py-2 text-base">
          <span>عربي</span>
          <Search size={20} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

function SocialRail({ copy }: { copy: SequenceCopy }) {
  return (
    <aside className="absolute left-3 top-[22vh] z-20 hidden h-[44vh] w-10 flex-col items-center justify-between text-[#d3d7da] md:flex">
      <p className="rotate-[-90deg] whitespace-nowrap text-lg font-semibold">{copy.socialHandle}</p>
      <div className="grid -translate-y-4 gap-3">
        <Instagram size={20} aria-label="Instagram" />
        <Facebook size={20} aria-label="Facebook" />
        <Twitter size={20} aria-label="Twitter" />
      </div>
      <p className="rotate-[-90deg] whitespace-nowrap text-lg font-semibold">{copy.socialLabel}</p>
    </aside>
  );
}

function EditorialStories({ copy }: { copy: SequenceCopy }) {
  const storyImages = [
    { image: assets.origins, variant: "circle" as const },
    { image: assets.fishing, variant: "circle" as const },
    { image: assets.architecture, variant: "circle" as const }
  ];
  const stories = copy.secondaryStories.map((story, index) => ({
    ...story,
    image: storyImages[index]?.image ?? assets.origins,
    variant: storyImages[index]?.variant ?? ("circle" as const)
  }));

  return (
    <section id="explore" className="bg-[#fbfbfb] px-5 py-8 md:px-9 md:py-14">
      <div className="mx-auto grid max-w-[1368px] gap-10">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[0.74fr_1.52fr] md:gap-7">
          <FeaturedCeremonialCard copy={copy} />
          <WideHistoryCard copy={copy} />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryArticle key={story.title} story={story} learnMore={copy.learnMore} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCeremonialCard({ copy }: { copy: SequenceCopy }) {
  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div data-marker-zone data-pop-image data-push-pop className="relative aspect-square overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(155deg,transparent_0,transparent_5px,rgba(36,54,70,0.18)_6px,transparent_7px)]" />
        <img data-scroll-marker src={assets.marker} alt="" className="absolute left-0 top-0 z-20 size-16 object-contain md:size-24" />
        <img src={assets.guidedObject} alt="" className="absolute inset-x-[9%] bottom-[4%] top-[4%] h-[92%] w-[82%] object-contain" />
      </div>
      <div className="grid gap-1">
        <h2 className="text-[clamp(1.35rem,3.6vw,3.55rem)] leading-[0.98] text-black">{copy.ceremonialTitle}</h2>
        <p className="text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">{copy.exhibitionUntil29}</p>
        <p className="max-w-[360px] text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">
          {copy.ceremonialDescription}
        </p>
        <Link href="#visit" className="mt-1 w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
          {copy.learnMore}
        </Link>
      </div>
    </article>
  );
}

function WideHistoryCard({ copy }: { copy: SequenceCopy }) {
  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div data-marker-zone className="relative">
        <div data-pop-image data-push-pop className="aspect-[1.95/1] overflow-hidden rounded-[999px] bg-white">
          <img src={assets.fort} alt="" className="h-full w-full object-cover grayscale" />
        </div>
        <img data-scroll-marker src={assets.marker} alt="" className="absolute left-0 top-0 z-20 size-14 object-contain opacity-0 md:size-24" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[0.92fr_1.08fr] md:gap-5">
        <div>
          <h2 className="text-[clamp(1.35rem,3.6vw,3.55rem)] leading-[0.98] text-black">{copy.historyTitle}</h2>
          <p className="mt-1 text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">{copy.exhibitionUntil29}</p>
        </div>
        <div className="grid content-start gap-3">
          <p className="text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">
            {copy.historyDescription}
          </p>
          <Link href="#visit" className="w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
            {copy.learnMore}
          </Link>
        </div>
      </div>
    </article>
  );
}

function StoryArticle({ story, learnMore }: { story: StoryCard; learnMore: string }) {
  const maskClass =
    story.variant === "wide"
      ? "aspect-[1.95/1] rounded-[999px]"
      : story.variant === "portrait"
        ? "aspect-[0.76/1] rounded-[999px]"
        : "aspect-square rounded-full";
  const imagePositionClass = story.title === "Origins and visions" ? "object-left" : "object-center";

  return (
    <article data-reveal-card className="grid min-w-0 gap-4">
      <div data-marker-zone className="relative">
        <div data-pop-image data-push-pop className={`overflow-hidden bg-[#dde2e3] ${maskClass}`}>
          <img src={story.image} alt={story.imageAlt} className={`h-full w-full object-cover ${imagePositionClass} transition duration-700 hover:scale-105`} />
        </div>
        <img data-scroll-marker src={assets.marker} alt="" className="absolute left-0 top-0 z-20 size-14 object-contain opacity-0 md:size-20" />
      </div>
      <div className="grid gap-1">
        <h2 className="text-[clamp(1.2rem,3.2vw,3.2rem)] leading-[0.98] text-black">{story.title}</h2>
        <p className="text-[clamp(0.58rem,1.4vw,0.875rem)] font-semibold text-black">{story.eyebrow}</p>
        <p className="max-w-[430px] text-[clamp(0.58rem,1.35vw,0.875rem)] leading-snug text-black">{story.description}</p>
        <Link href="#visit" className="mt-1 w-max rounded-full border border-[#243646] px-3 py-0.5 text-[clamp(0.58rem,1.35vw,0.75rem)] font-semibold transition hover:bg-[#243646] hover:text-white">
          {learnMore}
        </Link>
      </div>
    </article>
  );
}

function DarkFeature({ copy }: { copy: SequenceCopy }) {
  return (
    <section data-dark-feature id="visit" className="relative overflow-hidden bg-[#243646] text-[#d3d7da]">
      <div className="grid gap-10 px-5 py-12 md:hidden">
        <article className="grid gap-5">
          <div className="w-max rounded-full border border-[#d3d7da] px-4 py-1 text-lg">{copy.exhibition}</div>
          <div data-feature-visual className="relative aspect-square w-full max-w-[360px] justify-self-center">
            <div className="absolute inset-0 rounded-full bg-[#66727e]" />
            <img src={assets.guidedObject} alt="" className="absolute left-[10%] top-[-4%] h-[108%] w-[80%] object-contain" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(2.4rem,13vw,4.4rem)] leading-[0.9]">{copy.ceremonialTitle}</h2>
            <p className="mt-2 text-base font-semibold">{copy.exhibitionUntil29}</p>
            <p className="mt-4 max-w-[420px] text-base leading-snug">
              {copy.darkDescription}
            </p>
          </div>
        </article>

        <article className="grid gap-5">
          <div data-feature-visual data-conservation className="aspect-[1/1.05] w-full overflow-hidden rounded-t-full">
            <img src={assets.conservation} alt="" className="h-full w-full object-cover grayscale" />
          </div>
          <div>
            <h3 className="font-display text-[clamp(2.4rem,13vw,4.4rem)] leading-[0.9]">{copy.conservationTitle}</h3>
            <p className="mt-2 text-base font-semibold">{copy.exhibitionUntil29}</p>
          </div>
          <Link href="#guided-tour" className="inline-flex h-11 w-max items-center justify-center rounded-full border border-[#d3d7da] px-5 text-lg transition hover:bg-white hover:text-[#243646]">
            {copy.guideTour}
          </Link>
        </article>
      </div>

      <div className="relative mx-auto hidden aspect-[1440/860] w-full max-w-[1440px] overflow-hidden bg-[#243646] md:block">
        <svg className="pointer-events-none absolute inset-0 z-10 size-full text-[#d3d7da]" viewBox="0 0 1440 860" preserveAspectRatio="none" aria-hidden="true">
          <line data-artifact-line x1="208" y1="31" x2="558" y2="245" stroke="currentColor" pathLength="1" strokeDasharray="1" strokeDashoffset="1" strokeWidth="1.35" vectorEffect="non-scaling-stroke" />
          <line data-artifact-line x1="36" y1="56" x2="78" y2="522" stroke="currentColor" pathLength="1" strokeDasharray="1" strokeDashoffset="1" strokeWidth="1.35" vectorEffect="non-scaling-stroke" />
          <line data-conservation-line x1="818" y1="798" x2="960" y2="294" stroke="currentColor" pathLength="1" strokeDasharray="1" strokeDashoffset="1" strokeWidth="1.35" vectorEffect="non-scaling-stroke" />
          <line data-conservation-line x1="1010" y1="820" x2="1404" y2="537" stroke="currentColor" pathLength="1" strokeDasharray="1" strokeDashoffset="1" strokeWidth="1.35" vectorEffect="non-scaling-stroke" />
        </svg>

        <div data-feature-visual className="absolute left-[5.9%] top-[22.56%] aspect-square w-[39.86%]">
          <div className="absolute inset-0 rounded-full bg-[#66727e]" />
          <img
            data-artifact
            src={assets.guidedObject}
            alt=""
            className="absolute left-[10.45%] top-[-3.4%] h-[108.9%] w-[79.1%] object-cover"
          />
        </div>

        <div className="absolute left-[5.9%] top-[8.72%] z-20 w-[15.97%] font-display text-[#d3d7da]">
          <h2 className="text-[clamp(1.8rem,3.47vw,50px)] leading-[0.84]">{copy.ceremonialTitle}</h2>
          <p className="mt-1 whitespace-nowrap text-[clamp(0.72rem,1.39vw,20px)] leading-normal">
            <span className="text-white">{copy.heroEyebrow} </span>
            <span>{copy.heroDate}</span>
          </p>
          <p className="mt-[6px] text-[clamp(0.72rem,1.39vw,20px)] leading-normal">
            {copy.darkDescription}
          </p>
        </div>

        <div className="absolute left-[2.5%] top-[2.79%] z-20 flex w-[11.53%] items-center justify-center rounded-full border border-[#d3d7da] px-[1.04%] py-[0.14%]">
          <span className="font-display text-[clamp(1rem,2.08vw,30px)] leading-normal text-[#d3d7da]">{copy.exhibition}</span>
        </div>

        <div data-feature-visual data-conservation className="absolute left-[66.04%] top-[8.95%] h-[52.91%] w-[31.46%] overflow-hidden rounded-t-full">
          <img src={assets.conservation} alt="" className="absolute left-[-46.94%] top-0 h-full w-[180.25%] max-w-none object-cover grayscale" />
        </div>

        <div className="absolute left-[65.76%] top-[64.19%] z-20 w-[18.19%] font-display text-[#d3d7da]">
          <h3 className="whitespace-pre-wrap text-[clamp(1.8rem,3.47vw,50px)] leading-[0.84]">{copy.conservationTitle}</h3>
          <p className="whitespace-nowrap text-[clamp(0.72rem,1.39vw,20px)] leading-normal">
            <span className="text-white">{copy.heroEyebrow} </span>
            <span>{copy.heroDate}</span>
          </p>
        </div>

        <Link
          href="#guided-tour"
          className="absolute left-[56.67%] top-[91.4%] z-20 flex w-[13.61%] items-center justify-center rounded-full border border-[#d3d7da] px-[1.04%] py-[0.14%] font-display text-[clamp(1rem,2.08vw,30px)] leading-normal text-[#d3d7da] transition hover:bg-white hover:text-[#243646]"
        >
          {copy.guideTour}
        </Link>
      </div>
    </section>
  );

}

function ClosingExhibitionBand({ copy }: { copy: SequenceCopy }) {
  return (
    <section id="guided-tour" className="bg-[#e9ebec] px-5 pb-10 pt-6 md:px-9 md:pb-16 md:pt-8">
      <div className="mx-auto grid max-w-[1368px] grid-cols-1 gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-12">
        <article className="grid gap-6">
          <div data-marker-zone className="relative">
            <div data-pop-image className="relative aspect-[1.95/1] overflow-hidden rounded-full bg-transparent">
              <img src={assets.trade} alt="" className="absolute left-1/2 top-1/2 h-[118%] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-center grayscale" />
            </div>
            <img data-scroll-marker src={assets.marker} alt="" className="absolute left-0 top-0 z-20 size-16 object-contain opacity-0 md:size-24" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.95fr_1.05fr] md:gap-6">
            <div>
              <h2 className="font-display text-[clamp(1.35rem,4.8vw,5.6rem)] leading-[0.9] text-black">{copy.sourceTitle}</h2>
              <p className="mt-2 text-[clamp(0.58rem,1.4vw,1rem)] font-semibold text-[#243646]">{copy.exhibitionUntil29}</p>
            </div>
            <div className="grid gap-4">
              <p className="text-[clamp(0.58rem,1.35vw,1.125rem)] leading-snug text-black/85">
                {copy.sourceDescription}
              </p>
              <Link href="#explore" className="inline-flex h-8 w-max items-center justify-center whitespace-nowrap rounded-full border border-[#243646] px-4 text-[clamp(0.58rem,1.35vw,1rem)] font-semibold leading-none transition hover:bg-[#243646] hover:text-white">
                {copy.learnMore}
              </Link>
            </div>
          </div>
        </article>

        <article className="grid content-start gap-6">
          <div data-marker-zone className="relative">
            <div data-pop-image className="aspect-square overflow-hidden rounded-full bg-white">
              <img src={assets.ceremonialStone} alt="" className="h-full w-full object-cover" />
            </div>
            <img data-scroll-marker src={assets.marker} alt="" className="absolute left-0 top-0 z-20 size-16 object-contain opacity-0 md:size-24" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(1.35rem,4.8vw,5.6rem)] leading-[0.9] text-black">{copy.ceremonialTitle}</h2>
            <p className="mt-2 text-[clamp(0.58rem,1.4vw,1rem)] font-semibold text-[#243646]">{copy.exhibitionUntil29}</p>
            <p className="mt-4 text-[clamp(0.58rem,1.35vw,1.125rem)] leading-snug text-black/85">
              {copy.ceremonialShortDescription}
            </p>
            <Link href="#visit" className="mt-5 inline-flex h-8 w-max items-center justify-center whitespace-nowrap rounded-full border border-[#243646] px-4 text-[clamp(0.58rem,1.35vw,1rem)] font-semibold leading-none transition hover:bg-[#243646] hover:text-white">
              {copy.learnMore}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#bec3c7] px-5 py-8 text-black md:px-9 md:py-10">
      <div className="mx-auto grid max-w-[1368px] grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
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

        <div className="text-left md:text-right">
          <p className="text-[clamp(0.58rem,1.35vw,0.875rem)] font-semibold uppercase">Contact us</p>
          <p className="mt-2 text-[clamp(0.58rem,1.25vw,0.875rem)]">FAQs | Disclaimer | Terms of use | Privacy Policy</p>
          <p className="mt-2 text-[clamp(0.58rem,1.25vw,0.875rem)]">Contact Us Tel. 80033222</p>
        </div>
      </div>
    </footer>
  );
}
