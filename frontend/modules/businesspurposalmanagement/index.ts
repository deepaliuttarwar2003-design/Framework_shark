import { AppModule } from "@/core/module"

export const BusinesspurposalmanagementModule: AppModule = {
  name: "businesspurposalmanagement",

  menu: {
    label: "Businesspurposalmanagement",
    path: "/businesspurposalmanagement",
  },

  permissions: {
    read: "businesspurposalmanagement.read",
    write: "businesspurposalmanagement.write",
  },
}