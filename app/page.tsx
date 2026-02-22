import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutArtworkSection } from "@/components/about-artwork-section";
import { NFTCardsSection } from "@/components/nft-cards-section";
import { HowItWorksSection } from "@/components/how-it-works-section";

import { LiveAuctionSection } from "@/components/live-auction-section";
import { PopularCollectionSection } from "@/components/popular-collection-section";
import { JoinTeamSection } from "@/components/join-team-section";
import { Footer } from "@/components/footer";
import { SpaceBackground } from "@/components/space-background";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#100d0e] relative overflow-hidden">
      {/* Global space background with parallax */}
      <div className="fixed inset-0 z-0">
        <SpaceBackground intensity="normal" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutArtworkSection />
        </section>
        <NFTCardsSection />
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <LiveAuctionSection />
        <section id="collections">
          <PopularCollectionSection />
        </section>
        <section id="join-team">
          <JoinTeamSection />
        </section>
        <Footer />
      </div>
    </main>
  );
}
