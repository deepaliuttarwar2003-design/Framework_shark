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
import { useGetProposalsQuery, useDeleteProposalMutation } from "../Api/proposalApi";

export const ProposalList = () => {
  const [open, setOpen] = useState(false);

  const [selectedProposal, setSelectedProposal] =
    useState<ProposalData | null>(null);
  const { data, isLoading } = useGetProposalsQuery();

const proposals = data?.data || [];
const[deleteproposal]=useDeleteProposalMutation()

  const handleSubmit = (data: ProposalData) => {
  setOpen(false);
  setSelectedProposal(null);
};

const handleDelete =async (id?:string)=> {
  console.log(id);
  const res = await deleteproposal(id).unwrap
};

const handleEdit = (proposal: ProposalData) => {
  console.log("Selected proposal:", proposal);
  setSelectedProposal(proposal);
  setOpen(true);
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
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }

            img {
              max-width: 100%;
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
    printWindow.focus();
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
            className=" bg-black text-white "
              onClick={() =>
                setSelectedProposal(null)
              }
            >
              
              + New Proposal
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {selectedProposal
                  ? "Edit Proposal"
                  : "Create Proposal"}
              </DialogTitle>

              <DialogDescription>
                Fill proposal details below.
              </DialogDescription>
            </DialogHeader>

            <ProposalForm
              proposal={selectedProposal}
              onSubmit={handleSubmit}
            />
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
                    onClick={() => {
                   console.log("Edit clicked:", proposal);
                   handleEdit(proposal);
                   }}
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
                        variant="destructive"
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
