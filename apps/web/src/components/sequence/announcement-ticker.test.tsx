import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AnnouncementTicker } from "@/components/sequence/announcement-ticker";

const items = ["Open today: 10:30 AM - 6 PM", "More events on Sunday"];

describe("AnnouncementTicker", () => {
  it("exposes the announcements once to assistive technology", () => {
    const { container } = render(<AnnouncementTicker items={items} pauseLabel="Pause announcements" playLabel="Play announcements" />);

    const track = container.querySelector("[data-ticker-track]");
    const [visible, duplicate] = Array.from(track?.children ?? []);
    expect(visible).toHaveTextContent(items.join(" "));
    expect(visible).not.toHaveAttribute("aria-hidden");
    expect(duplicate).toHaveAttribute("aria-hidden", "true");
  });

  it("pauses and resumes the motion from a labelled button", async () => {
    const user = userEvent.setup();
    const { container } = render(<AnnouncementTicker items={items} pauseLabel="Pause announcements" playLabel="Play announcements" />);
    const ticker = container.querySelector("[data-ticker]");

    expect(ticker).toHaveAttribute("data-paused", "false");

    await user.click(screen.getByRole("button", { name: "Pause announcements" }));
    expect(ticker).toHaveAttribute("data-paused", "true");

    await user.click(screen.getByRole("button", { name: "Play announcements" }));
    expect(ticker).toHaveAttribute("data-paused", "false");
    expect(screen.getByRole("button", { name: "Pause announcements" })).toBeInTheDocument();
  });
});
