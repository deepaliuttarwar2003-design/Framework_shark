import { AppModule } from "@/core/module"

export const InvoiceModule: AppModule = {
  name: "invoice",

  menu: {
    label: "Invoice",
    path: "/invoice",
  },

  permissions: {
    read: "invoice.read",
    write: "invoice.write",
  }, 
}