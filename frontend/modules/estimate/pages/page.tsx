"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plus, Trash2, Edit2, X, AlertCircle, Check, Printer, Image as ImageIcon } from 'lucide-react';

import {
  useGetEstimatesQuery,
  useCreateEstimateMutation,
  useUpdateEstimateMutation,
  useDeleteEstimateMutation,
} from "../slices/estimateApiSlices";
import { apiSlice } from "@/core/features/apiSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
interface ReceiptItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  rate: number;
}

interface Estimate {
  id: number;
  date: string;
  status: 'Draft' | 'Pending' | 'Approved';
  logoUrl: string;
  providerName: string;
  providerAddress: string;
  clientName: string;
  clientAddress: string;
  scopeOfServices: string;
  advancePaymentPercent: number;
  balancePaymentPercent: number;
  items: ReceiptItem[];
  discountPercentage: number;
  gstPercentage: number;
  adjustmentLabel: string;
  adjustmentAmount: number;
}

const INITIAL_ESTIMATES: Estimate[] = [
  {
    id: 1,
    date: "2026-05-30",
    status: "Approved",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
    providerName: "Framework_shark LLP",
    providerAddress: "Plot No. 7, Raghbir Chamber, Beside Hotel Angeethi, Jalna Road, Seven Hill, Aurangabad - 431001, Maharashtra, India.",
    clientName: "Raj Suradkar",
    clientAddress: "FLAT NO 8, SARA GARDEN, N-2, CIDCO, CHHATRAPATI SAMBHAJI NAGAR, (AURANGABAD), MAHARASHTRA, 431001, India.",
    scopeOfServices: "Web application development, enhancement, modification, maintenance, and system update services for the Lincfolio Web Application ('Lincfolio System Update')",
    advancePaymentPercent: 80,
    balancePaymentPercent: 20,
    discountPercentage: 10,
    gstPercentage: 18,
    adjustmentLabel: "Because of less work in some of the module",
    adjustmentAmount: -13677.84,
    items: [
      { id: "1", description: "Affiliate System - Module: Basic", qty: 5, unit: "Each Module", rate: 2999 },
      { id: "2", description: "Affiliate System - Module: Advance", qty: 2, unit: "Each Module", rate: 8999 },
      { id: "3", description: "New Broker integration (Login System, Authentication and Updation of Total Portfolio, System Architecture and design).", qty: 1, unit: "Each Broker", rate: 30000 },
      { id: "4", description: "All Analysis integration.", qty: 1, unit: "Each Broker", rate: 10000 },
      { id: "5", description: "Custom Calendar Module: Advance", qty: 1, unit: "Each Module", rate: 8999 },
      { id: "6", description: "Strategy Module: Professional", qty: 1, unit: "Each Module", rate: 14999 },
      { id: "7", description: "Master Table, Algorithm & Architecture (For dual broker integration)", qty: 1, unit: "NAN", rate: 15700 },
      { id: "8", description: "Code migration from MERN to Go-lang", qty: 1, unit: "Per Framework", rate: 1 }
    ]
  }
];

// ==========================================
// 2. REDUX TOOLKIT SETUP (SLICE & MUTATIONS)


// Redux middleware to persist state to LocalStorage automatically on any mutation




// ==========================================

