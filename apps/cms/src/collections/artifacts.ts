import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated } from "@/access/published-or-authenticated";

export const Artifacts: CollectionConfig = {
  slug: "artifacts",
  access: {
    read: publishedOrAuthenticated
  },
  admin: {
    useAsTitle: "title"
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "era", type: "text", localized: true },
    { name: "provenance", type: "textarea", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "model",
      type: "group",
      fields: [
        { name: "glb", type: "upload", relationTo: "media" },
        { name: "poster", type: "upload", relationTo: "media" }
      ]
    }
  ]
};
