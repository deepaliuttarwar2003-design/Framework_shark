import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#050505] p-6">
      <main className="relative flex w-full max-w-5xl flex-col items-center px-8 py-16 sm:items-start border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden">

        {/* Ambient Glow */}
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10 animate-pulse" />

        {/* Header */}
        <header className="z-10 mb-16 flex w-full items-center justify-between opacity-80">
          <div className="flex items-center gap-4 group cursor-default">
            <img
              className="dark:invert transition-transform group-hover:scale-105"
              src="/next.svg"
              alt="Next.js"
              width="70"
              height="14"
            />

            <span className="text-xl font-thin text-zinc-300 dark:text-zinc-800">
              |
            </span>

            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              Sharkweb Edition
            </span>
          </div>

          <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-200">
            v1.0.0-stable
          </span>
        </header>
        <div className={`${inter.className} min-h-screen flex items-center justify-center bg-[#f4f3f0] p-6 md:p-12 antialiased`}>

          {/* Main Container: Mimicking the pillowy, thick-pressed card stock */}
          <div className="bg-[#faf9f6] rounded-[40px] p-8 md:p-16 w-full max-w-4xl border border-[#e8e6e1] shadow-[0_25px_60px_-15px_rgba(120,115,105,0.15),inset_0_1px_0_0_rgba(255,255,255,1)]">

            {/* Soft Letterpress Header */}
            <div className="mb-14 text-center">
              {/* Subtle text-shadow simulates an engraved/pressed typography look */}
              <h1 className={`${playfair.className} text-6xl md:text-7xl font-bold text-[#4a4743] mb-4 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]`}>
                CRM Lite
              </h1>
              <p className="text-[#8c8881] text-xs font-semibold tracking-[0.25em] uppercase md:text-sm">
                Manage leads, deals, <span className="font-light italic text-[#aba7a0]">&</span> customers easily.
              </p>
            </div>

            <p className="text-gray-500 text-lg mb-10">
              Manage leads, deals and customers easily.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* 2-Column Soft-Touch Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Card 1: Leads Dashboard */}
                <Link
                  href="/crm/lead"
                  className="group block rounded-[28px] p-8 bg-[#f2f1ed] border border-[#e3e1dc] text-left transition-all duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.02)] hover:bg-[#ebeae5] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]"
                >
                  {/* Soft Custom Icon Representation */}
                  <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] border border-[#e3e1dc] flex items-center justify-center mb-10 shadow-[0_2px_6px_rgba(0,0,0,0.02)] group-hover:scale-95 transition-transform duration-300">
                    <span className="text-xl opacity-60 grayscale group-hover:opacity-90">📈</span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <h2 className={`${playfair.className} text-2xl font-bold text-[#3a3834]`}>
                      Leads
                    </h2>
                    <span className="text-[#a3a09a] font-mono text-xs tracking-wider group-hover:translate-x-0.5 transition-transform">
                      +
                    </span>
                  </div>
                  <p className="text-[#8c8881] text-xs mt-1 font-medium tracking-wide">
                    Open CRM Leads Dashboard
                  </p>
                </Link>

                <div>
                  <p className="max-w-2xl text-lg font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
                    A high-performance modular framework designed exclusively for
                    Sharkweb developers. Integrated with Tailwind CSS and the
                    Sharkweb CLI.
                  </p>
                </div>

                {/* Card 2: POS Dashboard Link */}
                <Link
                  href="/crm/pos"
                  className="group block rounded-[28px] p-8 bg-[#f2f1ed] border border-dashed border-[#cbc9c2] text-left transition-all duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.02)] hover:border-solid hover:bg-[#ebeae5] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]"
                >
                  {/* Soft Custom Icon Representation */}
                  <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] border border-[#e3e1dc] flex items-center justify-center mb-10 shadow-[0_2px_6px_rgba(0,0,0,0.02)] group-hover:scale-95 transition-transform duration-300">
                    <span className="text-xl opacity-60 grayscale group-hover:opacity-90">🏪</span>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <h2 className={`${playfair.className} text-2xl font-bold text-[#3a3834]`}>
                      POS Entry
                    </h2>
                    <span className="text-[#a3a09a] font-mono text-xs tracking-wider group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                  <p className="text-[#8c8881] text-xs mt-1 font-medium tracking-wide">
                    Open CRM POS Purchase Dashboard
                  </p>
                </Link>

              </div>

              {/* Editorial Sub-bar from Image Layout */}
              {/* <div className="mt-14 pt-6 border-t border-[#e8e6e1] flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#aba7a0]">
                <div>OPEN CRM | [LEAD DASHBOARD] &amp [POS ENTRY]</div>
                <div className="font-light">A PROFESSIONAL TOOL</div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
} */}
              {/* Editorial Sub-bar from Image Layout */}
              <div className="mt-14 pt-6 border-t border-[#e8e6e1] flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#aba7a0]">
                <div>OPEN CRM | [LEAD DASHBOARD] &amp; [POS ENTRY]</div>
                <div className="font-light">A PROFESSIONAL TOOL</div>
              </div>

            </div> {/* grid */}
          </div>   {/* bg-[#faf9f6] container */}
        </div>     {/* inter container */}
      </main>
    </div>
  );
}