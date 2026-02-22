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
      <DialogContent className="bg-[#1a1517]/95 backdrop-blur-2xl border-none sm:max-w-[460px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_80px_rgba(122,74,88,0.3)]">
        {/* Animated Background Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#4a3540]/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-rose-800/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-8 pt-10">
          <div className="text-center">
            {/* Success Icon Badge */}
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-tr from-[#4a3540] to-[#2a2123] rounded-3xl rotate-12 flex items-center justify-center shadow-[0_10px_30px_rgba(122,74,88,0.3)]">
                <Check
                  className="w-12 h-12 text-[#e8dde0] -rotate-12"
                  strokeWidth={3}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#1a1517] rounded-full flex items-center justify-center border-4 border-[#2a2123]">
                <Sparkles className="w-4 h-4 text-[#b8707e] animate-pulse" />
              </div>
            </div>

            <DialogHeader className="sm:text-center p-0 mb-8">
              <DialogTitle className="text-4xl font-black tracking-tighter font-cormorant text-[#e8dde0] leading-none">
                MINT <span className="text-[#b8707e]">SUCCESSFUL!</span>
              </DialogTitle>
              <DialogDescription className="text-[#a68b8f] mt-4 text-base font-medium">
                You just acquired a legendary piece of the Mansion Metaverse.
              </DialogDescription>
            </DialogHeader>

            {/* NFT Preview Card */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-[#4a3540]/20 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-[#2a2123]/80 border border-[#4a3540]/30 rounded-[2rem] p-4 flex items-center gap-5 overflow-hidden">
                <div className="w-24 h-24 relative rounded-2xl overflow-hidden flex-shrink-0 border border-[#4a3540]/20">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-left py-1">
                  <h4 className="text-[#e8dde0] font-black text-xl leading-tight mb-1">
                    {nft.name}
                  </h4>
                  <p className="text-[#d4a5ae] font-bold text-sm">
                    {nft.artistName}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-[#9a8588] uppercase font-black tracking-widest bg-[#1a1517]/50 px-2 py-1 rounded-md border border-[#4a3540]/20">
                      Price Paid: {nft.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-[#2a2123]/50 rounded-2xl p-5 mb-8 border border-[#4a3540]/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#9a8588] text-[10px] uppercase font-black tracking-widest">
                  Transaction Hash
                </span>
                <span className="text-[#b8707e] text-[10px] font-bold">
                  In Progress...
                </span>
              </div>
              <div className="text-[#e8dde0] font-mono text-xs break-all opacity-80">
                {txHash}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#2a2123]/50 hover:bg-[#2a2123]/80 text-[#e8dde0] font-bold py-4 rounded-2xl transition-all border border-[#4a3540]/50 group"
              >
                View Details
                <ExternalLink className="w-4 h-4 text-[#9a8588] group-hover:text-[#e8dde0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(122,74,88,0.3)] border border-[#7a4a58]/50">
                Share
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-[#9a8588] hover:text-[#d4a5ae] text-sm font-black uppercase tracking-widest transition-colors"
            >
              Back to Collection
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#2a2123]/30 border-t border-[#4a3540]/30 text-center">
          <p className="text-[10px] text-[#9a8588] uppercase tracking-[0.3em] font-black">
            Authenticated by Mansion Network
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
