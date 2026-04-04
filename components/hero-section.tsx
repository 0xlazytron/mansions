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
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-wider mb-4 leading-none font-cormorant bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #d4a5ae 0%, #c9a0b0 30%, #a8a0c4 70%, #8e9bbd 100%)",
            }}
          >
            MANSIONS
          </h1>
          <div className="flex flex-col items-center justify-center gap-6 mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-0">
              <span
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black px-4 md:px-6 py-2 -rotate-3 inline-block font-cormorant"
                style={{
                  backgroundColor: "rgba(122, 74, 88, 0.7)",
                  color: "#e8dde0",
                }}
              >
                of the
              </span>
              <span
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider ml-4 font-cormorant bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ddd0d4 0%, #c4b8cc 40%, #a8a0c4 80%, #8e9bbd 100%)",
                }}
              >
                MOON
              </span>
            </div>
            <p
              className="text-lg sm:text-xl md:text-2xl font-medium font-cormorant tracking-widest uppercase"
              style={{ color: "#a68b8f" }}
            >
              An Astrological System Rendered as Digital Art
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleDiscoverNFTs}
            className="font-semibold px-10 md:px-14 py-4 md:py-5 rounded-full transition-all hover:scale-105 text-lg md:text-xl"
            style={{
              backgroundColor: "rgba(122, 74, 88, 0.65)",
              color: "#e8dde0",
              border: "1px solid rgba(180, 120, 135, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(140, 85, 98, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(122, 74, 88, 0.65)";
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
              style={{ fill: "#9a8588" }}
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
                style={{ color: "#b8707e" }}
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
