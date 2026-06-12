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

import {
    useCreateProposalMutation,
    useDeleteProposalMutation,
    useUpdateProposalMutation,
    useGetProposalsQuery,
} from "../Api/proposalApi";


export interface ProposalData {
    id?: number;

    proposal_title: string;
    proposal_type: string;

    client_name: string;
    contact_person: string;
    email: string;
    mobile_number: string;

    lead_reference: string;
    sales_representative: string;

    currency: string;
    subtotal: number;
    discount: number;
    tax: number;
    total_amount: number;

    description: string;
    terms_conditions: string;
    notes: string;
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
    proposal_type: "",

    client_name: "",
    contact_person: "",
    email: "",
    mobile_number: "",

    lead_reference: "",
    sales_representative: "",

    currency: "INR",
    subtotal: 0,
    discount: 0,
    tax: 0,
    total_amount: 0,

    description: "",
    terms_conditions: "",
    notes: "",
},
    });

    console.log(proposal)
const [createProposal] = useCreateProposalMutation();
const [updateProposal] = useUpdateProposalMutation();
const [deleteProposal] = useDeleteProposalMutation();

const {
    data: proposals = [],
    isLoading,
} = useGetProposalsQuery();

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

    const handleSubmit = async (data: ProposalData) => {
        console.log(data.description);
        try {
            if (proposal?.id) {
                // Update existing proposal
                console.log(proposals?.id)
                await updateProposal({
               ...data,
              id: proposal.id,
              }).unwrap();           
              alert("Proposal Updated Successfully");
            } else {
                // Create new proposal
                const res = await createProposal(data).unwrap();
                console.log(res);
                alert("Proposal Created Successfully");
                form.reset({
                    proposal_title: "",
                    client_name: "",
                    email: "",
                    total_amount: 0,
                    description: "",
                });
            }

            if (onSubmit) {
                onSubmit(data);
            }
        } catch (error) {
            console.error('Failed to save proposal:', error);
            alert('Error saving proposal');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this proposal?')) {
            return;
        }
        try {
            await deleteProposal(id).unwrap();
            alert("Proposal Deleted Successfully");
        } catch (error) {
            console.error('Failed to delete proposal:', error);
            alert('Error deleting proposal');
        }
    };

    return (
        <>
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
                                    <FormLabel>Proposal Title</FormLabel>
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
    name="proposal_type"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Proposal Type</FormLabel>
            <FormControl>
                <Input placeholder="Proposal Type" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>

<FormField
    control={form.control}
    name="contact_person"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Contact Person</FormLabel>
            <FormControl>
                <Input placeholder="Contact Person" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="mobile_number"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl>
                <Input placeholder="Mobile Number" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="lead_reference"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Lead Reference</FormLabel>
            <FormControl>
                <Input placeholder="Lead Reference" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="sales_representative"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Sales Representative</FormLabel>
            <FormControl>
                <Input placeholder="Sales Representative" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="currency"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Currency</FormLabel>
            <FormControl>
                <Input placeholder="INR" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="subtotal"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Subtotal</FormLabel>
            <FormControl>
                <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                        field.onChange(Number(e.target.value))
                    }
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="discount"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Discount</FormLabel>
            <FormControl>
                <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                        field.onChange(Number(e.target.value))
                    }
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="tax"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Tax</FormLabel>
            <FormControl>
                <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                        field.onChange(Number(e.target.value))
                    }
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="terms_conditions"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Terms & Conditions</FormLabel>
            <FormControl>
                <textarea
                    className="w-full border rounded-md p-2"
                    rows={4}
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
<FormField
    control={form.control}
    name="notes"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
                <textarea
                    className="w-full border rounded-md p-2"
                    rows={4}
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
                                    <FormLabel>Client Name</FormLabel>
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
                                <FormLabel>Total Amount</FormLabel>
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
                                <FormLabel>Proposal Description</FormLabel>
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
                    className="w-full bg-black text-white">
                        {proposal ? "Update Proposal" : "Submit Proposal"}
                    </Button>
                </form>
            </Form>

            {/* Display proposals list */}
            {isLoading && <p>Loading proposals...</p>}
            {proposals && proposals.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Proposals</h2>
                    <div className="space-y-4">
                        {proposals.map((p) => (
                            <div key={p.id} className="border p-4 rounded">
                                <h3 className="font-bold">{p.proposal_title}</h3>
                                <p>Client: {p.client_name}</p>
                                <p>Amount: ₹{p.total_amount}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            // Set proposal for edit
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(p.id!)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};