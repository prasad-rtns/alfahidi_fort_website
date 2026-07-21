import type { Block } from "payload";

export const CtaBanner: Block = {
  slug: "ctaBanner",
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "copy", type: "textarea", localized: true },
    { name: "href", type: "text", required: true },
    { name: "label", type: "text", localized: true, required: true }
  ]
};
