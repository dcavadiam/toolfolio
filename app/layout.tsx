import type { Metadata } from "next";
import { Geist_Mono, Inter, Manrope, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toolfolio",
  description: "Toolfolio es una plataforma de herramientas web para desarrollo, diseño y marketing, entre otras cosas.",
  icons: {
    icon: [
      {
        url: "/tool-light.ico?v=1",
        media: "(prefers-color-scheme: light)",
        type: "image/x-icon",
      },
      {
        url: "/tool-dark.ico?v=1",
        media: "(prefers-color-scheme: dark)",
        type: "image/x-icon",
      },
    ],
  },
  openGraph: {
    title: "Toolfolio",
    description: "Toolfolio es una plataforma de herramientas web para desarrollo, diseño y marketing, entre otras cosas.",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolfolio",
    description: "Toolfolio es una plataforma de herramientas web para desarrollo, diseño y marketing, entre otras cosas.",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", manrope.variable, inter.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
