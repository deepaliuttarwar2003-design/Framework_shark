
import React from 'react'

const InventoryHeader = () => {
  return (
    <div className="w-full bg-[#000000] P-6 border border-zinc-120/50 rounded-xl p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans antialiased">
      {/* Title and Subtitle Block */}
      <div className="space-y-0.8">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Inventory
        </h1>
        <p className="text-white text-xs font-medium">
          Manage your products
        </p>
      </div>

      {/* Modern High-Contrast Accenting Element */}
      <div className="flex items-center gap-2 self-start sm:self-auto bg-zinc-950 px-3 py-1.5 rounded-lg shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
          System Control
        </span>
      </div>
    </div>
  )
}

export default InventoryHeader