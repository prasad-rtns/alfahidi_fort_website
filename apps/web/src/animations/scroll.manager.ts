"use client";

import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap.config";

export type AnimationType = "fadeIn" | "fadeOut" | "scale" | "translate" | "rotate" | "pin" | "scrub";

export type ScrollScene = {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | Element | string;
  markers?: boolean;
  anticipatePin?: number;
  invalidateOnRefresh?: boolean;
};

export type AnimateSectionOptions = ScrollScene & {
  element: gsap.TweenTarget;
  type: AnimationType;
  duration?: number;
  ease?: string;
  opacity?: number;
  scale?: number;
  fromScale?: number;
  x?: number;
  y?: number;
  fromX?: number;
  fromY?: number;
  rotate?: number;
  fromRotate?: number;
  stagger?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
};

export type SmoothScrollController = {
  lenis: Lenis;
  destroy: () => void;
};

export function sceneDefaults(scene: ScrollScene, fallbackTrigger?: Element | string) {
  return {
    trigger: scene.trigger ?? fallbackTrigger,
    start: scene.start ?? "top 75%",
    end: scene.end ?? "bottom 25%",
    scrub: scene.scrub ?? 0.8,
    pin: scene.pin,
    markers: scene.markers,
    anticipatePin: scene.anticipatePin,
    invalidateOnRefresh: scene.invalidateOnRefresh ?? true
  };
}

export function createSmoothScroll(): SmoothScrollController {
  registerGsap();

  const lenis = new Lenis({
    duration: 1.15,
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9
  });

  const update = (time: number) => {
    lenis.raf(time * 1000);
  };

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.refresh();

  return {
    lenis,
    destroy: () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
    }
  };
}

export function animateSection(options: AnimateSectionOptions) {
  registerGsap();

  const trigger = options.trigger ?? firstElement(options.element);
  const scrollTrigger = {
    ...sceneDefaults(options, trigger),
    scrub: options.scrub
  };
  const duration = options.duration ?? 0.9;
  const ease = options.ease ?? (options.scrub ? "none" : "power3.out");

  switch (options.type) {
    case "fadeIn":
      return gsap.fromTo(
        options.element,
        { autoAlpha: 0, y: options.fromY ?? 32, ...options.from },
        {
          autoAlpha: options.opacity ?? 1,
          y: options.y ?? 0,
          duration,
          ease,
          stagger: options.stagger,
          ...options.to,
          scrollTrigger
        }
      );
    case "fadeOut":
      return gsap.fromTo(
        options.element,
        { autoAlpha: options.opacity ?? 1, y: options.fromY ?? 0, ...options.from },
        {
          autoAlpha: 0,
          y: options.y ?? -32,
          duration,
          ease,
          stagger: options.stagger,
          ...options.to,
          scrollTrigger
        }
      );
    case "scale":
      return gsap.fromTo(
        options.element,
        { scale: options.fromScale ?? 0.88, ...options.from },
        {
          scale: options.scale ?? 1,
          duration,
          ease,
          stagger: options.stagger,
          ...options.to,
          scrollTrigger
        }
      );
    case "translate":
      return gsap.fromTo(
        options.element,
        { x: options.fromX ?? 0, y: options.fromY ?? 48, ...options.from },
        {
          x: options.x ?? 0,
          y: options.y ?? 0,
          duration,
          ease,
          stagger: options.stagger,
          ...options.to,
          scrollTrigger
        }
      );
    case "rotate":
      return gsap.fromTo(
        options.element,
        { rotate: options.fromRotate ?? -12, ...options.from },
        {
          rotate: options.rotate ?? 12,
          duration,
          ease,
          stagger: options.stagger,
          ...options.to,
          scrollTrigger
        }
      );
    case "pin":
      return gsap.to(options.element, {
        duration: 0.01,
        scrollTrigger: {
          ...scrollTrigger,
          pin: options.pin ?? true,
          scrub: options.scrub ?? true
        }
      });
    case "scrub":
      return gsap.fromTo(
        options.element,
        { ...options.from },
        {
          duration,
          ease: "none",
          ...options.to,
          scrollTrigger: {
            ...scrollTrigger,
            scrub: options.scrub ?? true
          }
        }
      );
  }
}

function firstElement(target: gsap.TweenTarget): Element | undefined {
  if (target instanceof Element) return target;
  if (Array.isArray(target)) {
    return target.find((item): item is Element => item instanceof Element);
  }
  return undefined;
}
