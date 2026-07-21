"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

type StoryContent = {
  title: string;
  copy: string;
  image: string;
  artifact: string;
};

export function StorySplitMedia({ content }: { content: StoryContent }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || reducedMotion) return;

      gsap.fromTo(
        "[data-story-image]",
        { y: 100, scale: 1.08 },
        {
          y: -70,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        "[data-artifact]",
        { rotate: -18, y: 60 },
        {
          rotate: 18,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 10%",
            scrub: 1
          }
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section ref={ref} className="bg-pearl px-4 py-24 text-ink md:px-9 md:py-32">
      <div className="section-shell grid gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] md:items-center">
        <div className="relative min-h-[520px] overflow-hidden rounded-full bg-sand">
          <img data-story-image src={content.image} alt="" className="absolute inset-0 h-[120%] w-full object-cover" />
        </div>
        <div className="relative">
          <img
            data-artifact
            src={content.artifact}
            alt=""
            className="mx-auto mb-10 aspect-square w-56 rounded-full object-contain md:w-72"
          />
          <h2 className="font-display text-5xl leading-none md:text-7xl">{content.title}</h2>
          <p className="mt-6 text-lg leading-8">{content.copy}</p>
        </div>
      </div>
    </section>
  );
}
