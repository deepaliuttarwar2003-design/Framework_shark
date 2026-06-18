"use client";

import { useMemo, useState } from "react";

import ContractForm from "../Components/ContractForm";
import ContractTable from "../Components/ContractTable";
import { ContractManagement } from "../types/contract";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function ContractsPage() {
  const [contracts] = useState<ContractManagement[]>([
    {
      id: "1",
      contract_no: "C-001",
      title: "Office Lease Agreement",
      party_name: "Acme Corp",
      status: "Active",
    } as ContractManagement,

    {
      id: "2",
      contract_no: "C-002",
      title: "Software License",
      party_name: "Beta Solutions",
      status: "Pending Approval",
    } as ContractManagement,
  ]);

  const [open, setOpen] = useState(false);

  const [selectedContract, setSelectedContract] =
    useState<ContractManagement | undefined>();

  const summary = useMemo(() => {
    return {
      total: contracts.length,
    };
  }, [contracts]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Contract Management
            </h1>

            <p className="mt-2 text-blue-100">
              Manage and track all your contracts in one place
            </p>
          </div>

          <Button
            className="bg-white text-blue-700 hover:bg-slate-100"
            onClick={() => {
              setSelectedContract(undefined);
              setOpen(true);
            }}
          >
            + New Contract
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">
              Total Contracts
            </h3>

            <p className="text-2xl font-bold">
              {summary.total}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">
              Pending Approval
            </h3>

            <p className="text-2xl font-bold">
              1
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">
              Active Contracts
            </h3>

            <p className="text-2xl font-bold">
              1
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">
              Total Value
            </h3>

            <p className="text-2xl font-bold">
              ₹0.5L
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            Active Contracts
          </h2>

          <ContractTable
            contracts={contracts}
            onEdit={(contract) => {
              setSelectedContract(contract);
              setOpen(true);
            }}
          />
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContract
                ? "Edit Contract"
                : "Create Contract"}
            </DialogTitle>
          </DialogHeader>

          <ContractForm
            contract={selectedContract}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}