"use client";

import React, { useState, useMemo } from "react";
import {
    FileText,
    Building2,
    User,
    Briefcase,
    Calendar,
    Percent,
    Plus,
    Trash2,
    CheckCircle,
    Download,
    AlertCircle,
    LayoutDashboard
} from "lucide-react";

// --- STRUCTURAL INTERFACES ---
interface PaymentItem {
    id: string;
    description: string;
    qty: number;
    unit: string;
    rate: number;
}

export default function ContractTemplate({
  openDashboard,
}: ContractTemplateProps)  {

    const [scopeProjectName, setScopeProjectName] = useState("Lincfolio Web Application");
    const [scopeSystemUpdate, setScopeSystemUpdate] = useState("Lincfolio System Update");

    // Dynamic Payment Items Array direct from WhatsApp Image 2026-05-30 at 12.26.12.jpeg
    const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([
        { id: "1", description: "Affiliate System-Module: Basic", qty: 5, unit: "Each Module", rate: 2999.00 },
        { id: "2", description: "Affiliate System-Module: Advance", qty: 2, unit: "Each Module", rate: 8999.00 },
        { id: "3", description: "New Broker integration (Login System, Authentication and Updation of Total Portfolio, System Architecture and design).", qty: 1, unit: "Each Broker", rate: 30000.00 },
        { id: "4", description: "All Analysis integration.", qty: 1, unit: "Each Broker", rate: 10000.00 },
        { id: "5", description: "Custom Calendar Module: Advance", qty: 1, unit: "Each Module", rate: 8999.00 },
        { id: "6", description: "Strategy Module: Professional", qty: 1, unit: "Each Module", rate: 14999.00 },
        { id: "7", description: "Master Table, Algorithm & Architecture (For dual broker integration)", qty: 1, unit: "NAN", rate: 15700.00 },
        { id: "8", description: "Code migration from MERN to Go-lang", qty: 1, unit: "Per Framework", rate: 1.00 },
    ]);

    const [discountPercent, setDiscountPercent] = useState<number>(10.00);
    const [gstPercent, setGstPercent] = useState<number>(18.00);
    const [lessWorkAdjustment, setLessWorkAdjustment] = useState<number>(13677.84);

    const [advancePercent, setAdvancePercent] = useState<number>(80);
    const [balancePercent, setBalancePercent] = useState<number>(20);

    // --- LIVE MATH ENGINE ---
    const calculations = useMemo(() => {
        const subtotal = paymentItems.reduce((sum, item) => sum + (item.qty * item.rate), 0);
        const discountAmount = (subtotal * discountPercent) / 100;
        const gstAmount = ((subtotal - discountAmount) * gstPercent) / 100;
        const finalTotal = subtotal - discountAmount + gstAmount - lessWorkAdjustment;
        const advanceAmount = (finalTotal * advancePercent) / 100;
        const balanceAmount = (finalTotal * balancePercent) / 100;

        return { subtotal, discountAmount, gstAmount, finalTotal, advanceAmount, balanceAmount };
    }, [paymentItems, discountPercent, gstPercent, lessWorkAdjustment, advancePercent, balancePercent]);

    // --- HANDLERS FOR INTERACTIVE ACTION BUTTONS ---
    const updateItem = (id: string, key: keyof PaymentItem, value: any) => {
        setPaymentItems(prev => prev.map(item => item.id === id ? { ...item, [key]: value } : item));
    };

    const addNewItem = () => {
        const newItem: PaymentItem = {
            id: Date.now().toString(),
            description: "New Contractual Module Requirement",
            qty: 1,
            unit: "Each Module",
            rate: 0.00
        };
        setPaymentItems([...paymentItems, newItem]);
    };

    const removeItem = (id: string) => {
        setPaymentItems(prev => prev.filter(item => item.id !== id));
    };

    const triggerExport = () => {
        alert("Compiling metadata package... Document configuration updated successfully.");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* INTERACTIVE CONTROLS CONTAINER */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" /> Contract Template Configurator
                        </h2>
                        <p className="text-xs text-slate-400">Values modified live update the complete legal parameters below.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onOpenDashboard}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </button>

                        <button
                            onClick={triggerExport}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Finalize & Save Template
                        </button>
                    </div>
                </div>

                {/* LEGAL DOCUMENT PAPER SHEETS */}
                <div className="bg-white text-slate-900 shadow-2xl rounded-2xl p-6 sm:p-12 border border-slate-200 font-sans tracking-wide leading-relaxed">

                    {/* SERVICE PROVIDER SECTION */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest border-b pb-1">
                            <Building2 className="h-4 w-4" /> Service Provider Information
                        </div>
                        <div className="text-sm font-semibold text-slate-800">SharkWeb Analytics / LLP</div>
                        <textarea
                            value={providerAddress}
                            onChange={(e) => setProviderAddress(e.target.value)}
                            className="w-full text-xs text-slate-600 bg-slate-50 border border-transparent hover:border-slate-300 focus:border-blue-500 rounded p-2 focus:outline-none transition-colors"
                            rows={2}
                        />
                        <div className="text-[11px] text-slate-400 italic">(hereinafter referred to as the &quot;Service Provider&quot; / &quot;LLP&quot;)</div>
                    </div>

                    {/* CLIENT SECTION */}
                    <div className="space-y-3 mt-8">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest border-b pb-1">
                            <User className="h-4 w-4" /> Client Information
                        </div>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="font-bold text-base text-slate-900 bg-slate-50 border border-transparent hover:border-slate-300 focus:border-blue-500 rounded px-2 py-1 focus:outline-none w-full"
                        />
                        <textarea
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                            className="w-full text-xs text-slate-600 bg-slate-50 border border-transparent hover:border-slate-300 focus:border-blue-500 rounded p-2 focus:outline-none transition-colors"
                            rows={2}
                        />
                        <div className="text-[11px] text-slate-400 italic">(hereinafter referred to as the &quot;Client&quot;)</div>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mt-6 text-center bg-slate-50 p-2 rounded border border-dashed">
                        The Service Provider and the Client shall individually be referred to as a &quot;Party&quot; and collectively as the &quot;Parties.&quot;
                    </p>

                    {/* 1. SCOPE OF SERVICES */}
                    <div className="mt-8 space-y-3">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            1. Scope of Services
                        </h3>
                        <div className="text-xs text-slate-700">
                            The Service Provider agrees to provide <span className="font-semibold">web application development, enhancement, modification, maintenance, and system update services</span> for the
                            <input
                                type="text"
                                value={scopeProjectName}
                                onChange={(e) => setScopeProjectName(e.target.value)}
                                className="mx-1 font-semibold text-slate-900 bg-slate-100 rounded px-1 text-xs border border-transparent focus:border-blue-500 outline-none inline-inline"
                            />
                            (&quot;
                            <input
                                type="text"
                                value={scopeSystemUpdate}
                                onChange={(e) => setScopeSystemUpdate(e.target.value)}
                                className="font-semibold text-slate-900 bg-slate-100 rounded px-1 text-xs border border-transparent focus:border-blue-500 outline-none"
                            />
                            &quot;), as detailed in structural milestone proposals.
                        </div>
                        <ul className="list-disc list-inside text-xs text-slate-600 pl-2 space-y-1">
                            <li>Schedule A</li>
                            <li>Proposal / Estimate</li>
                            <li>CRM-generated scope document</li>
                        </ul>
                    </div>

                    {/* 2. TERM OF AGREEMENT */}
                    <div className="mt-8 space-y-2">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            2. Term of Agreement
                        </h3>
                        <p className="text-xs text-slate-700">
                            This Agreement shall commence on the <span className="font-semibold">Effective Date</span> and shall remain valid until completion of the Services, unless terminated earlier in accordance with this Agreement.
                        </p>
                    </div>

                    {/* 3. DYNAMIC INTERACTIVE PAYMENT TERMS TABLE */}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-slate-900">3. Payment Terms</h3>
                            <button
                                type="button"
                                onClick={addNewItem}
                                className="flex items-center gap-1 text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded transition-all"
                            >
                                <Plus className="h-3 w-3" /> Add Item Line
                            </button>
                        </div>

                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                                        <th className="p-2.5 w-1/2">Description</th>
                                        <th className="p-2.5 text-center w-12">Qty</th>
                                        <th className="p-2.5 w-28">Unit</th>
                                        <th className="p-2.5 text-right w-24">Rate (₹)</th>
                                        <th className="p-2.5 text-right w-28">Total (₹)</th>
                                        <th className="p-2.5 text-center w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-slate-800">
                                    {paymentItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-2">
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                    className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-slate-300 rounded p-1 resize-y outline-none font-medium"
                                                    rows={1}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value) || 0)}
                                                    className="w-full text-center bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-slate-300 rounded p-1 outline-none"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    value={item.unit}
                                                    onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                                                    className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-slate-300 rounded p-1 outline-none"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                                                    className="w-full text-right bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-slate-300 rounded p-1 outline-none font-mono font-medium"
                                                />
                                            </td>
                                            <td className="p-2 text-right font-mono font-semibold text-slate-900">
                                                ₹{(item.qty * item.rate).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="p-2 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* LIVE AGGREGATED BREAKDOWN MATRIX */}
                            <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-2 max-w-md ml-auto text-xs">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-mono font-semibold">₹{calculations.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="flex justify-between items-center text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <span>Discount (</span>
                                        <input
                                            type="number"
                                            value={discountPercent}
                                            onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                                            className="w-10 bg-white border border-slate-300 rounded px-1 text-center font-mono py-0.5 outline-none"
                                        />
                                        <span>%)</span>
                                    </div>
                                    <span className="font-mono font-semibold text-red-600">-₹{calculations.discountAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="flex justify-between items-center text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <span>GST (</span>
                                        <input
                                            type="number"
                                            value={gstPercent}
                                            onChange={(e) => setGstPercent(parseFloat(e.target.value) || 0)}
                                            className="w-10 bg-white border border-slate-300 rounded px-1 text-center font-mono py-0.5 outline-none"
                                        />
                                        <span>%)</span>
                                    </div>
                                    <span className="font-mono font-semibold">₹{calculations.gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="flex justify-between items-center text-slate-600 pb-2 border-b border-slate-200">
                                    <span>Structural Adjustment (Less Work Module)</span>
                                    <input
                                        type="number"
                                        value={lessWorkAdjustment}
                                        onChange={(e) => setLessWorkAdjustment(parseFloat(e.target.value) || 0)}
                                        className="w-24 bg-white border border-slate-300 rounded px-1 text-right font-mono py-0.5 outline-none text-red-600"
                                    />
                                </div>

                                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1">
                                    <span>Total Due</span>
                                    <span className="font-mono text-red-600 bg-red-50 border border-red-200/50 px-2 py-0.5 rounded">
                                        ₹{calculations.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3.1 ADVANCE & BALANCE RETAINER DISTRIBUTION */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                        <div className="space-y-1.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1">
                                <Percent className="h-3.5 w-3.5 text-blue-600" /> 3.1 Advance Payment Milestone
                            </div>
                            <p className="text-slate-600">
                                The Client shall pay
                                <input
                                    type="number"
                                    value={advancePercent}
                                    onChange={(e) => setAdvancePercent(parseInt(e.target.value) || 0)}
                                    className="w-10 text-center font-bold text-slate-900 mx-1 bg-white border rounded px-1"
                                />
                                % of the total invoice / estimate amount prior to commencement of framework updates.
                            </p>
                            <div className="font-mono font-bold text-blue-700 text-[13px] bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded inline-block">
                                Allocated Due: ₹{calculations.advanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> 3.2 Balance Retainer Terms
                            </div>
                            <p className="text-slate-600">
                                The remaining
                                <input
                                    type="number"
                                    value={balancePercent}
                                    onChange={(e) => setBalancePercent(parseInt(e.target.value) || 0)}
                                    className="w-10 text-center font-bold text-slate-900 mx-1 bg-white border rounded px-1"
                                />
                                % shall be payable immediately upon completion of milestones or system handoff.
                            </p>
                            <div className="font-mono font-bold text-emerald-700 text-[13px] bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded inline-block">
                                Allocated Due: ₹{calculations.balanceAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}