import config from "@payload-config";
import "@payloadcms/next/css";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

const configPromise = Promise.resolve(config);

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams });

export default async function Page({ params, searchParams }: Args) {
  return RootPage({ config: configPromise, importMap, params, searchParams });
}
