import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import "@/lib/fontawesome";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"], 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hoopers Vendégház - Modern Guesthouse in Eger",
  description: "Experience the magical atmosphere of Eger in our modern guesthouse. Comfortable rooms and excellent service await you.",
  keywords: "guesthouse, Eger, Hungary, accommodation, rooms",
  authors: [{ name: "Hoopers Vendégház" }],
  robots: "index, follow",
  metadataBase: new URL('https://hoopersvendeghaz.hu'),
  alternates: {
    canonical: 'https://hoopersvendeghaz.hu',
    languages: {
      'hu': 'https://hoopersvendeghaz.hu/hu',
      'en': 'https://hoopersvendeghaz.hu/en',
      'de': 'https://hoopersvendeghaz.hu/de',
      'pl': 'https://hoopersvendeghaz.hu/pl',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://hoopersvendeghaz.hu',
    siteName: 'Hoopers Vendégház',
    title: 'Hoopers Vendégház - Modern Guesthouse in Eger',
    description: 'Experience the magical atmosphere of Eger in our modern guesthouse.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${manrope.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
