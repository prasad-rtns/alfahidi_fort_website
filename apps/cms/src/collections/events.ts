import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated } from "@/access/published-or-authenticated";

export const Events: CollectionConfig = {
  slug: "events",
  access: {
    read: publishedOrAuthenticated
  },
  admin: {
    useAsTitle: "title"
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "startsAt", type: "date", required: true },
    { name: "endsAt", type: "date" },
    { name: "location", type: "text", localized: true },
    { name: "capacity", type: "number", min: 0 },
    {
      name: "type",
      type: "select",
      options: ["guidedTour", "workshop", "exhibition", "family"],
      defaultValue: "guidedTour"
    }
  ]
};
