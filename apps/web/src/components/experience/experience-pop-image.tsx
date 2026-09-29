"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type ExperiencePopImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function ExperiencePopImage({ src, alt, priority = false }: ExperiencePopImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !window.IntersectionObserver || (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === image) {
            image.dataset.popVisible = entry.isIntersecting ? "true" : "false";
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    image.dataset.popReady = "true";
    observer.observe(image);

    return () => {
      observer.disconnect();
      delete image.dataset.popReady;
      delete image.dataset.popVisible;
    };
  }, []);

  return (
    <div ref={imageRef} data-experience-pop className="relative aspect-[1.95/1] w-full max-w-[640px] overflow-hidden rounded-[999px] bg-[#d9d4d0]">
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 640px, 90vw" className="object-cover" />
    </div>
  );
}
