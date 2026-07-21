import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidate-web";

export const Header: GlobalConfig = {
  slug: "header",
  hooks: {
    afterChange: [revalidateGlobal]
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        { name: "label", type: "text", localized: true, required: true },
        { name: "href", type: "text", required: true }
      ]
    },
    { name: "ctaLabel", type: "text", localized: true, defaultValue: "Book Tickets" },
    { name: "ctaHref", type: "text", defaultValue: "/book" }
  ]
};
