import { AppModule } from "@/core/module"

export const TeamModule: AppModule = {
  name: "team",

  menu: {
    label: "Team",
    path: "/team",
  },

  permissions: {
    read: "team.read",
    write: "team.write",
  },
}