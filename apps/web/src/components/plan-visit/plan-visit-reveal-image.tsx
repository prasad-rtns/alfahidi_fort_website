"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { publicAsset } from "@/lib/routing/public-asset";

type PlanVisitRevealImageProps = {
  src: string;
  alt: string;
};

export function PlanVisitRevealImage({ src, alt }: PlanVisitRevealImageProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const photo = photoRef.current;
    const marker = zone?.querySelector<HTMLElement>("[data-plan-marker]");
    if (!zone || !photo || !marker || !window.IntersectionObserver || (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      return;
    }

    photo.dataset.revealReady = "true";
    marker.dataset.revealReady = "true";

    const markerObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          marker.dataset.markerVisible = entry.isIntersecting ? "true" : "false";
        }
      },
      { rootMargin: "-6% 0px -6% 0px", threshold: 0.08 }
    );
    const popObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          photo.dataset.popVisible = entry.isIntersecting ? "true" : "false";
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    markerObserver.observe(zone);
    popObserver.observe(photo);

    return () => {
      markerObserver.disconnect();
      popObserver.disconnect();
      delete photo.dataset.revealReady;
      delete photo.dataset.popVisible;
      delete marker.dataset.revealReady;
      delete marker.dataset.markerVisible;
    };
  }, []);

  return (
    <div ref={zoneRef} className="relative h-[342px]">
      <div ref={photoRef} data-plan-pop className="relative h-full overflow-hidden rounded-[300px]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 48vw, 90vw" className="object-cover" />
      </div>
      <Image data-plan-marker src={publicAsset("/assets/plan-visit/a8b05.png")} alt="" width={104} height={104} className="absolute start-0 top-0" />
    </div>
  );
}
