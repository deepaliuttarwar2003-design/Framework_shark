"use client";

import { useState } from "react";

import {
  useCreateContractMutation,
  useUpdateContractMutation,
} from "../Api/ContractApi";

import { ContractManagement } from "../types/contract";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WysiwygEditor } from "./WysiwygEditor";

interface Props {
  contract?: ContractManagement;
  onSuccess?: () => void;
}

export default function ContractForm({
  contract,
  onSuccess,
}: Props) {
  const [createContract] =
    useCreateContractMutation();

  const [updateContract] =
    useUpdateContractMutation();

  const [formData, setFormData] =
    useState<ContractManagement>({
      id: contract?.id,

      contract_no: contract?.contract_no || "",
      title: contract?.title || "",
      party_name: contract?.party_name || "",

      start_date: contract?.start_date || "",
      end_date: contract?.end_date || "",

      status: contract?.status || "Draft",

      template_id:
        contract?.template_id || "",

      items: contract?.items || [],

      discount: contract?.discount || 0,
      gst: contract?.gst || 18,
      content: contract?.content || "",
    });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (contract?.id) {
        await updateContract({
          id: contract.id,
          body: formData,
        }).unwrap();
      } else {
        await createContract(
          formData
        ).unwrap();
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Contract No</label>
        <Input
          placeholder="Contract No"
          value={formData.contract_no}
          onChange={(e) =>
            setFormData({
              ...formData,
              contract_no: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Title</label>
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Party Name</label>
        <Input
          placeholder="Party Name"
          value={formData.party_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              party_name: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Start Date</label>
        <Input
          type="date"
          value={formData.start_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              start_date: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">End Date</label>
        <Input
          type="date"
          value={formData.end_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              end_date: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Status</label>
        <Input
          placeholder="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as ContractManagement["status"],
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Template ID</label>
        <Input
          placeholder="Template ID"
          value={formData.template_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              template_id: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Discount</label>
        <Input
          type="number"
          placeholder="Discount"
          value={formData.discount}
          onChange={(e) =>
            setFormData({
              ...formData,
              discount: Number(
                e.target.value
              ),
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">GST</label>
        <Input
          type="number"
          placeholder="GST"
          value={formData.gst}
          onChange={(e) =>
            setFormData({
              ...formData,
              gst: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Notes</label>
        <Textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData({
              ...formData,
              notes: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Agreement Body</label>
        <WysiwygEditor
          value={formData.content || ""}
          onChange={(content) =>
            setFormData({
              ...formData,
              content,
            })
          }
        />
      </div>

      <Button type="submit">
        {contract
          ? "Update Contract"
          : "Create Contract"}
      </Button>
    </form>
  );
}