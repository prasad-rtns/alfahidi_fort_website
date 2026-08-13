"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isDomEventRejection } from "@/components/runtime/browser-event-rejection-guard";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

function normalizeBasePath(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

const appBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

function stripAppBasePath(pathname: string) {
  if (!appBasePath) return pathname;
  if (pathname === appBasePath) return "/";
  if (pathname.startsWith(`${appBasePath}/`)) return pathname.slice(appBasePath.length);
  return pathname;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const logicalPathname = stripAppBasePath(pathname ?? "");
  const shouldEnableSmoothScroll = /^\/(?:en|ar)\/?$/.test(logicalPathname);

  useEffect(() => {
    if (!shouldEnableSmoothScroll) {
      return;
    }

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

    const handleStartupError = (error: unknown) => {
      if (cancelled || isDomEventRejection(error)) {
        return;
      }

      if (process.env.NODE_ENV === "development") {
        console.error("Smooth scroll startup failed", error);
      }
    };

    const startSmoothScrollSafely = () => {
      void startSmoothScroll().catch(handleStartupError);
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(startSmoothScrollSafely, {
        timeout: 1500
      });
    } else {
      timeoutId = globalThis.setTimeout(startSmoothScrollSafely, 350);
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
  }, [reducedMotion, shouldEnableSmoothScroll]);

  return <>{children}</>;
}
