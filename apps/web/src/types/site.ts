import type { siteConfig } from "@/config/site";

export type Locale = (typeof siteConfig.locales)[number];

export type NavItem = {
  label: string;
  href: string;
};
