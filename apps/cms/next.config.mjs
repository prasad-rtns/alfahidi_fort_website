import { withPayload } from "@payloadcms/next/withPayload";

const cmsAssetPrefix = process.env.CMS_ASSET_PREFIX || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  ...(cmsAssetPrefix ? { assetPrefix: cmsAssetPrefix } : {})
};

export default withPayload(nextConfig);
