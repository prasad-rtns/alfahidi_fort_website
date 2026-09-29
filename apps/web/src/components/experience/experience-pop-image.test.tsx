import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperiencePopImage } from "@/components/experience/experience-pop-image";

describe("ExperiencePopImage", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("reveals and replays the push/pop when the image enters the viewport", () => {
    let notify: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    class Observer {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = observe;
      disconnect = disconnect;
    }
    vi.stubGlobal("IntersectionObserver", Observer);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));

    const { unmount } = render(<ExperiencePopImage src="/fort.png" alt="Fort courtyard" />);
    const frame = screen.getByAltText("Fort courtyard").parentElement!;
    const entry = (isIntersecting: boolean) => ({ target: frame, isIntersecting }) as unknown as IntersectionObserverEntry;
    expect(frame).toHaveAttribute("data-pop-ready", "true");
    expect(observe).toHaveBeenCalledWith(frame);

    act(() => notify?.([entry(true)], {} as IntersectionObserver));
    expect(frame).toHaveAttribute("data-pop-visible", "true");
    act(() => notify?.([entry(false)], {} as IntersectionObserver));
    expect(frame).toHaveAttribute("data-pop-visible", "false");

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("keeps the image visible without motion when reduced motion is requested", () => {
    const Observer = vi.fn();
    vi.stubGlobal("IntersectionObserver", Observer);
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));

    render(<ExperiencePopImage src="/fort.png" alt="Fort courtyard" />);
    expect(screen.getByAltText("Fort courtyard").parentElement).not.toHaveAttribute("data-pop-ready");
    expect(Observer).not.toHaveBeenCalled();
  });
});
