import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScrollProvider } from "@/lib/scroll/smooth-scroll-provider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Al Fahidi Fort",
  description: "A cinematic museum and tourism experience for Al Fahidi Fort."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
