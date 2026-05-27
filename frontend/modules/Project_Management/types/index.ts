export type Project = {
    id: number;
    title: string;
    description: string;
    client: string;
    manager: string;
    startDate: string;
    endDate: string;
    status: "Planning" | "In Progress" | "Completed" | "On Hold";
    budget: number;
    createdAt: string;
}