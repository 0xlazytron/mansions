import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { WalletProvider } from "@/context/wallet-context";
import { TermsProvider } from "@/context/terms-context";
import "./globals.css";
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

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
        className={`${_inter.variable} ${_cormorant.variable} font-sans antialiased`}
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
