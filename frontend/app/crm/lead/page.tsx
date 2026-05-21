"use client";

import { Google_Sans } from "next/font/google";

import { useState } from "react";

import {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} from "@/modules/crm/slices/leadApiSlice";

import type { Lead } from "@/modules/crm/slices/leadApiSlice";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Search,
  MoreVertical,
  Plus,
  User,
} from "lucide-react";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const STAGES = [
  "New",
  "Contacted",
  "Qualified",
  "Disqualified",
  "Proposal",
];

export default function LeadPage() {
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    amount: "",
    phone: "",
    email: "",
    stage: "Contacted",
  });

  const {
    data: leads = [],
    isLoading,
  } = useGetLeadsQuery();

  const [createLead] =
    useCreateLeadMutation();

  const [updateLead] =
    useUpdateLeadMutation();

  const [deleteLeadApi] =
    useDeleteLeadMutation();

  const filteredLeads = leads.filter(
    (lead: Lead) =>
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.company
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      amount: "",
      phone: "",
      email: "",
      stage: "Contacted",
    });
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Lead name is required");
      return;
    }

    try {
      if (selectedLead) {
        await updateLead({
          id: selectedLead.id,
          ...formData,
        }).unwrap();

        console.log("UPDATED");
      } else {
        await createLead({
          ...formData,
          created: new Date().toLocaleDateString(),
        }).unwrap();

        console.log("CREATED");
      }

      setOpen(false);

      setSelectedLead(null);

      resetForm();

    } catch (error) {
      console.log("SAVE ERROR", error);
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    try {
      await deleteLeadApi(id).unwrap();

      console.log("DELETED");
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (
    result: DropResult
  ) => {
    const {
      destination,
      draggableId,
    } = result;

    if (!destination) return;

    const lead = leads.find(
      (item: Lead) =>
        item.id === draggableId
    );

    if (!lead) return;

    try {
      await updateLead({
        ...lead,
        stage:
          destination.droppableId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen bg-[#f6f6f6] p-6 ${googleSans.className}`}
    >
      <div className="bg-white border rounded-[30px] p-8 min-h-[92vh]">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[32px] font-bold text-black-700 mb-5">
            Leads
          </h1>

          <div className="relative w-[380px]">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <Input
              placeholder="Search lead..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="pl-10 rounded-xl bg-[#fafafa]"
            />
          </div>
        </div>

        {/* Board */}
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-5">

            {STAGES.map((stage) => (
              <div
                key={stage}
                className="min-w-[320px] w-[320px]"
              >
                <div className="bg-white border rounded-2xl overflow-hidden">

                  {/* Column Header */}
                  <div className="flex items-center justify-between border-b px-5 py-4">

                    <h2 className="text-[28px] font-bold text-green-700">
                      {stage}
                    </h2>

                    <button
                      // onClick={() => {
                      //   setSelectedLead(
                      //     null
                      //   );

                      //   resetForm();

                      //   setFormData(
                      //     (
                      //       prev
                      //     ) => ({
                      //       ...prev,
                      //       stage,
                      //     })
                      //   );

                      //   setOpen(true);
                      // }}

                      className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Cards */}
                  <Droppable
                    droppableId={stage}
                  >
                    {(provided) => (
                      <div
                        ref={
                          provided.innerRef
                        }
                        {...provided.droppableProps}
                        className="p-4 space-y-4 min-h-[280px]"
                      >

                        {filteredLeads
                          .filter(
                            (
                              lead: Lead
                            ) =>
                              lead.stage ===
                              stage
                          )
                          .map(
                            (
                              lead: Lead,
                              index: number
                            ) => (
                              <Draggable
                                key={
                                  lead.id
                                }
                                draggableId={
                                  lead.id
                                }
                                index={
                                  index
                                }
                              >
                                {(
                                  provided
                                ) => (
                                  <div
                                    ref={
                                      provided.innerRef
                                    }
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-[#f4f4f7] rounded-2xl p-5 relative shadow-sm"
                                  >

                                    {/* Menu */}
                                    <div className="absolute top-4 right-4">

                                      <DropdownMenu>

                                        <DropdownMenuTrigger asChild>
                                          <button>
                                            <MoreVertical size={18} />
                                          </button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">

                                          <DropdownMenuItem
                                            onClick={() => {

                                              setSelectedLead(
                                                lead
                                              );

                                              setFormData(
                                                {
                                                  name:
                                                    lead.name,
                                                  company:
                                                    lead.company,
                                                  amount:
                                                    lead.amount,
                                                  phone:
                                                    lead.phone,
                                                  email:
                                                    lead.email,
                                                  stage:
                                                    lead.stage,
                                                }
                                              );

                                              setOpen(
                                                true
                                              );
                                            }}
                                          >
                                            Edit
                                          </DropdownMenuItem>

                                          <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() =>
                                              handleDelete(
                                                lead.id
                                              )
                                            }
                                          >
                                            Delete
                                          </DropdownMenuItem>

                                        </DropdownMenuContent>

                                      </DropdownMenu>
                                    </div>

                                    {/* Card */}
                                    <h3 className="text-[24px] font-bold text-gray-700">
                                      {
                                        lead.name
                                      }
                                    </h3>

                                    <p className="text-gray-500 mb-3">
                                      {
                                        lead.company
                                      }
                                    </p>

                                    <Badge className="bg-green-700 text-white rounded-md mb-4">
                                      {
                                        lead.amount
                                      }
                                    </Badge>

                                    <div className="space-y-1 text-[14px] text-gray-600">

                                      <p>
                                        Phone:{" "}
                                        {
                                          lead.phone
                                        }
                                      </p>

                                      <p>
                                        Created:{" "}
                                        {
                                          lead.created
                                        }
                                      </p>

                                      <p>
                                        Email:{" "}
                                        {
                                          lead.email
                                        }
                                      </p>

                                    </div>

                                    <div className="flex justify-end mt-5">

                                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">

                                        <User size={15} />

                                      </div>

                                    </div>

                                  </div>
                                )}
                              </Draggable>
                            )
                          )}

                        {
                          provided.placeholder
                        }

                      </div>
                    )}
                  </Droppable>

                </div>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="rounded-[30px]">

          <DialogHeader>

            <DialogTitle className="text-2xl font-bold">

              {selectedLead
                ? "Edit Lead"
                : "Create Lead"}

            </DialogTitle>

          </DialogHeader>

          <div className="space-y-4 py-4">

            <Input
              placeholder="Lead Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value,
                })
              }
            />

            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company:
                    e.target.value,
                })
              }
            />

            <Input
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount:
                    e.target.value,
                })
              }
            />

            <Input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
            />

            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />

            <Textarea placeholder="Notes..." />

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
            >
              Save Lead
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* Floating Button */}
      <button
        onClick={() => {

          setSelectedLead(null);

          resetForm();

          setOpen(true);
        }}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-xl"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}