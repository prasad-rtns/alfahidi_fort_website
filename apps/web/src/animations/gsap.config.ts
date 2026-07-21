"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function registerGsap() {
  if (registered) return;

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({
    ease: "power3.out"
  });
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true
  });
  registered = true;
}

export function refreshScroll() {
  registerGsap();
  ScrollTrigger.refresh();
}

export function killScrollAnimations(scope?: Element | string) {
  registerGsap();
  const root = typeof scope === "string" ? document.querySelector(scope) : scope;

  ScrollTrigger.getAll().forEach((trigger) => {
    if (!root || (trigger.trigger instanceof Element && root.contains(trigger.trigger))) {
      trigger.kill();
    }
  });
}

export { gsap, ScrollTrigger };
