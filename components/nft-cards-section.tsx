"use client";

import { useState } from "react";
import Image from "next/image";
import { nftCards } from "@/data/nfts";
import type { NFTCard } from "@/data/nfts";
import { MintModal } from "./mint-modal";
import { useTerms } from "@/context/terms-context";

// Extended props for UI
interface NFTCardUI extends NFTCard {
  rotation: string;
  zIndex: number;
  isFeatured?: boolean;
}

// Select specific cards for this section
const sectionCards: NFTCardUI[] = [
  { ...nftCards[2], rotation: "-rotate-6", zIndex: 10 },
  { ...nftCards[3], rotation: "rotate-0", zIndex: 20, isFeatured: true },
  { ...nftCards[4], rotation: "rotate-6", zIndex: 10 },
];

function VerifiedBadge() {
  return (
    <div className="w-7 h-7 bg-[#4a3540]/30 rounded-full flex items-center justify-center flex-shrink-0 border border-[#9a8588]/20">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#9a8588"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function NFTCardComponent({
  card,
  onMint,
}: {
  card: NFTCardUI;
  onMint: (nft: NFTCard) => boolean;
}) {
  const handleClick = () => {
    if (!onMint(card)) return;
  };

  const glowStyles = "shadow-[0_8px_24px_rgba(0,0,0,0.2)]";

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-[2.5rem] overflow-hidden bg-[#1a1517]/40 backdrop-blur-xl border border-[#4a3540]/20 ${glowStyles} transform transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(122,74,88,0.3)]`}
      style={{
        zIndex: card.zIndex,
        width: card.isFeatured ? "340px" : "300px",
      }}
    >
      {/* Subtle top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9a8588]/30 to-transparent" />

      {/* Header with title */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-black text-[#e8dde0] font-cormorant tracking-tighter">
            {card.name.split("#")[0]}{" "}
            <span className="text-[#b8707e]">#{card.name.split("#")[1]}</span>
          </h3>
          <VerifiedBadge />
        </div>
        <p className="text-[#9a8588] text-[10px] uppercase font-black tracking-widest bg-[#2a2123]/50 inline-block px-2 py-0.5 rounded-md border border-[#4a3540]/20">
          {card.artistName} • {card.role}
        </p>
      </div>

      {/* Image Container */}
      <div className="px-5 pb-3">
        <div className="relative w-full h-[320px] rounded-[2rem] overflow-hidden border border-[#4a3540]/20">
          <Image
            src={card.image || "/placeholder.svg"}
            alt={card.artistName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1517]/40 to-transparent opacity-60" />
        </div>
      </div>

      {/* Price Info */}
      <div className="px-6 pb-6 flex justify-between items-center">
        <div>
          <p className="text-[#9a8588] text-[9px] uppercase font-black tracking-[0.2em] mb-1">
            Reserve Price
          </p>
          <p className="text-[#e8dde0] font-black text-xl font-cormorant leading-none">
            {card.price}
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-[0.15em] transition-all border border-[#7a4a58]/50 shadow-[0_5px_15px_rgba(122,74,88,0.3)] group-hover:shadow-[0_8px_20px_rgba(122,74,88,0.4)] group-hover:-translate-y-0.5 active:translate-y-0">
          Mint
        </button>
      </div>
    </div>
  );
}

export function NFTCardsSection() {
  const { checkAgreement } = useTerms();
  const [mintingNft, setMintingNft] = useState<NFTCard | null>(null);

  const handleMintAttempt = (card: NFTCard) => {
    if (!checkAgreement()) return false;
    setMintingNft(card);
    return true;
  };

  return (
    <section
      id="collections"
      className="relative bg-transparent py-32 md:py-40 overflow-hidden"
    >
      {/* Decorative Mysterious Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-rose-800/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-[#e8dde0] font-black text-4xl md:text-5xl font-cormorant tracking-tight mb-4">
          Introducing the <span className="text-[#b8707e]">Mansions of the Moon</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4a3540] to-transparent mx-auto" />
      </div>

      {/* Cards container */}
      <div className="relative z-20 mt-8 px-4">
        {/* Mobile: Horizontal scrolling */}
        <div
          className="flex md:hidden overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sectionCards.map((card) => (
            <div key={card.id} className="flex-shrink-0 snap-center">
              <NFTCardComponent card={card} onMint={handleMintAttempt} />
            </div>
          ))}
        </div>

        {/* Desktop: Overlapping fan layout */}
        <div className="hidden md:flex items-center justify-center">
          <div
            className="relative flex items-end justify-center w-full max-w-5xl"
            style={{ height: "550px" }}
          >
            {/* Left Card */}
            <div
              className="absolute transform -rotate-12 -translate-x-[220px] translate-y-[40px] transition-all duration-500 hover:z-50 hover:rotate-0 hover:translate-y-0"
              style={{ zIndex: 10 }}
            >
              <NFTCardComponent
                card={sectionCards[0]}
                onMint={handleMintAttempt}
              />
            </div>

            {/* Right Card */}
            <div
              className="absolute transform rotate-12 translate-x-[220px] translate-y-[40px] transition-all duration-500 hover:z-50 hover:rotate-0 hover:translate-y-0"
              style={{ zIndex: 10 }}
            >
              <NFTCardComponent
                card={sectionCards[2]}
                onMint={handleMintAttempt}
              />
            </div>

            {/* Center Card (Featured) */}
            <div
              className="relative transition-all duration-500 hover:z-50 hover:scale-105"
              style={{ zIndex: 30 }}
            >
              <NFTCardComponent
                card={sectionCards[1]}
                onMint={handleMintAttempt}
              />
            </div>
          </div>
        </div>
      </div>
      <MintModal
        isOpen={!!mintingNft}
        onClose={() => setMintingNft(null)}
        nft={mintingNft}
      />
    </section>
  );
}
