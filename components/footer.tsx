import Image from "next/image";
import Link from "next/link";
const companyLinks = [
  { label: "Home", href: "/" },
  { label: "How to Mint", href: "#how-to-mint" },
  { label: "Collections", href: "#collections" },
];

const helpLinks = [
  { label: "Customer Care", href: "/help" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#1a1517]/95 backdrop-blur-2xl pt-16 md:pt-24 pb-8 md:pb-12 border-t border-[#4a3540]/40 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#4a3540]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-4 mb-6 md:mb-8 w-fit group"
            >
              <div className="w-12 h-12 relative overflow-hidden rounded-xl border border-[#4a3540]/40 shadow-[0_0_20px_rgba(122,74,88,0.2)]">
                <Image
                  src="/logo.jpg"
                  alt="NFT Mansions Logo"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  unoptimized
                />
              </div>
              <span className="text-[#e8dde0] font-black text-xl md:text-2xl tracking-tighter font-cormorant">
                MANSIONS
              </span>
            </Link>


          </div>

          {/* Company Links */}
          <div className="flex flex-col">
            <h3 className="text-[#e8dde0] font-black text-sm tracking-[0.2em] mb-6 md:mb-8 font-cormorant uppercase">
              Mansions
            </h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#9a8588] text-sm hover:text-[#b8707e] transition-colors font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#4a3540] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Help Links */}
          <div className="flex flex-col">
            <h3 className="text-[#e8dde0] font-black text-sm tracking-[0.2em] mb-6 md:mb-8 font-cormorant uppercase">
              HELP
            </h3>
            <nav aria-label="Help navigation">
              <ul className="space-y-4">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#9a8588] text-sm hover:text-[#b8707e] transition-colors font-medium flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-[#4a3540] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-[#4a3540]/30">
          <p className="text-[#9a8588]/60 text-xs md:text-sm text-center font-medium tracking-wide">
            © 2026 Mathilde Grant (M3th1ld3). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
