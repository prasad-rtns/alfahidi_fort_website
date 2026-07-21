"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/animations/gsap.config";

export type MuseumTimelineItem = {
  year: string;
  title: string;
  description?: string;
  image?: string;
};

export function MuseumTimeline({
  title,
  description,
  items
}: {
  title: string;
  description?: string;
  items: MuseumTimelineItem[];
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        "[data-museum-timeline-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 45%",
            scrub: 0.8
          }
        }
      );
      gsap.fromTo(
        "[data-museum-timeline-item]",
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%"
          }
        }
      );
    },
    { scope: ref, dependencies: [items.length] }
  );

  if (items.length === 0) return null;

  return (
    <section ref={ref} className="bg-ink px-4 py-24 text-smoke md:px-9">
      <div className="section-shell">
        <div className="mb-14 max-w-3xl">
          <h2 className="font-display text-5xl leading-none text-pearl md:text-7xl">{title}</h2>
          {description ? <p className="mt-6 text-lg leading-8">{description}</p> : null}
        </div>
        <div className="relative">
          <span className="absolute left-0 top-8 h-px w-full bg-smoke/20" />
          <span data-museum-timeline-line className="absolute left-0 top-8 h-px w-full origin-left scale-x-0 bg-smoke" />
          <div className="grid gap-8 md:grid-cols-4">
            {items.map((item, index) => (
              <article key={`${item.year}-${index}`} data-museum-timeline-item className="relative pt-16">
                <span className="absolute left-0 top-[25px] h-4 w-4 rounded-full border border-smoke bg-ink" />
                <p className="text-2xl text-pearl">{item.year}</p>
                <h3 className="mt-4 font-display text-4xl leading-none">{item.title}</h3>
                {item.description ? <p className="mt-4 text-base leading-7">{item.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
