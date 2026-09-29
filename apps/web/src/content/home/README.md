# Home page content

Edit `en.json` for English or `ar.json` for Arabic. The landing page reads these files through the translation module. In local development, changes appear after saving. Production changes require a new build and deployment.

The shared navigation and footer copy is in `../common/en.json` and `../common/ar.json`. FAQ copy is in `../faq/en.json` and `../faq/ar.json`.

Keep the same keys and story order in both files. The story images and animations are defined separately in the page component; editing copy here does not replace them.

The Home mock uses Noto Sans. The application loads Noto Sans for English and Noto Sans Arabic for Arabic through `next/font`, which self-hosts and optimizes the font files during the build.
