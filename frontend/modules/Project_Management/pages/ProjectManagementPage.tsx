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
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Manage projects, managers and teams
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
              }}
            >
              Add Project
            </Button>


          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Update Project" : "Create Project"}
              </DialogTitle>
            </DialogHeader>

            <ProjectForm
              initialData={editingProject}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DashboardStats projects={data} />

      <ProjectTable
        projects={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}