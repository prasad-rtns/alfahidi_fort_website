import type { Block } from "payload";

export const StorySplitMedia: Block = {
  slug: "storySplitMedia",
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "copy", type: "textarea", localized: true },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "artifactImage", type: "upload", relationTo: "media" }
  ]
};
