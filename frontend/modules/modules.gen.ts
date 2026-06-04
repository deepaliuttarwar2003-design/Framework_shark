// AUTO-GENERATED FILE — DO NOT EDIT

import { ProjectManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { ContractManagementsModule as contractManagementsModule } from "@/modules/contractManagements"
import { CrmModule as crmModule } from "@/modules/crm"
import { EstimateModule as estimateModule } from "@/modules/estimate"
import { InventoryModule as inventoryModule } from "@/modules/inventory"
import { SalesModule as salesModule } from "@/modules/sales"

export function loadModules() {
  return [
    project_ManagementModule,
    contractManagementsModule,
    crmModule,
    estimateModule,
    inventoryModule,
    salesModule
  ]
}
