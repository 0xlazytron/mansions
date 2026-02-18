"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

declare global {
  interface Window {
    ethereum?: any;
    coinbaseWalletExtension?: any;
  }
}

export type WalletType = "metamask" | "coinbase" | "walletconnect";

interface WalletState {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  activeWallet: WalletType | null;
}

interface WalletContextType extends WalletState {
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    account: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    activeWallet: null,
  });

  const updateState = (newState: Partial<WalletState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const connect = useCallback(async (walletType: WalletType) => {
    if (typeof window === "undefined") return;

    updateState({ isConnecting: true, error: null, activeWallet: walletType });

    try {
      if (walletType === "metamask") {
        if (!window.ethereum?.isMetaMask) {
          throw new Error("MetaMask is not installed.");
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          updateState({
            account: accounts[0],
            isConnected: true,
            isConnecting: false,
          });
        }
      } else if (walletType === "coinbase") {
        const isCoinbase =
          window.ethereum?.isCoinbaseWallet || window.coinbaseWalletExtension;
        if (!isCoinbase) {
          throw new Error("Coinbase Wallet is not installed.");
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          updateState({
            account: accounts[0],
            isConnected: true,
            isConnecting: false,
          });
        }
      } else {
        // For other wallets, we show a demo success for now
        updateState({ isConnecting: false });
        alert(`Connecting to ${walletType}... (Bridge integration required)`);
      }
    } catch (err: any) {
      updateState({
        error: err.message || `Failed to connect to ${walletType}`,
        isConnecting: false,
        activeWallet: null,
      });
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    updateState({
      account: null,
      isConnected: false,
      error: null,
      activeWallet: null,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          updateState({ account: accounts[0], isConnected: true });
        } else {
          updateState({
            account: null,
            isConnected: false,
            activeWallet: null,
          });
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Initial check
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            updateState({ account: accounts[0], isConnected: true });
          }
        });

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}
