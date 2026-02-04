import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Meta Generator | Create Perfect Meta Tags Instantly",
  description: "Generate optimized meta tags, Open Graph tags, and Twitter Cards with real-time previews. See how your content will appear in Google, Facebook, LinkedIn, and Twitter.",
  keywords: "seo, meta tags, open graph, twitter cards, seo tools, meta tag generator, og tags, social media preview",
  authors: [{ name: "Gaspi" }],
  openGraph: {
    title: "SEO Meta Generator | Create Perfect Meta Tags Instantly",
    description: "Generate optimized meta tags with real-time previews for Google, Facebook, and Twitter.",
    type: "website",
    siteName: "SEO Meta Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Meta Generator",
    description: "Generate optimized meta tags with real-time previews",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
