package templates

const InvoiceTemplate = `
<html>
  <body style="font-family: Arial, sans-serif; color: #0f172a; background: #f8fafc; padding: 24px;">
    <div style="max-width: 860px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%); color: #ffffff; padding: 28px 32px;">
        <h1 style="margin: 0; font-size: 28px;">Professional Invoice</h1>
        <p style="margin: 8px 0 0; color: #cbd5e1;">Invoice template for Sharkweb billing and project services.</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top; width: 50%; padding-bottom: 18px;">
              <p style="margin: 0 0 6px; color: #64748b; text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px;">From</p>
              <h2 style="margin: 0 0 6px; font-size: 20px;">{{.CompanyName}}</h2>
              <p style="margin: 0; color: #334155;">{{.CompanyAddress}}</p>
              <p style="margin: 2px 0 0; color: #334155;">{{.CompanyEmail}}</p>
            </td>
            <td style="vertical-align: top; width: 50%; text-align: right; padding-bottom: 18px;">
              <p style="margin: 0 0 6px; color: #64748b; text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px;">Invoice</p>
              <h2 style="margin: 0; font-size: 22px;">{{.InvoiceNo}}</h2>
              <p style="margin: 6px 0 0; color: #33 4155;">Issued: {{.InvoiceDate}}</p>
              <p style="margin: 2px 0 0; color: #334155;">Due: {{.DueDate}}</p>
              <p style="margin: 6px 0 0; color: #047857; font-weight: bold;">Status: {{.Status}}</p>
            </td>
          </tr>
        </table>

        <div style="display: flex; gap: 18px; margin: 18px 0 28px;">
          <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;">
            <p style="margin: 0 0 6px; color: #64748b; text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px;">Bill To</p>
            <h3 style="margin: 0 0 6px; font-size: 18px;">{{.CustomerName}}</h3>
            <p style="margin: 0; color: #334155;">{{.CustomerEmail}}</p>
          </div>
          <div style="flex: 1; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 16px;">
            <p style="margin: 0 0 6px; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px;">Summary</p>
            <p style="margin: 0; color: #1e293b;">Subtotal: ₹{{.Subtotal}}</p>
            <p style="margin: 2px 0 0; color: #1e293b;">Tax: ₹{{.Tax}}</p>
            <p style="margin: 6px 0 0; color: #111827; font-weight: bold; font-size: 18px;">Total: ₹{{.TotalAmount}}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <thead style="background: #111827; color: #f8fafc; text-align: left;">
            <tr>
              <th style="padding: 10px 12px;">Item</th>
              <th style="padding: 10px 12px;">Qty</th>
              <th style="padding: 10px 12px;">Rate</th>
              <th style="padding: 10px 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            {{range .Items}}
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 12px; color: #111827;">{{.Description}}</td>
              <td style="padding: 10px 12px; color: #111827;">{{.Quantity}}</td>
              <td style="padding: 10px 12px; color: #111827;">₹{{.Rate}}</td>
              <td style="padding: 10px 12px; text-align: right; color: #111827;">₹{{.Amount}}</td>
            </tr>
            {{end}}
          </tbody>
        </table>

        <p style="margin: 18px 0 0; color: #475569;">Thank you for doing business with us. Please pay within 14 days.</p>
      </div>
    </div>
  </body>
</html>
`
