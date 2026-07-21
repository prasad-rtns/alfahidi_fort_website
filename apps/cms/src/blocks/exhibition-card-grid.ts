import type { Block } from "payload";

export const ExhibitionCardGrid: Block = {
  slug: "exhibitionCardGrid",
  fields: [
    {
      name: "items",
      type: "relationship",
      relationTo: "exhibitions",
      hasMany: true,
      required: true
    }
  ]
};
