export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  invoiceNo: string;
  gstin: string;
  customerName: string;
  phone: string;
  paymentMethod: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}




