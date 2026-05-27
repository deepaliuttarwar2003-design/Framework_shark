import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(2, "Title is required"),

    description: z
        .string()
        .min(5, "Description is required"),

    client: z.string().min(2),

    manager: z.string().min(2),

    startDate: z.string(),

    endDate: z.string(),

    budget: z.coerce
        .number()
        .min(1, "Budget is required"),

    status: z.enum([
        "Planning",
        "In Progress",
        "Completed",
        "On Hold",
    ]),
});

export type ProjectFormValues =
    z.infer<typeof projectSchema>;