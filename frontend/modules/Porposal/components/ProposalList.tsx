"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    ProposalForm,
    ProposalData,
} from "../components/ProposalForm";

export const ProposalList = () => {
    const [open, setOpen] = useState(false);

    const [selectedProposal, setSelectedProposal] =
        useState<ProposalData | null>(null);

    const [proposals, setProposals] = useState<
        ProposalData[]
    >([]);

    const handleSubmit = (data: ProposalData) => {
        if (selectedProposal?.id) {
            setProposals((prev) =>
                prev.map((proposal) =>
                    proposal.id === selectedProposal.id
                        ? {
                            ...data,
                            id: selectedProposal.id,
                        }
                        : proposal
                )
            );
        } else {
            setProposals((prev) => [
                ...prev,
                {
                    ...data,
                    id: Date.now(),
                },
            ]);
        }

        setOpen(false);
        setSelectedProposal(null);
    };

    const handleEdit = (proposal: ProposalData) => {
        setSelectedProposal(proposal);
        setOpen(true);
    };

    const handleDelete = (id?: number) => {
        if (!id) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this proposal?"
        );

        if (confirmDelete) {
            setProposals((prev) =>
                prev.filter(
                    (proposal) => proposal.id !== id
                )
            );
        }
    };

    const handlePrint = (
        proposal: ProposalData
    ) => {
        const printWindow = window.open(
            "",
            "_blank"
        );

        if (!printWindow) return;

        printWindow.document.write(`
      <html>
        <head>
          <title>${proposal.proposal_title}</title>

          <style>
            body{
              font-family:Arial;
              padding:20px;
            }

            img{
              max-width:100%;
            }
          </style>
        </head>

        <body>
          <h1>${proposal.proposal_title}</h1>

          <hr />

          <p>
            <strong>Client:</strong>
            ${proposal.client_name}
          </p>

          <p>
            <strong>Email:</strong>
            ${proposal.email}
          </p>

          <p>
            <strong>Total Amount:</strong>
            ₹${proposal.total_amount}
          </p>

          <hr />

          ${proposal.description}
        </body>
      </html>
    `);

        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Business Proposals
                </h1>

                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            onClick={() =>
                                setSelectedProposal(null)
                            }
                        >
                            + New Proposal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[90vh] overflow-hidden">
                        <div className="flex flex-col h-full">

                            {/* <DialogContent className="max-w-5xl h-[90vh] overflow-hidden p-0"> */}
                            <div className="flex flex-col h-full">

                                <DialogHeader className="px-6 py-4 border-b">
                                    <DialogTitle>
                                        {selectedProposal
                                            ? "Edit Proposal"
                                            : "Create Proposal"}
                                    </DialogTitle>

                                    <DialogDescription>
                                        Fill proposal details below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 overflow-y-auto p-6">

                                    <ProposalForm
                                        proposal={selectedProposal}
                                        onSubmit={handleSubmit}
                                    />
                                </div>

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Proposal Title
                            </TableHead>

                            <TableHead>
                                Client Name
                            </TableHead>

                            <TableHead>
                                Email
                            </TableHead>

                            <TableHead>
                                Total Amount
                            </TableHead>

                            <TableHead>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {proposals.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center"
                                >
                                    No proposals found
                                </TableCell>
                            </TableRow>
                        ) : (
                            proposals.map((proposal) => (
                                <TableRow
                                    key={proposal.id}
                                >
                                    <TableCell>
                                        {
                                            proposal.proposal_title
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            proposal.client_name
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {proposal.email}
                                    </TableCell>

                                    <TableCell>
                                        ₹
                                        {proposal.total_amount.toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleEdit(
                                                        proposal
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(
                                                        proposal.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>

                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handlePrint(
                                                        proposal
                                                    )
                                                }
                                            >
                                                Print
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};