import { z } from "zod";

export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),      // ✅ FIXED
  description: z.string().min(1, "Description is required"),
  clientName: z.string().min(1, "Client name is required"),        // ✅ FIXED
  teamLead: z.string().min(1, "Team lead is required"),            // ✅ FIXED
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z.number().min(0, "Budget must be a positive number"),
  status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),         // ✅ ADDED
});

export type ProjectFormValues = z.infer<typeof projectSchema>;