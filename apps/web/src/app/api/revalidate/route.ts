import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { path?: string };
  revalidatePath(body.path ?? "/");

  return NextResponse.json({ ok: true, path: body.path ?? "/" });
}
