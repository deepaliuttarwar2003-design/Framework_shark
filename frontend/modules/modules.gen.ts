// AUTO-GENERATED FILE — DO NOT EDIT

import { TeamManagementModule as teamManagementModule } from "@/modules/TeamManagement"
import { AuthModule as authModule } from "@/modules/auth"
import { Contract_managementModule as contract_managementModule } from "@/modules/contract_management"
import { CrmModule as crmModule } from "@/modules/crm"
import { SalesModule as salesModule } from "@/modules/sales"
import { TeamModule as teamModule } from "@/modules/team"

export function loadModules() {
  return [
    teamManagementModule,
    authModule,
    contract_managementModule,
    crmModule,
    salesModule,
    teamModule
  ]
}
