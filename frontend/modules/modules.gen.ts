// AUTO-GENERATED FILE — DO NOT EDIT

import { PorposalModule as porposalModule } from "@/modules/Porposal"
import { Project_ManagementModule as project_ManagementModule } from "@/modules/Project_Management"
import { TeamManagementModule as teamManagementModule } from "@/modules/TeamManagement"
import { UserManagementModule as userManagementModule } from "@/modules/UserManagement"
import { AuthModule as authModule } from "@/modules/auth"
import { Contract_managementModule as contract_managementModule } from "@/modules/contract_management"

export function loadModules() {
  return [
    porposalModule,
    project_ManagementModule,
    teamManagementModule,
    userManagementModule,
    authModule,
    contract_managementModule
  ]
}
