#!/usr/bin/env node
// Generates self-contained, bilingual error pages (404/500/502/503/504) for the reverse proxy.
// They must work while the Next.js app is down, so every asset (CSS, emblem, favicon) is inline.
//
//   node deployment/error-pages/generate.mjs                          # base path /alfahidifort
//   node deployment/error-pages/generate.mjs --base-path ""           # site served at domain root
//   node deployment/error-pages/generate.mjs --base-path /alfahidifort --phone 80033222

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? (args[index + 1] ?? "") : fallback;
};

const basePath = option("base-path", "/alfahidifort").replace(/\/+$/, "");
const phone = option("phone", "80033222");
if (!/^(\/[A-Za-z0-9._-]+)*$/.test(basePath)) throw new Error(`Invalid --base-path: ${basePath}`);
if (!/^[0-9+ ]+$/.test(phone)) throw new Error(`Invalid --phone: ${phone}`);

// Reuse the exact emblem artwork the site header uses.
const brandSource = readFileSync(join(here, "../../apps/web/src/components/chrome/brand-svg-paths.ts"), "utf8");
const pathData = (key) => {
  const match = brandSource.match(new RegExp(`${key}: *"([^"]+)"`));
  if (!match) throw new Error(`Emblem path ${key} not found`);
  return match[1];
};
const emblemPaths = ["pc43c700", "p1ff74880", "p12623b00", "p1baffc80"].map((key) => `<path d="${pathData(key)}"/>`).join("");
const emblem = (className) => `<svg class="${className}" viewBox="0 0 36 59" fill="currentColor" aria-hidden="true" focusable="false">${emblemPaths}</svg>`;
const favicon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#243646"/><g transform="translate(16.4 6.2) scale(0.87)" fill="#fff" stroke="#fff" stroke-width="1.2">${emblemPaths}</g></svg>`
)}`;

const pages = {
  404: {
    en: { title: "Page not found", message: "The page you are looking for does not exist or may have been moved. Check the address, or continue exploring from the home page." },
    ar: { title: "الصفحة غير موجودة", message: "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. تحقق من العنوان أو تابع الاستكشاف من الصفحة الرئيسية." },
    retry: false
  },
  500: {
    en: { title: "Something went wrong", message: "An unexpected error occurred on our side. Please try again in a moment." },
    ar: { title: "حدث خطأ ما", message: "حدث خطأ غير متوقع من جانبنا. يرجى المحاولة مرة أخرى بعد قليل." },
    retry: true
  },
  502: {
    en: { title: "Service temporarily unavailable", message: "We could not reach the website right now. This is usually brief — please try again in a few minutes." },
    ar: { title: "الخدمة غير متاحة مؤقتاً", message: "تعذر الوصول إلى الموقع حالياً. عادةً ما يكون ذلك لفترة قصيرة، يرجى المحاولة مرة أخرى بعد بضع دقائق." },
    retry: true
  },
  503: {
    en: { title: "We'll be back shortly", message: "The website is undergoing scheduled maintenance to improve your experience. Please check back soon." },
    ar: { title: "سنعود قريباً", message: "يخضع الموقع لأعمال صيانة مجدولة لتحسين تجربتك. يرجى العودة بعد قليل." },
    retry: true
  },
  504: {
    en: { title: "The website is taking too long to respond", message: "Our servers did not respond in time. Please try again in a moment." },
    ar: { title: "استغرق الموقع وقتاً طويلاً للاستجابة", message: "لم تستجب خوادمنا في الوقت المحدد. يرجى المحاولة مرة أخرى بعد قليل." },
    retry: true
  }
};

const css = `
:root{--navy:#243646;--navy-deep:#18252f;--smoke:#d3d7da;--clay:#995d3e;--clay-light:#c98a67;--white:#fff}
*{box-sizing:border-box}
html{color-scheme:dark;background:var(--navy-deep)}
body{margin:0;min-height:100vh;background:radial-gradient(120% 90% at 85% 0%,#2f4659 0%,var(--navy) 45%,var(--navy-deep) 100%);color:var(--white);font:16px/1.6 "Noto Sans","Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;display:flex;flex-direction:column}
[lang=ar]{font-family:"Noto Sans Arabic","Segoe UI",Tahoma,Arial,sans-serif}
a{color:inherit}
a:focus-visible{outline:3px solid var(--clay-light);outline-offset:3px;border-radius:999px}
.watermark{position:fixed;inset-inline-end:-6vw;bottom:-30vh;height:78vh;width:auto;color:var(--white);opacity:.035;pointer-events:none;z-index:0}
main,.top,footer{position:relative;z-index:1}
.top{display:flex;align-items:center;gap:14px;padding:28px clamp(20px,5vw,64px)}
.top svg{height:46px;width:auto;color:var(--smoke)}
.brand{display:flex;flex-direction:column;line-height:1.2}
.brand strong{font-size:18px;font-weight:600;letter-spacing:.02em}
.brand span{font-size:15px;color:var(--smoke)}
main{flex:1;display:grid;align-content:center;gap:clamp(24px,4vw,40px);width:min(1100px,100%);margin:0 auto;padding:24px clamp(20px,5vw,64px) 48px}
.code{margin:0;font-size:clamp(5.5rem,20vw,11rem);line-height:.9;font-weight:700;letter-spacing:.04em;color:transparent;-webkit-text-stroke:2px var(--smoke);display:flex;align-items:flex-end;gap:18px}
.code::after{content:"";display:block;width:clamp(48px,8vw,96px);height:6px;border-radius:6px;background:var(--clay);margin-bottom:.35em}
@supports not (-webkit-text-stroke:2px #fff){.code{color:var(--smoke)}}
.copy{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,72px)}
/* Physical left edge: the divider sits between the columns even though the second column is RTL. */
.copy section+section{border-left:1px solid rgba(255,255,255,.18);padding-left:clamp(24px,5vw,72px)}
h1,h2{margin:0 0 12px;font-weight:500;font-size:clamp(1.6rem,3.2vw,2.4rem);line-height:1.2}
p{margin:0 0 22px;color:#e4e8eb;font-size:clamp(1rem,1.4vw,1.125rem);max-width:46ch}
.actions{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;min-height:44px;padding:10px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:16px;border:2px solid var(--smoke);transition:background-color .2s,color .2s}
.btn.primary{background:var(--white);border-color:var(--white);color:var(--navy)}
.btn.primary:hover{background:var(--smoke);border-color:var(--smoke)}
.btn.ghost:hover{background:var(--smoke);color:var(--navy)}
footer{padding:20px clamp(20px,5vw,64px) 28px;color:var(--smoke);font-size:14px;display:flex;flex-wrap:wrap;gap:6px 24px;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12)}
footer a{text-decoration-color:rgba(255,255,255,.4);text-underline-offset:3px}
@media (max-width:760px){.copy{grid-template-columns:1fr}.copy section+section{border-left:0;padding-left:0;border-top:1px solid rgba(255,255,255,.18);padding-top:28px}.watermark{height:60vh}}
@media (prefers-reduced-motion:no-preference){main{animation:rise .6s ease-out both}@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}
`.trim();

const home = (locale) => `${basePath}/${locale}`;

function render(code, page) {
  const primary = (locale, label) =>
    page.retry ? `<a class="btn primary" href="">${label.retry}</a><a class="btn ghost" href="${home(locale)}">${label.home}</a>` : `<a class="btn primary" href="${home(locale)}">${label.home}</a><a class="btn ghost" href="${home(locale)}/contact-us">${label.contact}</a>`;
  const en = { retry: "Try again", home: "Back to home", contact: "Contact us" };
  const ar = { retry: "حاول مرة أخرى", home: "العودة إلى الصفحة الرئيسية", contact: "اتصل بنا" };

  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${code} · ${page.en.title} | Al Fahidi Fort</title>
<link rel="icon" href="${favicon}">
<style>${css}</style>
</head>
<body>
${emblem("watermark")}
<header class="top">
  ${emblem("")}
  <div class="brand"><strong>Al Fahidi Fort</strong><span lang="ar" dir="rtl">حصن الفهيدي</span></div>
</header>
<main>
  <p class="code" aria-hidden="true">${code}</p>
  <div class="copy">
    <section aria-labelledby="title-en">
      <h1 id="title-en"><span class="visually-hidden">${code}:</span> ${page.en.title}</h1>
      <p>${page.en.message}</p>
      <div class="actions">${primary("en", en)}</div>
    </section>
    <section lang="ar" dir="rtl" aria-labelledby="title-ar">
      <h2 id="title-ar">${page.ar.title}</h2>
      <p>${page.ar.message}</p>
      <div class="actions">${primary("ar", ar)}</div>
    </section>
  </div>
</main>
<footer>
  <span>Need help? Call <a href="tel:${phone.replace(/ /g, "")}">${phone}</a> · <span lang="ar" dir="rtl">للمساعدة اتصل على <a href="tel:${phone.replace(/ /g, "")}">${phone}</a></span></span>
  <span>Error ${code}</span>
</footer>
</body>
</html>
`;
}

const visuallyHidden = ".visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}";
for (const [code, page] of Object.entries(pages)) {
  const html = render(code, page).replace("</style>", `${visuallyHidden}</style>`);
  writeFileSync(join(here, `${code}.html`), html);
  console.log(`wrote ${code}.html (${Math.round(html.length / 1024)} KB)`);
}
