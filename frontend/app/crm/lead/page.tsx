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
  Phone,
  Mail,
  Calendar,
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

const leadsArray = Array.isArray(leads?.data) ? leads.data : [];
  const filteredLeads = leadsArray.filter((lead: Lead) =>
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
    <div className={`w-full min-h-screen bg-[#F8F9FA] p-6 text-slate-900 ${googleSans.className}`}>
     {/* 100% Full-Width Wrapper for Emerald Header Block */}
  <div className="w-full bg-emerald-800 text-white shadow-sm rounded-lg mb-8">
  <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">Leads</h1>
      <p className="text-sm text-emerald-100/80 mt-1">Manage, monitor, and move your sales pipeline.</p>
    </div>
    
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="relative w-full md:w-[280px]">
        <Search size={16} className="absolute left-3.5 top-3 text-emerald-200" />
        <Input
          placeholder="Search leads or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 rounded-xl border-none bg-emerald-900/40 text-white placeholder:text-emerald-200/60 focus-visible:ring-emerald-400 w-full"
        />
      </div>
      
      <span className="text-xs bg-emerald-900 text-emerald-100 px-3 py-1.5 rounded-full font-medium shadow-inner shrink-0 hidden sm:inline-block">
        Billing Module
      </span>
    </div>
  </div>
</div>

{/* Fixed Content Container for the Kanban Board */}
<div className="max-w-[1600px] mx-auto px-6"> 
  {/* Board */}
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex gap-5 overflow-x-auto pb-6 items-start">
      {STAGES.map((stage) => (
        <div key={stage} className="min-w-[310px] w-[310px] flex-shrink-0">
          <div className="bg-[#F1F3F5] rounded-2xl p-4 border border-slate-200/60 shadow-sm">
            
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  stage === "New" ? "bg-blue-500" :
                  stage === "Contacted" ? "bg-amber-500" :
                  stage === "Qualified" ? "bg-emerald-500" :
                  stage === "Disqualified" ? "bg-rose-500" : "bg-purple-500"
                }`} />
                <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
                  {stage}
                </h2>
              </div>

              <button
                onClick={() => {
                  setSelectedLead(null);
                  setFormData({
                    ...formData,
                    stage: stage,
                  });
                  setOpen(true);
                }}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Cards Container */}
            <Droppable droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 min-h-[450px]"
                >
                  {filteredLeads
                    .filter((lead: Lead) => lead.stage === stage)
                    .map((lead: Lead, index: number) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              setSelectedLead(lead);
                              setDetailOpen(true);
                            }}
                            className="bg-white p-4.5 relative cursor-pointer rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 group"
                          >
                            {/* Dropdown Menu Trigger */}
                            <div className="absolute top-3.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                                    <MoreVertical size={14} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedLead(lead);
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
                                      setOpen(true);
                                    }}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => handleDelete(lead.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Card Content Layout */}
                            <div className="pr-6">
                              <h3 className="text-[15px] font-semibold text-slate-800 line-clamp-1 mb-0.5">
                                {lead.first_name} {lead.last_name}
                              </h3>
                              {lead.company_name && (
                                <p className="text-xs text-slate-400 font-medium mb-3">
                                  {lead.company_name}
                                </p>
                              )}

                              {/* Info Badges & Details */}
                              <div className="space-y-1.5 text-xs text-slate-500 mb-3.5">
                                {lead.telephone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-slate-400" />
                                    <span className="truncate">{lead.telephone}</span>
                                  </div>
                                )}
                                {lead.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail size={12} className="text-slate-400" />
                                    <span className="truncate">{lead.email}</span>
                                  </div>
                                )}
                                {lead.created && (
                                  <div className="flex items-center gap-2">
                                    <Calendar size={12} className="text-slate-400" />
                                    <span>{lead.created}</span>
                                  </div>
                                )}
                              </div>

                              {/* Footer Details */}
                              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100 rounded-lg font-medium text-[11px] px-2 py-0.5">
                                  ${lead.lead_value.toLocaleString()}
                                </Badge>
                                
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                  <User size={12} />
                                </div>
                              </div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </div>
        </div>
      ))}
    </div>
  </DragDropContext>
</div>

      {/* Forms/Dialog components remain active below unchanged */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[95vh] overflow-y-auto rounded-[30px] p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-700">Create Deals</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 px-2">
            <Input placeholder="Lead Title" value={formData.lead_title} onChange={(e) => setFormData({ ...formData, lead_title: e.target.value })} />
            <Input placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
            <Input placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
            <Input placeholder="Telephone" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
            <Input placeholder="Email" className="col-span-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input type="number" placeholder="Lead Value" value={formData.lead_value} onChange={(e) => setFormData({ ...formData, lead_value: Number(e.target.value) })} />
            <Input placeholder="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} />
            <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <Input placeholder="Tags" onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",") })} />
            <Input type="date" value={formData.last_contacted} onChange={(e) => setFormData({ ...formData, last_contacted: e.target.value })} />
            <Input placeholder="Company Name" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
            <Input placeholder="Street" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
            <Input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            <Input placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            <Input placeholder="Zip Code" value={formData.zip_code} onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })} />
            <Input placeholder="Country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            <Input placeholder="Website" className="col-span-2" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
            <Textarea placeholder="Notes" className="col-span-2 min-h-[120px]" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Create Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="overflow-hidden">
          <DialogHeader className="hidden">
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && <LeadDetailPage lead={selectedLead} onClose={() => setDetailOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedLead(null);
          resetForm();
          setOpen(true);
        }}
        className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors z-50"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}