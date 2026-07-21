import config from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

type PayloadMedia =
  | string
  | number
  | {
      id?: string | number;
      url?: string | null;
      alt?: string | null;
      filename?: string | null;
    }
  | null
  | undefined;

type PayloadSection = {
  id?: string;
  blockType?: string;
  type?: string;
  image?: PayloadMedia;
  video?: PayloadMedia;
  revealImage?: PayloadMedia;
  scenes?: PayloadSection[];
  items?: PayloadSection[];
  events?: PayloadSection[];
  [key: string]: unknown;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "ar" ? "ar" : "en";
  const slug = searchParams.get("slug") ?? "home";
  const payload = await getPayload({ config });

  const result = await payload
    .find({
      collection: "pages",
      where: {
        slug: {
          equals: slug
        }
      },
      depth: 2,
      limit: 1,
      locale,
      fallbackLocale: "en"
    })
    .catch((error: unknown) => {
      if (isMissingPagesTableError(error)) {
        return null;
      }

      throw error;
    });

  if (!result) {
    return NextResponse.json(
      {
        error: "Payload pages table is not initialized yet",
        slug
      },
      { status: 503 }
    );
  }

  const page = result.docs[0];

  if (!page) {
    return NextResponse.json({ error: "Page not found", slug }, { status: 404 });
  }

  return NextResponse.json({
    title: page.title,
    slug: page.slug,
    sections: Array.isArray(page.sections) ? page.sections.map(normalizeSection) : []
  });
}

function normalizeSection(section: PayloadSection) {
  const normalized: Record<string, unknown> = {
    ...section,
    type: section.type ?? section.blockType
  };

  delete normalized.blockType;
  normalized.image = normalizeMedia(section.image);
  normalized.video = normalizeMedia(section.video);
  normalized.revealImage = normalizeMedia(section.revealImage);

  if (Array.isArray(section.scenes)) {
    normalized.scenes = section.scenes.map(normalizeSection);
  }

  if (Array.isArray(section.items)) {
    normalized.items = section.items.map(normalizeSection);
  }

  if (Array.isArray(section.events)) {
    normalized.events = section.events.map(normalizeSection);
  }

  return normalized;
}

function normalizeMedia(media: PayloadMedia) {
  if (!media || typeof media === "string" || typeof media === "number") return null;

  return {
    id: media.id ? String(media.id) : undefined,
    url: media.url ?? (media.filename ? `/media/${media.filename}` : null),
    alt: media.alt ?? ""
  };
}

function isMissingPagesTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as {
    code?: string;
    message?: string;
    cause?: unknown;
  };

  return (
    candidate.code === "42P01" ||
    candidate.message?.includes('relation "pages" does not exist') === true ||
    isMissingPagesTableError(candidate.cause)
  );
}
