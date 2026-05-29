// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#050505] p-6">
//       <main className="relative flex w-full max-w-5xl flex-col items-center px-8 py-16 sm:items-start border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden">

//         {/* Ambient Glow */}
//         <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10 animate-pulse" />

//         {/* Minimalist Header */}
//         <header className="z-10 mb-16 flex w-full items-center justify-between opacity-80">
//           <div className="flex items-center gap-4 group cursor-default">
//             <img className="dark:invert transition-transform group-hover:scale-105" src="/next.svg" alt="Next.js" width="70" height="14" />
//             <span className="text-xl font-thin text-zinc-300 dark:text-zinc-800">|</span>
//             <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">Sharkweb Edition</span>
//           </div>
//           <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-200">v1.0.0-stable</span>
//         </header>

//         <h1 className="text-6xl font-bold text-green-700 mb-4">
//           CRM Lite
//         </h1>

//         <p className="text-gray-500 text-lg mb-10">
//           Manage leads, deals and customers easily.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <Link
//             href="/crm/lead"
//             className="border rounded-3xl p-8 hover:shadow-lg transition bg-[#fafafa]"
//           >
//             <h2 className="text-3xl font-bold text-black mb-2">
//               Leads
//             </h2>

//             <p className="text-gray-500">
//               Open CRM Leads Dashboard
//             </p>
//           </Link>

//           <p className="max-w-2xl text-lg font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
//             A high-performance <span className="text-zinc-900 dark:text-zinc-100 font-medium">modular framework</span> designed
//             exclusively for Sharkweb developers. Integrated with <span className="text-blue-600">Tailwind CSS</span> and
//             the <span className="font-mono text-zinc-800 dark:text-zinc-200">Sharkweb CLI</span>.
//           </p>

//       </div>
// </main>
//     </div>
//   );
// }


import Link from "next/link";

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

        <h1 className="text-6xl font-bold text-green-700 mb-4">
          CRM Lite
        </h1>

        <p className="text-gray-500 text-lg mb-10">
          Manage leads, deals and customers easily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          <Link
            href="/crm/lead"
            className="border rounded-3xl p-8 hover:shadow-lg transition bg-[#fafafa]"
          >
            <h2 className="text-3xl font-bold text-black mb-2">
              Leads
            </h2>

            <p className="text-gray-500">
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

        </div>

      </main>
    </div>
  );
}