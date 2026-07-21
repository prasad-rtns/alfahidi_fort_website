import type { Block } from "payload";

export const HeroCircleReveal: Block = {
  slug: "heroCircleReveal",
  labels: {
    singular: "Hero Circle Reveal",
    plural: "Hero Circle Reveals"
  },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true, required: true },
    { name: "copy", type: "textarea", localized: true },
    { name: "backgroundImage", type: "upload", relationTo: "media", required: true },
    { name: "revealImage", type: "upload", relationTo: "media", required: true }
  ]
};
