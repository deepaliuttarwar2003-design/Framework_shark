"use client";
import Link from "next/link";
import ContractAgreement from "@/modules/contract_management/Components/ContractAgreement";
import { ServiceAgreement } from "@/modules/types/contract";


const agreement: ServiceAgreement = {
    contractId: "C-AGR-001",
    agreementDate: "2026-06-05",
    projectName: "Website Development Agreement",
    providerName: "Placeholder Company Ltd",
    providerAddress: "123 Business Park, City, Country",
    providerSignatory: "Manager Placeholder",
    providerSignatureDate: "2026-06-05",
    clientName: "Customer Placeholder",
    clientCompany: "Client Organization Inc.",
    clientAddress: "456 Client Road, City, Country",
    clientSignatory: "Customer Placeholder",
    clientSignatureDate: "2026-06-05",
    startDate: "2026-07-01",
    endDate: "2027-06-30",
    preparedBy: "Template Manager",
    status: "Draft",
    items: [
        {
            id: "item-001",
            description: "Design and development services", 
            qty: 1,
            unit: "project",
            rate: 25000,
            total: 25000,
        },
        {
            id: "item-002",
            description: "Maintenance and support",
            qty: 12,
            unit: "month",
            rate: 1200,
            total: 14400,
        },
    ],
    discountPercent: 0,
    gstPercent: 18,
    deductionAdjustment: 0,
    advancePayments: [
        {
            label: "Advance Payment 1",
            amount: 5000,
            dueDate: "2026-07-01",
            status: "Pending",
        },
        {
            label: "Advance Payment 2",
            amount: 3000,
            dueDate: "2026-08-01",
            status: "Pending",
        },
    ],
    afterPayments: [
        {
            label: "Completion Payment",
            amount: 20000,
            dueDate: "2027-06-30",
            status: "Pending",
        },
        {
            label: "Retention Release",
            amount: 1400,
            dueDate: "2027-07-30",
            status: "Pending",
        },
    ],
};

export default function ContractAgreementPage() {
    return (
        <div className="min-h-screen bg-zinc-50 p-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-4xl font-semibold text-zinc-950">
                            Agreement Template Page
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                            This page shows the full agreement details with placeholder names, advance payment schedule, after payment table, and signature placeholders for manager and customer.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/contract_management/agreement/edit"
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                        >
                            Edit Agreement
                        </Link>

                        <Link
                            href="/contract_management/dashboard"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <ContractAgreement agreement={agreement} />
            </div>
        </div>
    );
}
