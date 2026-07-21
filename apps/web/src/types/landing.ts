import type { Locale } from "@/lib/content/site-content";

export type LandingImage = {
  src: string;
  alt: string;
};

export type LandingExhibition = {
  id: string;
  title: string;
  until: string;
  description: string;
  image: LandingImage;
  thumbnail: LandingImage;
  shape: "circle" | "wide" | "portrait";
};

export type LandingTour = {
  id: string;
  title: string;
  description: string;
  image: LandingImage;
};

export type LandingPayload = {
  locale: Locale;
  hero: {
    image: LandingImage;
    ornament: LandingImage;
  };
  ticker: string[];
  feature: LandingExhibition;
  exhibitions: LandingExhibition[];
  tours: LandingTour[];
};
