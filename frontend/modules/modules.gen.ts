// AUTO-GENERATED FILE — DO NOT EDIT

import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { ContractManagementsModule as contractManagementsModule } from "@/modules/contractManagements"
import { CrmModule as crmModule } from "@/modules/crm"
import { EstimateModule as estimateModule } from "@/modules/estimate"
import { InventoryModule as inventoryModule } from "@/modules/inventory"
import { Purchase_orderModule as purchase_orderModule } from "@/modules/purchase_order"
import { SalesModule as salesModule } from "@/modules/sales"
import { Contract_ManagementModule as contract_managementModule } from "@/modules/Contract_Management"

export function loadModules() {
  return [
    project_ManagementModule,
    contractManagementsModule,
    crmModule,
    estimateModule,
    inventoryModule,
    purchase_orderModule,
    salesModule,
    contract_managementModule
  ]
}
