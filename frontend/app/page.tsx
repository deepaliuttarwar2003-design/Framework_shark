import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] p-6 md:p-10 font-sans">

      <div className="bg-white border rounded-[30px] p-8 md:p-12 w-full max-w-4xl shadow-sm">

        <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-4 tracking-tight">
          CRM Lite
        </h1>

        <p className="text-gray-500 text-lg mb-10">
          Manage leads, deals and customers easily.
        </p>

        {/* 2-Column Grid matching your original design structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Leads Dashboard */}
          <Link
            href="/crm/lead"
            className="border rounded-3xl p-8 hover:shadow-lg transition bg-[#fafafa] block group text-left"
          >
            <div className="text-2xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
              📈
            </div>
            <h2 className="text-3xl font-bold text-black mb-2 group-hover:text-green-700 transition-colors">
              Leads
            </h2>
            <p className="text-gray-500">
              Open CRM Leads Dashboard
            </p>
          </Link>

          {/* Card 2: New POS Dashboard Link */}
          <Link
            href="/crm/pos"
            className="border rounded-3xl p-8 hover:shadow-lg transition bg-[#fafafa] block group text-left border-dashed border-gray-300 hover:border-green-600/40"
          >
            <div className="text-2xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
              🏪
            </div>
            <h2 className="text-3xl font-bold text-black mb-2 group-hover:text-green-700 transition-colors">
              POS Entry
            </h2>
            <p className="text-gray-500">
              Open CRM POS Purchase Dashboard
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}