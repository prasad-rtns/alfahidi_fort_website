import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

type MockLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
};

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: MockLinkProps) =>
    React.createElement(
      "a",
      {
        href: typeof href === "string" ? href : href.pathname,
        ...props,
        onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          props.onClick?.(event);
        }
      },
      children
    )
}));
