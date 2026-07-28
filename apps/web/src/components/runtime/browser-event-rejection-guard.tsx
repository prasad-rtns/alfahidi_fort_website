"use client";

import { useEffect } from "react";

function isDomEvent(value: unknown): value is Event {
  return (
    value instanceof Event ||
    (typeof value === "object" &&
      value !== null &&
      "type" in value &&
      "target" in value &&
      "currentTarget" in value)
  );
}

export function BrowserEventRejectionGuard() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (!isDomEvent(event.reason)) {
        return;
      }

      event.preventDefault();

      if (process.env.NODE_ENV === "development") {
        console.debug("Ignored DOM Event promise rejection", event.reason.type);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
