"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/animations/gsap.config";
import { cn } from "@/components/ui/cn";
import { useInView } from "@/components/effects/useInView";
import { publicAsset } from "@/lib/routing/public-asset";

export type ImageRevealVariant = "circle" | "arch" | "wide";

export function ImageReveal({
  src,
  alt,
  variant = "circle",
  priority = false,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 42vw, 92vw"
}: {
  src: string;
  alt: string;
  variant?: ImageRevealVariant;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [containerRef, inView] = useInView<HTMLDivElement>();

  useGSAP(
    () => {
      registerGsap();
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image || !inView) return;

      gsap.fromTo(
        container,
        revealFrom(variant),
        {
          clipPath: revealTo(variant),
          duration: 1.05,
          ease: "power4.out"
        }
      );
      gsap.fromTo(image, { scale: 1.18, y: 36 }, { scale: 1, y: 0, duration: 1.25, ease: "power3.out" });
    },
    { scope: containerRef, dependencies: [inView, variant] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-sand", variantClassName(variant), className)}
      style={{ clipPath: revealFrom(variant).clipPath as string }}
    >
      <Image
        ref={imageRef}
        src={publicAsset(src)}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

function variantClassName(variant: ImageRevealVariant) {
  if (variant === "arch") return "rounded-t-full";
  if (variant === "wide") return "rounded-[260px]";
  return "rounded-full";
}

function revealFrom(variant: ImageRevealVariant): gsap.TweenVars {
  if (variant === "arch") return { clipPath: "inset(55% 0% 0% 0% round 320px 320px 0 0)" };
  if (variant === "wide") return { clipPath: "inset(0% 48% 0% 48% round 260px)" };
  return { clipPath: "circle(10% at 50% 50%)" };
}

function revealTo(variant: ImageRevealVariant) {
  if (variant === "arch") return "inset(0% 0% 0% 0% round 320px 320px 0 0)";
  if (variant === "wide") return "inset(0% 0% 0% 0% round 260px)";
  return "circle(52% at 50% 50%)";
}
