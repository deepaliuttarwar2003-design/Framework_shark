import { AppModule } from "@/core/module"

export const PurchaseOrderModule: AppModule = {
  name: "purchase_order",

  menu: {
    label: "PurchaseOrder",
    path: "/purchase_order",
  },

  permissions: {
    read: "purchase_order.read",
    write: "purchase_order.write",
  },
}