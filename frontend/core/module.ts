// Located in: frontend/core/module.ts (or wherever AppModule is defined)

export interface AppModule {
  name: string;
  menu: {
    label: string;
    path: string;
  };
  permissions: {
    read: string;
    write: string;
  };
  // ADD THIS LINE:
  component: React.ComponentType;
}
