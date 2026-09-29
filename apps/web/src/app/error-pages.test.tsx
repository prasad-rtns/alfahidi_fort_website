import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LocaleError from "@/app/[locale]/error";
import GlobalError from "@/app/global-error";
import GlobalNotFound, { metadata as notFoundMetadata } from "@/app/global-not-found";
import { getTranslations } from "@/lib/i18n/translations";

const params = vi.hoisted(() => ({ value: { locale: "ar" } as { locale?: string } | null }));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  useParams: () => params.value
}));

describe("error and not-found pages", () => {
  afterEach(() => {
    params.value = { locale: "ar" };
    vi.restoreAllMocks();
  });

  it("shows a bilingual 404 with links home in each language and is not indexed", () => {
    render(<GlobalNotFound />);

    expect(screen.getByRole("heading", { level: 1, name: `404: ${getTranslations("en").notFound.title}` })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: getTranslations("ar").notFound.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getTranslations("en").notFound.backHome })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: getTranslations("ar").notFound.backHome })).toHaveAttribute("href", "/ar");
    expect(screen.getByRole("link", { name: getTranslations("ar").header.contactUs })).toHaveAttribute("href", "/ar/contact-us");
    expect(notFoundMetadata.robots).toEqual({ index: false, follow: false });
  });

  it("renders a localized error page without exposing error details and lets the visitor retry", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const t = getTranslations("ar").error;

    render(<LocaleError error={Object.assign(new Error("secret stack detail"), { digest: "abc123" })} reset={reset} />);

    expect(screen.getByRole("heading", { level: 1, name: t.title })).toBeInTheDocument();
    expect(screen.queryByText(/secret stack detail/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.backHome })).toHaveAttribute("href", "/ar");
    expect(log).toHaveBeenCalledWith("Page render failed", "abc123");

    await user.click(screen.getByRole("button", { name: t.retry }));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("falls back to English when the locale is missing or unknown", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    params.value = { locale: "zz" };

    render(<LocaleError error={new Error("boom")} reset={vi.fn()} />);

    expect(screen.getByRole("heading", { level: 1, name: getTranslations("en").error.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getTranslations("en").error.backHome })).toHaveAttribute("href", "/en");
  });

  it("renders the last-resort error page in both languages", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    render(<GlobalError error={new Error("root layout failed")} reset={reset} />);

    expect(screen.getByRole("heading", { level: 1, name: `500: ${getTranslations("en").error.title}` })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: getTranslations("ar").error.title })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: getTranslations("en").error.retry }));
    await user.click(screen.getByRole("button", { name: getTranslations("ar").error.retry }));
    expect(reset).toHaveBeenCalledTimes(2);
  });
});
