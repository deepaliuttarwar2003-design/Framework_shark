import { AppModule } from "@/core/module"

export const TeamManagementModule: AppModule = {
  name: "TeamManagement",

  menu: {
    label: "TeamManagement",
    path: "/TeamManagement",
  },

  permissions: {
    read: "TeamManagement.read",
    write: "TeamManagement.write",
  },
}