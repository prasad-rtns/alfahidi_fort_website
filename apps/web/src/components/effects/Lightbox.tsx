"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

export function Lightbox({
  item,
  onClose
}: {
  item: LightboxItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-ink/95 p-4 text-smoke md:p-8" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-smoke/70 bg-ink/70"
      >
        <X size={21} />
      </button>
      <div className="relative mx-auto h-[78vh] max-w-6xl overflow-hidden rounded-[260px] bg-black">
        <Image src={item.src} alt={item.alt} fill sizes="96vw" className="object-contain" />
      </div>
      {(item.title || item.description) && (
        <div className="mx-auto mt-5 max-w-3xl text-center">
          {item.title ? <h3 className="font-display text-4xl text-pearl">{item.title}</h3> : null}
          {item.description ? <p className="mt-2 text-base leading-7">{item.description}</p> : null}
        </div>
      )}
    </div>
  );
}
