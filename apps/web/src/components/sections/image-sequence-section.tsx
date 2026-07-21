"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

type ImageSequenceContent = {
  title: string;
  copy: string;
  frames: string[];
};

export function ImageSequenceSection({ content }: { content: ImageSequenceContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const playheadRef = useRef({ frame: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      content.frames.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = () => resolve(image);
          })
      )
    ).then((images) => {
      if (cancelled) return;
      imagesRef.current = images;
      renderFrame(0);
    });

    return () => {
      cancelled = true;
    };
  }, [content.frames]);

  function renderFrame(index: number) {
    const canvas = canvasRef.current;
    const image = imagesRef.current[Math.round(index)];
    if (!canvas || !image) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const context = canvas.getContext("2d");
    if (!context || image.naturalWidth === 0 || image.naturalHeight === 0) return;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, rect.width, rect.height);

    const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.drawImage(image, (rect.width - width) / 2, (rect.height - height) / 2, width, height);
  }

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || reducedMotion) return;

      gsap.to(playheadRef.current, {
        frame: content.frames.length - 1,
        ease: "none",
        onUpdate: () => renderFrame(playheadRef.current.frame),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8
        }
      });

      gsap.fromTo(
        "[data-sequence-copy]",
        { autoAlpha: 0, y: 45 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 25%",
            scrub: 0.8
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [content.frames.length, reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-sand text-ink">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-0 bg-pearl/55" />
      <div className="section-shell relative flex min-h-screen items-end pb-20">
        <div className="max-w-3xl">
          <h2 data-sequence-copy className="font-display text-6xl leading-none md:text-8xl">
            {content.title}
          </h2>
          <p data-sequence-copy className="mt-6 max-w-2xl text-xl leading-8">
            {content.copy}
          </p>
        </div>
      </div>
    </section>
  );
}
