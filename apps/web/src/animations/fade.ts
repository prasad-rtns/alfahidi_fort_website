"use client";

import { gsap } from "@/animations/gsap.config";
import { animateSection, type ScrollScene } from "@/animations/scroll.manager";

export function fadeIn(targets: gsap.TweenTarget, trigger: Element | string, scene?: Omit<ScrollScene, "trigger">) {
  return animateSection({
    element: targets,
    type: "fadeIn",
    trigger,
    start: "top 78%",
    stagger: 0.08,
    ...scene
  });
}

export function fadeOut(targets: gsap.TweenTarget, trigger: Element | string, scene?: Omit<ScrollScene, "trigger">) {
  return animateSection({
    element: targets,
    type: "fadeOut",
    trigger,
    start: "top 35%",
    end: "bottom top",
    ...scene
  });
}
