import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IconSprite } from "@/components/icon-sprite";
import { getSiteUrl, profile, siteDescription, siteTitle } from "@/lib/site";
import "./globals.css";
import "./experience.css";

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: profile.name }],
  applicationName: "Muhammad Arsalan Portfolio",
  keywords: ["Muhammad Arsalan", "Full Stack Developer", "Next.js", "React Native", "AI", "AWS", "Islamabad"],
  openGraph: {
    title: "Muhammad Arsalan — Ideas into experiences.",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Arsalan",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0d12" };

// Fixed, trusted initialization script: applies stored preferences before the first paint.
const preferencesScript = `(function(){var r=document.documentElement;try{r.dataset.theme=localStorage.getItem('arsalan-theme')==='light'?'light':'dark';r.classList.toggle('motion-paused',localStorage.getItem('arsalan-motion')==='paused'||matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){r.dataset.theme='dark';r.classList.toggle('motion-paused',matchMedia('(prefers-reduced-motion: reduce)').matches)}})();`;
const noScriptStyles = `.reveal{opacity:1!important;transform:none!important}.filters,.details-button,button.round-link,#theme-toggle,#header-motion-toggle,#motion-toggle,#copy-email,#menu-toggle{display:none!important}@media(max-width:760px){.site-header{height:auto;min-height:74px}.nav-row{padding-block:15px;flex-wrap:wrap}.nav-links{position:static;display:flex;flex-direction:row;padding:0;border:0;gap:16px;box-shadow:none;order:3;flex-basis:100%;justify-content:center}.nav-links>a{font-size:12px;padding:4px 0}}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script id="portfolio-preferences" dangerouslySetInnerHTML={{ __html: preferencesScript }} /></head>
      <body id="top">
        <noscript><style>{noScriptStyles}</style></noscript>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
