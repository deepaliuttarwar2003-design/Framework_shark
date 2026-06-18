"use client";


import { useState } from "react";
import { useDeleteContractMutation } from "../Api/ContractApi";
import { ContractManagement } from "../types/contract";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import ContractAgreement from "../Components/ContractAgreement";

interface Props {
  contracts: ContractManagement[];
  onEdit: (contract: ContractManagement) => void;
}

export default function ContractTable({
  contracts,
  onEdit,
}: Props) {
  const [deleteContract] = useDeleteContractMutation();

  // ✅ selected contract state
  const [selectedContract, setSelectedContract] =
    useState<ContractManagement | null>(null);

  const handlePrint = (contract: ContractManagement) => {
    setSelectedContract(contract);

    // wait for render then print
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div>
      {/* ✅ THIS is IMPORTANT (print area) */}
      {selectedContract && (
        <div id="print-agreement">
          <ContractAgreement agreement={selectedContract} />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Party</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.contract_no}</TableCell>
              <TableCell>{contract.title}</TableCell>
              <TableCell>{contract.party_name}</TableCell>
              <TableCell>{contract.status}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                    onClick={() => onEdit(contract)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    onClick={() => handlePrint(contract)}
                  >
                    Print
                  </Button>

                  <Button
                    size="sm"
                    className="bg-red-600 text-white"
                    onClick={() => deleteContract(contract.id!)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}