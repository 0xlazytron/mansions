import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "How to Mint", href: "#how-it-works" },
  { label: "Collections", href: "#collections" },
  // { label: "Contact", href: "#contact" },
];

const helpLinks = [
  { label: "Customer Care", href: "/help" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#181524]/95 backdrop-blur-2xl pt-16 md:pt-24 pb-8 md:pb-12 border-t border-[#4a3b69]/40 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#4a3b69]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-4 mb-6 md:mb-8 w-fit group"
            >
              <div className="w-12 h-12 relative overflow-hidden rounded-xl border border-[#4a3b69]/40 shadow-[0_0_20px_rgba(107,78,143,0.2)]">
                <Image
                  src="/logo.jpg"
                  alt="NFT Mansions Logo"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  unoptimized
                />
              </div>
              <span className="text-[#e0d4ee] font-black text-xl md:text-2xl tracking-tighter font-cinzel">
                MANSIONS
              </span>
            </Link>

            {/* Description */}
            <p className="text-[#8a7ba0] text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-sm">
              The premier destination for luxury digital real estate. Collect,
              own, and trade exclusive ultra-modern mansion NFTs in the most
              elite metaverse marketplace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all bg-[#181524]/80 text-[#8a7ba0] border border-[#4a3b69]/40 hover:bg-[#4a3b69]/20 hover:text-[#e0d4ee] hover:border-[#9a7fbf] hover:-translate-y-1 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
            <h3 className="text-[#e0d4ee] font-black text-sm tracking-[0.2em] mb-6 md:mb-8 font-cinzel uppercase">
              Mansions
            </h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#8a7ba0] text-sm hover:text-[#9a7fbf] transition-colors font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#4a3b69] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Help Links */}
          <div className="flex flex-col">
            <h3 className="text-[#e0d4ee] font-black text-sm tracking-[0.2em] mb-6 md:mb-8 font-cinzel uppercase">
              HELP
            </h3>
            <nav aria-label="Help navigation">
              <ul className="space-y-4">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#8a7ba0] text-sm hover:text-[#9a7fbf] transition-colors font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#4a3b69] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-[#4a3b69]/30">
          <p className="text-[#8a7ba0]/60 text-xs md:text-sm text-center font-medium tracking-wide">
            © 2026 MANSIONS SALES. All rights reserved. Registered on Ethereum
            Blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
}
