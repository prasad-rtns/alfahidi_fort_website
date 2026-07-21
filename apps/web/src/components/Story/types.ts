export type StoryAnimationType = "fade" | "zoom" | "slide" | "parallax" | "maskReveal";

export type StoryScene = {
  order: number;
  scene: string;
  title: string;
  description: string;
  image: string;
  video: string | null;
  animationType: StoryAnimationType;
  galleryImages?: string[];
};
