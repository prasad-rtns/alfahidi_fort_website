"use client";

import "@/styles/globals.css";
import { ErrorScreen, errorPrimaryButton } from "@/components/errors/error-screen";
import { getTranslations } from "@/lib/i18n/translations";

const en = getTranslations("en").error;
const ar = getTranslations("ar").error;

// Last-resort boundary for failures in a root layout. It replaces the whole document, so it is
// self-contained and bilingual, and it never exposes error details.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <ErrorScreen
          code="500"
          en={{
            title: en.title,
            description: en.description,
            actions: (
              <button type="button" onClick={reset} className={errorPrimaryButton}>
                {en.retry}
              </button>
            )
          }}
          ar={{
            title: ar.title,
            description: ar.description,
            actions: (
              <button type="button" onClick={reset} className={errorPrimaryButton}>
                {ar.retry}
              </button>
            )
          }}
        />
      </body>
    </html>
  );
}
