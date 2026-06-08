/// <reference types="react" />
// Use native <img> to avoid missing next/image types in some environments

import Link from "next/link";

export default function Home() {
  const features = [
    { title: 'Internal Workflows', desc: 'Optimized for Sharkweb teams.' },
    { title: 'Tailwind CSS', desc: 'Pre-configured utility engine.' },
    { title: 'Modular Design', desc: 'Scalable microservices architecture.' },
    { title: 'Sharkweb CLI', desc: 'Standardized project bootstrapping.' }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#050505] p-6">
      <main className="relative flex w-full max-w-5xl flex-col items-center px-8 py-16 sm:items-start border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden">

        {/* Ambient Glow */}
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10 animate-pulse" />

        {/* Minimalist Header */}
        <header className="z-10 mb-16 flex w-full items-center justify-between opacity-80">
          <div className="flex items-center gap-4 group cursor-default">
            <img className="dark:invert transition-transform group-hover:scale-105" src="/next.svg" alt="Next.js" width="70" height="14" />
            <span className="text-xl font-thin text-zinc-300 dark:text-zinc-800">|</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Sharkweb Edition</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-200">v1.0.0-stable</span>
        </header>

        {/* Hero Section */}
        <section className="z-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-950 dark:text-zinc-50 sm:text-7xl">
              Sharkweb<span className="font-semibold text-blue-600"> + </span>Next
            </h1>
            <p className="text-[10px] font-medium tracking-[0.4em] text-zinc-400 uppercase">
              Developed by <span className="text-zinc-900 dark:text-zinc-200">Prathamesh Wadile</span>
            </p>
          </div>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
            A high-performance <span className="text-zinc-900 dark:text-zinc-100 font-medium">modular framework</span> designed
            exclusively for Sharkweb developers. Integrated with <span className="text-blue-600">Tailwind CSS</span> and
            the <span className="font-mono text-zinc-800 dark:text-zinc-200">Sharkweb CLI</span>.
          </p>

          {/* Elegant List View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 border-t border-zinc-100 dark:border-zinc-900 pt-8 transition-all">
            {features.map((f) => (
              <div key={f.title} className="group flex items-center justify-between border-b border-zinc-50 dark:border-zinc-950 py-2 hover:translate-x-1 transition-transform">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600">{f.title}</span>
                <span className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">Internal Only</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-8 sm:flex-row">
            <Link href="/contract" className="flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 text-xs font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95">
              Open Contract Table
            </Link>
            <a href="#" className="flex h-12 items-center justify-center rounded-xl border border-zinc-200 px-8 text-xs font-bold text-zinc-500 transition-all hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-100 dark:hover:text-zinc-100">
              CLI DOCUMENTATION
            </a>
          </div>
        </section>

        {/* Security Footer */}
        <footer className="z-10 mt-20 flex w-full items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-8">
          <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SECURE ACCESS: SHARKWEB PERSONNEL
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-200 italic">
            Authorized Only
          </span>
        </footer>
      </main>
    </div>
  );
}