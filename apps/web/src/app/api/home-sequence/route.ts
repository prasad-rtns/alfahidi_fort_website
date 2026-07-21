import { NextResponse } from "next/server";
import { homeSequencePayload } from "@/data/home-sequence";

export function GET() {
  return NextResponse.json(homeSequencePayload);
}
