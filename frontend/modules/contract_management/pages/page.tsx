"use client";

import { useMemo, useState } from "react";
import { useGetContractsQuery } from "../Api/ContractApi";

import ContractForm from "../Components/ContractForm";
import { ContractTable } from "../Components/ContractTable";
import { ContractManagement } from "../types/contract";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function ContractsPage() {
  const {
    data: contracts = [],
    isLoading,
    isError,
  } = useGetContractsQuery();

  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] =
    useState<ContractManagement | undefined>();

  const summary = useMemo(() => {
    const total = contracts.length;

    const byStatus = {
      Active: 0,
      Draft: 0,
      "Pending Approval": 0,
      Expired: 0,
    } as Record<string, number>;

    let subtotalSum = 0;
    let gstSum = 0;
    let grandTotalSum = 0;

    contracts.forEach((c) => {
      const st = c.status || "Draft";

      if (byStatus[st] !== undefined) {
        byStatus[st]++;
      }

      const stotal =
        c.subtotal ??
        (c.items?.reduce(
          (sum, item) => sum + (item.total ?? 0),
          0
        ) || 0);

      subtotalSum += stotal;
      gstSum += c.gst ?? 0;

      grandTotalSum +=
        c.grand_total ??
        (stotal - (c.discount ?? 0) + (c.gst ?? 0));
    });

    return {
      total,
      byStatus,
      subtotalSum,
      gstSum,
      grandTotalSum,
    };
  }, [contracts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading contracts...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load contracts
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Contract Management
            </h1>
            <p>Manage and track contracts</p>
          </div>

          <Button
            onClick={() => {
              setSelectedContract(undefined);
              setOpen(true);
            }}
          >
            New Contract
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          Total Contracts: {summary.total}
        </div>

        <ContractTable
          contracts={contracts}
          onEdit={(contract) => {
            setSelectedContract(contract);
            setOpen(true);
          }}
        />
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