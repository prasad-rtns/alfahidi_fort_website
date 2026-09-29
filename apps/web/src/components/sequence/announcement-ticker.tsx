"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const SEPARATOR = "    ";

type AnnouncementTickerProps = {
  items: readonly string[];
  pauseLabel: string;
  playLabel: string;
};

/**
 * Continuously scrolling announcements. The text is rendered twice for a seamless loop; the
 * second copy is hidden from assistive technology. Motion stops on hover, on keyboard focus,
 * via the pause button (WCAG 2.2.2) and when the user prefers reduced motion.
 */
export function AnnouncementTicker({ items, pauseLabel, playLabel }: AnnouncementTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const text = items.join(SEPARATOR);

  return (
    <div data-ticker data-paused={isPaused} className="flex items-center gap-2 md:gap-3">
      <div className="min-w-0 flex-1 overflow-hidden rounded-full bg-[#995d3e] text-white">
        <p data-ticker-track className="w-max animate-[landing-marquee_28s_linear_infinite] whitespace-pre px-3 py-2 text-[clamp(1rem,6vw,2.5rem)] leading-none">
          <span>{text}</span>
          <span aria-hidden="true">{`${SEPARATOR}${text}`}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-label={isPaused ? playLabel : pauseLabel}
        className="grid size-11 shrink-0 place-items-center rounded-full bg-[#995d3e] text-white transition hover:bg-[#243646] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243646]"
      >
        {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
