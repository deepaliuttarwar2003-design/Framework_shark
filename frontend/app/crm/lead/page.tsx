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
import LeadDetailPage from "../leadDetail/page";

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
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    lead_title: "",
    first_name: "",
    last_name: "",
    telephone: "",
    email: "",
    lead_value: 0,
    notes: "",
    source: "",
    category: "",
    tags: [] as string[],
    last_contacted: "",
    company_name: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    website: "",
    stage: "New",
  });

  const {
    data: leads = [],
    isLoading,
  } = useGetLeadsQuery();
  console.log("LEADS", leads);
  const [createLead] =
    useCreateLeadMutation();

  const [updateLead] =
    useUpdateLeadMutation();

  const [deleteLeadApi] =
    useDeleteLeadMutation();

  const filteredLeads = (leads?.data || []).filter((lead: Lead) =>
    lead.lead_title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    lead.company_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      lead_title: "",
      first_name: "",
      last_name: "",
      telephone: "",
      email: "",
      lead_value: 0,
      notes: "",
      source: "",
      category: "",
      tags: [],
      last_contacted: "",
      company_name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      website: "",
      stage: "New",
    });
  };

  const handleSave = async () => {
    if (!formData.lead_title) {
      alert("Lead title is required");
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
          <h1 className="text-[42px] font-bold text-black-700 mb-2">
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
                  <div className="flex items-center justify-between border-b px-5 py-3">

                    <h2
  className={`text-[23px] font-bold ${
    stage === "New"
      ? "text-blue-600"
      : stage === "Contacted"
      ? "text-red-600"
      : stage === "Qualified"
      ? "text-green-600"
      : stage === "Disqualified"
      ? "text-yellow-500"
      : "text-gray-700"
  }`}
>
  {stage}
</h2>

                    <button
                      onClick={() => {
                        setSelectedLead(null);

                        setFormData({
                          lead_title: "",
                          first_name: "",
                          last_name: "",
                          telephone: "",
                          email: "",
                          lead_value: 0,
                          notes: "",
                          source: "",
                          category: "",
                          tags: [],
                          last_contacted: "",
                          company_name: "",
                          street: "",
                          city: "",
                          state: "",
                          zip_code: "",
                          country: "",
                          website: "",
                          stage: stage,
                        });

                        setOpen(true);
                      }}
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
                                    onClick={() => {
                                   setSelectedLead(lead);
                                   setDetailOpen(true);
                                    }}
                                    className="bg-[#f4f4f7] rounded-2xl p-5 relative shadow-sm cursor-pointer"
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

                                              setFormData({
                                                lead_title: lead.lead_title || "",
                                                first_name: lead.first_name || "",
                                                last_name: lead.last_name || "",
                                                telephone: lead.telephone || "",
                                                email: lead.email || "",
                                                lead_value: lead.lead_value || 0,
                                                notes: lead.notes || "",
                                                source: lead.source || "",
                                                category: lead.category || "",
                                                tags: lead.tags || [],
                                                last_contacted: lead.last_contacted || "",
                                                company_name: lead.company_name || "",
                                                street: lead.street || "",
                                                city: lead.city || "",
                                                state: lead.state || "",
                                                zip_code: lead.zip_code || "",
                                                country: lead.country || "",
                                                website: lead.website || "",
                                                stage: lead.stage || "",
                                              });
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
                                        lead.first_name + " " + lead.last_name
                                      }
                                    </h3>

                                    <p className="text-gray-500 mb-3">
                                      {
                                        lead.email}
                                    </p>

                                    <Badge className="bg-green-700 text-white rounded-md mb-4">
                                      {
                                        lead.lead_value
                                      }
                                    </Badge>

                                    <div className="space-y-1 text-[14px] text-gray-600">

                                      <p>
                                        Phone:{" "}
                                        {
                                          lead.telephone
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
        {/* <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto rounded-[30px]"> */}
<DialogContent className="w-[95vw] max-w-5xl max-h-[95vh] overflow-y-auto rounded-[30px] p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-700">
              Create Deals
            </DialogTitle>
          </DialogHeader>

          {/* <div className="grid grid-cols-2 gap-5 py-4"> */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 px-2">
            <Input
              placeholder="Lead Title"
              value={formData.lead_title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lead_title: e.target.value,
                })
              }
            />

            <Input
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  first_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  last_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Telephone"
              value={formData.telephone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telephone: e.target.value,
                })
              }
            />

            <Input
              placeholder="Email"
              className="col-span-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <Input
              type="number"
              placeholder="Lead Value"
              value={formData.lead_value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lead_value: Number(e.target.value),
                })
              }
            />

            <Input
              placeholder="Source"
              value={formData.source}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  source: e.target.value,
                })
              }
            />

            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            />

            <Input
              placeholder="Tags"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(","),
                })
              }
            />

            <Input
              type="date"
              value={formData.last_contacted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  last_contacted: e.target.value,
                })
              }
            />

            <Input
              placeholder="Company Name"
              value={formData.company_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company_name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Street"
              value={formData.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  street: e.target.value,
                })
              }
            />

            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />

            <Input
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
            />

            <Input
              placeholder="Zip Code"
              value={formData.zip_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zip_code: e.target.value,
                })
              }
            />

            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
            />

            <Input
              placeholder="Website"
              className="col-span-2"
              value={formData.website}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  website: e.target.value,
                })
              }
            />

            <Textarea
              placeholder="Notes"
              className="col-span-2 min-h-[120px]"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
            />

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>
              Create Deal
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>
      {/* Lead Detail Popup */}
      <Dialog
  open={detailOpen}
  onOpenChange={setDetailOpen}
>
  <DialogContent className="overflow-hidden">

    <DialogHeader className="hidden">
      <DialogTitle>
        Lead Details
      </DialogTitle>
    </DialogHeader>

    <LeadDetailPage lead={selectedLead} />

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