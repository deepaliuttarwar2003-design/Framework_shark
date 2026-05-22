"use client";

import { useSearchParams } from "next/navigation";

export default function LeadDetailPage() {

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log("Lead ID from URL:", id);

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen">

      <div className="bg-white rounded-3xl p-8 shadow">

        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Lead Details
        </h1>

        <div className="space-y-4">

          <div className="border rounded-xl p-4">
            Lead ID: {id}
          </div>

          <div className="border rounded-xl p-4">
            Description Section
          </div>

          <div className="border rounded-xl p-4">
            Notes Section
          </div>

        </div>

      </div>

    </div>
  );
}