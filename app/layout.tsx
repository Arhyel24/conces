import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CONCES UNIMAID | The Light Bearers",
  description:
    "Join the Coalition of Christian Engineering Students (CONCES) at the University of Maiduguri. Manifesting God in every step through worship, service, and engineering excellence.",
  keywords: [
    "CONCES",
    "Christian Fellowship",
    "Engineering Students",
    "UNIMAID",
    "Light Bearers",
    "Faith and Engineering",
    "Student Ministry",
    "Maiduguri",
    "Nigeria Fellowship",
  ],
  authors: [{ name: "CONCES UNIMAID" }],
  creator: "CONCES UNIMAID",
  openGraph: {
    title: "CONCES UNIMAID | The Light Bearers",
    description:
      "A community of Christian engineers at the University of Maiduguri striving to manifest God through fellowship and excellence.",
    url: "https://your-conces-site.com", // Replace with your domain
    siteName: "CONCES UNIMAID",
    images: [
      {
        url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
        width: 800,
        height: 600,
        alt: "Fellowship Gathering - CONCES UNIMAID",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CONCES UNIMAID | The Light Bearers",
    description:
      "Manifesting God in every step – Join CONCES, a community of Christian Engineering Students at UNIMAID.",
    images: [
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    creator: "@yourhandle", // Replace with actual Twitter handle
  },
  metadataBase: new URL("https://your-conces-site.com"),
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
        <Toaster position="top-right" richColors closeButton />
        {children}
      </body>
    </html>
  );
}
