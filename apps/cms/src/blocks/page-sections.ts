import type { Block, Field } from "payload";

const sectionTypeField = (value: string): Field => ({
  name: "type",
  type: "text",
  defaultValue: value,
  admin: {
    readOnly: true
  }
});

const mediaFields: Field[] = [
  { name: "image", type: "upload", relationTo: "media" },
  { name: "video", type: "upload", relationTo: "media" }
];

export const HeroSectionBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections"
  },
  fields: [
    sectionTypeField("hero"),
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    ...mediaFields,
    { name: "revealImage", type: "upload", relationTo: "media" },
    {
      name: "animationType",
      type: "select",
      defaultValue: "zoom",
      options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
    }
  ]
};

export const StorySectionBlock: Block = {
  slug: "story",
  labels: {
    singular: "Story Section",
    plural: "Story Sections"
  },
  fields: [
    sectionTypeField("story"),
    { name: "title", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    ...mediaFields,
    {
      name: "animationType",
      type: "select",
      defaultValue: "fade",
      options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
    },
    {
      name: "scenes",
      type: "array",
      fields: [
        { name: "order", type: "number", required: true, defaultValue: 1 },
        { name: "scene", type: "text", localized: true, required: true },
        { name: "title", type: "text", localized: true, required: true },
        { name: "description", type: "textarea", localized: true },
        ...mediaFields,
        {
          name: "animationType",
          type: "select",
          defaultValue: "fade",
          options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
        }
      ]
    }
  ]
};

export const GallerySectionBlock: Block = {
  slug: "gallery",
  labels: {
    singular: "Gallery Section",
    plural: "Gallery Sections"
  },
  fields: [
    sectionTypeField("gallery"),
    { name: "title", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    ...mediaFields,
    {
      name: "animationType",
      type: "select",
      defaultValue: "parallax",
      options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
    },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", localized: true },
        { name: "description", type: "textarea", localized: true },
        ...mediaFields,
        {
          name: "animationType",
          type: "select",
          defaultValue: "fade",
          options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
        }
      ]
    }
  ]
};

export const TimelineSectionBlock: Block = {
  slug: "timeline",
  labels: {
    singular: "Timeline Section",
    plural: "Timeline Sections"
  },
  fields: [
    sectionTypeField("timeline"),
    { name: "title", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    ...mediaFields,
    {
      name: "animationType",
      type: "select",
      defaultValue: "slide",
      options: ["fade", "zoom", "slide", "parallax", "maskReveal"]
    },
    {
      name: "events",
      type: "array",
      fields: [
        { name: "year", type: "text", localized: true, required: true },
        { name: "title", type: "text", localized: true, required: true },
        { name: "description", type: "textarea", localized: true },
        ...mediaFields
      ]
    }
  ]
};

export const pageSectionBlocks = [HeroSectionBlock, StorySectionBlock, GallerySectionBlock, TimelineSectionBlock];
