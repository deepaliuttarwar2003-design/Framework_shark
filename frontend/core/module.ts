// Located in: frontend/core/module.ts (or wherever AppModule is defined)

export interface AppModule {
  name: string
  routes?: any[]
  menu?: {
    label: string
    path: string
  }
  permissions?: {
    read: string
    write: string
  }
}
