import type { Block, Field } from "payload";

const detailFields: Field[] = [
  { name: "label", type: "text", localized: true },
  { name: "title", type: "text", localized: true, required: true },
  { name: "copy", type: "textarea", localized: true },
  { name: "image", type: "upload", relationTo: "media", required: true }
];

export const ConnectedDetailPair: Block = {
  slug: "connectedDetailPair",
  fields: [
    { name: "left", type: "group", fields: detailFields },
    { name: "right", type: "group", fields: detailFields }
  ]
};
