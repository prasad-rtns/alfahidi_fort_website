"use client";

import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  title
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <figure className="relative overflow-hidden rounded-[260px] bg-sand">
      <div className="relative aspect-[16/9] min-h-[320px]">
        <Image src={after} alt={afterLabel} fill sizes="(min-width: 1024px) 72vw, 94vw" className="object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <Image src={before} alt={beforeLabel} fill sizes="(min-width: 1024px) 72vw, 94vw" className="max-w-none object-cover" />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
          <span className="absolute inset-y-0 w-px bg-pearl" />
          <span className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-pearl bg-ink/80 text-smoke">
            <ChevronsLeftRight size={20} />
          </span>
        </div>
        <input
          aria-label="Compare before and after images"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="absolute inset-x-6 bottom-6 accent-copper"
        />
        <span className="absolute left-6 top-6 rounded-full bg-ink/75 px-4 py-1 text-sm text-smoke">{beforeLabel}</span>
        <span className="absolute right-6 top-6 rounded-full bg-ink/75 px-4 py-1 text-sm text-smoke">{afterLabel}</span>
      </div>
      {title ? <figcaption className="px-6 py-4 font-display text-3xl text-ink">{title}</figcaption> : null}
    </figure>
  );
}
