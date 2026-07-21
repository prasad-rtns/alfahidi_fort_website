"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

type HeroContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  revealImage: string;
};

export function HeroCircleReveal({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      if (!section || reducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.fromTo("[data-hero-mask]", { clipPath: "circle(4% at 72% 35%)" }, { clipPath: "circle(74% at 58% 48%)", ease: "none" }, 0)
        .fromTo("[data-hero-bg]", { scale: 1.15, filter: "grayscale(0.7) blur(3px)" }, { scale: 1, filter: "grayscale(0.1) blur(0px)", ease: "none" }, 0)
        .fromTo("[data-hero-line]", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, stagger: 0.12, ease: "none" }, 0.12)
        .fromTo("[data-hero-copy]", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "power2.out" }, 0.22)
        .to("[data-hero-title]", { yPercent: -18, ease: "none" }, 0.42);
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-ink text-smoke">
      <img data-hero-bg src={content.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
      <div className="absolute inset-0 bg-ink/70" />
      <div data-hero-mask className="absolute inset-0 overflow-hidden [clip-path:circle(18%_at_72%_35%)]">
        <img src={content.revealImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/20 mix-blend-multiply" />
      </div>

      <div className="section-shell relative flex min-h-screen items-end pb-28 pt-36">
        <div className="max-w-3xl">
          <p data-hero-copy className="text-sm uppercase tracking-[0.28em]">
            {content.eyebrow}
          </p>
          <h1 data-hero-title className="mt-5 font-display text-7xl leading-[0.85] text-pearl md:text-[9.5rem]">
            {content.title}
          </h1>
          <p data-hero-copy className="mt-8 max-w-xl text-xl leading-relaxed md:text-2xl">
            {content.copy}
          </p>
        </div>

        <div className="pointer-events-none absolute right-[6%] top-[18%] hidden h-[38vh] w-[36vw] md:block">
          <span data-hero-line className="absolute left-[18%] top-[16%] h-px w-[72%] rotate-[40deg] bg-smoke/80" />
          <span data-hero-line className="absolute left-[12%] top-[10%] h-px w-[50%] rotate-[96deg] bg-smoke/80" />
          <span className="absolute right-0 top-0 writing-mode-vertical text-sm uppercase tracking-[0.26em] [writing-mode:vertical-rl]">
            Al Fahidi Fort
          </span>
        </div>
      </div>
    </section>
  );
}
