"use client";

import { useEffect } from "react";

let isInstalled = false;

export function isDomEventRejection(value: unknown): value is Event {
  return (
    value instanceof Event ||
    (typeof value === "object" &&
      value !== null &&
      "type" in value &&
      "target" in value &&
      "currentTarget" in value)
  );
}

function handleUnhandledRejection(event: PromiseRejectionEvent) {
  if (!isDomEventRejection(event.reason)) {
    return;
  }

  event.preventDefault();

  if (process.env.NODE_ENV === "development") {
    console.debug("Ignored DOM Event promise rejection", event.reason.type);
  }
}

export function installBrowserEventRejectionGuard() {
  if (typeof window === "undefined" || isInstalled) {
    return;
  }

  window.addEventListener("unhandledrejection", handleUnhandledRejection);
  isInstalled = true;
}

installBrowserEventRejectionGuard();

export function BrowserEventRejectionGuard() {
  useEffect(() => {
    installBrowserEventRejectionGuard();
  }, []);

  return null;
}
