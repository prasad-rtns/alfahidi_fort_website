# Contact Us content

Edit `en.json` for English and `ar.json` for Arabic. The Contact Us page reads these files through the translation module. Changes appear during local development after saving; production changes require a new build and deployment.

Keep the same keys in both files. The email and telephone fields become clickable links. Directions and social URLs must be absolute HTTPS URLs; invalid values fail the build rather than becoming unsafe links.

The font sizes follow the supplied Contact Us mock. Its named typeface, 29LT Azer, is not included in this repository. If a licensed webfont is supplied, it can be loaded with `@font-face`; until then the page uses the same system font fallback as the mock.
