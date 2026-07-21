import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

type RevalidatePayload = {
  path?: string;
};

async function requestRevalidation(payload: RevalidatePayload) {
  if (!process.env.CMS_REVALIDATE_URL || !process.env.CMS_REVALIDATE_SECRET) return;

  await fetch(process.env.CMS_REVALIDATE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-revalidate-secret": process.env.CMS_REVALIDATE_SECRET
    },
    body: JSON.stringify(payload)
  }).catch(() => undefined);
}

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc, collection }) => {
  if (collection.slug === "pages" && typeof doc.slug === "string") {
    await requestRevalidation({ path: doc.slug === "home" ? "/" : `/${doc.slug}` });
    return doc;
  }

  await requestRevalidation({});
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await requestRevalidation({});
  return doc;
};
