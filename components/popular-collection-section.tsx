"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { nftCards, type NFTCard } from "@/data/nfts";
import { MintModal } from "./mint-modal";
import { useTerms } from "@/context/terms-context";
function CollectionCard({
  card,
  onClick,
}: {
  card: NFTCard;
  onClick: (card: NFTCard) => void;
}) {
  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[360px] snap-start cursor-pointer transition-all duration-500 group"
      onClick={() => onClick(card)}
    >
      <div className="rounded-[2.5rem] overflow-hidden bg-[#1a1517]/40 backdrop-blur-xl border border-[#4a3540]/20 shadow-[0_15px_35px_rgba(0,0,0,0.3)] group-hover:shadow-[0_25px_50px_rgba(122,74,88,0.35)] group-hover:translate-y-[-8px]">
        {/* Glow header overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a3540]/10 to-transparent pointer-events-none" />

        {/* Content Section */}
        <div className="p-5 md:p-6 relative z-10">
          {/* Artist Info */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl md:text-2xl font-black text-[#e8dde0] font-cormorant tracking-tighter">
              {card.artistName}
            </h3>
            <div className="w-6 h-6 bg-[#4a3540]/30 rounded-full flex items-center justify-center border border-[#9a8588]/30 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#9a8588]" />
            </div>
          </div>
          <p className="text-[#9a8588] text-[10px] uppercase font-black tracking-widest mb-4 inline-block px-2 py-0.5 bg-[#2a2123]/50 rounded border border-[#4a3540]/20">
            {card.role}
          </p>

          {/* NFT Image */}
          <div className="rounded-[1.5rem] overflow-hidden border border-[#4a3540]/20 relative">
            <Image
              src={card.image || "/placeholder.svg"}
              alt={`${card.artistName} NFT`}
              width={400}
              height={350}
              className="w-full h-[220px] sm:h-[240px] md:h-[300px] object-cover transition-all duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1517]/40 to-transparent opacity-60" />
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-[#1a1517]/90 p-5 md:p-6 border-t border-[#4a3540]/30 relative z-10">
          <div className="grid grid-cols-2 items-center gap-4">
            {/* Price Info */}
            <div>
              <p className="text-[#9a8588] text-[9px] uppercase font-black tracking-[0.2em] mb-1">
                Fixed Price
              </p>
              <p className="text-[#e8dde0] font-black text-xl md:text-2xl font-cormorant leading-none">
                {card.price}
              </p>
              <p className="text-[#9a8588]/60 text-[10px] mt-1 font-bold tracking-tight">
                {card.priceUSD}
              </p>
            </div>

            {/* Buy Action */}
            <div className="text-right">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(card);
                }}
                className="bg-transparent hover:bg-[#4a3540]/20 text-[#b8707e] hover:text-[#e8dde0] text-[10px] font-black px-5 py-2.5 rounded-xl uppercase tracking-widest transition-all border border-[#4a3540]/60 hover:border-[#b8707e] shadow-sm transform group-hover:scale-105"
              >
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PopularCollectionSection() {
  const { checkAgreement } = useTerms();
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mintingNft, setMintingNft] = useState<NFTCard | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate pages dynamically based on active cards
  // Assuming ~3 cards per view on bigger screens
  const visibleCount = showAll ? nftCards.length : 7;
  const totalPages = Math.max(1, Math.ceil(visibleCount / 3));

  const scrollToPage = (page: number) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const maxScroll = scrollWidth - containerWidth;
      const scrollPosition = (maxScroll / (totalPages - 1)) * (page - 1);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPercentage = scrollLeft / maxScroll;
      const newPage = Math.round(scrollPercentage * (totalPages - 1)) + 1;
      if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    }
  };

  const handleCardClick = (card: NFTCard) => {
    if (!checkAgreement()) return;
    setMintingNft(card);
  };

  return (
    <section
      id="popular"
      className="relative py-32 md:py-40 overflow-hidden bg-transparent"
    >
      {/* Ambient background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a3540]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-20 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#e8dde0] font-cormorant tracking-tight uppercase leading-none mb-3">
              POPULAR <span className="text-[#b8707e]">MANSIONS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4a3540] to-transparent mr-4" />
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden sm:block text-[#b8707e] hover:text-[#e8dde0] transition-all text-sm md:text-base font-black uppercase tracking-[0.2em] underline decoration-[#4a3540] underline-offset-8 decoration-2 flex-shrink-0"
          >
            {showAll ? "Display All" : "Display Less"}
          </button>
        </div>
      </div>

      {/* Content View: Grid or Carousel */}
      {showAll ? (
        /* Grid View for All Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-10 max-w-[1920px] mx-auto relative z-10">
          {nftCards.map((card) => (
            <div
              key={card.id}
              className="flex justify-center transition-all duration-500 hover:z-30 hover:scale-105"
            >
              <CollectionCard card={card} onClick={handleCardClick} />
            </div>
          ))}
        </div>
      ) : (
        /* Carousel View for Top 7 */
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-4 md:px-6 pb-12 snap-x snap-mandatory relative z-20"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Left spacing for centering look */}
          <div className="flex-shrink-0 w-2 md:w-24" />

          {nftCards.slice(0, 7).map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 transition-all duration-500 hover:z-30 hover:scale-105"
            >
              <CollectionCard card={card} onClick={handleCardClick} />
            </div>
          ))}

          {/* Right spacing */}
          <div className="flex-shrink-0 w-2 md:w-24" />
        </div>
      )}

      {/* Pagination Dots - Only show in Carousel mode */}
      {!showAll && (
        <div className="flex justify-center gap-4 mt-8 md:mt-12 flex-wrap px-4 relative z-20">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index + 1)}
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-500 border border-[#4a3540]/40 ${
                currentPage === index + 1
                  ? "bg-[#b8707e] scale-125 shadow-[0_0_15px_rgba(184,112,126,0.6)]"
                  : "bg-[#1a1517] hover:bg-[#4a3540]/40"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile See More Button */}
      <div className="flex justify-center mt-12 sm:hidden">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#b8707e] hover:text-[#e8dde0] transition-colors text-sm font-black uppercase tracking-widest underline decoration-[#4a3540] underline-offset-8 decoration-2"
        >
          {showAll ? "Display All" : "Display Less"}
        </button>
      </div>
      <MintModal
        isOpen={!!mintingNft}
        onClose={() => setMintingNft(null)}
        nft={mintingNft}
      />
    </section>
  );
}
