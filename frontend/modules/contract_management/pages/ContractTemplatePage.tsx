"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ContractTemplatePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-6">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

                <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        Contract Management Template
                    </span>
                </div>

                <h1 className="text-5xl font-bold text-slate-900 mb-4">
                    Contract Management
                </h1>

                <p className="text-lg text-slate-600 mb-10 max-w-3xl">
                    Manage contracts, automate approvals, generate agreements,
                    and track renewals with ease. Streamline your contract
                    lifecycle from creation to execution.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base"
                        onClick={() =>
                            router.push("/contract_management/dashboard")
                        }
                    >
                        Go to Contract Dashboard
                    </Button>

                    <Button
                        className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-6 text-base"
                        onClick={() =>
                            router.push("/contract_management/agreement")
                        }
                    >
                        Open Agreement Template
                    </Button>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        Contract Management Overview
                    </h3>

                    <p className="text-blue-700">
                        This page serves as the entry point for the Contract
                        Management module. Access your dashboard to create,
                        edit, print, and manage contracts efficiently.
                    </p>
                </div>
            </div>
        </div>
    );
}


