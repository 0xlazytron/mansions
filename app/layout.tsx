import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { WalletProvider } from "@/context/wallet-context";
import { TermsProvider } from "@/context/terms-context";
import "./globals.css";
const _geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const _cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Mansions Sales",
  description: "Discover and collect extraordinary NFTs",

  icons: {
    icon: [
      {
        url: "/logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/logo.jpg",
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
        className={`${_geist.variable} ${_geistMono.variable} ${_cinzel.variable} font-sans antialiased`}
      >
        <WalletProvider>
          <TermsProvider>
            {children}
            <Analytics />
          </TermsProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
