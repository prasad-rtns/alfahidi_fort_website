import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "card", width: 900, height: 900, position: "centre" },
      { name: "wide", width: 1800, height: 1000, position: "centre" }
    ],
    mimeTypes: ["image/*", "video/mp4", "video/webm"]
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true
    },
    {
      name: "mediaKind",
      type: "select",
      defaultValue: "image",
      options: ["image", "imageSequenceFrame", "transitionVideo"]
    }
  ]
};
