import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactMap } from "@/components/contact/contact-map";

describe("ContactMap", () => {
  it("supports keyboard zoom and announces the zoom level", async () => {
    const user = userEvent.setup();
    render(<ContactMap src="/map.png" alt="Fort map" zoomInLabel="Zoom in" zoomOutLabel="Zoom out" zoomLevelLabel="Map zoom" />);

    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });
    expect(zoomOut).toBeDisabled();
    expect(screen.getByText("Map zoom: 100%")).toBeInTheDocument();

    await user.tab();
    expect(zoomIn).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Map zoom: 125%")).toBeInTheDocument();
    expect(zoomOut).toBeEnabled();

    await user.click(zoomIn);
    await user.click(zoomIn);
    await user.click(zoomIn);
    expect(zoomIn).toBeDisabled();
    expect(screen.getByText("Map zoom: 200%")).toBeInTheDocument();

    await user.click(zoomOut);
    expect(screen.getByText("Map zoom: 175%")).toBeInTheDocument();
  });
});
