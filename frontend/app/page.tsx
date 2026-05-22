import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] p-10">

      <div className="bg-white border rounded-[30px] p-12 w-full max-w-4xl shadow-sm">

        <h1 className="text-6xl font-bold text-green-700 mb-4">
          CRM Lite
        </h1>

        <p className="text-gray-500 text-lg mb-10">
          Manage leads, deals and customers easily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

        </div>

      </div>

    </div>
  );
}