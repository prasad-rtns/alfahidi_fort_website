"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/animations/gsap.config";
import { useReducedMotion } from "@/lib/scroll/use-reduced-motion";

type Detail = {
  label: string;
  title: string;
  copy: string;
  image: string;
};

type ConnectedPairContent = {
  left: Detail;
  right: Detail;
};

export function ConnectedDetailPair({ content }: { content: ConnectedPairContent }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || reducedMotion) return;

      gsap.set("[data-connector]", { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1
        }
      });

      tl.fromTo("[data-left-artifact]", { scale: 0.78, rotate: -10 }, { scale: 1, rotate: 10, ease: "none" }, 0)
        .fromTo("[data-right-image]", { y: 120, clipPath: "inset(18% 0 18% 0 round 240px)" }, { y: 0, clipPath: "inset(0% 0 0% 0 round 240px)", ease: "none" }, 0.08)
        .to("[data-connector]", { strokeDashoffset: 0, stagger: 0.16, ease: "none" }, 0.18)
        .fromTo("[data-detail-text]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.12, ease: "power2.out" }, 0.28)
        .to("[data-label]", { y: -18, ease: "none" }, 0.45);
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-ink px-4 py-24 text-smoke md:px-9">
      <div className="section-shell relative min-h-[760px]">
        <div data-label className="absolute left-0 top-0 rounded-full border border-smoke px-5 py-1 text-2xl">
          {content.left.label}
        </div>
        <div data-label className="absolute bottom-10 right-[31%] rounded-full border border-smoke px-5 py-1 text-2xl">
          {content.right.label}
        </div>

        <div className="absolute left-[4%] top-[9%] max-w-[280px]">
          <h2 data-detail-text className="font-display text-5xl leading-[0.9]">
            {content.left.title}
          </h2>
          <p data-detail-text className="mt-4 text-lg leading-7">
            {content.left.copy}
          </p>
        </div>

        <div className="absolute left-[10%] top-[27%] grid h-[min(48vw,574px)] w-[min(48vw,574px)] place-items-center rounded-full bg-steel">
          <img
            data-left-artifact
            src={content.left.image}
            alt=""
            className="h-[108%] w-[78%] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute right-0 top-[7%] h-[455px] w-[min(36vw,453px)] overflow-hidden bg-sand">
          <img data-right-image src={content.right.image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="absolute bottom-[14%] right-[10%] max-w-[310px]">
          <h3 data-detail-text className="font-display text-5xl leading-[0.9]">
            {content.right.title}
          </h3>
          <p data-detail-text className="mt-4 text-lg leading-7">
            {content.right.copy}
          </p>
        </div>

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1368 760" fill="none">
          <path data-connector pathLength="1" d="M170 88 L565 330" stroke="#D3D7DA" strokeWidth="2" />
          <path data-connector pathLength="1" d="M64 120 L96 565" stroke="#D3D7DA" strokeWidth="2" />
          <path data-connector pathLength="1" d="M925 118 L835 575" stroke="#D3D7DA" strokeWidth="2" />
          <path data-connector pathLength="1" d="M1035 522 L1315 702" stroke="#D3D7DA" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
