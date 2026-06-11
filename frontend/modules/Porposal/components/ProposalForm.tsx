"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { WysiwygEditor } from "./WysiwygEditor";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export interface ProposalData {
    id?: number;
    proposal_title: string;
    client_name: string;
    email: string;
    total_amount: number;
    description: string;
}

interface ProposalFormProps {
    proposal?: ProposalData | null;
    onSubmit?: (data: ProposalData) => void;
}

export const ProposalForm = ({
    proposal,
    onSubmit,
}: ProposalFormProps) => {
    const form = useForm<ProposalData>({
        defaultValues: {
            proposal_title: "",
            client_name: "",
            email: "",
            total_amount: 0,
            description: "",
        },
    });

    useEffect(() => {
        if (proposal) {
            form.reset({
                proposal_title: proposal.proposal_title,
                client_name: proposal.client_name,
                email: proposal.email,
                total_amount: proposal.total_amount,
                description: proposal.description || "",
            });
        }
    }, [proposal, form]);

    const handleSubmit = (data: ProposalData) => {
        if (onSubmit) {
            onSubmit(data);
        } else {
            console.log("Proposal Submitted:", data);
            alert("Proposal Submitted Successfully");
        }

        if (!proposal) {
            form.reset({
                proposal_title: "",
                client_name: "",
                email: "",
                total_amount: 0,
                description: "",
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="proposal_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Proposal Title
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Project Name"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="client_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Client Name
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Client Name"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>

                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="client@example.com"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="total_amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Total Amount
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="number"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Proposal Description
                            </FormLabel>

                            <FormControl>
                                <WysiwygEditor
                                    content={field.value || ""}
                                    onChange={field.onChange}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    {proposal
                        ? "Update Proposal"
                        : "Submit Proposal"}
                </Button>
            </form>

        </Form>
    );
};