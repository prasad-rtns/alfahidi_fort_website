"use client";

import { gsap } from "@/animations/gsap.config";
import { animateSection, type ScrollScene } from "@/animations/scroll.manager";

export function zoom(targets: gsap.TweenTarget, scene: ScrollScene, from = 0.72, to = 1.12) {
  return animateSection({
    element: targets,
    type: "scale",
    fromScale: from,
    scale: to,
    scrub: scene.scrub ?? true,
    ...scene
  });
}
