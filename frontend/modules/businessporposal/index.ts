import { AppModule } from "@/core/module"

export const BusinessporposalModule: AppModule = {
  name: "businessporposal",

  menu: {
    label: "Businessporposal",
    path: "/businessporposal",
  },

  permissions: {
    read: "businessporposal.read",
    write: "businessporposal.write",
  },
}