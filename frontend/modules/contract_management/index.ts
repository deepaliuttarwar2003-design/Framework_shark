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
  // The '?' tells TypeScript: "It's okay if this is undefined"
  component?: React.ComponentType | any;
}