import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SLM Labs",
  description: "My playground for trying out different projects.",
  authors: [{ name: "Sulaiman Shafiq" }],
  creator: "SLM Creatives",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SLM Labs",
    description: "My playground for trying out different projects.",
    url: "https://slmcreatives.com/lab",
    siteName: "SLM Creatives [Labs]",
    images: [
      {
        url: "https://slmcreatives.com/logo.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function LabsLayout({ children }: { children: any }) {
  return <section className={inter.className}>{children}</section>;
}
