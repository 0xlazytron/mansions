"use client";

import { Mail } from "lucide-react";

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@m3th1ld3.art"
            className="w-full sm:w-auto px-8 md:px-10 py-4 bg-gradient-to-r from-[#4a3540] to-[#2a2123] text-[#e8dde0] font-semibold rounded-2xl hover:from-[#6b4555] hover:to-[#3b2b30] transition-all hover:-translate-y-1 text-sm md:text-base tracking-wide border border-[#7a4a58]/50 shadow-[0_10px_30px_rgba(122,74,88,0.3)] flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
          <a
            href="https://instagram.com/m3th1ld3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[#1a1517]/60 backdrop-blur-md text-[#e8dde0] font-semibold rounded-2xl border border-[#4a3540] hover:bg-[#4a3540]/20 hover:border-[#b8707e] transition-all hover:-translate-y-1 text-sm md:text-base tracking-wide shadow-lg flex items-center justify-center gap-3"
          >
            <InstagramIcon className="w-5 h-5" />
            Instagram
          </a>
          <a
            href="https://twitter.com/m3th1ld3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[#1a1517]/60 backdrop-blur-md text-[#e8dde0] font-semibold rounded-2xl border border-[#4a3540] hover:bg-[#4a3540]/20 hover:border-[#b8707e] transition-all hover:-translate-y-1 text-sm md:text-base tracking-wide shadow-lg flex items-center justify-center gap-3"
          >
            <XIcon className="w-5 h-5" />
            X / Twitter
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
