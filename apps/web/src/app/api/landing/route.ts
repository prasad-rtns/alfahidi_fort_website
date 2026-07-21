import { NextResponse } from "next/server";
import { getMockLandingData } from "@/data/landing";
import { isLocale } from "@/lib/content/site-content";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLocale = searchParams.get("locale") ?? "en";
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return NextResponse.json(getMockLandingData(locale));
}
