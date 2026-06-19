// AUTO-GENERATED FILE — DO NOT EDIT

import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { UserManagementModule as userManagementModule } from "@/modules/UserManagement"
import { AuthModule as authModule } from "@/modules/auth"
import { EstimateModule as estimateModule } from "@/modules/estimate"
import { InventoryModule as inventoryModule } from "@/modules/inventory"
import { InvoiceModule as invoiceModule } from "@/modules/invoice"

export function loadModules() {
  return [
    project_ManagementModule,
    userManagementModule,
    authModule,
    estimateModule,
    inventoryModule,
    invoiceModule
  ]
}
