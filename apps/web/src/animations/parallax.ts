"use client";

import { gsap } from "@/animations/gsap.config";
import { sceneDefaults, type ScrollScene } from "@/animations/scroll.manager";

export type ParallaxAxis = "x" | "y";

export function parallax(targets: gsap.TweenTarget, scene: ScrollScene, amount = 120, axis: ParallaxAxis = "y") {
  return gsap.fromTo(
    targets,
    { [axis]: -amount },
    {
      [axis]: amount,
      ease: "none",
      scrollTrigger: {
        ...sceneDefaults(scene)
      }
    }
  );
}
