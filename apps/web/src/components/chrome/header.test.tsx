import { act, render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/chrome/header";
import { getTranslations } from "@/lib/i18n/translations";

const navigationState = vi.hoisted(() => ({
  pathname: "/en"
}));
const prefetchMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useRouter: () => ({ prefetch: prefetchMock })
}));

describe("Header", () => {
  afterEach(() => {
    navigationState.pathname = "/en";
    window.history.pushState(null, "", "/");
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    Object.defineProperty(navigator, "connection", { value: undefined, configurable: true });
    prefetchMock.mockReset();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("renders translated navigation links for the current locale", () => {
    navigationState.pathname = "/en";

    render(<Header locale="en" />);

    expect(screen.getAllByRole("link", { name: "Government of Dubai" })[0]).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Al Fahidi Fort home" })).toHaveAttribute("href", "/en");
    expect(screen.getAllByRole("link", { name: "Al Fahidi Fort" })[0]).toHaveAttribute("href", "/en");
    expect(screen.getAllByRole("link", { name: "Book Tickets" })[0]).toHaveAttribute("href", "/en/plan-your-visit#tickets");
    expect(screen.getAllByRole("link", { name: "Experience" })[0]).toHaveAttribute("href", "/en/experience");
    expect(screen.getAllByRole("link", { name: "Plan Your Visit" })[0]).toHaveAttribute("href", "/en/plan-your-visit");
    expect(screen.getAllByRole("link", { name: "FAQ" })[0]).toHaveAttribute("href", "/en/faq");
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute("href", "/en/contact-us");
  });

  it("keeps the current page, query string, and hash when changing language", async () => {
    const t = getTranslations("en").header;
    navigationState.pathname = "/en/contact-us";
    window.history.pushState(null, "", "/en/contact-us?source=nav#map");

    render(<Header locale="en" />);

    await waitFor(() => {
      expect(screen.getAllByRole("link", { name: t.language })[0]).toHaveAttribute("href", "/ar/contact-us?source=nav#map");
    });
  });

  it("switches Arabic pages back to the matching English page", async () => {
    const t = getTranslations("ar").header;
    navigationState.pathname = "/ar/faq";
    window.history.pushState(null, "", "/ar/faq#answers");

    render(<Header locale="ar" />);

    await waitFor(() => {
      expect(screen.getAllByRole("link", { name: t.language })[0]).toHaveAttribute("href", "/en/faq#answers");
    });
  });

  it("marks the current desktop navigation item active", () => {
    navigationState.pathname = "/en/faq";

    render(<Header locale="en" />);

    expect(screen.getAllByRole("link", { name: "FAQ" })[0]?.className).toContain("underline");
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]?.className).toBe("");
  });

  it("updates the header style when the page is scrolled", () => {
    const { container } = render(<Header locale="en" />);
    const header = container.querySelector("header");

    expect(header?.className).toContain("bg-transparent");

    Object.defineProperty(window, "scrollY", { value: 32, configurable: true });
    fireEvent.scroll(window);

    expect(header?.className).toContain("bg-[#243646]");
  });

  it("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    const preventDocumentNavigation = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof HTMLAnchorElement && target.pathname !== window.location.pathname) {
        event.preventDefault();
      }
    };
    const t = getTranslations("en").header;

    document.addEventListener("click", preventDocumentNavigation);
    render(<Header locale="en" />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));

    expect(screen.getByRole("button", { name: t.closeMenu })).toBeInTheDocument();
    const faqLinks = screen.getAllByRole("link", { name: "FAQ" });
    expect(faqLinks).toHaveLength(2);

    await user.click(faqLinks[1]!);

    expect(screen.getByRole("button", { name: t.openMenu })).toBeInTheDocument();
    document.removeEventListener("click", preventDocumentNavigation);
  });

  it("closes the mobile menu from tickets, experience, and language links", async () => {
    const user = userEvent.setup();
    const t = getTranslations("en").header;

    render(<Header locale="en" />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));
    await user.click(screen.getAllByRole("link", { name: t.bookTickets })[1]!);
    expect(screen.getByRole("button", { name: t.openMenu })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: t.openMenu }));
    await user.click(screen.getAllByRole("link", { name: t.experience })[1]!);
    expect(screen.getByRole("button", { name: t.openMenu })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: t.openMenu }));
    await user.click(screen.getAllByRole("link", { name: t.language })[1]!);
    expect(screen.getByRole("button", { name: t.openMenu })).toBeInTheDocument();
  });

  it("prefetches the linked pages when the browser is idle and cancels an unused callback", () => {
    let idleCallback: (() => void) | undefined;
    const cancelIdleCallback = vi.fn();
    vi.stubGlobal("requestIdleCallback", (callback: () => void) => {
      idleCallback = callback;
      return 7;
    });
    vi.stubGlobal("cancelIdleCallback", cancelIdleCallback);

    const first = render(<Header locale="en" />);
    expect(idleCallback).toBeDefined();
    act(() => idleCallback?.());
    expect(prefetchMock).toHaveBeenCalledWith("/en/faq");
    expect(prefetchMock).toHaveBeenCalledWith("/en/contact-us");
    expect(prefetchMock).toHaveBeenCalledWith("/en/experience");
    expect(prefetchMock).toHaveBeenCalledWith("/en/plan-your-visit");
    first.unmount();
    expect(cancelIdleCallback).toHaveBeenCalledWith(7);
  });

  it("skips prefetch when the visitor has enabled data saving", () => {
    Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
    render(<Header locale="en" />);
    expect(prefetchMock).not.toHaveBeenCalled();
  });

  it("handles prefetch failures without surfacing DOM event rejections", async () => {
    vi.useFakeTimers();
    vi.stubEnv("NODE_ENV", "development");
    const debug = vi.spyOn(console, "debug").mockImplementation(() => undefined);
    prefetchMock.mockRejectedValueOnce(new Error("offline")).mockRejectedValueOnce(new Event("error"));
    render(<Header locale="en" />);

    await act(async () => {
      vi.advanceTimersByTime(1200);
      await Promise.resolve();
    });

    expect(prefetchMock).toHaveBeenCalledTimes(4);
    expect(debug).toHaveBeenCalledOnce();
    expect(debug).toHaveBeenCalledWith("Route prefetch failed", expect.any(Error));
  });

  it("keeps rendering navigation if the router has no pathname yet", () => {
    navigationState.pathname = null as unknown as string;
    render(<Header locale="en" />);
    expect(screen.getAllByRole("link", { name: "Contact Us" })[0]).toHaveAttribute("href", "/en/contact-us");
  });
});
