import { AppModule } from "@/core/module"

export const InventoryModule: AppModule = {
  name: "inventory",

  menu: {
    label: "Inventory",
    path: "/inventory",
  },

  permissions: {
    read: "inventory.read",
    write: "inventory.write",
  },
}
