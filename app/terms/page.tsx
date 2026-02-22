import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "January 21, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using the Mansion Sales platform, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.",
    },
    {
      title: "2. NFT Ownership & Rights",
      content:
        "When you mint or purchase a Mansion NFT, you own the underlying digital asset. However, the intellectual property rights to the artwork remain with the original creators. Your purchase grants you a personal, non-commercial license to display the NFT.",
    },
    {
      title: "3. Wallet Security",
      content:
        "You are solely responsible for the security of your digital wallet and private keys. Mansion Sales is not responsible for any lost funds or unauthorized access to your wallet.",
    },
    {
      title: "4. No Financial Advice",
      content:
        "The information provided on this website and our NFTs are for informational and collectible purposes only. They do not constitute financial or investment advice. Crypto assets are highly volatile.",
    },
    {
      title: "5. Modification of Terms",
      content:
        "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the platform after changes are posted constitutes your acceptance of the new terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#100d0e] text-white pt-32 pb-24 px-6 overflow-hidden relative">
      {/* Mysterious Background Glows */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-rose-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 font-cormorant text-center tracking-tight">
          <span className="text-[#e8dde0]">TERMS</span>{" "}
          <span className="text-[#b8707e]">&</span>{" "}
          <span className="text-[#e8dde0]">CONDITIONS</span>
        </h1>
        <p className="text-center text-[#9a8588] text-sm md:text-base font-medium uppercase tracking-[0.2em] mb-16 opacity-80">
          Last Updated: {lastUpdated}
        </p>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <section
              key={index}
              className="border-l-2 border-[#4a3540]/40 pl-8 py-2 relative group hover:border-[#b8707e] transition-all duration-500"
            >
              {/* Subtle accent glow on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#b8707e] shadow-[0_0_15px_rgba(184,112,126,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#e8dde0] font-cormorant tracking-tighter group-hover:text-[#b8707e] transition-colors duration-300">
                {section.title}
              </h2>
              <p className="text-[#9a8588] text-sm md:text-base leading-relaxed font-medium">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-20 bg-[#1a1517]/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-[#4a3540]/40 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <p className="text-[#9a8588] text-base md:text-lg italic font-medium">
            Questions about our terms? Please contact us at{" "}
            <Link
              href="mailto:legal@mansionsales.com"
              className="text-[#b8707e] hover:text-[#e8dde0] font-black transition-colors underline decoration-[#b8707e]/30 underline-offset-8"
            >
              legal@mansionsales.com
            </Link>
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-[#9a8588] hover:text-[#e8dde0] font-black uppercase tracking-widest text-sm transition-all group flex items-center justify-center gap-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
