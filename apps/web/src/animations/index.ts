"use client";

export { gsap, killScrollAnimations, refreshScroll, registerGsap, ScrollTrigger } from "@/animations/gsap.config";
export { fadeIn, fadeOut } from "@/animations/fade";
export { createImageSequence, loadImage, preloadFrames, renderImageToCanvas } from "@/animations/image.sequence";
export { parallax } from "@/animations/parallax";
export { animateSection, createSmoothScroll, sceneDefaults } from "@/animations/scroll.manager";
export { alFahidiHomeProgressMap, createProgressTimeline, createScrollTimeline } from "@/animations/timeline.factory";
export { zoom } from "@/animations/zoom";
export type { ImageSequenceController, ImageSequenceOptions } from "@/animations/image.sequence";
export type { AnimateSectionOptions, AnimationType, ScrollScene, SmoothScrollController } from "@/animations/scroll.manager";
export type { ProgressTimelineOptions, TimelineStep } from "@/animations/timeline.factory";
