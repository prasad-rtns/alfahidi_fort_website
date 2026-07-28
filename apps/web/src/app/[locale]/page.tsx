import { HomeSequenceExperience } from "@/components/sequence/HomeSequenceExperience";
import ReferenceHome from "@/components/reference-home/Home";
import type { Locale } from "@/lib/content/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const staticFallback = (
    <main className="w-full overflow-x-auto bg-white">
      <div className="relative mx-auto h-[4200px] w-[1440px]">
        <ReferenceHome />
      </div>
    </main>
  );

  return (
    <>
      <HomeSequenceExperience fallback={staticFallback} locale={locale} />
    </>
  );
}
