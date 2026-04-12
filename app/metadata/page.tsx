import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type MetadataItem = {
  fileName: string;
  tokenId: number | null;
};

function parseTokenId(fileName: string) {
  const match = /^(\d+)\.json$/i.exec(fileName);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

export default async function MetadataIndexPage() {
  const dirPath = path.join(process.cwd(), "public", "metadata");
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const items: MetadataItem[] = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".json"))
    .map((entry) => ({
      fileName: entry.name,
      tokenId: parseTokenId(entry.name),
    }))
    .sort((a, b) => {
      if (a.tokenId === null && b.tokenId === null) {
        return a.fileName.localeCompare(b.fileName);
      }
      if (a.tokenId === null) return 1;
      if (b.tokenId === null) return -1;
      return a.tokenId - b.tokenId;
    });

  return (
    <div className="min-h-screen bg-[#100d0e] text-white pt-32 pb-24 px-6 overflow-hidden relative">
      <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[#4a3540]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-rose-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-[#e8dde0] font-black text-4xl md:text-5xl font-cormorant tracking-tight mb-4">
              Metadata
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4a3540] to-transparent" />
            <p className="text-[#a68b8f] mt-4 text-sm md:text-base leading-relaxed">
              Browse the JSON metadata files served from <span className="font-mono">/public/metadata</span>.
            </p>
          </div>
          <Link
            href="/"
            className="text-[#b8707e] hover:text-[#e8dde0] font-black uppercase tracking-widest text-xs md:text-sm underline decoration-[#4a3540] underline-offset-8 decoration-2"
          >
            Back Home
          </Link>
        </div>

        <div className="mt-10 rounded-3xl overflow-hidden border border-[#4a3540]/30 bg-[#1a1517]/40 backdrop-blur-xl">
          <div className="px-6 py-4 border-b border-[#4a3540]/25 flex items-center justify-between gap-4">
            <div className="text-[#9a8588] text-[10px] uppercase font-black tracking-[0.2em]">
              Files ({items.length})
            </div>
            <div className="text-[#9a8588] text-[10px] uppercase font-black tracking-[0.2em]">
              Tip: click to open raw JSON
            </div>
          </div>

          <ul className="divide-y divide-[#4a3540]/20">
            {items.map((item) => {
              const href = `/metadata/${item.fileName}`;
              return (
                <li key={item.fileName} className="px-6 py-4 flex items-center justify-between gap-6">
                  <div className="min-w-0">
                    <div className="text-[#e8dde0] font-black tracking-tight">
                      {item.tokenId !== null ? `Token #${item.tokenId}` : item.fileName}
                    </div>
                    <div className="text-[#9a8588] text-xs font-mono truncate">
                      {href}
                    </div>
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0 bg-[#2a2123]/40 hover:bg-[#2a2123]/70 text-[#e8dde0] font-black px-5 py-2 rounded-2xl uppercase tracking-widest text-[10px] transition-all border border-[#4a3540]/50"
                  >
                    Open
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