// Internal presentation dashboard component connected to Redux Context
function EstimatesDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [createEstimate] = useCreateEstimateMutation();
  const { data: estimatesData = [], isLoading } = useGetEstimatesQuery({});
  console.log(estimatesData?.data);

  const [updateEstimateApi] =
    useUpdateEstimateMutation();

  const [deleteEstimateApi] =
    useDeleteEstimateMutation();
  // const estimates = useSelector((state: RootState) => state.estimates.list);
  // const isHydrated = useSelector((state: RootState) => state.estimates.isHydrated);

  const [notification, setNotification] = useState<string | null>(null);
  const [activePrintTarget, setActivePrintTarget] = useState<Estimate | null>(null);

  // Modal State Triggers
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentEstimateId, setCurrentEstimateId] = useState<number | null>(null);

  // Bound Form Element State Parameters
  const [formDate, setFormDate] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'Draft' | 'Pending' | 'Approved'>('Draft');
  const [formLogoUrl, setFormLogoUrl] = useState<string>('');
  const [formProviderName, setFormProviderName] = useState<string>('');
  const [formProviderAddress, setFormProviderAddress] = useState<string>('');
  const [formClientName, setFormClientName] = useState<string>('');
  const [formClientAddress, setFormClientAddress] = useState<string>('');
  const [formScope, setFormScope] = useState<string>('');
  const [formAdvancePercent, setFormAdvancePercent] = useState<number>(80);
  const [formBalancePercent, setFormBalancePercent] = useState<number>(20);
  const [formItems, setFormItems] = useState<ReceiptItem[]>([]);
  const [formDiscount, setFormDiscount] = useState<number>(10);
  const [formGst, setFormGst] = useState<number>(18);
  const [formAdjustmentLabel, setFormAdjustmentLabel] = useState<string>('');
  const [formAdjustment, setFormAdjustment] = useState<number>(0);

  // Inject Google Font dynamically on client load safely
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  useEffect(() => {
    if (estimatesData?.data) {
      setEstimates(estimatesData.data);
    }
  }, [estimatesData]);
  //   if (cachedData) {
  //     try {
  //       dispatch(hydrateEstimates(JSON.parse(cachedData)));
  //     } catch (err) {
  //       dispatch(hydrateEstimates(INITIAL_ESTIMATES));
  //     }
  //   } else {
  //     dispatch(hydrateEstimates(INITIAL_ESTIMATES));
  //   }
  // }, [dispatch]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const calculateTotals = (est: Estimate) => {
    const subtotal = est.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const discountAmount = subtotal * (est.discountPercentage / 100);
    const postDiscount = subtotal - discountAmount;
    const gstAmount = postDiscount * (est.gstPercentage / 100);
    const finalTotal = postDiscount + gstAmount + est.adjustmentAmount;
    return { subtotal, discountAmount, gstAmount, finalTotal };
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentEstimateId(null);
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormStatus('Draft');
    setFormLogoUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60');
    setFormProviderName('Framework_shark LLP');
    setFormProviderAddress('Plot No. 7, Raghbir Chamber, Beside Hotel Angeethi, Jalna Road, Seven Hill, Aurangabad - 431001, Maharashtra, India.');
    setFormClientName('');
    setFormClientAddress('');
    setFormScope('Web application development, enhancement, modification, maintenance, and system update services for the Lincfolio Web Application');
    setFormAdvancePercent(80);
    setFormBalancePercent(20);
    setFormDiscount(10);
    setFormGst(18);
    setFormAdjustmentLabel('Because of less work in some of the module');
    setFormAdjustment(0);
    setFormItems([{ id: Date.now().toString(), description: '', qty: 1, unit: 'Each Module', rate: 0 }]);
    setIsModalOpen(true);
  };

  const openEditModal = (est: Estimate) => {
    setModalMode('edit');
    setCurrentEstimateId(est.id);
    setFormDate(est.date);
    setFormStatus(est.status);
    setFormLogoUrl(est.logoUrl || '');
    setFormProviderName(est.providerName);
    setFormProviderAddress(est.providerAddress);
    setFormClientName(est.clientName);
    setFormClientAddress(est.clientAddress);
    setFormScope(est.scopeOfServices);
    setFormAdvancePercent(est.advancePaymentPercent);
    setFormBalancePercent(est.balancePaymentPercent);
    setFormDiscount(est.discountPercentage);
    setFormGst(est.gstPercentage);
    setFormAdjustmentLabel(est.adjustmentLabel);
    setFormAdjustment(est.adjustmentAmount);
    setFormItems(est.items.map(item => ({ ...item })));
    setIsModalOpen(true);
  };

  const handleItemFieldChange = (index: number, field: keyof ReceiptItem, value: any) => {
    const updated = [...formItems];
    updated[index] = { ...updated[index], [field]: value };
    setFormItems(updated);
  };

  const handleSaveEstimate = async () => {
    if (!formClientName.trim()) {
      alert("Please specify a Client Name.");
      return;
    }

    const payloadData = {
      date: formDate?.includes("T")
        ? formDate.split("T")[0]
        : formDate,
      status: formStatus,
      logoUrl: formLogoUrl,
      providerName: formProviderName,
      providerAddress: formProviderAddress,
      clientName: formClientName,
      clientAddress: formClientAddress,
      scopeOfServices: formScope,
      advancePaymentPercent: Number(formAdvancePercent),
      balancePaymentPercent: Number(formBalancePercent),
      discountPercentage: Number(formDiscount),
      gstPercentage: Number(formGst),
      adjustmentLabel: formAdjustmentLabel,
      adjustmentAmount: Number(formAdjustment),
      items: formItems
    };

    try {
      if (modalMode === "add") {
        const newEstimate = await createEstimate(payloadData).unwrap();


        showToast("Estimate created successfully!");
      } else {
        const updatedEstimate = {
          id: currentEstimateId!,
          ...payloadData,
        };

        await updateEstimateApi(updatedEstimate).unwrap();


        showToast("Estimate updated successfully!");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.log("Full Error:", error);
      console.log("Error Data:", error?.data);
      console.log("Error Status:", error?.status);

      alert(
        error?.data?.message ||
        error?.data?.error ||
        "Something went wrong"
      );
    }
  };


  const handlePrint = (est: Estimate) => {
    setActivePrintTarget(est);
    setTimeout(() => {
      window.print();
    }, 120);
  };

  const liveModalTotals = useMemo(() => {
    const subtotal = formItems.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const discountAmount = subtotal * (formDiscount / 100);
    const postDiscount = subtotal - discountAmount;
    const gstAmount = postDiscount * (formGst / 100);
    const finalTotal = postDiscount + gstAmount + Number(formAdjustment);
    return { subtotal, discountAmount, gstAmount, finalTotal };
  }, [formItems, formDiscount, formGst, formAdjustment]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-800 antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <style jsx global>{`
        body {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        @media print {
          body * {
            visibility: hidden;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
          }
          #print-document-target, #print-document-target * {
            visibility: visible;
          }
          #print-document-target {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 24px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Screen Workspace Container */}
      <div className="no-print">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Estimates Ledger</h1>
            <p className="text-slate-500 mt-1">Redux State Toolkit Management Architecture.</p>
          </div>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors">
            <Plus size={18} /> Add New Estimate
          </button>
        </div>

        {notification && (
          <div className="mb-4 p-3 bg-slate-900 text-white text-sm rounded-lg shadow-md flex items-center gap-2">
            <AlertCircle size={16} className="text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Dashboard Grid Data Logs View */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Company / Client Identity</th>
                <th className="py-4 px-6">Service Provider</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Grand Total</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {estimates.map((est) => {
                const calc = calculateTotals(est);
                return (
                  <tr key={est.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        {est.logoUrl && (
                          <img src={est.logoUrl} alt="Logo" className="w-8 h-8 rounded object-cover bg-slate-100 border" />
                        )}
                        <span>{est.clientName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{est.providerName}</td>
                    <td className="py-4 px-6 text-slate-500">{est.date}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">₹{calc.finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1">
                        <button title="Print Document" onClick={() => handlePrint(est)} className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"><Printer size={16} /></button>
                        <button title="Edit Configuration Parameters" onClick={() => openEditModal(est)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"><Edit2 size={16} /></button>
                        <button title="Drop Record"
                          onClick={async () => {
                            try {
                              console.log("Deleting ID:", est.id);

                              const response = await deleteEstimateApi(String(est.id)).unwrap();

                              console.log("Delete Response:", response);

                              dispatch(deleteEstimate(est.id));

                              showToast("Estimate deleted successfully!");
                            } catch (error: any) {
                              console.log("DELETE ERROR:", error);
                              console.log("STATUS:", error?.status);
                              console.log("DATA:", error?.data);
                              console.log("ORIGINAL:", error?.originalStatus);

                              alert(
                                error?.data?.message ||
                                error?.data ||
                                "Delete API failed"
                              );
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>

                      </div>
                    </td>
                  </tr>
                );
              })}
              {estimates.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 italic bg-slate-50/50">
                    No active state entities managed. Click "Add New Estimate" to write parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CONFIGURATOR MODAL POPUP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{modalMode === 'add' ? 'Create New Redux Managed Estimate' : 'Mutate Action State Config'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Realtime deep isolated parameter definitions</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 bg-white rounded-lg border"><X size={18} /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">

              {/* Row: Date, Status, Logo URL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Effective Date</label>
                  <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Agreement Status</label>
                  <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Brand Corporate Logo URL</label>
                  <div className="relative">
                    <input type="text" value={formLogoUrl} onChange={(e) => setFormLogoUrl(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-xs" placeholder="https://..." />
                    <ImageIcon className="absolute left-3 top-2.5 text-slate-400" size={14} />
                  </div>
                </div>
              </div>

              {/* Row: Provider Credentials */}
              <div className="space-y-3 p-4 border border-slate-200 rounded-xl">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Service Provider Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs text-slate-500 mb-1">Provider Name</label>
                    <input type="text" value={formProviderName} onChange={(e) => setFormProviderName(e.target.value)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">Registered Address</label>
                    <input type="text" value={formProviderAddress} onChange={(e) => setFormProviderAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />
                  </div>
                </div>
              </div>

              {/* Row: Client Identity */}
              <div className="space-y-3 p-4 border border-slate-200 rounded-xl">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs text-slate-500 mb-1">Client Name</label>
                    <Input value={formClientName} onChange={(e) => setFormClientName(e.target.value)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">Client Full Address</label>
                    <input type="text" value={formClientAddress} onChange={(e) => setFormClientAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />
                  </div>
                </div>
              </div>

              {/* Scope & Payment Rules */}
              <div className="space-y-3 p-4 border border-slate-200 rounded-xl">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Scope & Payment Rules</h3>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Scope of Services Summary Text</label>
                  <Textarea value={formScope} onChange={(e) => setFormScope(e.target.value)} className="w-full px-3 py-2 border rounded-lg outline-none text-xs bg-white" />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">3.1 Advance Payment Amount (%)</label>
                    <input type="number" value={formAdvancePercent} onChange={(e) => setFormAdvancePercent(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">3.2 Balance Payment Amount (%)</label>
                    <input type="number" value={formBalancePercent} onChange={(e) => setFormBalancePercent(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg outline-none bg-white" />
                  </div>
                </div>
              </div>

              {/* Payment Table Rows */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">3. Payment Terms Table</h3>
                  <button type="button" onClick={() => setFormItems([...formItems, { id: Date.now().toString(), description: '', qty: 1, unit: 'Each Module', rate: 0 }])} className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-1 px-2 rounded font-medium transition-colors">
                    + Add Row
                  </button>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4 w-16 text-center">Qty</th>
                        <th className="py-2 px-4 w-32">Unit</th>
                        <th className="py-2 px-4 w-28">Rate (₹)</th>
                        <th className="py-2 px-4 w-28">Total (₹)</th>
                        <th className="py-2 px-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {formItems.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-2"><input type="text" value={item.description} onChange={(e) => handleItemFieldChange(index, 'description', e.target.value)} className="w-full px-2 py-1 border rounded text-xs outline-none bg-white" /></td>
                          <td className="p-2"><input type="number" value={item.qty} onChange={(e) => handleItemFieldChange(index, 'qty', parseInt(e.target.value) || 0)} className="w-full px-1 py-1 border rounded text-xs text-center outline-none bg-white" /></td>
                          <td className="p-2"><input type="text" value={item.unit} onChange={(e) => handleItemFieldChange(index, 'unit', e.target.value)} className="w-full px-2 py-1 border rounded text-xs outline-none bg-white" /></td>
                          <td className="p-2"><input type="number" value={item.rate} onChange={(e) => handleItemFieldChange(index, 'rate', parseFloat(e.target.value) || 0)} className="w-full px-2 py-1 border rounded text-xs outline-none font-medium bg-white" /></td>
                          <td className="p-2 font-semibold text-slate-700">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                          <td className="p-2 text-center"><button type="button" onClick={() => setFormItems(formItems.filter((_, i) => i !== index))} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Calculations Block */}
              <div className="flex flex-col md:flex-row justify-between gap-6 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 max-w-md w-full">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Dynamic Multipliers</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-500 mb-0.5">Discount (%)</label>
                      <input type="number" value={formDiscount} onChange={(e) => setFormDiscount(parseFloat(e.target.value) || 0)} className="w-full px-2 py-1 border rounded text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-0.5">GST (%)</label>
                      <input type="number" value={formGst} onChange={(e) => setFormGst(parseFloat(e.target.value) || 0)} className="w-full px-2 py-1 border rounded text-xs bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-0.5">Adjustment Reason Label</label>
                    <input type="text" value={formAdjustmentLabel} onChange={(e) => setFormAdjustmentLabel(e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-0.5">Adjustment Value (₹)</label>
                    <input type="number" value={formAdjustment} onChange={(e) => setFormAdjustment(parseFloat(e.target.value) || 0)} className="w-full px-2 py-1 border rounded text-xs bg-white" />
                  </div>
                </div>

                <div className="w-full md:w-80 space-y-2 text-xs font-medium text-slate-600 self-end">
                  <div className="flex justify-between"><span>Subtotal</span><span className="text-slate-900 font-semibold">₹{liveModalTotals.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                  <div className="flex justify-between text-red-600"><span>Discount ({formDiscount}%)</span><span>-₹{liveModalTotals.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                  <div className="flex justify-between"><span>GST ({formGst}%)</span><span className="text-slate-900">₹{liveModalTotals.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                  {Number(formAdjustment) !== 0 && (
                    <div className="flex justify-between text-amber-800 bg-amber-50 p-1 rounded italic">
                      <span className="max-w-[180px] truncate" title={formAdjustmentLabel}>{formAdjustmentLabel || "Adjustment"}</span>
                      <span>₹{Number(formAdjustment).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-sm font-bold text-slate-900"><span>Total</span><span className="text-indigo-600 text-base">₹{liveModalTotals.finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 rounded-b-2xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-xs bg-white text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={handleSaveEstimate} className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-lg shadow flex items-center gap-1">
                <Check size={14} /> {modalMode === 'add' ? 'Generate Contract' : 'Save Details'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- FORMAL PRINT LAYOUT CONTAINER --- */}
      {activePrintTarget && (
        <div id="print-document-target" className="hidden print:block max-w-4xl mx-auto bg-white text-sm leading-relaxed text-slate-900">

          {/* Top Logo Element */}
          {activePrintTarget.logoUrl && (
            <div className="w-full flex justify-start mb-4">
              <img
                src={activePrintTarget.logoUrl}
                alt="Corporate brand identity logo"
                className="max-h-20 max-w-[200px] object-contain"
              />
            </div>
          )}

          {/* Service Provider Profile Info Block */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{activePrintTarget.providerName}</h1>
            <p className="text-xs text-slate-700 mt-1 max-w-xl">{activePrintTarget.providerAddress}</p>
            <div className="mt-4 flex justify-between items-end text-xs text-slate-600">
              <span><strong>Document Ref ID:</strong> EST-2026-00{activePrintTarget.id}</span>
              <span><strong>Effective Date:</strong> {activePrintTarget.date}</span>
            </div>
          </div>

          <div className="mb-6 bg-slate-50 p-3 border border-slate-200 rounded">
            <h2 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">CLIENT ASSIGNMENT PROFILE</h2>
            <p className="font-bold text-base text-slate-900">{activePrintTarget.clientName}</p>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl">{activePrintTarget.clientAddress}</p>
          </div>

          <p className="text-xs italic text-slate-600 mb-6">The Service Provider and the Client shall individually be referred to as a "Party" and collectively as the "Parties."</p>

          <div className="mb-6">
            <h3 className="font-bold border-b border-slate-300 pb-0.5 uppercase tracking-wide text-xs text-slate-900">1. Scope of Services</h3>
            <p className="text-xs text-slate-800 mt-2">
              The Service Provider agrees to provide specialized execution covering: <span className="font-semibold">{activePrintTarget.scopeOfServices}</span>.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold border-b border-slate-300 pb-0.5 uppercase tracking-wide text-xs text-slate-900">2. Term of Agreement</h3>
            <p className="text-xs text-slate-800 mt-2">
              This Agreement shall commence on the specified <strong>Effective Date ({activePrintTarget.date})</strong> and shall remain active until explicit deliverable criteria parameters are achieved unless dissolved beforehand by alternative written request provisions.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold border-b border-slate-300 pb-2 mb-2 uppercase tracking-wide text-xs text-slate-900">3. Payment Milestone Breakdown</h3>
            <table className="w-full text-left text-xs border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <th className="p-2 border border-slate-300">Description</th>
                  <th className="p-2 border border-slate-300 w-12 text-center">Qty</th>
                  <th className="p-2 border border-slate-300 w-24">Unit</th>
                  <th className="p-2 border border-slate-300 w-24 text-right">Rate (₹)</th>
                  <th className="p-2 border border-slate-300 w-28 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {activePrintTarget.items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="p-2 border border-slate-300 text-slate-800">{item.description}</td>
                    <td className="p-2 border border-slate-300 text-center">{item.qty}</td>
                    <td className="p-2 border border-slate-300 text-slate-600">{item.unit}</td>
                    <td className="p-2 border border-slate-300 text-right">₹{item.rate.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-300 text-right font-medium text-slate-900">₹{(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-72 text-xs space-y-1.5 font-medium text-slate-700">
                {(() => {
                  const totals = calculateTotals(activePrintTarget);
                  return (
                    <>
                      <div className="flex justify-between"><span>Subtotal:</span><span className="text-slate-900 font-semibold">₹{totals.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                      <div className="flex justify-between"><span>Discount ({activePrintTarget.discountPercentage}%):</span><span>-₹{totals.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                      <div className="flex justify-between"><span>GST ({activePrintTarget.gstPercentage}%):</span><span className="text-slate-900">₹{totals.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                      {activePrintTarget.adjustmentAmount !== 0 && (
                        <div className="flex justify-between text-slate-900 italic bg-slate-50 p-1 border border-dashed border-slate-300">
                          <span className="max-w-[160px] truncate">{activePrintTarget.adjustmentLabel}</span>
                          <span>₹{activePrintTarget.adjustmentAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-slate-900 pt-1.5 font-bold text-slate-900 text-sm">
                        <span>Total Document Value:</span>
                        <span>₹{totals.finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-3">
            <div>
              <h4 className="font-bold text-xs text-slate-900">3.1 Advance Payment</h4>
              <p className="text-xs text-slate-700">The Client agrees to process an upfront advance payment of <strong>{activePrintTarget.advancePaymentPercent}%</strong> of the calculated value before active development begins.</p>
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">3.2 Balance Payment</h4>
              <p className="text-xs text-gray-700">The remaining balance valuation equivalent to <strong>{activePrintTarget.balancePaymentPercent}%</strong> shall be disbursed post-evaluation on formal final product release approval metrics.</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-12 pt-8">
            <div className="border-t border-slate-900 text-center pt-2">
              <p className="font-bold text-xs text-slate-900">Authorized Signature</p>
              <p className="text-xs text-slate-500 mt-0.5">{activePrintTarget.providerName}</p>
            </div>
            <div className="border-t border-slate-900 text-center pt-2">
              <p className="font-bold text-xs text-slate-900">Accepted & Agreed By</p>
              <p className="text-xs text-slate-500 mt-0.5">{activePrintTarget.clientName}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default EstimatesDashboard;