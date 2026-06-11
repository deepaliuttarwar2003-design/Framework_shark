export interface Proposal {
    id?: string;
    proposal_id: string;
    proposal_title: string;
    proposal_type: string;
    status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
    proposal_date: string;
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