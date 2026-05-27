"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

import StatusBadge from "./StatusBadge";

export interface Project {
    id: number;
    title: string;
    client: string;
    manager: string;
    budget: number;
    status: string;
}

interface Props {
    projects: Project[];

    onEdit: (project: Project) => void;

    onDelete: (id: number) => void;
}

export default function ProjectTable({
    projects,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="rounded-xl border overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>

                        <TableHead>Client</TableHead>

                        <TableHead>Manager</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead>Budget</TableHead>

                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                {project.title}
                            </TableCell>

                            <TableCell>
                                {project.client}
                            </TableCell>

                            <TableCell>
                                {project.manager}
                            </TableCell>

                            <TableCell>
                                <StatusBadge
                                    status={project.status}
                                />
                            </TableCell>

                            <TableCell>
                                ₹ {project.budget}
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            onEdit(project)
                                        }
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() =>
                                            onDelete(project.id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}