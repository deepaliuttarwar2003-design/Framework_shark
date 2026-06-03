// AUTO-GENERATED FILE — DO NOT EDIT

import { ContractManagementsModule as contractManagementsModule } from "@/modules/contractManagements"
import { ContractmanagementModule as contractmanagementModule } from "@/modules/contractmanagement"
import { CrmModule as crmModule } from "@/modules/crm"
import { SalesModule as salesModule } from "@/modules/sales"
import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { InventoryModule as inventoryModule } from "@/modules/inventory"

export function loadModules() {
  return [
    contractManagementsModule,
    contractmanagementModule,
    crmModule,
    salesModule,
    project_ManagementModule,
    inventoryModule,
  ]
}