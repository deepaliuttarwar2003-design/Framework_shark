import { AppModule } from "@/core/module"

export const PorposalModule: AppModule = {
  name: "Porposal",

  menu: {
    label: "Porposal",
    path: "/Porposal",
  },

  permissions: {
    read: "Porposal.read",
    write: "Porposal.write",
  },
}