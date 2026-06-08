import { ServiceAgreement } from "@/modules/types/contract";

interface Props {
    agreement: ServiceAgreement;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function calculateSubtotal(items: Array<{ total: number }>) {
    return items.reduce((sum, item) => sum + item.total, 0);
}

function calculateDiscount(subtotal: number, discountPercent: number) {
    return Math.round((subtotal * discountPercent) / 100);
}

function calculateGst(amount: number, gstPercent: number) {
    return Math.round((amount * gstPercent) / 100);
}

export default function ContractAgreement({ agreement }: Props) {
    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl">
            <div className="space-y-4">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    Agreement Template
                </span>
                <h1 className="text-4xl font-semibold text-zinc-950">
                    Service Agreement
                </h1>
                <p className="max-w-3xl text-base leading-7 text-zinc-600">
                    This agreement page contains all agreement details, advance payment schedule, after-payment table, and digital signature placeholders for the manager and customer.
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Agreement Details</h2>
                    <dl className="mt-4 space-y-3 text-sm text-zinc-700">
                        <div>
                            <dt className="font-medium">Agreement ID</dt>
                            <dd>{agreement.contractId}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Agreement Date</dt>
                            <dd>{agreement.agreementDate}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Project Name</dt>
                            <dd>{agreement.projectName}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Status</dt>
                            <dd>{agreement.status}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Prepared By</dt>
                            <dd>{agreement.preparedBy}</dd>
                        </div>
                    </dl>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Timeline</h2>
                    <dl className="mt-4 space-y-3 text-sm text-zinc-700">
                        <div>
                            <dt className="font-medium">Start Date</dt>
                            <dd>{agreement.startDate}</dd>
                        </div>
                        <div>
                            <dt className="font-medium">End Date</dt>
                            <dd>{agreement.endDate}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="mt-10 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Provider / Manager</h2>
                    <p className="mt-4 text-sm text-zinc-700">Name: {agreement.providerName}</p>
                    <p className="text-sm text-zinc-700">Address: {agreement.providerAddress}</p>
                    <p className="text-sm text-zinc-700">Representative: {agreement.providerSignatory}</p>
                    <p className="text-sm text-zinc-700">Signature Date: {agreement.providerSignatureDate}</p>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Customer</h2>
                    <p className="mt-4 text-sm text-zinc-700">Name: {agreement.clientName}</p>
                    <p className="text-sm text-zinc-700">Company: {agreement.clientCompany}</p>
                    <p className="text-sm text-zinc-700">Address: {agreement.clientAddress}</p>
                    <p className="text-sm text-zinc-700">Representative: {agreement.clientSignatory}</p>
                    <p className="text-sm text-zinc-700">Signature Date: {agreement.clientSignatureDate}</p>
                </div>
            </div>

            {agreement.content ? (
                <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">Agreement Notes</h2>
                    <div
                        className="mt-4 text-sm leading-7 text-zinc-700 space-y-4"
                        dangerouslySetInnerHTML={{
                            __html: agreement.content,
                        }}
                    />
                </div>
            ) : null}

            <section className="mt-10">
                <h2 className="text-2xl font-semibold text-zinc-950">Financial Details</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                    Use the following payment tables to review the advance payment and the payment schedule after work completion.
                </p>

                <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200">
                    <table className="min-w-full divide-y divide-zinc-200 text-sm">
                        <thead className="bg-zinc-50 text-left text-zinc-600">
                            <tr>
                                <th className="px-4 py-3">Item</th>
                                <th className="px-4 py-3">Unit</th>
                                <th className="px-4 py-3">Qty</th>
                                <th className="px-4 py-3">Rate</th>
                                <th className="px-4 py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white">
                            {agreement.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3 text-zinc-700">{item.description}</td>
                                    <td className="px-4 py-3 text-zinc-700">{item.unit}</td>
                                    <td className="px-4 py-3 text-zinc-700">{item.qty}</td>
                                    <td className="px-4 py-3 text-zinc-700">{formatCurrency(item.rate)}</td>
                                    <td className="px-4 py-3 text-zinc-700">{formatCurrency(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900">Amount Summary</h3>
                    <div className="mt-4 space-y-3 text-sm text-zinc-700">
                        <div>
                            <p className="font-medium">Subtotal</p>
                            <p>{formatCurrency(calculateSubtotal(agreement.items))}</p>
                        </div>
                        <div>
                            <p className="font-medium">Discount</p>
                            <p>{agreement.discountPercent}% ({formatCurrency(calculateDiscount(calculateSubtotal(agreement.items), agreement.discountPercent))})</p>
                        </div>
                        <div>
                            <p className="font-medium">GST</p>
                            <p>{agreement.gstPercent}% ({formatCurrency(calculateGst(calculateSubtotal(agreement.items) - calculateDiscount(calculateSubtotal(agreement.items), agreement.discountPercent), agreement.gstPercent))})</p>
                        </div>
                        <div>
                            <p className="font-medium">Adjustment</p>
                            <p>{formatCurrency(agreement.deductionAdjustment)}</p>
                        </div>
                    </div>
                    <div className="mt-6 rounded-3xl bg-white p-4 text-sm text-zinc-900 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Total Amount</span>
                            <span className="font-semibold">
                                {formatCurrency(
                                    calculateSubtotal(agreement.items)
                                    - calculateDiscount(calculateSubtotal(agreement.items), agreement.discountPercent)
                                    + calculateGst(calculateSubtotal(agreement.items) - calculateDiscount(calculateSubtotal(agreement.items), agreement.discountPercent), agreement.gstPercent)
                                    + agreement.deductionAdjustment
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-10 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h3 className="text-xl font-semibold text-zinc-900">Advance Payment</h3>
                    <div className="mt-4 space-y-3 text-sm text-zinc-700">
                        {agreement.advancePayments?.map((payment) => (
                            <div key={payment.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="font-medium">{payment.label}</p>
                                <p>Amount: {formatCurrency(payment.amount)}</p>
                                <p>Due Date: {payment.dueDate}</p>
                                <p>Status: {payment.status}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h3 className="text-xl font-semibold text-zinc-900">After Payment Schedule</h3>
                    <div className="mt-4 space-y-3 text-sm text-zinc-700">
                        {agreement.afterPayments?.map((payment) => (
                            <div key={payment.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="font-medium">{payment.label}</p>
                                <p>Amount: {formatCurrency(payment.amount)}</p>
                                <p>Due Date: {payment.dueDate}</p>
                                <p>Status: {payment.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-10 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900">Manager Digital Sign</h3>
                    <div className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
                        <div className="mb-4 h-24 border-b border-zinc-300" />
                        <p>Manager Signature Placeholder</p>
                        <p className="mt-2 text-zinc-400">Signed by manager or provider representative</p>
                    </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900">Customer Digital Sign</h3>
                    <div className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
                        <div className="mb-4 h-24 border-b border-zinc-300" />
                        <p>Customer Signature Placeholder</p>
                        <p className="mt-2 text-zinc-400">Signed by customer or client representative</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
