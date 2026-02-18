"use client";

export function JoinTeamSection() {
  const handleGetStarted = () => {
    window.open("https://opensea.io", "_blank");
  };

  const handleJoinDiscord = () => {
    window.open("https://discord.com", "_blank");
  };

  return (
    <section
      id="join-team"
      className="relative bg-transparent py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4a3b69]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#e0d4ee] mb-6 md:mb-8 tracking-tight font-cinzel leading-none">
          WANT <span className="text-[#9a7fbf]">JOIN</span> THE TEAM?
        </h2>

        {/* Subtitle */}
        <p className="text-[#8a7ba0] text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Becomes a part of the community and has a say in continuous
          <span className="hidden sm:inline">
            <br />
          </span>
          <span className="sm:hidden"> </span>
          Protocol development
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-[#4a3b69] to-[#2a2438] text-[#e0d4ee] font-black rounded-2xl hover:from-[#5b4a7d] hover:to-[#3b2e55] transition-all hover:-translate-y-1 min-w-[200px] md:min-w-[240px] text-sm md:text-base uppercase tracking-widest border border-[#6b4e8f]/50 shadow-[0_10px_30px_rgba(107,78,143,0.3)]"
            aria-label="Get Started"
          >
            Explore Collection
          </button>
          <button
            onClick={handleJoinDiscord}
            className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-[#181524]/60 backdrop-blur-md text-[#e0d4ee] font-black rounded-2xl border border-[#4a3b69] hover:bg-[#4a3b69]/20 hover:border-[#9a7fbf] transition-all hover:-translate-y-1 min-w-[200px] md:min-w-[240px] flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest shadow-lg"
            aria-label="Join Discord"
          >
            <DiscordIcon className="w-5 h-5 md:w-6 md:h-6 text-[#9a7fbf]" />
            Join Discord
          </button>
        </div>
      </div>
    </section>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
