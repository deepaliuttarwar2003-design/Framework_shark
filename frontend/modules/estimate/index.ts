import { AppModule } from "@/core/module"

export const EstimateModule: AppModule = {
  name: "estimate",

  menu: {
    label: "Estimate",
    path: "/estimate",
  },

  permissions: {
    read: "estimate.read",
    write: "estimate.write",
  },
}