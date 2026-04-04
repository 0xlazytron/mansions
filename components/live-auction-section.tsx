"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nftCards } from "@/data/nfts";
import type { NFTCard } from "@/data/nfts";
import { MintModal } from "./mint-modal";
import { useTerms } from "@/context/terms-context";
import {
  createPublicClient,
  formatEther,
  http,
  type Address,
} from "viem";
import { mainnet, sepolia } from "viem/chains";

// Extended interface for UI-specific props not in the data model
interface AuctionCardUI extends NFTCard {
  zIndex: number;
  rotation: string;
  translateX: string;
}

const liveAuctionCards: AuctionCardUI[] = [
  {
    ...nftCards[5],
    zIndex: 10,
    rotation: "-rotate-12",
    translateX: "-translate-x-32",
  },
  {
    ...nftCards[6],
    zIndex: 20,
    rotation: "-rotate-6",
    translateX: "-translate-x-16",
  },
  {
    ...nftCards[7],
    zIndex: 30,
    rotation: "rotate-0",
    translateX: "translate-x-0",
  }, // Featured
];

function VerifiedBadge() {
  return (
    <div className="w-6 h-6 md:w-7 md:h-7 bg-[#4a3540]/30 rounded-full flex items-center justify-center border border-[#9a8588]/20">
      <svg
        width="14"
        height="14"
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

function AuctionCardComponent({
  card,
  isFeatured,
  onMint,
  mintPriceLabel,
}: {
  card: AuctionCardUI;
  isFeatured: boolean;
  onMint: (nft: NFTCard) => void;
  mintPriceLabel: string;
}) {
  const handleBuyNow = () => {
    onMint(card);
  };

  return (
    <div
      className={`relative rounded-[2.5rem] overflow-hidden bg-[#1a1517]/40 backdrop-blur-xl border border-[#4a3540]/20 cursor-pointer transition-all duration-500 group ${isFeatured
        ? "w-full sm:w-[300px] md:w-[340px] shadow-[0_15px_35px_rgba(122,74,88,0.3)]"
        : "w-[240px] md:w-[280px] shadow-[0_8px_20px_rgba(0,0,0,0.3)] opacity-80"
        } hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(122,74,88,0.4)] hover:opacity-100`}
      onClick={handleBuyNow}
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4a3540]/10 to-transparent pointer-events-none" />

      {/* Card Header */}
      <div className="p-4 md:p-6 pb-2 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`font-black font-cormorant tracking-tighter ${isFeatured ? "text-[#e8dde0] text-xl md:text-2xl" : "text-[#e8dde0] text-lg"}`}
          >
            {card.name.split("#")[0]}{" "}
            <span className="text-[#b8707e]">#{card.name.split("#")[1]}</span>
          </span>
          <VerifiedBadge />
        </div>
        <p
          className={`text-[#9a8588] ${isFeatured ? "text-sm" : "text-xs"} uppercase font-black tracking-widest`}
        >
          {card.artistName}
        </p>
      </div>

      {/* Card Image */}
      <div
        className={`mx-4 md:mx-6 rounded-[2rem] overflow-hidden border border-[#4a3540]/20 relative group ${isFeatured ? "h-[220px] sm:h-[260px] md:h-[300px]" : "h-[200px] md:h-[240px]"}`}
      >
        <Image
          src={card.image || "/placeholder.svg"}
          alt={card.artistName}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1517]/40 to-transparent opacity-60" />
      </div>

      <div className="p-4 md:p-6 pt-3 md:pt-4 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#9a8588] text-[9px] uppercase font-black tracking-[0.2em] mb-1">
              Fixed Price
            </p>
            <p className="text-[#e8dde0] font-black text-xl md:text-2xl font-cormorant leading-none">
              {mintPriceLabel}
            </p>
            <p className="text-[#9a8588]/60 text-[10px] mt-1 font-bold">
              Per NFT
            </p>
          </div>
          {isFeatured && (
            <div className="bg-[#2a2123] border border-[#4a3540]/40 p-2 rounded-xl">
              <div className="w-2 h-2 bg-[#b8707e] rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreatorBadge() {
  return (
    <div className="flex items-center gap-3 bg-[#1a1517]/80 backdrop-blur-md rounded-full pl-1 pr-5 py-1.5 border border-[#4a3540]/40 cursor-pointer hover:border-[#b8707e] transition-all group">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#4a3540]/60 p-0.5 bg-gradient-to-br from-[#4a3540] to-[#1a1517]">
        <div className="w-full h-full rounded-full overflow-hidden">
          <Image
            src={nftCards[0].image}
            alt="Creator Avatar"
            width={48}
            height={48}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            unoptimized
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[#e8dde0] font-black text-sm md:text-base font-cormorant tracking-tight group-hover:text-[#b8707e] transition-colors">
          @m3th1ld3
        </span>
        <span className="text-[#9a8588] text-[10px] uppercase font-black tracking-[0.1em]">
          Verified Artist
        </span>
      </div>
    </div>
  );
}

function CheckboxAgreement({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer group select-none py-2"
      onClick={onToggle}
    >
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all border ${checked
          ? "bg-gradient-to-br from-[#4a3540] to-[#b8707e] border-transparent shadow-[0_0_15px_rgba(184,112,126,0.4)]"
          : "bg-[#1a1517]/60 border-[#4a3540]/60 hover:border-[#b8707e]/60"
          }`}
      >
        {checked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L19 8"
              stroke="#e8dde0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[#9a8588] text-sm md:text-base font-medium">
        I agree to all rules.{" "}
        <Link
          href="/terms"
          className="text-[#b8707e] hover:text-[#e8dde0] font-black transition-colors underline decoration-[#b8707e]/30 underline-offset-4"
        >
          Terms of Service
        </Link>
      </span>
    </div>
  );
}

export function LiveAuctionSection() {
  const { isAgreed, setIsAgreed, checkAgreement } = useTerms();
  const [mintingNft, setMintingNft] = useState<NFTCard | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [mintPriceLabel, setMintPriceLabel] = useState("0.005 ETH");

  const env = useMemo(() => {
    const contractAddress = process.env
      .NEXT_PUBLIC_CONTRACT_ADDRESS as Address | undefined;
    const chainIdRaw = process.env.NEXT_PUBLIC_CHAIN_ID;
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
    const chainId = chainIdRaw ? Number(chainIdRaw) : NaN;
    return { contractAddress, chainId, rpcUrl };
  }, []);

  const chain = useMemo(() => {
    if (env.chainId === sepolia.id) return sepolia;
    if (env.chainId === mainnet.id) return mainnet;
    return null;
  }, [env.chainId]);

  useEffect(() => {
    const contractAddress = env.contractAddress;
    const rpcUrl = env.rpcUrl;
    if (!contractAddress || !rpcUrl || !chain) return;
    const publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });
    (async () => {
      try {
        const priceWei = await publicClient.readContract({
          address: contractAddress,
          abi: [
            {
              type: "function",
              name: "mintPrice",
              stateMutability: "view",
              inputs: [],
              outputs: [{ name: "", type: "uint256" }],
            },
          ] as const,
          functionName: "mintPrice",
        });
        setMintPriceLabel(`${formatEther(priceWei)} ETH`);
      } catch {
        setMintPriceLabel("0.005 ETH");
      }
    })();
  }, [env.contractAddress, env.rpcUrl, chain]);

  const featuredCard = liveAuctionCards[liveAuctionCards.length - 1];
  const sideCards = liveAuctionCards.slice(0, -1);

  const handleShopNow = () => {
    window.open("https://opensea.io/M3th1ld3", "_blank");
  };

  const handleBuyNowAction = (nft?: NFTCard) => {
    if (!checkAgreement()) return;
    setMintingNft(nft || featuredCard);
  };

  return (
    <section
      id="auctions"
      className="relative py-32 md:py-40 overflow-hidden bg-transparent"
    >
      {/* Ambient background effects */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32">
          {/* Left Side - Cards */}
          <div className="relative w-full lg:w-auto">
            {/* Mobile: Show only featured card centered */}
            <div className="flex lg:hidden justify-center px-4">
              <AuctionCardComponent
                card={featuredCard}
                isFeatured={true}
                onMint={handleBuyNowAction}
                mintPriceLabel={mintPriceLabel}
              />
            </div>

            {/* Desktop: Stacked Cards Layout */}
            <div className="hidden lg:flex relative h-[600px] w-[500px] items-center justify-center">
              {sideCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`absolute ${card.rotation} ${card.translateX} transition-all duration-700`}
                  style={{
                    zIndex: hoveredCardId === card.id ? 50 : card.zIndex,
                  }}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <AuctionCardComponent
                    card={card}
                    isFeatured={false}
                    onMint={handleBuyNowAction}
                    mintPriceLabel={mintPriceLabel}
                  />
                </div>
              ))}
              <div
                className={`absolute translate-x-0 transition-opacity duration-300`}
                style={{ zIndex: hoveredCardId === featuredCard.id ? 50 : 40 }}
                onMouseEnter={() => setHoveredCardId(featuredCard.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <AuctionCardComponent
                  card={featuredCard}
                  isFeatured={true}
                  onMint={handleBuyNowAction}
                  mintPriceLabel={mintPriceLabel}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Auction Details */}
          <div className="flex flex-col gap-8 md:gap-10 max-w-xl text-center lg:text-left">
            {/* Live Now Badge */}
            <div className="flex items-center gap-3 bg-[#1a1517]/80 backdrop-blur-md rounded-full px-5 py-2.5 w-fit mx-auto lg:mx-0 border border-[#4a3540]/40">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b8707e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b8707e]"></span>
              </div>
              <span className="text-[#e8dde0] font-black text-sm md:text-base uppercase tracking-widest leading-none">
                Coming Soon
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[#e8dde0] text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter font-cormorant">
              LIVE
              <br />
              AUCTION
              <br />
              <span className="text-[#b8707e]">COMING SOON</span>
            </h2>

            {/* Creator and Agreement Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex flex-col gap-3 items-center lg:items-start">
                <p className="text-[#9a8588] text-[10px] uppercase font-black tracking-[0.2em]">
                  Artist
                </p>
                <CreatorBadge />
              </div>

              <div className="flex flex-col gap-2 items-center lg:items-start">
                <p className="text-[#9a8588] text-[10px] uppercase font-black tracking-[0.2em] mb-1">
                  Authorization
                </p>
                <CheckboxAgreement
                  checked={isAgreed}
                  onToggle={() => setIsAgreed(!isAgreed)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={handleShopNow}
                className="bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] font-black px-8 md:px-10 py-4 md:py-5 rounded-2xl transition-all hover:-translate-y-1 text-sm md:text-base w-full sm:w-auto uppercase tracking-widest border border-[#7a4a58]/50 shadow-[0_10px_25px_rgba(122,74,88,0.3)] inline-flex items-center justify-center gap-3"
              >
                Explore Collection
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="opacity-90"
                >
                  <path
                    d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16C2.5 23.456 8.544 29.5 16 29.5C23.456 29.5 29.5 23.456 29.5 16C29.5 8.544 23.456 2.5 16 2.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M20.7 20.2C19.4 21.2 18.1 21.7 16 21.7C13.9 21.7 12.6 21.2 11.3 20.2C10.1 19.2 9.3 17.7 9.3 16.1C9.3 14.2 10.4 12.5 12.1 11.6C12.6 11.4 13.2 11.2 13.8 11.1C14.2 9.7 15.5 8.7 17 8.7C18.7 8.7 20.2 10 20.3 11.8C22 12.7 22.7 14.3 22.7 16.1C22.7 17.7 21.9 19.2 20.7 20.2Z"
                    fill="currentColor"
                    fillOpacity="0.85"
                  />
                  <path
                    d="M12.8 20.1L14.2 16.4L16 17.7L18.5 15.3L19.4 16.5L16.6 19.1L15.2 18.1L14.1 21.1L12.8 20.1Z"
                    fill="#1a1517"
                    fillOpacity="0.9"
                  />
                </svg>
              </button>
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
