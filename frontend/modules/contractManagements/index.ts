import { AppModule } from "@/core/module"

export const ContractManagementsModule: AppModule = {
  name: "contractManagements",

  menu: {
    label: "ContractManagements",
    path: "/contractManagements",
  },

  permissions: {
    read: "contractManagements.read",
    write: "contractManagements.write",
  },
}