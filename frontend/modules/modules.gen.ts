// AUTO-GENERATED FILE — DO NOT EDIT

import { CrmModule as crmModule } from "@/modules/crm"
import { SalesModule as salesModule } from "@/modules/sales"
import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { InventoryModule as inventoryModule } from "@/modules/inventory"

export function loadModules() {
  return [
    crmModule,
    salesModule,
    project_ManagementModule,
    inventoryModule,
  ]
}