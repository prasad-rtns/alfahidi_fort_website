import type { HomeSequencePayload } from "@/types/home-sequence";

export async function getHomeSequence(signal?: AbortSignal): Promise<HomeSequencePayload> {
  const response = await fetch("/api/home-sequence", {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    cache: "no-store",
    signal
  });

  if (!response.ok) {
    throw new Error(`Home sequence API failed with ${response.status}`);
  }

  return (await response.json()) as HomeSequencePayload;
}
