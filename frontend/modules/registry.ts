import { SharkModule } from "./types"

const modules: SharkModule[] = []

export function registerModule(module: SharkModule) {
  modules.push(module)
}

export function getModules() {
  return modules
}

export function initModules() {
  modules.forEach((m) => m.init?.())
}