// AUTO-GENERATED FILE — DO NOT EDIT

import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { Contract_managementModule as contract_managementModule } from "@/modules/contract_management"
import { CrmModule as crmModule } from "@/modules/crm"
import { EstimateModule as estimateModule } from "@/modules/estimate"
import { InventoryModule as inventoryModule } from "@/modules/inventory"
import { Purchase_orderModule as purchase_orderModule } from "@/modules/purchase_order"
import { SalesModule as salesModule } from "@/modules/sales"

export function loadModules() {
  return [
    project_ManagementModule,
    contract_managementModule,
    crmModule,
    estimateModule,
    inventoryModule,
    purchase_orderModule,
    salesModule
  ]
}
