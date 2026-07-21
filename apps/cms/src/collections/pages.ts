import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated } from "@/access/published-or-authenticated";
import { pageSectionBlocks } from "@/blocks/page-sections";
import { revalidateCollection } from "@/hooks/revalidate-web";

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: {
    drafts: {
      autosave: true
    }
  },
  access: {
    read: publishedOrAuthenticated
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"]
  },
  hooks: {
    afterChange: [revalidateCollection]
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true
    },
    {
      name: "sections",
      type: "blocks",
      blocks: pageSectionBlocks
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text", localized: true },
        { name: "description", type: "textarea", localized: true },
        { name: "image", type: "upload", relationTo: "media" }
      ]
    }
  ]
};
