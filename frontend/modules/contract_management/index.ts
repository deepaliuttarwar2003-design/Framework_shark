import { AppModule } from "@/core/module"

export const ContractModule: AppModule = {
  name: "contract",

  menu: {
    label: "Contract",
    path: "/contract",
  },

  permissions: {
    read: "contract.read",
    write: "contract.write",
  },
}