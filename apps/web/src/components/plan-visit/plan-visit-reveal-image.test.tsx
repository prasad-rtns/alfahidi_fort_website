import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PlanVisitRevealImage } from "@/components/plan-visit/plan-visit-reveal-image";

describe("PlanVisitRevealImage", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("opens the marker and pops the photo when each enters view, then resets on exit", () => {
    const observers: MockObserver[] = [];
    class MockObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      constructor(public callback: IntersectionObserverCallback, public options: IntersectionObserverInit) {
        observers.push(this);
      }
    }
    vi.stubGlobal("IntersectionObserver", MockObserver);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));

    const { unmount } = render(<PlanVisitRevealImage src="/fort.webp" alt="Historic fort" />);
    const photo = screen.getByAltText("Historic fort").parentElement!;
    const zone = photo.parentElement!;
    const marker = zone.querySelector<HTMLElement>("[data-plan-marker]")!;
    const markerObserver = observers.find(({ options }) => options.rootMargin === "-6% 0px -6% 0px")!;
    const popObserver = observers.find(({ options }) => options.rootMargin === "0px 0px -10% 0px")!;
    const entry = (target: Element, isIntersecting: boolean) => ({ target, isIntersecting }) as unknown as IntersectionObserverEntry;

    expect(observers).toHaveLength(2);
    expect(photo).toHaveAttribute("data-reveal-ready", "true");
    expect(marker).toHaveAttribute("data-reveal-ready", "true");
    expect(markerObserver.observe).toHaveBeenCalledWith(zone);
    expect(popObserver.observe).toHaveBeenCalledWith(photo);

    act(() => markerObserver.callback([entry(zone, true)], {} as IntersectionObserver));
    act(() => popObserver.callback([entry(photo, true)], {} as IntersectionObserver));
    expect(marker).toHaveAttribute("data-marker-visible", "true");
    expect(photo).toHaveAttribute("data-pop-visible", "true");

    act(() => markerObserver.callback([entry(zone, false)], {} as IntersectionObserver));
    act(() => popObserver.callback([entry(photo, false)], {} as IntersectionObserver));
    expect(marker).toHaveAttribute("data-marker-visible", "false");
    expect(photo).toHaveAttribute("data-pop-visible", "false");

    unmount();
    expect(markerObserver.disconnect).toHaveBeenCalledOnce();
    expect(popObserver.disconnect).toHaveBeenCalledOnce();
  });

  it("leaves both visuals visible for reduced-motion visitors", () => {
    const Observer = vi.fn();
    vi.stubGlobal("IntersectionObserver", Observer);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));

    render(<PlanVisitRevealImage src="/fort.webp" alt="Historic fort" />);
    const photo = screen.getByAltText("Historic fort").parentElement!;
    const marker = photo.parentElement!.querySelector<HTMLElement>("[data-plan-marker]")!;
    expect(photo).not.toHaveAttribute("data-reveal-ready");
    expect(marker).not.toHaveAttribute("data-reveal-ready");
    expect(Observer).not.toHaveBeenCalled();
  });
});
