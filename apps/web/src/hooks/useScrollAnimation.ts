"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/animations/gsap.config";
import {
  animateSection,
  type AnimateSectionOptions,
  type AnimationType,
  type ScrollScene
} from "@/animations/scroll.manager";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type UseScrollAnimationOptions<TElement extends HTMLElement> = Omit<
  AnimateSectionOptions,
  "element" | "trigger" | "type"
> & {
  type: AnimationType;
  selector?: string;
  trigger?: Element | string | RefObject<HTMLElement>;
  disabled?: boolean;
  scope?: RefObject<TElement>;
};

export function useScrollAnimation<TElement extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions<TElement>
) {
  const internalScope = useRef<TElement>(null);
  const scope = options.scope ?? internalScope;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();

      const root = scope.current;
      if (!root || options.disabled || reducedMotion) return;

      const element = options.selector ? gsap.utils.toArray<HTMLElement>(options.selector, root) : root;
      const trigger = resolveTrigger(options.trigger) ?? root;
      const animation = animateSection({
        ...options,
        element,
        trigger
      });

      return () => {
        animation.kill();
      };
    },
    {
      scope,
      dependencies: [
        options.type,
        options.selector,
        options.disabled,
        options.duration,
        options.scrub,
        options.start,
        options.end,
        reducedMotion
      ]
    }
  );

  return scope;
}

export function usePinnedScrub<TElement extends HTMLElement = HTMLElement>(
  scene?: Omit<ScrollScene, "trigger" | "pin" | "scrub">
) {
  return useScrollAnimation<TElement>({
    type: "pin",
    start: "top top",
    end: "+=120%",
    ...scene,
    pin: true,
    scrub: true
  });
}

function resolveTrigger(trigger?: Element | string | RefObject<HTMLElement>) {
  if (!trigger) return undefined;
  if (typeof trigger === "string" || trigger instanceof Element) return trigger;
  return trigger.current ?? undefined;
}
