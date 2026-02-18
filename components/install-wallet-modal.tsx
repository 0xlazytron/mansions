"use client";

import Image from "next/image";
import { Download, ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WalletType } from "@/hooks/use-wallet";

interface InstallWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletType: WalletType | null;
}

const walletInfo = {
  metamask: {
    name: "MetaMask",
    icon: "https://cdn.worldvectorlogo.com/logos/metamask.svg",
    installUrl: "https://metamask.io/download/",
    description:
      "MetaMask is the most popular browser extension wallet used for interacting with dApps.",
  },
  coinbase: {
    name: "Coinbase Wallet",
    icon: "https://avatars.githubusercontent.com/u/18060234?s=128&v=4",
    installUrl: "https://www.coinbase.com/wallet/downloads",
    description:
      "Coinbase Wallet is a secure and easy-to-use wallet for your digital assets.",
  },
  walletconnect: {
    name: "WalletConnect",
    icon: "https://avatars.githubusercontent.com/u/37784886?s=128&v=4",
    installUrl: "https://walletconnect.com/",
    description: "Connect your mobile wallet to dApps by scanning a QR code.",
  },
};

export function InstallWalletModal({
  isOpen,
  onClose,
  walletType,
}: InstallWalletModalProps) {
  if (!walletType) return null;

  const info = walletInfo[walletType];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#181524]/95 backdrop-blur-2xl border-none sm:max-w-[400px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(107,78,143,0.3)]">
        {/* Background Glow */}
        <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 p-8">
          <div className="text-center">
            <div className="w-20 h-20 relative mx-auto mb-6 bg-[#2a2438] p-4 rounded-3xl border border-[#4a3b69]/30 flex items-center justify-center shadow-[0_0_15px_rgba(107,78,143,0.2)]">
              <Image
                src={info.icon}
                alt={info.name}
                width={60}
                height={60}
                className="object-contain"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4a3b69] rounded-full flex items-center justify-center border-4 border-[#181524]">
                <Download className="w-4 h-4 text-[#e0d4ee]" />
              </div>
            </div>

            <DialogHeader className="sm:text-center p-0">
              <DialogTitle className="text-2xl font-black tracking-tight font-cinzel text-[#e0d4ee]">
                INSTALL{" "}
                <span className="text-[#9a7fbf] uppercase">{info.name}</span>
              </DialogTitle>
              <DialogDescription className="text-[#9a8bb0] mt-4 text-sm leading-relaxed">
                {info.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-4">
              <a
                href={info.installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#4a3b69] to-[#2a2438] hover:from-[#5b4a7d] hover:to-[#3b2e55] text-[#e0d4ee] font-bold py-4 rounded-2xl transition-all shadow-[0_4px_15px_rgba(107,78,143,0.3)] hover:shadow-[0_6px_20px_rgba(107,78,143,0.4)] hover:-translate-y-0.5 active:translate-y-0 border border-[#6b4e8f]/50"
              >
                Get Extension
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full text-[#8a7ba0] hover:text-[#c8b8db] text-sm font-medium transition-colors py-2"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#2a2438]/30 border-t border-[#4a3b69]/30 text-center">
          <p className="text-[10px] text-[#8a7ba0] uppercase tracking-[0.2em] font-black">
            Required for Minting & Trading
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
