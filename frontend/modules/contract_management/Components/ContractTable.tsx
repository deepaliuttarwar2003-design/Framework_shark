"use client";

import {
  useDeleteContractMutation,
} from "../Api/ContractApi";

import { ContractManagement } from "../types/contract";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface Props {
  contracts: ContractManagement[];
  onEdit: (
    contract: ContractManagement
  ) => void;
}

export function ContractTable({
  contracts,
  onEdit,
}: Props) {
  const [deleteContract] =
    useDeleteContractMutation();

  const handlePrint = (
    contract: ContractManagement
  ) => {
    const printWindow = window.open(
      "",
      "_blank"
    );

    if (!printWindow) return;

    const subtotal = contract.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const taxAmount = contract.gst;
    const grandTotal = subtotal - contract.discount + taxAmount;

    const advancePayments = [
      {
        label: "Advance Payment 1",
        amount: Math.round(grandTotal * 0.2),
        dueDate: contract.start_date,
        status: "Pending",
      },
      {
        label: "Advance Payment 2",
        amount: Math.round(grandTotal * 0.1),
        dueDate: contract.start_date,
        status: "Pending",
      },
    ];

    const afterPayments = [
      {
        label: "Completion Payment",
        amount: Math.round(grandTotal * 0.6),
        dueDate: contract.end_date,
        status: "Pending",
      },
      {
        label: "Retention Release",
        amount: Math.round(grandTotal * 0.1),
        dueDate: contract.end_date,
        status: "Pending",
      },
    ];

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Print Contract ${contract.contract_no}</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .page-break { page-break-after: always; }
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { 
              width: 100%; 
              height: 100%; 
              font-family: 'Arial', 'Helvetica', sans-serif; 
              background: white;
            }
            body { 
              padding: 20px; 
              color: #000; 
              font-size: 12px; 
              line-height: 1.6;
              background: white;
            }
            .container { 
              max-width: 8.5in;
              margin: 0 auto;
              background: white;
              padding: 40px;
              box-shadow: 0 0 5px rgba(0,0,0,0.1);
            }
            h1 { 
              font-size: 24px; 
              font-weight: bold; 
              text-align: center; 
              margin-bottom: 30px;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
            }
            h2 { 
              font-size: 14px; 
              font-weight: bold; 
              margin-top: 20px; 
              margin-bottom: 10px;
              background: #f0f0f0;
              padding: 8px 12px;
              border-left: 4px solid #333;
            }
            h3 { 
              font-size: 12px; 
              font-weight: bold; 
              margin-bottom: 5px;
            }
            p { 
              margin: 6px 0; 
              font-size: 12px;
            }
            .header-section {
              background: #f8f8f8;
              padding: 15px;
              border-radius: 4px;
              margin-bottom: 15px;
            }
            .header-row {
              margin-bottom: 8px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .header-row.full {
              grid-template-columns: 1fr;
            }
            .section-card {
              border: 1px solid #ddd;
              padding: 15px;
              margin-bottom: 15px;
              border-radius: 4px;
              background: #fafafa;
            }
            .item-box {
              border-left: 3px solid #333;
              padding: 12px;
              margin-bottom: 12px;
              background: white;
              border: 1px solid #ddd;
              border-radius: 3px;
            }
            .item-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 6px;
            }
            .item-row strong {
              min-width: 100px;
            }
            .financial-row {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 20px;
              padding: 8px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .financial-row:last-child {
              border-bottom: 2px solid #333;
              font-weight: bold;
              font-size: 13px;
            }
            .signature-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-top: 30px;
              page-break-inside: avoid;
            }
            .signature-box {
              border: 1px solid #333;
              padding: 15px;
              text-align: center;
            }
            .signature-line {
              height: 60px;
              border-bottom: 2px solid #333;
              margin-bottom: 8px;
            }
            .signature-label {
              font-size: 11px;
              font-weight: bold;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #ddd;
              font-size: 10px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background: #333;
              color: white;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>SERVICE AGREEMENT</h1>
            
            <div class="header-section">
              <div class="header-row full">
                <p><strong>Contract Number:</strong> ${contract.contract_no}</p>
              </div>
              <div class="header-row">
                <p><strong>Title:</strong> ${contract.title}</p>
                <p><strong>Status:</strong> ${contract.status}</p>
              </div>
              <div class="header-row full">
                <p><strong>Party Name:</strong> ${contract.party_name}</p>
              </div>
            </div>

            <h2>AGREEMENT DETAILS</h2>
            <div class="section-card">
              <p><strong>Template ID:</strong> ${contract.template_id}</p>
              <p><strong>Start Date:</strong> ${contract.start_date}</p>
              <p><strong>End Date:</strong> ${contract.end_date}</p>
              <p><strong>Renewal Date:</strong> ${contract.renewal_date || "N/A"}</p>
              <p><strong>Payment Terms:</strong> ${contract.payment_terms || "N/A"}</p>
            </div>

            <h2>PROVIDER & CUSTOMER INFORMATION</h2>
            <div class="section-card">
              <p><strong>Manager Name:</strong> Placeholder Manager</p>
              <p><strong>Manager Company:</strong> Placeholder Ltd.</p>
              <p><strong>Customer Name:</strong> ${contract.party_name}</p>
              <p><strong>Prepared By:</strong> Manager</p>
            </div>

            <h2>CONTRACT ITEMS</h2>
            ${contract.items
        .map(
          (item) => `
            <div class="item-box">
              <div class="item-row">
                <div><strong>Description:</strong></div>
                <div>${item.description}</div>
              </div>
              <div class="item-row">
                <div><strong>Quantity:</strong> ${item.qty}</div>
                <div><strong>Unit Rate:</strong> ${item.rate.toFixed(0)}</div>
              </div>
              <div class="item-row">
                <div><strong>Total Amount:</strong> ${item.total.toFixed(0)}</div>
              </div>
            </div>`
        )
        .join("")}

            <h2>FINANCIAL SUMMARY</h2>
            <div class="section-card">
              <div class="financial-row">
                <span><strong>Subtotal:</strong></span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <div class="financial-row">
                <span><strong>Discount:</strong></span>
                <span>${contract.discount.toFixed(0)}</span>
              </div>
              <div class="financial-row">
                <span><strong>GST (${contract.gst}%):</strong></span>
                <span>${taxAmount.toFixed(0)}</span>
              </div>
              <div class="financial-row">
                <span><strong>GRAND TOTAL:</strong></span>
                <span><strong>${grandTotal.toFixed(0)}</strong></span>
              </div>
            </div>

            <h2>ADVANCE PAYMENTS</h2>
            <div class="section-card">
              ${advancePayments
        .map(
          (payment) => `
              <div class="item-box">
                <div class="item-row">
                  <div><strong>${payment.label}:</strong></div>
                  <div>${payment.amount.toFixed(0)}</div>
                </div>
                <div class="item-row">
                  <div><strong>Status:</strong> ${payment.status}</div>
                </div>
              </div>`
        )
        .join("")}
            </div>

            <h2>PAYMENT SCHEDULE (AFTER COMPLETION)</h2>
            <div class="section-card">
              ${afterPayments
        .map(
          (payment) => `
              <div class="item-box">
                <div class="item-row">
                  <div><strong>${payment.label}:</strong></div>
                  <div>${payment.amount.toFixed(0)}</div>
                </div>
                <div class="item-row">
                  <div><strong>Status:</strong> ${payment.status}</div>
                </div>
              </div>`
        )
        .join("")}
            </div>

            <h2>AUTHORIZED SIGNATURES</h2>
            <div class="signature-section">
              <div class="signature-box">
                <h3>MANAGER / PROVIDER</h3>
                <div class="signature-line"></div>
                <div class="signature-label">
                  Signature: ________________<br>
                  Name: ________________<br>
                  Date: ________________
                </div>
              </div>
              <div class="signature-box">
                <h3>CUSTOMER / CLIENT</h3>
                <div class="signature-line"></div>
                <div class="signature-label">
                  Signature: ________________<br>
                  Name: ________________<br>
                  Date: ________________
                </div>
              </div>
            </div>

            <div class="footer">
              <p>This is an official contract document. Please retain a copy for your records.</p>
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Party</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.id}>
            <TableCell>
              {contract.contract_no}
            </TableCell>

            <TableCell>
              {contract.title}
            </TableCell>

            <TableCell>
              {contract.party_name}
            </TableCell>

            <TableCell>
              {contract.status}
            </TableCell>

            <TableCell>
              <Button
                size="sm"
                onClick={() =>
                  onEdit(contract)
                }
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="ml-2"
                onClick={() =>
                  handlePrint(contract)
                }
              >
                Print
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="ml-2"
                onClick={() =>
                  deleteContract(
                    contract.id!
                  )
                }
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
