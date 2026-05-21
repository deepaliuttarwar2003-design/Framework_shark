import { AppModule } from "@/core/module"

export const CrmModule: AppModule = {
  name: "crm",

  menu: {
    label: "Crm",
    path: "/crm",
  },

  permissions: {
    read: "crm.read",
    write: "crm.write",
  },
}