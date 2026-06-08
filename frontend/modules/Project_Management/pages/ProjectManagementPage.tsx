"use client";

import { useState } from "react";

import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../Redux/projectManagementApiSlice";

import DashboardStats from "../Components/DashboardStats";
import ProjectTable from "../Components/ProjectTable";
import ProjectForm from "../Components/ProjectForm";
import { Project } from "../types";
import { Plus, FolderOpen } from "lucide-react"; // Using an icon matching the image header

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProjectManagementPage() {
  const { data = [], isLoading } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4EBE6] p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-32 bg-white/40 rounded-2xl backdrop-blur-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-36 bg-white/40 rounded-2xl backdrop-blur-md" />
          <div className="h-36 bg-white/40 rounded-2xl backdrop-blur-md" />
          <div className="h-36 bg-white/40 rounded-2xl backdrop-blur-md" />
        </div>
        <div className="h-80 bg-white/40 rounded-2xl backdrop-blur-md" />
      </div>
    );
  }

  return (
    /* Warm ambient background style mimicking Gemini_Generated_Image_jwqxm7jwqxm7jwqx.png */
    <div className="min-h-screen bg-linear-to-tr from-[#EADCD4] via-[#F6EFEA] to-[#E9DCD3] p-4 md:p-8 relative overflow-hidden antialiased">

      {/* Soft decorative background sparkle element in the lower right */}
      <div className="absolute bottom-6 right-8 text-white/50 pointer-events-none select-none text-4xl font-serif">
        ✦
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">

        {/* 1. Main Header Frosted Panel */}
        <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(230,215,205,0.3)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/80 border border-neutral-200/60 rounded-xl shadow-sm text-neutral-700">
              {/* Fallback geometric icon styling matching the custom workspace graphic */}
              <div className="w-6 h-6 flex items-center justify-center font-bold text-sm tracking-tight border border-neutral-400 rounded-md">
                🗂️
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                Project Hub
              </h1>
              <p className="text-xs md:text-sm text-neutral-500 font-medium mt-0.5">
                Central scope for your workspace deployments, team leads, and milestones.
              </p>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-11 bg-neutral-900 text-white hover:bg-neutral-800 font-medium px-5 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center gap-1.5"
                onClick={() => {
                  setEditingProject(null);
                }}
              >
                <Plus className="h-4 w-4 stroke-[2.5]" /> Create Workspace
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold font-serif tracking-tight text-neutral-900">
                  {editingProject ? "Update Workspace Parameters" : "Initialize New Workspace"}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                <ProjectForm
                  initialData={editingProject}
                  onSuccess={() => setOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 2. Embedded Frosted Stats Row */}
        {/* This container directly receives your custom stats layout cards */}
        <div className="w-full">
          <DashboardStats projects={data} />
        </div>

        {/* 3. Terminal/Browser Layout Wrapper for Project Table */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_12px_40px_rgba(225,210,200,0.25)] overflow-hidden">

          {/* Header Panel with standard browser dot anchors */}
          <div className="px-6 py-4 border-b border-white/30 bg-white/20 flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase font-serif">
              Active Repositories & Databases ({data.length})
            </span>
            {/* Visual status indicators matched closely to the screenshot layout */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFA19E]/80 border border-[#FFA19E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD591]/80 border border-[#FFD591]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#A5E3CD]/80 border border-[#A5E3CD]" />
            </div>
          </div>

          {/* Clean table canvas padding */}
          <div className="p-3 bg-white/10">
            <ProjectTable
              projects={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

      </div>
    </div>
  );
}