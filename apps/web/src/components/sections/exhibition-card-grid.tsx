"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

type ExhibitionCard = {
  title: string;
  date: string;
  image: string;
};

export function ExhibitionCardGrid({ cards }: { cards: ExhibitionCard[] }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || reducedMotion) return;

      gsap.fromTo(
        "[data-card]",
        { y: 70, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%"
          }
        }
      );

      gsap.to("[data-card-image]", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section ref={ref} className="bg-pearl px-4 pb-28 md:px-9">
      <div className="section-shell grid gap-9 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} data-card className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-full bg-sand">
              <img data-card-image src={card.image} alt="" className="h-[112%] w-full object-cover" />
            </div>
            <div className="mt-8">
              <h3 className="font-display text-4xl leading-none md:text-5xl">{card.title}</h3>
              <p className="mt-3 text-lg">
                Exhibition until <span className="font-semibold">{card.date}</span>
              </p>
              <p className="mt-5 text-base leading-7">
                Archival context, object stories, and guided interpretation from the Al Fahidi Fort collection.
              </p>
              <button className="mt-5 rounded-full border border-ink px-4 py-2 text-sm transition hover:bg-ink hover:text-pearl">
                Learn more
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
