"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import TeamMembersContent from "./TeamMembersContent";

export default function TeamTable({
    teams,
    onDelete,
    onEdit,
}: {
    teams: any[];
    onDelete: (id: string) => void;
    onEdit: (team: any) => void;
}) {
    const [openMembers, setOpenMembers] =
        useState(false);

    const [selectedTeam, setSelectedTeam] =
        useState<any>(null);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white font-bold text-lg">
                            Team Name
                        </TableHead>

                        <TableHead className="text-white font-bold text-lg">
                            Description
                        </TableHead>

                        <TableHead className="text-white font-bold text-lg">
                            Team Role
                        </TableHead>

                        <TableHead className="text-white font-bold text-lg">
                            Total Members
                        </TableHead>

                        <TableHead className="text-white font-bold text-lg">
                            Members
                        </TableHead>

                        <TableHead className="text-white font-bold text-lg">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <TableRow
                                key={team.id}
                            >
                                <TableCell className="font-medium">
                                    {team.name}
                                </TableCell>

                                <TableCell>
                                    {
                                        team.description
                                    }
                                </TableCell>

                                <TableCell>
                                    <span className="font-medium">
                                        {team.role}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {team
                                        .members
                                        ?.length ||
                                        0}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6"
                                        onClick={() => {
                                            setSelectedTeam(team);
                                            setOpenMembers(true);
                                        }}
                                    >
                                        View Members
                                    </Button>
                                </TableCell>

                                <TableCell className="space-x-2">
                                    <Button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6"
                                        onClick={() => onEdit(team)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6"
                                        onClick={() => onDelete(team.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center py-8 text-muted-foreground"
                            >
                                No teams
                                found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog
                open={openMembers}
                onOpenChange={
                    setOpenMembers
                }
            >
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {
                                selectedTeam?.name
                            }{" "}
                            Members
                        </DialogTitle>
                    </DialogHeader>

                    <TeamMembersContent
                        team={selectedTeam}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}