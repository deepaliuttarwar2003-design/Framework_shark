export interface ContractItem {
    description: string;
    qty: number;
    unit: string;
    rate: number;
    total: number;
}

export type ContractStatus =
    | "Draft"
    | "Active"
    | "Pending Approval"
    | "Expired"
    | "Terminated";

export interface ContractManagement {
    id?: string;

    contract_no: string;
    title: string;
    party_name: string;

    start_date: string;
    end_date: string;

    status: ContractStatus;

    template_id: string;

    items: ContractItem[];

    discount: number;
    gst: number;

    // Calculated Values
    subtotal?: number;
    tax_amount?: number;
    grand_total?: number;

    // Optional Business Fields
    description?: string;
    notes?: string;
    payment_terms?: string;
    renewal_date?: string;
    content?: string;

    created_at?: string;
    updated_at?: string;
}