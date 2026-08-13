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

type MockImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  default: ({ src, fill: _fill, priority: _priority, ...props }: MockImageProps) =>
    React.createElement("img", {
      src: typeof src === "string" ? src : src.src,
      ...props
    })
}));
