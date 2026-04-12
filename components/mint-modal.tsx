"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ExternalLink, Share2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type NFTCard } from "@/data/nfts";
import { useWallet } from "@/hooks/use-wallet";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
  parseEther,
  type Address,
} from "viem";
import { sepolia } from "viem/chains";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: NFTCard | null;
}

type MintStatus =
  | "idle"
  | "needs_wallet"
  | "switching_network"
  | "pending_signature"
  | "pending"
  | "success"
  | "error";

const mansionsAbi = [
  {
    type: "function",
    name: "mint",
    stateMutability: "payable",
    inputs: [{ name: "quantity", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "mintPrice",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "mintingActive",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export function MintModal({ isOpen, onClose, nft }: MintModalProps) {
  if (!nft) return null;

  const { isConnected, connect } = useWallet();
  const [status, setStatus] = useState<MintStatus>("idle");
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pricePaidWei, setPricePaidWei] = useState<bigint | null>(null);
  const startedRef = useRef(false);

  const env = useMemo(() => {
    const contractAddress = process.env
      .NEXT_PUBLIC_CONTRACT_ADDRESS as Address | undefined;
    const chainIdRaw = process.env.NEXT_PUBLIC_CHAIN_ID;
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

    const chainId = chainIdRaw ? Number(chainIdRaw) : NaN;

    return {
      contractAddress,
      chainId,
      rpcUrl,
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      startedRef.current = false;
      setStatus("idle");
      setTxHash(null);
      setError(null);
      setPricePaidWei(null);
      return;
    }

    setStatus(isConnected ? "switching_network" : "needs_wallet");
  }, [isOpen, isConnected, nft.id]);

  const ensureSepolia = async () => {
    if (typeof window === "undefined") throw new Error("Wallet unavailable.");
    if (!window.ethereum) throw new Error("No wallet found.");

    const sepoliaChainId = "0xaa36a7";

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (switchErr: any) {
      if (switchErr?.code !== 4902) throw switchErr;

      if (!env.rpcUrl) {
        throw new Error(
          "Missing NEXT_PUBLIC_RPC_URL (required to add Sepolia network).",
        );
      }

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: sepoliaChainId,
            chainName: "Sepolia",
            rpcUrls: [env.rpcUrl],
            nativeCurrency: {
              name: "SepoliaETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    }
  };

  const doMint = async () => {
    if (!env.contractAddress) {
      throw new Error("Missing NEXT_PUBLIC_CONTRACT_ADDRESS.");
    }
    if (!Number.isFinite(env.chainId)) {
      throw new Error("Missing/invalid NEXT_PUBLIC_CHAIN_ID.");
    }
    if (!env.rpcUrl) {
      throw new Error("Missing NEXT_PUBLIC_RPC_URL.");
    }
    if (env.chainId !== sepolia.id) {
      throw new Error(
        `App is configured for chain ${env.chainId}, but this contract integration expects Sepolia (${sepolia.id}).`,
      );
    }
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No injected wallet found.");
    }

    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(env.rpcUrl),
    });

    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });

    const quantity = BigInt(1);

    const [mintingActive, onchainMintPrice] = await Promise.all([
      publicClient.readContract({
        address: env.contractAddress,
        abi: mansionsAbi,
        functionName: "mintingActive",
      }),
      publicClient.readContract({
        address: env.contractAddress,
        abi: mansionsAbi,
        functionName: "mintPrice",
      }),
    ]);

    if (!mintingActive) {
      throw new Error("Minting is not active.");
    }

    const uiMintPrice = parseEther("0.05");
    const pricePerNft = onchainMintPrice > uiMintPrice ? onchainMintPrice : uiMintPrice;
    const value = pricePerNft * quantity;

    const [account] = await walletClient.getAddresses();
    if (!account) throw new Error("Wallet not connected.");

    const hash = await walletClient.writeContract({
      account,
      address: env.contractAddress,
      abi: mansionsAbi,
      functionName: "mint",
      args: [quantity],
      value,
    });

    setTxHash(hash);
    setPricePaidWei(value);
    setStatus("pending");

    await publicClient.waitForTransactionReceipt({ hash });
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!isConnected) return;
    if (status !== "switching_network") return;
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      try {
        setError(null);
        await ensureSepolia();
        setStatus("pending_signature");
        await doMint();
        setStatus("success");
      } catch (err: any) {
        const message =
          err?.shortMessage ??
          err?.message ??
          "Mint failed. Please try again.";
        setError(message);
        setStatus("error");
      }
    })();
  }, [isOpen, isConnected, status]);

  const statusLabel = useMemo(() => {
    if (status === "needs_wallet") return "Wallet Required";
    if (status === "switching_network") return "Preparing...";
    if (status === "pending_signature") return "Confirm in Wallet...";
    if (status === "pending") return "Pending...";
    if (status === "success") return "Confirmed";
    if (status === "error") return "Failed";
    return "";
  }, [status]);

  const txUrl = txHash ? `https://sepolia.etherscan.io/tx/${txHash}` : null;
  const pricePaidLabel = pricePaidWei
    ? `${formatEther(pricePaidWei)} ETH`
    : "0.05 ETH";

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
                MINT{" "}
                <span className="text-[#b8707e]">
                  {status === "success"
                    ? "SUCCESSFUL!"
                    : status === "error"
                      ? "FAILED"
                      : "IN PROGRESS"}
                </span>
              </DialogTitle>
              <DialogDescription className="text-[#a68b8f] mt-4 text-base font-medium">
                {status === "success"
                  ? "Your transaction is confirmed on Sepolia."
                  : status === "needs_wallet"
                    ? "Connect a wallet to mint your Mansion NFT."
                    : status === "error"
                      ? "Something went wrong while minting."
                      : "Complete the transaction in your wallet to mint your Mansion NFT."}
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
                      Price Paid: {pricePaidLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {status === "needs_wallet" && (
              <div className="grid grid-cols-1 gap-3 mb-8">
                <button
                  onClick={async () => {
                    try {
                      await connect("metamask");
                    } catch (err: any) {
                      setError(
                        err?.message ?? "Failed to connect wallet. Try again.",
                      );
                      setStatus("error");
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a3540] to-[#2a2123] hover:from-[#6b4555] hover:to-[#3b2b30] text-[#e8dde0] font-bold py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(122,74,88,0.3)] border border-[#7a4a58]/50"
                >
                  Connect Wallet
                </button>
              </div>
            )}

            {status === "error" && error && (
              <div className="bg-[#2a2123]/50 rounded-2xl p-5 mb-8 border border-[#4a3540]/30 text-left">
                <div className="text-[#9a8588] text-[10px] uppercase font-black tracking-widest mb-2">
                  Error
                </div>
                <div className="text-[#e8dde0] text-sm font-medium leading-relaxed">
                  {error}
                </div>
                <button
                  onClick={() => {
                    startedRef.current = false;
                    setTxHash(null);
                    setError(null);
                    setPricePaidWei(null);
                    setStatus(isConnected ? "switching_network" : "needs_wallet");
                  }}
                  className="mt-4 w-full bg-[#2a2123]/30 hover:bg-[#2a2123]/50 text-[#e8dde0] font-bold py-3 rounded-2xl transition-all border border-[#4a3540]/50 uppercase tracking-widest text-xs"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Transaction Info */}
            <div className="bg-[#2a2123]/50 rounded-2xl p-5 mb-8 border border-[#4a3540]/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#9a8588] text-[10px] uppercase font-black tracking-widest">
                  Transaction Hash
                </span>
                <span className="text-[#b8707e] text-[10px] font-bold">
                  {statusLabel}
                </span>
              </div>
              <div className="text-[#e8dde0] font-mono text-xs break-all opacity-80">
                {txHash ?? "—"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={txUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!txUrl}
                className={`flex items-center justify-center gap-2 bg-[#2a2123]/50 text-[#e8dde0] font-bold py-4 rounded-2xl transition-all border border-[#4a3540]/50 group ${txUrl
                    ? "hover:bg-[#2a2123]/80"
                    : "opacity-50 pointer-events-none"
                  }`}
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
