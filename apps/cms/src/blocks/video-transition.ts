import type { Block } from "payload";

export const VideoTransition: Block = {
  slug: "videoTransition",
  fields: [
    { name: "title", type: "text", localized: true },
    { name: "video", type: "upload", relationTo: "media", required: true },
    { name: "poster", type: "upload", relationTo: "media" }
  ]
};
