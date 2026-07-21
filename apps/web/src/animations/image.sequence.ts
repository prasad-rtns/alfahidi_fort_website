"use client";

import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap.config";
import { sceneDefaults, type ScrollScene } from "@/animations/scroll.manager";

export type ImageSequenceOptions = ScrollScene & {
  canvas: HTMLCanvasElement;
  frames: string[];
  dpr?: number;
  fit?: "cover" | "contain";
  initialFrame?: number;
  onReady?: (images: HTMLImageElement[]) => void;
  onFrame?: (frame: number) => void;
};

export type ImageSequenceController = {
  images: HTMLImageElement[];
  progress: {
    frame: number;
  };
  render: (frame: number) => void;
  destroy: () => void;
};

let sequenceId = 0;

export async function createImageSequence(options: ImageSequenceOptions): Promise<ImageSequenceController> {
  registerGsap();

  if (options.frames.length === 0) {
    throw new Error("createImageSequence requires at least one frame.");
  }

  const images = await preloadFrames(options.frames);
  const progress = {
    frame: options.initialFrame ?? 0
  };
  const id = `image-sequence-${sequenceId++}`;
  const render = (frame: number) => {
    const image = images[Math.round(frame)] ?? images[0];
    if (!image) return;

    renderImageToCanvas({
      canvas: options.canvas,
      image,
      dpr: options.dpr,
      fit: options.fit ?? "cover"
    });
    options.onFrame?.(frame);
  };
  const resize = () => render(progress.frame);

  render(progress.frame);
  options.onReady?.(images);
  window.addEventListener("resize", resize);

  const tween = gsap.to(progress, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: () => render(progress.frame),
    scrollTrigger: {
      id,
      ...sceneDefaults(options, options.canvas),
      scrub: options.scrub ?? 0.8
    }
  });

  return {
    images,
    progress,
    render,
    destroy: () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getById(id)?.kill();
      tween.kill();
    }
  };
}

export async function preloadFrames(frames: string[]) {
  return Promise.all(frames.map(loadImage));
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image sequence frame: ${src}`));
  });
}

export function renderImageToCanvas({
  canvas,
  image,
  dpr = Math.min(window.devicePixelRatio || 1, 2),
  fit = "cover"
}: {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  dpr?: number;
  fit?: "cover" | "contain";
}) {
  if (!image || image.naturalWidth === 0 || image.naturalHeight === 0) return;

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);

  const scale =
    fit === "cover"
      ? Math.max(width / image.naturalWidth, height / image.naturalHeight)
      : Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}
