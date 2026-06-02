import { AppModule } from "@/core/module"

export const ContractManagementModule: AppModule = {
  name: "contract_management",

  menu: {
    label: "ContractManagement",
    path: "/contract_management",
  },

  permissions: {
    read: "contract_management.read",
    write: "contract_management.write",
  },
}