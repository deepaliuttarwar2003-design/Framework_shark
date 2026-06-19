export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Manager" | "Member";
}

export interface Team {
    id: string;
    name: string;
    description: string;

    role: "Admin" | "Manager" | "Member";

    members: TeamMember[];
}