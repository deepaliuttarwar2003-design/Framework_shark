"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useAddMemberMutation } from "../api/teamApi";

export default function TeamMembersContent({
    team,
}: {
    team: any;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Member");

    const [addMember] = useAddMemberMutation();

    const handleAdd = async () => {
        if (!team) return;

        await addMember({
            teamId: team.id,
            member: {
                id: Date.now().toString(),
                name,
                email,
                role,
            },
        });

        setName("");
        setEmail("");
        setRole("Member");
    };

    return (
        <div className="space-y-4">
            {/* Members List */}
            <div className="space-y-2 max-h-60 overflow-auto">
                {team?.members?.map((member: any) => (
                    <div
                        key={member.id}
                        className="flex items-center justify-between border rounded-lg p-3"
                    >
                        <div>
                            <p className="font-medium">
                                {member.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {member.email}
                            </p>
                        </div>

                        <span className="text-sm font-semibold">
                            {member.role}
                        </span>
                    </div>
                ))}
            </div>

            {/* Add Member */}
            <div className="border-t pt-4 space-y-3">
                <Input
                    placeholder="Member Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <Input
                    placeholder="Member Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Select
                    value={role}
                    onValueChange={setRole}
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

                <Button
                    onClick={handleAdd}
                    className="w-full"
                >
                    Add Member
                </Button>
            </div>
        </div>
    );
}