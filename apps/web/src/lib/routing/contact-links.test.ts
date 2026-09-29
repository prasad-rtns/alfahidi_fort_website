import { describe, expect, it } from "vitest";
import { emailContactUrl, httpsContactUrl, telephoneContactUrl } from "@/lib/routing/contact-links";

describe("contact links", () => {
  it("accepts editable HTTPS destinations", () => {
    expect(httpsContactUrl("https://example.com/contact?source=fort")).toBe("https://example.com/contact?source=fort");
    expect(() => httpsContactUrl("javascript:alert(1)")).toThrowError("Contact link must use HTTPS");
    expect(() => httpsContactUrl("/relative")).toThrowError("Contact link must be an absolute HTTPS URL");
  });

  it("constructs safe email and telephone destinations", () => {
    expect(emailContactUrl("hello@example.com")).toBe("mailto:hello@example.com");
    expect(telephoneContactUrl("+971 800 33222")).toBe("tel:+97180033222");
    expect(() => emailContactUrl("hello@example.com?subject=<script>")).toThrowError("Contact email address is invalid");
    expect(() => telephoneContactUrl("80033222;javascript:alert(1)")).toThrowError("Contact telephone number is invalid");
  });
});
