"use client";

import { AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

interface TermsAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function TermsAgreementModal({
  isOpen,
  onClose,
  onConfirm,
}: TermsAgreementModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1517]/95 backdrop-blur-2xl border-none sm:max-w-[420px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_80px_rgba(122,74,88,0.3)]">
        {/* Abstract background glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-800/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 p-8 pt-10">
          <div className="text-center">
            {/* Caution Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#2a2123] mb-6 border border-[#4a3540]/50 shadow-[0_0_15px_rgba(122,74,88,0.2)]">
              <AlertTriangle className="w-10 h-10 text-[#d4a5ae]" />
            </div>

            <DialogHeader className="sm:text-center p-0 mb-6">
              <DialogTitle className="text-3xl font-black tracking-tight font-cormorant text-[#e8dde0] leading-tight">
                AGREEMENT <span className="text-[#b8707e]">REQUIRED</span>
              </DialogTitle>
              <DialogDescription className="text-[#a68b8f] mt-4 text-base leading-relaxed">
                To proceed with the purchase of your Mansion NFT, you must first
                review and agree to our
                <Link
                  href="/terms"
                  className="text-[#d4a5ae] hover:text-[#e8dde0] hover:underline mx-1 font-semibold transition-colors"
                  onClick={onClose}
                >
                  Terms & Service
                </Link>
                rules.
              </DialogDescription>
            </DialogHeader>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] font-black py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(122,74,88,0.3)] hover:shadow-[0_10px_25px_rgba(122,74,88,0.4)] hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest text-sm border border-[#7a4a58]/50"
              >
                I Agree to All Rules
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#2a2123]/30 hover:bg-[#2a2123]/50 text-[#9a8588] hover:text-[#e8dde0] font-bold py-4 rounded-2xl transition-all border border-[#2a2123]/50 uppercase tracking-widest text-xs"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#2a2123]/30 border-t border-[#2a2123]/50 text-center">
          <p className="text-[9px] text-[#9a8588] uppercase tracking-[0.2em] font-medium px-4">
            Security and compliance is handled by the Mansion Network protocol
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
