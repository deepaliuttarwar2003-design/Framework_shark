export interface ContractItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  rate: number;
  total: number;
}

export interface PaymentScheduleItem {
  label: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface ServiceAgreement {
  contractId: string;
  agreementDate: string;
  projectName: string;

  // Provider Info
  providerName: string;
  providerAddress: string;
  providerSignatory: string;
  providerSignatureDate: string;

  // Client Info
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  clientSignatory: string;
  clientSignatureDate: string;

  // Contract Meta
  startDate: string;
  endDate: string;
  preparedBy: string;
  status: "Active" | "Expired" | "Draft";

  // Financial Breakdowns
  items: ContractItem[];
  discountPercent: number;
  gstPercent: number;
  deductionAdjustment: number;
  advancePayments?: PaymentScheduleItem[];
  afterPayments?: PaymentScheduleItem[];
  content?: string;
}