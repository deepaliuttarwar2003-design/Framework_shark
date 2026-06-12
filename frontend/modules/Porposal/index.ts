import { AppModule } from "@/core/module";
import { ProposalList } from "./pages/page";

export const ProposalModule: AppModule = {
  name: "proposal",
  menu: {
    label: "Proposals",
    path: "/proposal",
  },
  permissions: {
    read: "proposal.read",
    write: "proposal.write",
  },
  component: ProposalList, // Point to your main view
};
