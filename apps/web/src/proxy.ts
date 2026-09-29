import { NextResponse, type NextRequest } from "next/server";

/** Existing path under a real locale that no route matches, so it resolves to the global 404. */
export const NOT_FOUND_REWRITE_PATH = "/en/__not-found";

/**
 * Requests whose first segment is not a supported locale (scanner probes such as /.env or
 * /wp-admin) are rewritten to a path inside a real locale. They still receive the branded 404
 * page, but skip the locale param lookup, which otherwise logs an internal error per request.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = NOT_FOUND_REWRITE_PATH;
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except the locales, framework/static assets and metadata files. The root "/" is
  // excluded by requiring at least one character after the slash.
  matcher: ["/((?!en(?:/|$)|ar(?:/|$)|_next/|assets/|og/|favicon\\.ico|icon\\.svg|apple-icon\\.png|robots\\.txt|sitemap\\.xml).+)"]
};
