import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "src/app/[locale]/contact-us/page.tsx",
        "src/app/[locale]/faq/page.tsx",
        "src/components/chrome/footer.tsx",
        "src/components/chrome/header.tsx",
        "src/components/faq/faq-accordion.tsx",
        "src/components/runtime/browser-event-rejection-guard.tsx",
        "src/lib/i18n/**/*.ts"
      ],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95
      }
    }
  }
});
