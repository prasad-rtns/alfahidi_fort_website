"use client";

import { useEffect } from "react";
import { registerGsap, ScrollTrigger } from "@/animations/gsap.config";
import { createSmoothScroll } from "@/animations/scroll.manager";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    registerGsap();

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const scroll = createSmoothScroll();

    return () => {
      scroll.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
