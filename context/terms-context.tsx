"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TermsAgreementModal } from "@/components/terms-modal";

interface TermsContextType {
  isAgreed: boolean;
  setIsAgreed: (val: boolean) => void;
  checkAgreement: () => boolean;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

export function TermsProvider({ children }: { children: ReactNode }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkAgreement = () => {
    if (isAgreed) return true;
    setIsModalOpen(true);
    return false;
  };

  const handleConfirm = () => {
    setIsAgreed(true);
    setIsModalOpen(false);
  };

  return (
    <TermsContext.Provider value={{ isAgreed, setIsAgreed, checkAgreement }}>
      {children}
      <TermsAgreementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </TermsContext.Provider>
  );
}

export function useTerms() {
  const context = useContext(TermsContext);
  if (context === undefined) {
    throw new Error("useTerms must be used within a TermsProvider");
  }
  return context;
}
