import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I mint a Mansion NFT?",
      answer:
        "To mint a mansion, first connect your MetaMask wallet using the button in the navbar. Once connected, browse the collections, select 'The Little Belly' or 'The Sun Mandala', and click the 'Mint' or 'Collection' buttons to proceed with the transaction.",
    },
    {
      question: "What is MetaMask?",
      answer:
        "MetaMask is a digital wallet that allows you to store Ethereum and interact with decentralized applications (dApps) like Mansion Sales. It's available as a browser extension and mobile app.",
    },
    {
      question: "How can I see my minted mansions?",
      answer:
        "Once the transaction is confirmed on the blockchain, your NFT will appear in your connected wallet. You can also view it on platforms like OpenSea by searching for your wallet address.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#100d0e] text-white pt-32 pb-24 px-6 overflow-hidden relative">
      {/* Mysterious Background Glows */}
      <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-rose-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 font-cormorant text-center tracking-tight">
          <span className="text-[#e8dde0]">CUSTOMER</span>{" "}
          <span className="text-[#b8707e]">CARE</span>
        </h1>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-[#e8dde0] font-cormorant tracking-tighter text-center md:text-left">
              Frequently Asked <span className="text-[#b8707e]">Questions</span>
            </h2>
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#1a1517]/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-[#4a3540]/40 hover:border-[#b8707e]/60 transition-all duration-500 group shadow-lg hover:shadow-[0_20px_40px_rgba(122,74,88,0.2)]"
                >
                  <h3 className="text-xl font-black text-[#e8dde0] mb-3 font-cormorant tracking-tight group-hover:text-[#b8707e] transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-[#9a8588] text-sm md:text-base leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#1a1517]/80 to-[#100d0e]/80 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] border border-[#4a3540]/40 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#4a3540]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#e8dde0] font-cormorant tracking-tight relative z-10">
              Still need <span className="text-[#b8707e]">help?</span>
            </h2>
            <p className="text-[#9a8588] text-base md:text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
              Our team is here to assist you with any issues or questions about
              your Mansions.
            </p>
            <Link
              href="mailto:support@mansionsales.com"
              className="inline-block bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] font-black py-4 px-10 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(122,74,88,0.3)] border border-[#7a4a58]/50 uppercase tracking-widest text-sm relative z-10"
            >
              Contact Support
            </Link>
          </section>
        </div>

        <div className="mt-20 text-center">
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
