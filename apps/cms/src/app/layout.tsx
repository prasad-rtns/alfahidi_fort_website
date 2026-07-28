import type { Metadata } from "next";
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { handleServerFunctions, RootLayout as PayloadRootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./(payload)/admin/importMap";

const configPromise = Promise.resolve(config);

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap
  });
};

export const metadata: Metadata = {
  title: "Al Fahidi Fort CMS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadRootLayout>
  );
}
