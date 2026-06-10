// AUTO-GENERATED FILE — DO NOT EDIT

import { PorposalModule as porposalModule } from "@/modules/Porposal"
import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { AuthModule as authModule } from "@/modules/auth"
import { Contract_managementModule as contract_managementModule } from "@/modules/contract_management"
import { CrmModule as crmModule } from "@/modules/crm"
import { EstimateModule as estimateModule } from "@/modules/estimate"
import { InventoryModule as inventoryModule } from "@/modules/inventory"
import { Purchase_orderModule as purchase_orderModule } from "@/modules/purchase_order"
import { SalesModule as salesModule } from "@/modules/sales"

export function loadModules() {
  return [
    porposalModule,
    project_ManagementModule,
    authModule,
    contract_managementModule,
    crmModule,
    estimateModule,
    inventoryModule,
    purchase_orderModule,
    salesModule
  ]
}
