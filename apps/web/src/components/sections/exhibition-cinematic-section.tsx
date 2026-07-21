"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createProgressTimeline } from "@/animations/timeline.factory";
import { gsap, registerGsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ExhibitionCinematicContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  revealImage: string;
};

export function ExhibitionCinematicSection({ content }: { content: ExhibitionCinematicContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      if (!section) return;

      if (reducedMotion) {
        gsap.set("[data-cinematic-bg], [data-cinematic-title], [data-cinematic-copy], [data-cinematic-foreground]", {
          clearProps: "all",
          autoAlpha: 1
        });
        return;
      }

      gsap.set("[data-cinematic-bg]", {
        scale: 1.2,
        transformOrigin: "50% 48%"
      });
      gsap.set("[data-cinematic-title], [data-cinematic-copy]", {
        autoAlpha: 0,
        y: 100
      });
      gsap.set("[data-cinematic-line]", {
        scaleX: 0,
        transformOrigin: "left center"
      });
      gsap.set("[data-cinematic-foreground]", {
        scale: 0.86,
        y: 80,
        rotate: -6,
        autoAlpha: 0
      });

      const intro = gsap.timeline();
      intro
        .to("[data-cinematic-bg]", {
          scale: 1,
          duration: 1.6,
          ease: "power3.out"
        })
        .to(
          "[data-cinematic-title]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: "power4.out"
          },
          0.28
        )
        .to(
          "[data-cinematic-copy]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out"
          },
          0.48
        )
        .to(
          "[data-cinematic-line]",
          {
            scaleX: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out"
          },
          0.58
        )
        .to(
          "[data-cinematic-foreground]",
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            ease: "power3.out"
          },
          0.66
        );

      createProgressTimeline({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        steps: [
          {
            label: "hero-zoom",
            target: "[data-cinematic-camera]",
            startPercent: 0,
            endPercent: 25,
            to: {
              scale: 1.08,
              xPercent: -1.5,
              yPercent: -1,
              ease: "none"
            }
          },
          {
            label: "text-reveal-lines",
            target: "[data-cinematic-line]",
            startPercent: 25,
            endPercent: 50,
            to: {
              scaleX: 1.25,
              opacity: 0.65,
              ease: "none"
            }
          },
          {
            label: "image-movement",
            target: "[data-cinematic-bg]",
            startPercent: 50,
            endPercent: 75,
            to: {
              yPercent: -7,
              scale: 1.1,
              ease: "none"
            }
          },
          {
            target: "[data-cinematic-foreground]",
            startPercent: 50,
            endPercent: 75,
            to: {
              yPercent: -26,
              scale: 1.18,
              rotate: 8,
              ease: "none"
            }
          },
          {
            label: "next-scene-transition",
            target: "[data-cinematic-title], [data-cinematic-copy]",
            startPercent: 75,
            endPercent: 100,
            to: {
              autoAlpha: 0,
              y: -90,
              ease: "none"
            }
          },
          {
            target: "[data-cinematic-vignette]",
            startPercent: 75,
            endPercent: 100,
            to: {
              opacity: 0.82,
              ease: "none"
            }
          }
        ]
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-ink text-smoke">
      <div data-cinematic-camera className="absolute inset-0 will-change-transform">
        <img
          data-cinematic-bg
          src={content.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div
          data-cinematic-vignette
          className="absolute inset-0 opacity-55"
          style={{
            background:
              "radial-gradient(circle at 60% 34%, rgba(211,215,218,0.16), transparent 21%), radial-gradient(circle at 50% 50%, transparent 0%, rgba(36,54,70,0.68) 72%)"
          }}
        />
      </div>

      <div className="section-shell relative flex min-h-screen items-end pb-24 pt-36 md:pb-28">
        <div className="relative z-10 max-w-4xl">
          <p data-cinematic-copy className="text-sm uppercase tracking-[0.28em] text-smoke/90 md:text-base">
            {content.eyebrow}
          </p>
          <h1
            data-cinematic-title
            className="mt-5 max-w-[11ch] font-display text-7xl leading-[0.82] text-pearl md:text-[10.5rem]"
          >
            {content.title}
          </h1>
          <p data-cinematic-copy className="mt-8 max-w-xl text-xl leading-relaxed text-smoke md:text-2xl">
            {content.copy}
          </p>
        </div>

        <div className="pointer-events-none absolute right-[3%] top-[16%] z-10 hidden h-[52vh] w-[45vw] md:block">
          <span data-cinematic-line className="absolute left-[18%] top-[7%] h-px w-[68%] rotate-[40deg] bg-smoke/85" />
          <span data-cinematic-line className="absolute left-[13%] top-[10%] h-px w-[62%] rotate-[96deg] bg-smoke/85" />
          <span data-cinematic-line className="absolute left-[52%] top-[54%] h-px w-[45%] rotate-[-34deg] bg-smoke/75" />
        </div>

        <figure
          data-cinematic-foreground
          className="pointer-events-none absolute right-[5%] top-[27%] z-10 hidden aspect-square w-[min(33vw,440px)] overflow-hidden rounded-full bg-steel/80 shadow-2xl md:block"
        >
          <img src={content.revealImage} alt="" className="h-full w-full object-cover grayscale" />
          <figcaption className="sr-only">{content.title}</figcaption>
        </figure>

        <div className="pointer-events-none absolute right-0 top-24 z-10 hidden text-sm uppercase tracking-[0.26em] text-smoke [writing-mode:vertical-rl] lg:block">
          Al Fahidi Fort
        </div>
      </div>
    </section>
  );
}
