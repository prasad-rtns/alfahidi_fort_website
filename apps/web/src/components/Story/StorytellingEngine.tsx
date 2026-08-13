"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { publicAsset } from "@/lib/routing/public-asset";
import type { StoryAnimationType, StoryScene } from "@/components/Story/types";

const animationClass: Record<StoryAnimationType, string> = {
  fade: "rounded-full",
  zoom: "rounded-full",
  slide: "rounded-[260px]",
  parallax: "rounded-[260px]",
  maskReveal: "rounded-t-full"
};

export function StorytellingEngine({ scenes }: { scenes: StoryScene[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const orderedScenes = useMemo(() => [...scenes].sort((a, b) => a.order - b.order), [scenes]);

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      if (!section || orderedScenes.length === 0) return;

      if (reducedMotion) {
        gsap.set("[data-story-scene]", { position: "relative", autoAlpha: 1, y: 0 });
        gsap.set("[data-story-media]", { clearProps: "all" });
        return;
      }

      const sceneNodes = gsap.utils.toArray<HTMLElement>("[data-story-scene]", section);
      const mediaNodes = gsap.utils.toArray<HTMLElement>("[data-story-media]", section);
      const galleryNodes = gsap.utils.toArray<HTMLElement>("[data-gallery-image]", section);
      const progressNodes = gsap.utils.toArray<HTMLElement>("[data-story-progress]", section);
      const connectorNodes = gsap.utils.toArray<SVGPathElement>("[data-story-connector]", section);
      const firstScene = sceneNodes[0];
      const firstMedia = mediaNodes[0];
      const firstProgress = progressNodes[0];

      if (!firstScene || !firstMedia || !firstProgress) return;

      gsap.set(sceneNodes, { autoAlpha: 0, y: 80 });
      gsap.set(firstScene, { autoAlpha: 1, y: 0 });
      gsap.set(mediaNodes, {
        autoAlpha: 0,
        scale: 1.08,
        y: 80,
        clipPath: "circle(18% at 50% 50%)"
      });
      gsap.set(firstMedia, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        clipPath: "circle(52% at 50% 50%)"
      });
      gsap.set(connectorNodes, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(firstProgress, { scaleX: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${Math.max(orderedScenes.length, 2) * 95}%`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      orderedScenes.forEach((scene, index) => {
        const position = index;
        const sceneNode = sceneNodes[index];
        const mediaNode = mediaNodes[index];
        const previousScene = sceneNodes[index - 1];
        const previousMedia = mediaNodes[index - 1];
        const progressNode = progressNodes[index];

        if (!sceneNode || !mediaNode) return;

        if (index > 0 && previousScene && previousMedia) {
          timeline
            .to(previousScene, { autoAlpha: 0, y: -70, duration: 0.45, ease: "none" }, position - 0.42)
            .to(previousMedia, { autoAlpha: 0, y: -120, scale: 1.14, duration: 0.5, ease: "none" }, position - 0.42);
        }

        timeline
          .fromTo(
            sceneNode,
            { autoAlpha: 0, y: 95 },
            { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out" },
            position
          )
          .fromTo(mediaNode, mediaFrom(scene.animationType), mediaTo(scene.animationType), position)
          .to(connectorNodes, { strokeDashoffset: Math.max(0, 1 - (index + 1) / orderedScenes.length), duration: 0.68, ease: "none" }, position);

        if (progressNode) {
          timeline.to(progressNode, { scaleX: 1, duration: 0.68, ease: "none" }, position);
        }
      });

      timeline.to(galleryNodes, { yPercent: -18, stagger: 0.08, duration: 0.9, ease: "none" }, orderedScenes.length - 0.8);
      timeline.to("[data-story-stage]", { scale: 1.035, duration: 0.9, ease: "none" }, 0);
    },
    { scope: sectionRef, dependencies: [orderedScenes, reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-sand text-ink">
      <div data-story-stage className="section-shell relative grid min-h-screen gap-10 py-24 md:grid-cols-[0.82fr_1.18fr] md:items-center">
        <div className="relative z-10 min-h-[440px]">
          <p className="mb-8 text-sm uppercase tracking-[0.28em] text-copper">Scroll story</p>
          {orderedScenes.map((scene, index) => (
            <article
              key={scene.order}
              data-story-scene
              className="absolute inset-x-0 top-16 max-w-xl md:top-20"
              aria-hidden={index === 0 ? undefined : true}
            >
              <p className="text-lg text-copper">{scene.scene}</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.9] md:text-7xl">{scene.title}</h2>
              <p className="mt-6 text-lg leading-8">{scene.description}</p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm tabular-nums">{String(scene.order).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-ink/35" />
                <span className="text-sm capitalize">{scene.animationType.replace(/([A-Z])/g, " $1")}</span>
              </div>
            </article>
          ))}

          <div className="absolute bottom-0 left-0 flex w-full gap-2">
            {orderedScenes.map((scene) => (
              <span key={scene.order} className="h-px flex-1 bg-ink/20">
                <span data-story-progress className="block h-full origin-left scale-x-0 bg-copper" />
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden">
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 760 620" fill="none">
            <path data-story-connector pathLength="1" d="M72 80 L420 185 L672 70" stroke="#243646" strokeOpacity="0.4" />
            <path data-story-connector pathLength="1" d="M88 528 L365 344 L704 486" stroke="#243646" strokeOpacity="0.4" />
          </svg>

          {orderedScenes.map((scene, index) => (
            <figure
              key={scene.order}
              data-story-media
              className={`absolute left-1/2 top-1/2 h-[min(62vw,560px)] w-[min(72vw,700px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-pearl shadow-2xl ${animationClass[scene.animationType]}`}
            >
              {scene.video ? (
                <video src={publicAsset(scene.video)} muted playsInline preload="metadata" className="h-full w-full object-cover" />
              ) : (
                <img src={publicAsset(scene.image)} alt="" className="h-full w-full object-cover" />
              )}

              {index === orderedScenes.length - 1 && scene.galleryImages ? (
                <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-3">
                  {scene.galleryImages.map((image) => (
                    <img
                      key={image}
                      data-gallery-image
                      src={publicAsset(image)}
                      alt=""
                      className="aspect-square rounded-full border border-pearl/80 object-cover shadow-lg"
                    />
                  ))}
                </div>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function mediaFrom(type: StoryAnimationType): gsap.TweenVars {
  switch (type) {
    case "fade":
      return { autoAlpha: 0, y: 60, scale: 1.04, clipPath: "circle(46% at 50% 50%)" };
    case "zoom":
      return { autoAlpha: 0, y: 20, scale: 0.76, clipPath: "circle(36% at 50% 50%)" };
    case "slide":
      return { autoAlpha: 0, xPercent: 18, y: 80, scale: 1.04, clipPath: "inset(8% 0% 8% 0% round 280px)" };
    case "parallax":
      return { autoAlpha: 0, y: 130, scale: 1.14, clipPath: "inset(0% 8% 0% 8% round 280px)" };
    case "maskReveal":
      return { autoAlpha: 0, y: 90, scale: 1.08, clipPath: "inset(48% 0% 0% 0% round 320px 320px 0 0)" };
  }
}

function mediaTo(type: StoryAnimationType): gsap.TweenVars {
  switch (type) {
    case "fade":
      return { autoAlpha: 1, y: 0, scale: 1, clipPath: "circle(52% at 50% 50%)", duration: 0.62, ease: "power2.out" };
    case "zoom":
      return { autoAlpha: 1, y: 0, scale: 1, clipPath: "circle(52% at 50% 50%)", duration: 0.72, ease: "power3.out" };
    case "slide":
      return { autoAlpha: 1, xPercent: 0, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 280px)", duration: 0.66, ease: "power2.out" };
    case "parallax":
      return { autoAlpha: 1, y: -34, scale: 1.02, clipPath: "inset(0% 0% 0% 0% round 280px)", duration: 0.72, ease: "none" };
    case "maskReveal":
      return { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 320px 320px 0 0)", duration: 0.72, ease: "power2.out" };
  }
}
