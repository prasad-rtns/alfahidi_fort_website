import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidate-web";

export const AnnouncementTicker: GlobalConfig = {
  slug: "announcementTicker",
  hooks: {
    afterChange: [revalidateGlobal]
  },
  fields: [
    { name: "enabled", type: "checkbox", defaultValue: true },
    { name: "message", type: "text", localized: true, required: true },
    { name: "activeFrom", type: "date" },
    { name: "activeTo", type: "date" }
  ]
};
