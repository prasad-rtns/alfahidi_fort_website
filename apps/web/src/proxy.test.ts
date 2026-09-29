import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { NOT_FOUND_REWRITE_PATH, config, proxy } from "@/proxy";

// Next compiles the matcher group the same way; anchoring it lets the test check which paths reach the proxy.
const matcher = new RegExp(`^${config.matcher[0]}$`);

describe("proxy", () => {
  it("rewrites unknown first segments to the 404 path and drops the query string", () => {
    const response = proxy(new NextRequest("http://localhost/wp-admin/setup.php?step=1"));

    expect(response.headers.get("x-middleware-rewrite")).toBe(`http://localhost${NOT_FOUND_REWRITE_PATH}`);
  });

  it.each(["/wp-admin", "/.env", "/zz/faq", "/english"])("runs for %s", (path) => {
    expect(matcher.test(path)).toBe(true);
  });

  it.each(["/", "/en", "/ar", "/en/faq", "/ar/contact-us", "/_next/static/chunk.js", "/assets/home/a.webp", "/og/al-fahidi-fort.jpg", "/favicon.ico", "/icon.svg", "/robots.txt", "/sitemap.xml"])(
    "leaves %s untouched",
    (path) => {
      expect(matcher.test(path)).toBe(false);
    }
  );
});
