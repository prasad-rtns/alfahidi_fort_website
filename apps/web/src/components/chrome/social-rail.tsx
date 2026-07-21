import { Facebook, Instagram, Twitter } from "lucide-react";

export function SocialRail() {
  return (
    <aside className="fixed left-9 top-[332px] z-40 hidden flex-col items-center gap-8 text-smoke lg:flex">
      <span className="whitespace-nowrap text-xl [writing-mode:vertical-rl]">@alfahidifort</span>
      <div className="flex flex-col gap-3">
        <Instagram size={20} />
        <Facebook size={20} />
        <Twitter size={20} />
      </div>
      <span className="whitespace-nowrap text-xl [writing-mode:vertical-rl]">Find us on social media</span>
    </aside>
  );
}
