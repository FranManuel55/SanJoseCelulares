import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "San José Celulares | iPhones, Samsung, Accesorios en Mendoza",
  description:
    "Tu tienda de confianza en Mendoza para celulares, accesorios y tecnología. iPhones, Samsung, Motorola, Apple Watch y más. Los mejores precios y atención personalizada. WhatsApp: +54 9 2616 92-8222",
  keywords: [
    "celulares Mendoza",
    "iPhone Mendoza",
    "Samsung Mendoza",
    "San José Celulares",
    "sj.celulares",
    "venta de celulares",
    "accesorios celulares",
    "Apple Watch Mendoza",
    "Motorola Mendoza",
  ],
  authors: [{ name: "San José Celulares" }],
  openGraph: {
    title: "San José Celulares | Tu tienda de confianza en Mendoza",
    description:
      "Los mejores celulares y accesorios al mejor precio. iPhones, Samsung, Motorola y más. ¡Consultanos por WhatsApp!",
    type: "website",
    locale: "es_AR",
    siteName: "San José Celulares",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
