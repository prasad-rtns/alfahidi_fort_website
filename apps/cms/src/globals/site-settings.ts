import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  fields: [
    { name: "siteTitle", type: "text", localized: true, required: true },
    { name: "defaultSeoDescription", type: "textarea", localized: true },
    { name: "crest", type: "upload", relationTo: "media" },
    { name: "logo", type: "upload", relationTo: "media" }
  ]
};
