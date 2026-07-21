import { GallerySection } from "@/components/cms/GallerySection";
import { HeroSection } from "@/components/cms/HeroSection";
import { StorySection } from "@/components/cms/StorySection";
import { TimelineSection } from "@/components/cms/TimelineSection";
import type { CmsSection } from "@/lib/cms/types";

export function DynamicSections({ sections }: { sections: CmsSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = section.id ?? `${section.type}-${index}`;

        switch (section.type) {
          case "hero":
            return <HeroSection key={key} section={section} />;
          case "story":
            return <StorySection key={key} section={section} />;
          case "gallery":
            return <GallerySection key={key} section={section} />;
          case "timeline":
            return <TimelineSection key={key} section={section} />;
        }
      })}
    </>
  );
}
