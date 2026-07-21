import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidate-web";

export const Footer: GlobalConfig = {
  slug: "footer",
  hooks: {
    afterChange: [revalidateGlobal]
  },
  fields: [
    { name: "newsletterTitle", type: "text", localized: true },
    { name: "newsletterCopy", type: "textarea", localized: true },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true }
      ]
    }
  ]
};
