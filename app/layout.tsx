import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const baseUrl = "https://placeindex.online";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PlaceIndex — Real Estate Market Intelligence & Area Investment Index",
    template: "%s | PlaceIndex",
  },
  description: "PlaceIndex is a standardized benchmark system for real estate. Compare neighborhoods side-by-side using data-driven metrics, rental yields, and market trajectory signals.",
  keywords: [
    "real estate intelligence",
    "area investment index",
    "neighborhood analytics",
    "property investment data",
    "rental yield index",
    "market intelligence dashboard",
    "neighborhood benchmarking",
    "PlaceIndex"
  ],
  authors: [{ name: "Amey Sawant", url: "mailto:ameysawant@placeindex.online" }],
  creator: "PlaceIndex",
  publisher: "PlaceIndex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "PlaceIndex",
    title: "PlaceIndex — The S&P 500 for Neighborhoods",
    description: "Objective signals and data-driven metrics for real estate area investment. Compare localities with the standard benchmark.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlaceIndex - Real Estate Market Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceIndex — Real Estate Market Intelligence",
    description: "Standardized benchmark system for neighborhood investment analysis.",
    creator: "@placeindex",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      rel: "icon",
      url: "/black-logo.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/white-logo.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PlaceIndex",
              url: baseUrl,
              description: "Real Estate Market Intelligence and Area Investment Index. A standardized benchmark for comparing neighborhood investment potential.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
