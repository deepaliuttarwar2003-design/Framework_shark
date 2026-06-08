import Link from "next/link";

export default function ContractManagementRoute() {
    return (
        <div className="min-h-screen bg-zinc-50 p-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl">
                <div className="space-y-6">
                    <div>
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                            Contract Management Template
                        </span>
                    </div>

                    <div className="space-y-4 text-zinc-700">
                        <h1 className="text-4xl font-semibold text-zinc-950">
                            Contract Management
                        </h1>
                        <p className="max-w-3xl text-base leading-7">
                            Use this screen as the contract management template page. It contains the entry point for contract management and a button that takes you to the contract dashboard where you can view and manage the contract table.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/contract_management/dashboard"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Go to Contract Dashboard
                        </Link>
                        <Link
                            href="/contract_management/agreement"
                            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-50"
                        >
                            Open Agreement Template
                        </Link>
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-6 py-4 text-sm text-blue-700">
                            This page is the template page. Click the button to see the contract dashboard table.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
