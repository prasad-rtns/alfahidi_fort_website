"use client";

export function AnnouncementMarquee({ message }: { message: string }) {
  return (
    <section className="relative z-10 -mt-7 px-4 md:px-9">
      <div className="mx-auto h-14 max-w-experience overflow-hidden rounded-full bg-copper text-pearl">
        <div className="flex h-full min-w-max animate-[marquee_28s_linear_infinite] items-center gap-12 whitespace-nowrap px-5 text-xl md:text-3xl">
          <span>{message}</span>
          <span>{message}</span>
          <span>{message}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
