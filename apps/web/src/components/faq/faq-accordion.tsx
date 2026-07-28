"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-12 divide-y divide-[#d3d7da] border-y border-[#d3d7da]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="py-8">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 text-left text-[clamp(1.25rem,2.5vw,1.875rem)] leading-snug"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full border border-[#243646] ${
                  isOpen ? "bg-[#243646] text-white" : "bg-transparent text-[#243646]"
                }`}
                aria-hidden="true"
              >
                {isOpen ? <Minus className="size-4" strokeWidth={2.5} /> : <Plus className="size-4" strokeWidth={2.5} />}
              </span>
            </button>
            {isOpen ? <p className="mt-6 max-w-[1280px] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
