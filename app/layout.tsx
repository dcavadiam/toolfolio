import type { Metadata } from "next";
import { Geist_Mono, Inter, Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import DynamicBackground from "@/components/layout/DynamicBackground";
import Footer from "@/components/layout/Footer";

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
  title: "toolfol.io",
  description: "Herramientas web para desarrollo, diseño y marketing.",
  icons: {
    icon: [
      {
        url: "/tool-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/tool-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    title: "toolfol.io",
    description: "Herramientas web para desarrollo, diseño y marketing.",
    images: "/og-image.webp",
  },
  twitter: {
    card: "summary_large_image",
    title: "toolfol.io",
    description: "Herramientas web para desarrollo, diseño y marketing.",
    images: "/og-image.webp",
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
      className={cn(
        "h-full",
        "antialiased",
        geist.variable,
        inter.variable,
        manrope.variable,
        geistMono.variable
      )}
    >
      <body className="relative isolate flex min-h-full flex-col">
        <DynamicBackground />
        {children}
        <Footer />
      </body>
    </html>
  );
}
