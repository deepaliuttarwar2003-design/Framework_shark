"use client";

import { User } from "../types/user";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export default function UserTable({
    users,
    onEdit,
    onDelete,
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>

                        <TableCell>
                            {user.status
                                ? "Active"
                                : "Inactive"}
                        </TableCell>

                        <TableCell className="space-x-2">
                            <Button
                                size="sm"
                                onClick={() => onEdit(user)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    onDelete(user.id!)
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}