import { AppModule } from "@/core/module"

export const ContractmanagementModule: AppModule = {
  name: "contractmanagement",

  menu: {
    label: "Contractmanagement",
    path: "/contractmanagement",
  },

  permissions: {
    read: "contractmanagement.read",
    write: "contractmanagement.write",
  },
}