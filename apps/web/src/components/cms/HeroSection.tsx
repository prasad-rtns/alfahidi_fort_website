import { ExhibitionCinematicSection } from "@/components/sections/exhibition-cinematic-section";
import { mediaUrl } from "@/lib/cms/pages";
import type { CmsHeroSection } from "@/lib/cms/types";

export function HeroSection({ section }: { section: CmsHeroSection }) {
  const image = mediaUrl(section.image);
  if (!image) return null;

  return (
    <ExhibitionCinematicSection
      content={{
        eyebrow: section.eyebrow ?? "",
        title: section.title,
        copy: section.description ?? "",
        image,
        revealImage: mediaUrl(section.revealImage) || image
      }}
    />
  );
}
