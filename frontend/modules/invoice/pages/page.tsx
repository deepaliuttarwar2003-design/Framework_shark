'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  useCreateinvoiceMutation,
  useDeleteinvoiceMutation,
  useGetinvoiceQuery,
  useUpdateinvoiceMutation,
  type InvoiceApiPayload,
  type InvoiceApiRecord,
} from '@/app/invoice/api/invoiceApi';

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

type InvoiceStatus = 'Paid' | 'Unpaid' | 'Pending';

type Invoice = {
  id?: string;
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  payment: string;
  company: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  customer: {
    name: string;
    company: string;
    email: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
};

const defaultCompany = {
  name: 'Sharkweb IT Park',
  address: '123 Tech Street, Coimbatore',
  email: 'billing@sharkweb.io',
  phone: '+91 98765 43210',
};

const mapApiInvoiceToView = (invoice: InvoiceApiRecord): Invoice => ({
  id: invoice.id,
  invoiceNo: invoice.invoiceNo,
  issueDate: invoice.invoiceDate,
  dueDate: invoice.dueDate,
  status: invoice.status as InvoiceStatus,
  payment: invoice.payment,
  company: defaultCompany,
  customer: {
    name: invoice.customerName,
    company: 'External Client',
    email: invoice.customerEmail,
    address: 'Client Address',
  },
  items: invoice.items.map((item, index) => ({
    id: item.id ?? `${index + 1}`,
    description: `Product ${item.productId}`,
    quantity: item.quantity,
    rate: item.price,
    amount: item.amount,
  })),
  subtotal: invoice.subtotal,
  tax: invoice.tax,
  total: invoice.totalAmount,
  notes: '',
});

const buildApiPayload = (
  invoiceNo: string,
  customerName: string,
  customerEmail: string,
  status: InvoiceStatus,
  payment: string,
  items: InvoiceItem[],
  issueDate: string,
  dueDate: string,
): InvoiceApiPayload => {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.18;
  const totalAmount = subtotal + tax;

  return {
    invoiceNo,
    customerName,
    customerEmail,
    invoiceDate: issueDate,
    dueDate,
    subtotal,
    tax,
    totalAmount,
    status,
    payment,
    items: items.map((item, index) => ({
      productId: Number.parseInt(item.id, 10) || index + 1,
      quantity: Number(item.quantity),
      price: Number(item.rate),
      amount: Number(item.amount),
    })),
  };
};

export default function InvoicePage() {
  const { data: invoiceRecords, isLoading, isFetching, error } = useGetinvoiceQuery();
  const [createInvoice, { isLoading: isCreating }] = useCreateinvoiceMutation();
  const [updateInvoice, { isLoading: isUpdating }] = useUpdateinvoiceMutation();
  const [deleteInvoice, { isLoading: isDeleting }] = useDeleteinvoiceMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [status, setStatus] = useState<InvoiceStatus>('Pending');
  const [payment, setPayment] = useState('Cash');
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const invoices = ((invoiceRecords?.data ?? invoiceRecords) ?? []).map(mapApiInvoiceToView);

  const openCreateModal = () => {
    setSelectedInvoice(null);
    setIsViewMode(false);
    setInvoiceNo(`INV-2026-00${invoices.length + 1}`);
    setCustomerName('');
    setCustomerEmail('');
    setStatus('Pending');
    setPayment('Cash');
    setItems([{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }]);
    setIsDialogOpen(true);
  };

  const openEditViewModal = (invoice: Invoice, viewOnly = false) => {
    setSelectedInvoice(invoice);
    setIsViewMode(viewOnly);
    setInvoiceNo(invoice.invoiceNo);
    setCustomerName(invoice.customer.name);
    setCustomerEmail(invoice.customer.email);
    setStatus(invoice.status);
    setPayment(invoice.payment || 'Cash');
    setItems(invoice.items);
    setIsDialogOpen(true);
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value } as InvoiceItem;

    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? Number(value) : updatedItems[index].quantity;
      const rate = field === 'rate' ? Number(value) : updatedItems[index].rate;
      updatedItems[index].amount = quantity * rate;
    }

    setItems(updatedItems);
  };

  const addItemRow = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItemRow = (index: number) => {
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();

    const issueDate = selectedInvoice?.issueDate || new Date().toISOString().split('T')[0];
    const dueDate = selectedInvoice?.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const payload = buildApiPayload(invoiceNo, customerName, customerEmail, status, payment, items, issueDate, dueDate);

    try {
      if (selectedInvoice?.id) {
        await updateInvoice({ id: selectedInvoice.id, data: payload }).unwrap();
      } else {
        await createInvoice(payload).unwrap();
      }

      setIsDialogOpen(false);
      setSelectedInvoice(null);
    } catch (saveError) {
      console.error('Failed to save invoice', saveError);
    }
  };

  const handleDeleteInvoice = async (invoice: Invoice) => {
    if (!confirm('Are you sure you want to delete this invoice?')) {
      return;
    }

    if (!invoice.id) {
      console.error('Cannot delete invoice without backend id');
      return;
    }

    try {
      await deleteInvoice(invoice.id).unwrap();
    } catch (deleteError) {
      console.error('Failed to delete invoice', deleteError);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto dark:text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage your client billing and deployment invoices.</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus size={16} /> Create Invoice
        </Button>
      </div>

      {(isLoading || isFetching) && <div className="text-sm text-muted-foreground">Loading invoices...</div>}

      {error && <div className="text-sm text-destructive">Failed to load invoices from the backend.</div>}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id || invoice.invoiceNo}>
                  <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>₹{invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        invoice.status === 'Paid' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => openEditViewModal(invoice, true)}>
                      <Eye size={14} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEditViewModal(invoice, false)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteInvoice(invoice)} disabled={isDeleting}>
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{isViewMode ? 'View Invoice' : selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}</h2>
              <Button type="button" variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Invoice Number</label>
                  <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} disabled={isViewMode} required />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                    disabled={isViewMode}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    disabled={isViewMode}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Customer Name</label>
                  <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} disabled={isViewMode} required />
                </div>
                <div>
                  <label className="text-sm font-medium">Customer Email</label>
                  <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} disabled={isViewMode} required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">Line Items</h3>
                  {!isViewMode && (
                    <Button type="button" variant="outline" size="sm" onClick={addItemRow} className="gap-1">
                      <Plus size={12} /> Add Item
                    </Button>
                  )}
                </div>

                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                        disabled={isViewMode}
                        required
                      />
                    </div>
                    <div className="col-span-2 text-sm font-medium px-2">₹{item.amount}</div>
                    <div className="col-span-1">
                      {!isViewMode && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeItemRow(index)} disabled={items.length === 1}>
                          <Trash2 size={14} className="text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex flex-col items-end space-y-1 text-sm">
                <div>Subtotal: ₹{items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</div>
                <div>Tax (18%): ₹{(items.reduce((sum, item) => sum + item.amount, 0) * 0.18).toFixed(2)}</div>
                <div className="text-base font-bold">Total: ₹{(items.reduce((sum, item) => sum + item.amount, 0) * 1.18).toFixed(2)}</div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                {!isViewMode && (
                  <Button type="submit" disabled={isCreating || isUpdating}>
                    {selectedInvoice ? 'Update Invoice' : 'Create Invoice'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
