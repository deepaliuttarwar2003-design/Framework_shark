"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCreateTeamMutation } from "../api/teamApi";

export default function TeamForm({
    open,
    setOpen,
    editTeam,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    editTeam: any;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");

    const [role, setRole] = useState<
        "Admin" | "Manager" | "Member"
    >("Member");

    const [createTeam] =
        useCreateTeamMutation();

    useEffect(() => {
        if (editTeam) {
            setName(editTeam.name || "");
            setDescription(
                editTeam.description || ""
            );

            setRole(
                editTeam.role || "Member"
            );
        } else {
            setName("");
            setDescription("");
            setRole("Member");
        }
    }, [editTeam]);

    const handleSubmit = async () => {
        if (!name.trim()) return;

        await createTeam({
            id: Date.now().toString(),
            name,
            description,
            role,
            members: [],
        });

        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {editTeam
                            ? "Edit Team"
                            : "Create Team"}
                    </DialogTitle>
                </DialogHeader>

                {/* FORM BODY */}
                <div className="space-y-4">
                    <Input
                        placeholder="Team Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <Input
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Team Role
                        </label>

                        <Select
                            value={role}
                            onValueChange={(
                                value
                            ) =>
                                setRole(
                                    value as
                                    | "Admin"
                                    | "Manager"
                                    | "Member"
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Admin">
                                    Admin
                                </SelectItem>

                                <SelectItem value="Manager">
                                    Manager
                                </SelectItem>

                                <SelectItem value="Member">
                                    Member
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Save Team
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}