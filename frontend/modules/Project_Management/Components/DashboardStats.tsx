import { Card, CardContent } from "@/components/ui/card";
import { Project } from "../types";

interface Props {
    projects: Project[];
}

export default function DashboardStats({ projects }: Props) {
    const total = projects.length;
    const completed = projects.filter(
        (p) => p.status === "Completed"
    ).length;

    const progress = projects.filter(
        (p) => p.status === "In Progress"
    ).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-sm text-muted-foreground">Total Projects</h3>
                    <p className="text-3xl font-bold">{total}</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-sm text-muted-foreground">Completed</h3>
                    <p className="text-3xl font-bold">{completed}</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-sm text-muted-foreground">In Progress</h3>
                    <p className="text-3xl font-bold">{progress}</p>
                </CardContent>
            </Card>
        </div>
    );
}