import { describe, expect, it } from "vitest";
import { normalizeBasePath, stripAppBasePath } from "@/lib/routing/header-routes";

describe("header route paths", () => {
  it("normalizes an optional app base path", () => {
    expect(normalizeBasePath(undefined)).toBe("");
    expect(normalizeBasePath(" / ")).toBe("");
    expect(normalizeBasePath(" /museum/ ")).toBe("/museum");
  });

  it("keeps language switching within the app base path", () => {
    expect(stripAppBasePath("/en/contact-us", "")).toBe("/en/contact-us");
    expect(stripAppBasePath("/museum", "/museum")).toBe("/");
    expect(stripAppBasePath("/museum/ar/contact-us", "/museum")).toBe("/ar/contact-us");
    expect(stripAppBasePath("/museum-gallery/en", "/museum")).toBe("/museum-gallery/en");
  });
});
