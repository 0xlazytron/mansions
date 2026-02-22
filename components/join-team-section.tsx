"use client";

import { ExternalLink } from "lucide-react";

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
          href="https://m3th1ld3.art/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-[#4a3540] to-[#2a2123] text-[#e8dde0] font-semibold rounded-2xl hover:from-[#6b4555] hover:to-[#3b2b30] transition-all hover:-translate-y-1 text-sm md:text-base tracking-wide border border-[#7a4a58]/50 shadow-[0_10px_30px_rgba(122,74,88,0.3)]"
        >
          <ExternalLink className="w-5 h-5" />
          Get in Touch
        </a>
      </div>
    </section>
  );
}
