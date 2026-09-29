export function httpsContactUrl(value: string) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error("Contact link must be an absolute HTTPS URL");
  }

  if (url.protocol !== "https:") {
    throw new Error("Contact link must use HTTPS");
  }

  return url.href;
}

export function emailContactUrl(value: string) {
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
    throw new Error("Contact email address is invalid");
  }

  return `mailto:${value}`;
}

export function telephoneContactUrl(value: string) {
  if (!/^\+?[\d\s()-]+$/.test(value)) {
    throw new Error("Contact telephone number is invalid");
  }

  return `tel:${value.replace(/[^\d+]/g, "")}`;
}
