import { AppModule } from "@/core/module"

export const ProjectManagementModule: AppModule = {
  name: "Project_Management",

  menu: {
    label: "ProjectManagement",
    path: "/Project_Management",
  },

  permissions: {
    read: "Project_Management.read",
    write: "Project_Management.write",
  },
}