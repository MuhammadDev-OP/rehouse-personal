import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/layout/Header";
import { ppNeueMontreal, PPValve, PPValveStencil } from './fonts';
import HeaderWrapper from "../components/headerWrapper";

export const metadata = {
  title: "Rehouse - Premium Real Estate & Property Solutions",
  description: "Discover premium real estate solutions with Rehouse. We specialize in luxury properties, modern architecture, and exceptional living experiences. Find your dream home with our expert guidance.",
  keywords: "real estate, luxury properties, modern architecture, premium homes, property investment, real estate solutions, luxury living, modern homes",
  authors: [{ name: "Rehouse Team" }],
  creator: "Rehouse",
  publisher: "Rehouse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rehouse.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Rehouse - Premium Real Estate & Property Solutions",
    description: "Discover premium real estate solutions with Rehouse. We specialize in luxury properties, modern architecture, and exceptional living experiences.",
    url: 'https://rehouse.com',
    siteName: 'Rehouse',
    images: [
      {
        url: '/assets/rehouse-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Rehouse - Premium Real Estate Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rehouse - Premium Real Estate & Property Solutions",
    description: "Discover premium real estate solutions with Rehouse. We specialize in luxury properties, modern architecture, and exceptional living experiences.",
    images: ['/assets/rehouse-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${ppNeueMontreal.variable} ${PPValve.variable} ${PPValveStencil.variable} antialiased font-pp-neue`}
      >
        <HeaderWrapper />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
