import { Wallet, LayoutGrid, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "CONNECT WALLET",
    description:
      "Connect your digital wallet to the NFT Mansions platform to get started.",
  },
  {
    icon: LayoutGrid,
    title: "CHOOSE Mansions",
    description: "Browse and select the unique Mansions you want to mint.",
  },
  {
    icon: Zap,
    title: "MINT NFT",
    description:
      "Confirm the transaction in your wallet to secure your unique Mansions.",
  },
  {
    icon: CheckCircle,
    title: "View in Collection",
    description: "View your newly minted Mansions in your collection.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-to-mint"
      className="relative bg-transparent px-4 md:px-6 py-32 md:py-40 overflow-hidden"
    >
      {/* Decorative Mysterious Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 font-cormorant tracking-tight">
          <span className="text-[#e8dde0]">HOW TO </span>
          <span className="text-[#b8707e]">MINT</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#9a8588] max-w-2xl mx-auto mb-16 md:mb-24 leading-relaxed text-sm md:text-base px-4 font-medium uppercase tracking-widest opacity-80">
          Ready to join the NFT Mansions universe? Follow these simple steps to
          mint your very own unique Mansions NFT.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Icon circle with arc */}
              <div className="relative mb-8 transition-transform duration-500 group-hover:scale-110">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#4a3540]/20 rounded-full blur-2xl group-hover:bg-[#4a3540]/30 transition-all" />

                {/* SVG Container */}
                <svg
                  className="w-24 h-24 md:w-32 md:h-32 relative z-10"
                  viewBox="0 0 112 112"
                >
                  {/* Background circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    fill="#1a1517"
                    fillOpacity="0.8"
                    stroke="#4a3540"
                    strokeOpacity="0.3"
                    strokeWidth="2"
                    className="backdrop-blur-xl"
                  />
                  {/* Mysterious arc */}
                  <path
                    d="M 16 56 A 40 40 0 0 1 96 56"
                    fill="none"
                    stroke="#b8707e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-80 shadow-[0_0_10px_rgba(184,112,126,0.5)]"
                  />
                </svg>
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-[#d4a5ae] group-hover:text-[#e8dde0] transition-colors duration-300" />
                </div>

                {/* Step indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2a2123] rounded-full flex items-center justify-center border border-[#4a3540]/50 text-[#b8707e] font-black text-xs z-30 shadow-lg">
                  0{index + 1}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#e8dde0] text-xl md:text-2xl font-black font-cormorant tracking-tighter mb-4 group-hover:text-[#b8707e] transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#9a8588] text-sm leading-relaxed px-4 font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
