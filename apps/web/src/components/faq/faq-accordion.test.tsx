import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqAccordion } from "@/components/faq/faq-accordion";

const items = [
  {
    question: "What is Al Fahidi Fort?",
    answer: "A historic landmark in Dubai."
  },
  {
    question: "What are the sections?",
    answer: "Exhibitions, learning spaces, and public programmes."
  },
  {
    question: "What is the collection?",
    answer: "Objects, media, archival views, and stories."
  }
] as const;

describe("FaqAccordion", () => {
  it("opens the first item by default", () => {
    render(<FaqAccordion items={items} />);

    expect(screen.getByRole("button", { name: items[0].question })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(items[0].answer)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: items[1].question })).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps only one item expanded at a time", async () => {
    const user = userEvent.setup();

    render(<FaqAccordion items={items} />);

    await user.click(screen.getByRole("button", { name: items[1].question }));

    expect(screen.getByRole("button", { name: items[0].question })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(items[0].answer)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: items[1].question })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(items[1].answer)).toBeInTheDocument();
  });

  it("collapses the active item when clicked again", async () => {
    const user = userEvent.setup();

    render(<FaqAccordion items={items} />);

    await user.click(screen.getByRole("button", { name: items[0].question }));

    expect(screen.getByRole("button", { name: items[0].question })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(items[0].answer)).not.toBeInTheDocument();
  });
});
