"use client";

const nftLinks = [
  { label: "Opensea", href: "https://opensea.io/M3th1ld3" },
  { label: "Manifold", href: "https://manifold.xyz/@m3th1ld3" },
  { label: "Rarible", href: "https://rarible.com/collection/base/0xd0f68bd2a6e0e007ffe05b0e2f717075abe38b9a/items" },
  { label: "Magic Eden", href: "https://magiceden.us/collections/base/0xd0f68bd2a6e0e007ffe05b0e2f717075abe38b9a" },
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
