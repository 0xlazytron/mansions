"use client"

import { useWalletContext, WalletType } from "@/context/wallet-context"

export type { WalletType }

export function useWallet() {
  return useWalletContext()
}
