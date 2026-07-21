export type CmsMedia = {
  id?: string;
  url: string | null;
  alt?: string;
} | null;

export type CmsAnimationType = "fade" | "zoom" | "slide" | "parallax" | "maskReveal";

export type CmsBaseSection = {
  id?: string;
  type: "hero" | "story" | "gallery" | "timeline";
  title: string;
  description?: string;
  image?: CmsMedia;
  video?: CmsMedia;
  animationType?: CmsAnimationType;
};

export type CmsHeroSection = CmsBaseSection & {
  type: "hero";
  eyebrow?: string;
  revealImage?: CmsMedia;
};

export type CmsStoryScene = {
  id?: string;
  order: number;
  scene: string;
  title: string;
  description?: string;
  image?: CmsMedia;
  video?: CmsMedia;
  animationType?: CmsAnimationType;
};

export type CmsStorySection = CmsBaseSection & {
  type: "story";
  scenes?: CmsStoryScene[];
};

export type CmsGalleryItem = {
  id?: string;
  title?: string;
  description?: string;
  image?: CmsMedia;
  video?: CmsMedia;
  animationType?: CmsAnimationType;
};

export type CmsGallerySection = CmsBaseSection & {
  type: "gallery";
  items?: CmsGalleryItem[];
};

export type CmsTimelineEvent = {
  id?: string;
  year: string;
  title: string;
  description?: string;
  image?: CmsMedia;
  video?: CmsMedia;
};

export type CmsTimelineSection = CmsBaseSection & {
  type: "timeline";
  events?: CmsTimelineEvent[];
};

export type CmsSection = CmsHeroSection | CmsStorySection | CmsGallerySection | CmsTimelineSection;

export type CmsPage = {
  title: string;
  slug: string;
  sections: CmsSection[];
};
