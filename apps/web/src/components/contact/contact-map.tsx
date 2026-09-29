"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export function ContactMap({ src, alt, zoomInLabel, zoomOutLabel, zoomLevelLabel, heightClassName = "h-[230px]" }: { src: string; alt: string; zoomInLabel: string; zoomOutLabel: string; zoomLevelLabel: string; heightClassName?: string }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className={`relative mt-6 ${heightClassName} overflow-hidden rounded-3xl border border-[#d3d7da] bg-[#e9eced]`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-200" style={{ transform: `scale(${zoom})` }} />
      <div className="absolute bottom-4 end-4 flex flex-col gap-2">
        <button type="button" onClick={() => setZoom((current) => Math.min(2, Math.round((current + 0.25) * 100) / 100))} disabled={zoom >= 2} aria-label={zoomInLabel} className="grid size-9 place-items-center rounded bg-white shadow-sm transition hover:bg-[#f1f3f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646] disabled:cursor-not-allowed disabled:opacity-50"><Plus size={17} aria-hidden="true" /></button>
        <button type="button" onClick={() => setZoom((current) => Math.max(1, Math.round((current - 0.25) * 100) / 100))} disabled={zoom <= 1} aria-label={zoomOutLabel} className="grid size-9 place-items-center rounded bg-white shadow-sm transition hover:bg-[#f1f3f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646] disabled:cursor-not-allowed disabled:opacity-50"><Minus size={17} aria-hidden="true" /></button>
      </div>
      <output className="sr-only" aria-live="polite">{zoomLevelLabel}: {Math.round(zoom * 100)}%</output>
    </div>
  );
}
