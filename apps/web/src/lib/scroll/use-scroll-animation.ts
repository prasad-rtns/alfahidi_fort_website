"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { fadeIn } from "@/animations/fade";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

export function useSectionReveal(ref: RefObject<HTMLElement>) {
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || reducedMotion) return;

      fadeIn(gsap.utils.toArray("[data-reveal]", ref.current), ref.current);
    },
    { scope: ref, dependencies: [reducedMotion] }
  );
}
