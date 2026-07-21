import type { Block } from "payload";

export const ImageSequence: Block = {
  slug: "imageSequence",
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "copy", type: "textarea", localized: true },
    {
      name: "frames",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true
    }
  ]
};
