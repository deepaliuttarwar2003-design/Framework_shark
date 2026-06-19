import { AppModule } from "@/core/module"

export const UserManagementModule: AppModule = {
  name: "UserManagement",

  menu: {
    label: "UserManagement",
    path: "/UserManagement",
  },

  permissions: {
    read: "UserManagement.read",
    write: "UserManagement.write",
  },
}