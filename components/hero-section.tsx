"use client";

import Image from "next/image";

export function HeroSection() {
  const handleDiscoverNFTs = () => {
    const collectionsSection = document.getElementById("collections");
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative bg-transparent min-h-[70vh] md:min-h-[85vh] overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-center px-4 py-16 md:py-24">
        {/* Left Character - Hidden on mobile */}
        {/* <div className="hidden lg:block absolute left-4 xl:left-16 top-1/2 -translate-y-1/2 z-10">
          <div className="relative w-[200px] xl:w-[280px] h-[300px] xl:h-[400px] transform -scale-x-100 hover:scale-x-[-1.05] hover:scale-y-105 transition-transform duration-300">
            <Image
              src="/hero-character.png"
              alt="NFT Character Left"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] bg-transparent"
              unoptimized
            />
          </div>
        </div> */}

        {/* Right Character - Hidden on mobile */}
        {/* <div className="hidden lg:block absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 z-10">
          <div className="relative w-[200px] xl:w-[280px] h-[300px] xl:h-[400px] hover:scale-105 transition-transform duration-300">
            <Image
              src="/hero-character.png"
              alt="NFT Character Right"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] bg-transparent
              "
              unoptimized
            />
          </div>
        </div> */}

        {/* Center Content */}
        <div className="text-center z-20 pt-8 md:pt-12 px-4 w-full max-w-[100vw]">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-wider mb-4 leading-none font-cinzel"
            style={{ color: "#c8b8db" }}
          >
            Mansions
          </h1>
          <div className="flex flex-col items-center justify-center gap-6 mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-0">
              <span
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black px-4 md:px-6 py-2 -rotate-3 inline-block font-cinzel"
                style={{
                  backgroundColor: "rgba(107, 78, 143, 0.7)",
                  color: "#e0d4ee",
                }}
              >
                of the
              </span>
              <span
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider ml-4 font-cinzel"
                style={{ color: "#d6cce5" }}
              >
                Moon
              </span>
            </div>
            <p
              className="text-lg sm:text-xl md:text-2xl font-medium font-cinzel tracking-widest uppercase"
              style={{ color: "#9a8bb0" }}
            >
              An Astrological System Rendered as Digital Art
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-14 md:gap-20 mb-10 md:mb-14">
            <div className="text-center group cursor-pointer">
              <p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-colors"
                style={{ color: "#c8b8db" }}
              >
                69K+
              </p>
              <p className="text-sm md:text-base" style={{ color: "#8a7ba0" }}>
                Artwork
              </p>
            </div>
            <div className="text-center group cursor-pointer">
              <p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-colors"
                style={{ color: "#c8b8db" }}
              >
                21K+
              </p>
              <p className="text-sm md:text-base" style={{ color: "#8a7ba0" }}>
                Collectors
              </p>
            </div>
            <div className="text-center group cursor-pointer">
              <p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-colors"
                style={{ color: "#c8b8db" }}
              >
                8K+
              </p>
              <p className="text-sm md:text-base" style={{ color: "#8a7ba0" }}>
                Artist
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleDiscoverNFTs}
            className="font-semibold px-10 md:px-14 py-4 md:py-5 rounded-full transition-all hover:scale-105 text-lg md:text-xl"
            style={{
              backgroundColor: "rgba(107, 78, 143, 0.65)",
              color: "#e0d4ee",
              border: "1px solid rgba(160, 130, 190, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(120, 88, 160, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(107, 78, 143, 0.65)";
            }}
          >
            Discover NFTs
          </button>
        </div>
      </div>

      {/* Live Auction Badge */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-spin-slow"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
            <text
              className="text-[10px] uppercase tracking-widest"
              style={{ fill: "#8a7ba0" }}
            >
              <textPath href="#circlePath">
                • Mint Now • Collect Assets •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-transparent flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6"
                style={{ color: "#9a7fbf" }}
              >
                <path
                  fill="currentColor"
                  d="M12 1.5L6 10.5h12L12 1.5zM6 13.5L12 22.5l6-9H6z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
