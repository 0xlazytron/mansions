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
      <DialogContent className="bg-[#181524]/95 backdrop-blur-2xl border-none sm:max-w-[420px] p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_80px_rgba(107,78,143,0.3)]">
        {/* Abstract background glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 p-8 pt-10">
          <div className="text-center">
            {/* Caution Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#2a2438] mb-6 border border-[#4a3b69]/50 shadow-[0_0_15px_rgba(107,78,143,0.2)]">
              <AlertTriangle className="w-10 h-10 text-[#c8b8db]" />
            </div>

            <DialogHeader className="sm:text-center p-0 mb-6">
              <DialogTitle className="text-3xl font-black tracking-tight font-cinzel text-[#e0d4ee] leading-tight">
                AGREEMENT <span className="text-[#9a7fbf]">REQUIRED</span>
              </DialogTitle>
              <DialogDescription className="text-[#9a8bb0] mt-4 text-base leading-relaxed">
                To proceed with the purchase of your Mansion NFT, you must first
                review and agree to our
                <Link
                  href="/terms"
                  className="text-[#c8b8db] hover:text-[#e0d4ee] hover:underline mx-1 font-semibold transition-colors"
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
                className="w-full bg-gradient-to-r from-[#4a3b69] to-[#2a2438] hover:from-[#5b4a7d] hover:to-[#3b2e55] text-[#e0d4ee] font-black py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(107,78,143,0.3)] hover:shadow-[0_10px_25px_rgba(107,78,143,0.4)] hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest text-sm border border-[#6b4e8f]/50"
              >
                I Agree to All Rules
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#2a2438]/30 hover:bg-[#2a2438]/50 text-[#8a7ba0] hover:text-[#e0d4ee] font-bold py-4 rounded-2xl transition-all border border-[#2a2438]/50 uppercase tracking-widest text-xs"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#2a2438]/30 border-t border-[#2a2438]/50 text-center">
          <p className="text-[9px] text-[#8a7ba0] uppercase tracking-[0.2em] font-medium px-4">
            Security and compliance is handled by the Mansion Network protocol
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
