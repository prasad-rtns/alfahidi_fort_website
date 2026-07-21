import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated } from "@/access/published-or-authenticated";
import { revalidateCollection } from "@/hooks/revalidate-web";

export const Exhibitions: CollectionConfig = {
  slug: "exhibitions",
  versions: {
    drafts: true
  },
  access: {
    read: publishedOrAuthenticated
  },
  admin: {
    useAsTitle: "title"
  },
  hooks: {
    afterChange: [revalidateCollection]
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
    { name: "coverImage", type: "upload", relationTo: "media", required: true },
    {
      name: "mask",
      type: "select",
      defaultValue: "circle",
      options: ["circle", "arch", "wide"]
    },
    {
      name: "relatedArtifacts",
      type: "relationship",
      relationTo: "artifacts",
      hasMany: true
    }
  ]
};
