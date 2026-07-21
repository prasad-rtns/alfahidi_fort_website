"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useInView<TElement extends Element>({
  rootMargin = "160px",
  threshold = 0.12,
  once = true
}: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
} = {}): [RefObject<TElement | null>, boolean] {
  const ref = useRef<TElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        setInView(visible);

        if (visible && once) {
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
