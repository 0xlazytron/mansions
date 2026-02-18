"use client";

import Image from "next/image";
import { Check, ExternalLink, X, Share2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type NFTCard } from "@/data/nfts";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: NFTCard | null;
}

export function MintModal({ isOpen, onClose, nft }: MintModalProps) {
  if (!nft) return null;

  const txHash =
    "0x" +
    Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#181524]/95 backdrop-blur-2xl border-none sm:max-w-[460px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_80px_rgba(107,78,143,0.3)]">
        {/* Animated Background Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#4a3b69]/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-8 pt-10">
          <div className="text-center">
            {/* Success Icon Badge */}
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-tr from-[#4a3b69] to-[#2a2438] rounded-3xl rotate-12 flex items-center justify-center shadow-[0_10px_30px_rgba(107,78,143,0.3)]">
                <Check
                  className="w-12 h-12 text-[#e0d4ee] -rotate-12"
                  strokeWidth={3}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#181524] rounded-full flex items-center justify-center border-4 border-[#2a2438]">
                <Sparkles className="w-4 h-4 text-[#9a7fbf] animate-pulse" />
              </div>
            </div>

            <DialogHeader className="sm:text-center p-0 mb-8">
              <DialogTitle className="text-4xl font-black tracking-tighter font-cinzel text-[#e0d4ee] leading-none">
                MINT <span className="text-[#9a7fbf]">SUCCESSFUL!</span>
              </DialogTitle>
              <DialogDescription className="text-[#9a8bb0] mt-4 text-base font-medium">
                You just acquired a legendary piece of the Mansion Metaverse.
              </DialogDescription>
            </DialogHeader>

            {/* NFT Preview Card */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-[#4a3b69]/20 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-[#2a2438]/80 border border-[#4a3b69]/30 rounded-[2rem] p-4 flex items-center gap-5 overflow-hidden">
                <div className="w-24 h-24 relative rounded-2xl overflow-hidden flex-shrink-0 border border-[#4a3b69]/20">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-left py-1">
                  <h4 className="text-[#e0d4ee] font-black text-xl leading-tight mb-1">
                    {nft.name}
                  </h4>
                  <p className="text-[#c8b8db] font-bold text-sm">
                    {nft.artistName}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-[#8a7ba0] uppercase font-black tracking-widest bg-[#181524]/50 px-2 py-1 rounded-md border border-[#4a3b69]/20">
                      Price Paid: {nft.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-[#2a2438]/50 rounded-2xl p-5 mb-8 border border-[#4a3b69]/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#8a7ba0] text-[10px] uppercase font-black tracking-widest">
                  Transaction Hash
                </span>
                <span className="text-[#9a7fbf] text-[10px] font-bold">
                  In Progress...
                </span>
              </div>
              <div className="text-[#e0d4ee] font-mono text-xs break-all opacity-80">
                {txHash}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#2a2438]/50 hover:bg-[#2a2438]/80 text-[#e0d4ee] font-bold py-4 rounded-2xl transition-all border border-[#4a3b69]/50 group"
              >
                View Details
                <ExternalLink className="w-4 h-4 text-[#8a7ba0] group-hover:text-[#e0d4ee] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a3b69] to-[#2a2438] hover:from-[#5b4a7d] hover:to-[#3b2e55] text-[#e0d4ee] font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(107,78,143,0.3)] border border-[#6b4e8f]/50">
                Share
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-[#8a7ba0] hover:text-[#c8b8db] text-sm font-black uppercase tracking-widest transition-colors"
            >
              Back to Collection
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#2a2438]/30 border-t border-[#4a3b69]/30 text-center">
          <p className="text-[10px] text-[#8a7ba0] uppercase tracking-[0.3em] font-black">
            Authenticated by Mansion Network
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
