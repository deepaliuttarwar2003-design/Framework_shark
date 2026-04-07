export interface SharkModule {
  name: string

  init?: () => void

  routes?: {
    path: string
    component: React.FC
  }[]

  layouts?: React.FC[]

  providers?: React.FC<{ children: React.ReactNode }>[]
}