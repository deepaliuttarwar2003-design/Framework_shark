import { AppModule } from "@/core/module"

export const SalesModule: AppModule = {
  name: "sales",

  menu: {
    label: "Sales",
    path: "/sales",
  },

  permissions: {
    read: "sales.read",
    write: "sales.write",
  },
}