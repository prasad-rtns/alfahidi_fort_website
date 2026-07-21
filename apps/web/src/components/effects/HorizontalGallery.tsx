"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/animations/gsap.config";
import { ImageReveal } from "@/components/effects/ImageReveal";
import { Lightbox, type LightboxItem } from "@/components/effects/Lightbox";

export type HorizontalGalleryItem = LightboxItem & {
  description?: string;
};

export function HorizontalGallery({
  title,
  description,
  items
}: {
  title: string;
  description?: string;
  items: HorizontalGalleryItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<LightboxItem | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || items.length < 2) return;

      const amount = () => Math.max(0, track.scrollWidth - section.clientWidth + 64);

      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(amount(), 1)}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      gsap.fromTo(
        "[data-horizontal-card]",
        { autoAlpha: 0, y: 60, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%"
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [items.length] }
  );

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-pearl py-20 text-ink md:py-28">
      <div className="section-shell mb-12 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <h2 className="font-display text-5xl leading-none md:text-7xl">{title}</h2>
        {description ? <p className="max-w-2xl text-lg leading-8">{description}</p> : null}
      </div>
      <div ref={trackRef} className="flex w-max gap-6 px-4 md:px-9">
        {items.map((item, index) => (
          <article
            key={`${item.src}-${index}`}
            data-horizontal-card
            className="w-[78vw] max-w-[520px] shrink-0 md:w-[38vw]"
          >
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setActiveItem(item)}
              aria-label={`Open ${item.title ?? item.alt}`}
            >
              <ImageReveal
                src={item.src}
                alt={item.alt}
                variant={index % 3 === 1 ? "arch" : index % 3 === 2 ? "wide" : "circle"}
                className="aspect-square w-full"
                sizes="(min-width: 1024px) 38vw, 78vw"
              />
              {item.title ? <h3 className="mt-6 font-display text-4xl leading-none">{item.title}</h3> : null}
              {item.description ? <p className="mt-3 text-base leading-7">{item.description}</p> : null}
            </button>
          </article>
        ))}
      </div>
      <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}
