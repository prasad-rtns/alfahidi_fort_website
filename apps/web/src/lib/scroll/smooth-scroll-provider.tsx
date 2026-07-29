"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const startSmoothScroll = async () => {
      if (reducedMotion) {
        const { registerGsap, ScrollTrigger } = await import("@/animations/gsap.config");
        if (cancelled) return;

        registerGsap();
        ScrollTrigger.refresh();
        return;
      }

      const { createSmoothScroll } = await import("@/animations/scroll.manager");
      if (cancelled) return;

      const scroll = createSmoothScroll();
      cleanup = () => scroll.destroy();
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(startSmoothScroll, { timeout: 1500 });
    } else {
      timeoutId = globalThis.setTimeout(startSmoothScroll, 350);
    }

    return () => {
      cancelled = true;
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
      cleanup?.();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
