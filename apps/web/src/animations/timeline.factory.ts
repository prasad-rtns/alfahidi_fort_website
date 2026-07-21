"use client";

import { gsap } from "@/animations/gsap.config";
import { sceneDefaults, type ScrollScene } from "@/animations/scroll.manager";

export type TimelineStep = {
  target: gsap.TweenTarget;
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  startPercent: number;
  endPercent: number;
  label?: string;
};

export type ProgressTimelineOptions = ScrollScene & {
  steps: TimelineStep[];
  defaults?: gsap.TweenVars;
};

export const alFahidiHomeProgressMap = [
  { range: "0-25%", label: "Hero zoom and circular reveal" },
  { range: "25-50%", label: "Text reveal and line mapping" },
  { range: "50-75%", label: "Image movement and artifact rotation" },
  { range: "75-100%", label: "Next scene transition" }
] as const;

export function createScrollTimeline(scene: ScrollScene, vars?: gsap.TimelineVars) {
  return gsap.timeline({
    ...vars,
    scrollTrigger: {
      ...sceneDefaults(scene)
    }
  });
}

export function createProgressTimeline(options: ProgressTimelineOptions) {
  const timeline = createScrollTimeline(options, {
    defaults: options.defaults
  });

  options.steps.forEach((step) => {
    const start = clampProgress(step.startPercent);
    const end = clampProgress(step.endPercent);
    const duration = Math.max(end - start, 0.01);

    if (step.label) {
      timeline.addLabel(step.label, start);
    }

    if (step.from) {
      timeline.fromTo(step.target, step.from, { ...step.to, duration }, start);
      return;
    }

    timeline.to(step.target, { ...step.to, duration }, start);
  });

  return timeline;
}

function clampProgress(percent: number) {
  return Math.min(Math.max(percent / 100, 0), 1);
}
