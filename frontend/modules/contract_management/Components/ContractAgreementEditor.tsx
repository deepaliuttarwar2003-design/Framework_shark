"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ContractAgreement from "@/modules/contract_management/Components/ContractAgreement";
import { ServiceAgreement } from "@/modules/types/contract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WysiwygEditor } from "./WysiwygEditor";

const initialAgreement: ServiceAgreement = {
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
    content: `
        <p>This agreement covers the development and deployment of the website with standard terms and conditions. All deliverables will be completed according to the project timeline described above.</p>
        <p>Payment will be made in accordance with the advance payment schedule and post-completion payment schedule.</p>
        <p>Any changes to the scope must be documented in writing and approved by both parties.</p>
    `,
};

const toolbarButtons = [
    { label: "B", command: "bold" },
    { label: "I", command: "italic" },
    { label: "U", command: "underline" },
    { label: "Bullet", command: "insertUnorderedList" },
    { label: "Number", command: "insertOrderedList" },
    { label: "Link", command: "createLink" },
];

export default function ContractAgreementEditor() {
    const [agreement, setAgreement] = useState<ServiceAgreement>(initialAgreement);
    const [editorContent, setEditorContent] = useState(
        initialAgreement.content || ""
    );

    const updateField = <K extends keyof ServiceAgreement>(
        field: K,
        value: ServiceAgreement[K]
    ) => {
        setAgreement((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-zinc-50 p-6 overflow-y-auto">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-zinc-950">
                            Edit Agreement
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                            Use the editor below to update the agreement fields and edit the agreement body in a WYSIWYG editor.
                        </p>
                    </div>
                    <Link
                        href="/contract_management/agreement"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        View Agreement
                    </Link>
                </div>

                <div className="space-y-6">
                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-zinc-900">Agreement Metadata</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Agreement ID</label>
                                <Input
                                    placeholder="Agreement ID"
                                    value={agreement.contractId}
                                    onChange={(e) =>
                                        updateField("contractId", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Agreement Date</label>
                                <Input
                                    type="date"
                                    value={agreement.agreementDate}
                                    onChange={(e) =>
                                        updateField("agreementDate", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Project Name</label>
                                <Input
                                    placeholder="Project Name"
                                    value={agreement.projectName}
                                    onChange={(e) =>
                                        updateField("projectName", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Status</label>
                                <Input
                                    placeholder="Status"
                                    value={agreement.status}
                                    onChange={(e) =>
                                        updateField(
                                            "status",
                                            e.target.value as ServiceAgreement["status"]
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Prepared By</label>
                                <Input
                                    placeholder="Prepared By"
                                    value={agreement.preparedBy}
                                    onChange={(e) =>
                                        updateField("preparedBy", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Start Date</label>
                                <Input
                                    type="date"
                                    value={agreement.startDate}
                                    onChange={(e) =>
                                        updateField("startDate", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">End Date</label>
                                <Input
                                    type="date"
                                    value={agreement.endDate}
                                    onChange={(e) =>
                                        updateField("endDate", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-zinc-900">Provider & Client Info</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Provider Name</label>
                                <Input
                                    placeholder="Provider Name"
                                    value={agreement.providerName}
                                    onChange={(e) =>
                                        updateField("providerName", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Provider Address</label>
                                <Input
                                    placeholder="Provider Address"
                                    value={agreement.providerAddress}
                                    onChange={(e) =>
                                        updateField("providerAddress", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Provider Signatory</label>
                                <Input
                                    placeholder="Provider Signatory"
                                    value={agreement.providerSignatory}
                                    onChange={(e) =>
                                        updateField("providerSignatory", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Provider Signature Date</label>
                                <Input
                                    type="date"
                                    value={agreement.providerSignatureDate}
                                    onChange={(e) =>
                                        updateField("providerSignatureDate", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Client Name</label>
                                <Input
                                    placeholder="Client Name"
                                    value={agreement.clientName}
                                    onChange={(e) =>
                                        updateField("clientName", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Client Company</label>
                                <Input
                                    placeholder="Client Company"
                                    value={agreement.clientCompany}
                                    onChange={(e) =>
                                        updateField("clientCompany", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Client Address</label>
                                <Input
                                    placeholder="Client Address"
                                    value={agreement.clientAddress}
                                    onChange={(e) =>
                                        updateField("clientAddress", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Client Signatory</label>
                                <Input
                                    placeholder="Client Signatory"
                                    value={agreement.clientSignatory}
                                    onChange={(e) =>
                                        updateField("clientSignatory", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">Client Signature Date</label>
                                <Input
                                    type="date"
                                    value={agreement.clientSignatureDate}
                                    onChange={(e) =>
                                        updateField("clientSignatureDate", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-zinc-900">Agreement Body</h2>
                        </div>
                        <div className="mt-4">
                            <WysiwygEditor
                                value={editorContent}
                                onChange={(content) => {
                                    setEditorContent(content);
                                }}
                            />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-zinc-900">Live Preview</h2>
                        <div className="mt-6">
                            <ContractAgreement
                                agreement={{
                                    ...agreement,
                                    content: editorContent,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
