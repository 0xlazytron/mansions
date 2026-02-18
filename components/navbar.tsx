"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { ConnectWalletModal } from "./connect-wallet-modal";
import { useWallet } from "@/hooks/use-wallet";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { account, isConnected, disconnect } = useWallet();

  // Handle scroll detection
  useState(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-10 lg:px-16 py-4 ${
        isScrolled
          ? "bg-[#181524]/80 backdrop-blur-xl border-b border-[#4a3b69]/40 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}

        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 relative overflow-hidden rounded-lg">
            <Image
              src="/logo.jpg"
              alt="NFT Mansions Logo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span
            className="font-bold text-lg tracking-wide font-cinzel"
            style={{ color: "#e0d4ee" }}
          >
            MANSIONS
          </span>
        </button>
        {/* Desktop Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollToSection("home")}
            className="transition-colors text-sm font-medium"
            style={{ color: "#b8a8cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e0d4ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b8a8cc";
            }}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("how-to-mint")}
            className="transition-colors text-sm font-medium px-2"
            style={{ color: "#b8a8cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e0d4ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b8a8cc";
            }}
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection("collections")}
            className="transition-colors text-sm font-medium"
            style={{ color: "#b8a8cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e0d4ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b8a8cc";
            }}
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection("auctions")}
            className="transition-colors text-sm font-medium"
            style={{ color: "#b8a8cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e0d4ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b8a8cc";
            }}
          >
            Auctions
          </button>
          <button
            onClick={() => scrollToSection("join-team")}
            className="transition-colors text-sm font-medium"
            style={{ color: "#b8a8cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e0d4ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b8a8cc";
            }}
          >
            Join Team
          </button>
        </div>

        {/* Desktop Social and Connect Button */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "#8a7ba0" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#c8b8db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8a7ba0";
                }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          <button
            onClick={() =>
              isConnected ? disconnect() : setIsWalletModalOpen(true)
            }
            className="hidden md:block font-semibold px-6 py-2 rounded-lg transition-all text-sm"
            style={{
              background: "linear-gradient(to right, #6b4e8f, #5a3e7d)",
              color: "#e0d4ee",
              boxShadow: "0 0 15px rgba(107, 78, 143, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(to right, #7b5e9f, #6a4e8d)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(107, 78, 143, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(to right, #6b4e8f, #5a3e7d)";
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(107, 78, 143, 0.3)";
            }}
          >
            {isConnected ? formatAddress(account!) : "Connect Wallet"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#e0d4ee" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0e17] border-t border-[#2a2438] z-50">
          <div className="flex flex-col p-4 gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="transition-colors text-base py-2 text-left font-medium"
              style={{ color: "#b8a8cc" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e0d4ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#b8a8cc";
              }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-to-mint")}
              className="transition-colors text-base py-2 text-left font-medium"
              style={{ color: "#b8a8cc" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e0d4ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#b8a8cc";
              }}
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("collections")}
              className="transition-colors text-base py-2 text-left font-medium"
              style={{ color: "#b8a8cc" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e0d4ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#b8a8cc";
              }}
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection("auctions")}
              className="transition-colors text-base py-2 text-left font-medium"
              style={{ color: "#b8a8cc" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e0d4ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#b8a8cc";
              }}
            >
              Auctions
            </button>
            <button
              onClick={() => scrollToSection("join-team")}
              className="transition-colors text-base py-2 text-left font-medium"
              style={{ color: "#b8a8cc" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e0d4ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#b8a8cc";
              }}
            >
              Join Team
            </button>
            <div className="flex items-center gap-6 py-2 px-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#8a7ba0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#c8b8db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8a7ba0";
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (isConnected) {
                  disconnect();
                } else {
                  setIsWalletModalOpen(true);
                }
              }}
              className="font-semibold px-6 py-3 rounded-lg transition-colors text-sm mt-2 text-center"
              style={{
                background: "linear-gradient(to right, #6b4e8f, #5a3e7d)",
                color: "#e0d4ee",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #7b5e9f, #6a4e8d)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #6b4e8f, #5a3e7d)";
              }}
            >
              {isConnected ? formatAddress(account!) : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </nav>
  );
}
