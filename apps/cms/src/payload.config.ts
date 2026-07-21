import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { Pages } from "@/collections/pages";
import { Exhibitions } from "@/collections/exhibitions";
import { Artifacts } from "@/collections/artifacts";
import { Events } from "@/collections/events";
import { Media } from "@/collections/media";
import { Users } from "@/collections/users";
import { SiteSettings } from "@/globals/site-settings";
import { Header } from "@/globals/header";
import { AnnouncementTicker } from "@/globals/announcement-ticker";
import { Footer } from "@/globals/footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Pages, Exhibitions, Artifacts, Events],
  globals: [SiteSettings, Header, AnnouncementTicker, Footer],
  editor: lexicalEditor({}),
  localization: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    fallback: true
  },
  secret: process.env.PAYLOAD_SECRET ?? "development-only-secret",
  typescript: {
    outputFile: path.resolve(dirname, "../../../packages/shared-types/src/payload-types.ts")
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  })
});
