"use client";

import { Instagram } from "lucide-react";

const nftLinks = [
  { label: "Manifold", href: "https://manifold.xyz/@m3th1ld3" },
  { label: "Rarible", href: "https://og.rarible.com/m3th1ld3/owned" },
];

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.54-5.39L20.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Substack", href: "https://m3th1ld3.substack.com/", icon: SubstackIcon },
  { label: "Instagram", href: "http://instagram.com/m3th1ld3", icon: Instagram },
  { label: "X", href: "https://x.com/m3th1ld3", icon: XIcon },
];

export function JoinTeamSection() {
  return (
    <section
      id="join-team"
      className="relative bg-transparent py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e8dde0] mb-6 tracking-wide font-cormorant">
          Contact the Artist
        </h2>

        <p className="text-[#c4b0b4] text-base md:text-lg mb-10 leading-relaxed font-sans">
          Interested in commissioning work, collaborating, or learning more about the Mansions of the Moon collection? Get in touch.
        </p>

        <a
          href="https://m3th1ld3.art"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-[#4a3540] to-[#2a2123] text-[#e8dde0] font-semibold rounded-2xl hover:from-[#6b4555] hover:to-[#3b2b30] transition-all hover:-translate-y-1 text-sm md:text-base tracking-wide border border-[#7a4a58]/50 shadow-[0_10px_30px_rgba(122,74,88,0.3)]"
        >
          m3th1ld3.art
        </a>

        <div className="mt-10">
          <p className="text-[#9a8588] text-xs uppercase tracking-widest font-semibold mb-4">
            Follow
          </p>
          <div className="flex items-center justify-center gap-3 mb-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1a1517]/60 backdrop-blur-md text-[#c4b0b4] hover:text-[#e8dde0] border border-[#4a3540]/40 hover:border-[#b8707e] transition-all hover:-translate-y-1"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-[#9a8588] text-xs uppercase tracking-widest font-semibold mb-4">
            NFT Collections
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {nftLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1a1517]/60 backdrop-blur-md text-[#c4b0b4] hover:text-[#e8dde0] font-medium rounded-xl border border-[#4a3540]/40 hover:border-[#b8707e] transition-all text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
