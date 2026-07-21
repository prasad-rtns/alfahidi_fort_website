import { BeforeAfterSlider, HorizontalGallery } from "@/components/effects";
import { mediaUrl } from "@/lib/cms/pages";
import type { CmsGallerySection } from "@/lib/cms/types";

export function GallerySection({ section }: { section: CmsGallerySection }) {
  const items =
    section.items
      ?.map((item) => ({
        src: mediaUrl(item.image),
        alt: item.image?.alt ?? item.title ?? section.title,
        title: item.title,
        description: item.description
      }))
      .filter((item) => item.src) ?? [];
  const beforeItem = items[0];
  const afterItem = items[1];
  const beforeAfter = beforeItem && afterItem ? { before: beforeItem, after: afterItem } : null;

  if (items.length === 0) return null;

  return (
    <>
      <HorizontalGallery title={section.title} description={section.description} items={items} />
      {beforeAfter ? (
        <section className="bg-pearl px-4 pb-24 text-ink md:px-9">
          <div className="section-shell">
            <BeforeAfterSlider
              before={beforeAfter.before.src}
              after={beforeAfter.after.src}
              beforeLabel={beforeAfter.before.title ?? "Before"}
              afterLabel={beforeAfter.after.title ?? "After"}
              title="Conservation comparison"
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
