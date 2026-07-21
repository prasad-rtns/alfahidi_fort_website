import { MuseumTimeline } from "@/components/effects";
import { mediaUrl } from "@/lib/cms/pages";
import type { CmsTimelineSection } from "@/lib/cms/types";

export function TimelineSection({ section }: { section: CmsTimelineSection }) {
  const events =
    section.events?.map((event) => ({
      year: event.year,
      title: event.title,
      description: event.description,
      image: mediaUrl(event.image)
    })) ?? [];

  return <MuseumTimeline title={section.title} description={section.description} items={events} />;
}
