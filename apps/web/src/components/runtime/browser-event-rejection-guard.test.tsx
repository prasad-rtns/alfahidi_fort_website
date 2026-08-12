import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BrowserEventRejectionGuard, installBrowserEventRejectionGuard } from "@/components/runtime/browser-event-rejection-guard";

function createRejectionEvent(reason: unknown) {
  const event = new Event("unhandledrejection", { cancelable: true }) as PromiseRejectionEvent;
  Object.defineProperty(event, "reason", { value: reason });
  return event;
}

describe("BrowserEventRejectionGuard", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("prevents raw DOM Event promise rejections", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "debug").mockImplementation(() => undefined);
    render(<BrowserEventRejectionGuard />);

    const rejection = createRejectionEvent(new Event("error"));
    const preventDefault = vi.spyOn(rejection, "preventDefault");

    window.dispatchEvent(rejection);

    expect(preventDefault).toHaveBeenCalled();
    expect(console.debug).toHaveBeenCalledWith("Ignored DOM Event promise rejection", "error");
  });

  it("prevents event-shaped promise rejection objects", () => {
    render(<BrowserEventRejectionGuard />);

    const rejection = createRejectionEvent({
      type: "error",
      target: window,
      currentTarget: window
    });
    const preventDefault = vi.spyOn(rejection, "preventDefault");

    window.dispatchEvent(rejection);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("does not hide normal errors", () => {
    render(<BrowserEventRejectionGuard />);

    const rejection = createRejectionEvent(new Error("real failure"));
    const preventDefault = vi.spyOn(rejection, "preventDefault");

    window.dispatchEvent(rejection);

    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("removes the global listener when unmounted", () => {
    const addListener = vi.spyOn(window, "addEventListener");

    render(<BrowserEventRejectionGuard />);
    installBrowserEventRejectionGuard();

    expect(addListener).not.toHaveBeenCalledWith("unhandledrejection", expect.any(Function));
  });
});
