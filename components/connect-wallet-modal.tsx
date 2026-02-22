"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wallet, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface WalletOptionProps {
  name: string;
  icon: string;
  description: string;
  onConnect: () => void;
}

function WalletOption({
  name,
  icon,
  description,
  onConnect,
}: WalletOptionProps) {
  return (
    <button
      onClick={onConnect}
      className="flex items-center gap-4 w-full p-4 rounded-2xl bg-[#2a2123]/50 hover:bg-[#4a3540]/30 border-none transition-all duration-300 group text-left relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-700/0 via-rose-700/5 to-rose-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <div className="w-12 h-12 relative flex-shrink-0 bg-[#1a1517] rounded-xl p-2 border-none transition-colors">
        <Image src={icon} alt={name} fill className="object-contain p-2" />
      </div>

      <div className="flex-grow">
        <h3 className="text-[#e8dde0] font-bold text-lg group-hover:text-[#d4a5ae] transition-colors flex items-center gap-2">
          {name}
        </h3>
        <p className="text-[#a68b8f] text-xs line-clamp-1">{description}</p>
      </div>

      <div className="text-[#9a8588] group-hover:text-[#d4a5ae] group-hover:translate-x-1 transition-all">
        <ChevronRight className="w-5 h-5" />
      </div>
    </button>
  );
}

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useWallet, WalletType } from "@/hooks/use-wallet";
import { InstallWalletModal } from "./install-wallet-modal";
import { useState } from "react";

export function ConnectWalletModal({
  isOpen,
  onClose,
}: ConnectWalletModalProps) {
  const { connect, isConnected, isConnecting, error } = useWallet();
  const [installWalletType, setInstallWalletType] = useState<WalletType | null>(
    null,
  );

  const handleConnect = async (walletName: string) => {
    const typeMap: Record<string, WalletType> = {
      MetaMask: "metamask",
      Coinbase: "coinbase",
      WalletConnect: "walletconnect",
    };

    const type = typeMap[walletName] || "metamask";

    try {
      await connect(type);
    } catch (err: any) {
      if (err.message?.includes("not installed")) {
        setInstallWalletType(type);
      } else {
        console.error("Connection failed", err);
      }
    }
  };

  // Automatically close modal when connected
  useEffect(() => {
    if (isConnected && isOpen) {
      onClose();
    }
  }, [isConnected, isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1517]/95 backdrop-blur-2xl border-none sm:max-w-[440px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(122,74,88,0.3)]">
        {/* Background Glow Effect */}
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-rose-800/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-[#4a3540]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header Section */}
          <div className="p-8 pb-6 text-center">
            <div className="w-16 h-16 bg-[#2a2123] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#4a3540]/30 shadow-[0_0_20px_rgba(122,74,88,0.1)]">
              <Wallet className="w-8 h-8 text-[#d4a5ae]" />
            </div>

            <DialogHeader className="sm:text-center">
              <DialogTitle className="text-3xl font-black tracking-tighter font-cormorant">
                <span className="bg-gradient-to-r from-[#b8707e] via-[#e8dde0] to-[#b8707e] bg-clip-text text-transparent">
                  CONNECT WALLET
                </span>
              </DialogTitle>
              <DialogDescription className="text-[#a68b8f] mt-3 text-sm leading-relaxed max-w-[280px] mx-auto">
                Connect your wallet to start collecting unique digital mansions.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Wallet List */}
          <div className="px-6 pb-8 flex flex-col gap-3">
            <WalletOption
              name="MetaMask"
              icon="https://cdn.worldvectorlogo.com/logos/metamask.svg"
              description="Popular browser extension wallet"
              onConnect={() => handleConnect("MetaMask")}
            />
            <WalletOption
              name="Coinbase"
              icon="https://avatars.githubusercontent.com/u/18060234?s=128&v=4"
              description="Securely store your crypto"
              onConnect={() => handleConnect("Coinbase")}
            />
            <WalletOption
              name="WalletConnect"
              icon="https://avatars.githubusercontent.com/u/37784886?s=128&v=4"
              description="Connect via mobile scan"
              onConnect={() => handleConnect("WalletConnect")}
            />

            <div className="p-4 rounded-2xl border border-dashed border-[#4a3540]/50 flex items-center justify-center gap-2 group cursor-pointer hover:border-[#b8707e]/50 transition-colors mt-2">
              <span className="text-[#9a8588] text-xs font-medium group-hover:text-[#e8dde0]">
                More Wallets Coming Soon
              </span>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="p-6 bg-[#2a2123]/30 border-t border-[#4a3540]/30 flex items-center justify-between px-8">
            <span className="text-[#9a8588] text-[10px] uppercase tracking-widest font-black">
              Mansion Sales © 2026
            </span>
            <Link
              href="/help"
              className="text-[#9a8588] hover:text-[#d4a5ae] text-[10px] uppercase font-bold transition-colors"
              onClick={onClose}
            >
              Help
            </Link>
            <Link
              href="/terms"
              className="text-[#9a8588] hover:text-[#d4a5ae] text-[10px] uppercase font-bold transition-colors"
              onClick={onClose}
            >
              Terms
            </Link>
          </div>
        </div>
      </DialogContent>
      <InstallWalletModal
        isOpen={!!installWalletType}
        onClose={() => setInstallWalletType(null)}
        walletType={installWalletType}
      />
    </Dialog>
  );
}
