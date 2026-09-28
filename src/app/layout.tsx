import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile, skillGroups } from "@/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.nameEn} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${profile.nameEn}`,
  },
  description: profile.metaDescription,
  keywords: skillGroups.flatMap((group) => group.items),
  authors: [{ name: profile.nameEn, url: siteUrl }],
  creator: profile.nameEn,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title,
    description: profile.metaDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.metaDescription,
  },
  robots: { index: true, follow: true },
};

/**
 * Applies a remembered theme before first paint. Without this the page would
 * render in the system theme and then flip.
 */
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="sheet relative flex min-h-full flex-col font-sans">
        {/* Margin rules of the drafting sheet. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 flex justify-center">
          <div className="h-full w-full max-w-6xl border-x border-line" />
        </div>

        <div className="relative z-10 flex min-h-full flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
