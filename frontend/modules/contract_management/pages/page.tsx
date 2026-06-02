"use client";

import { useState } from "react";
import ContractTemplate from "../components/ContractTemplate";
import ContractManagementPage from "../components/ContractManagementPage";

export default function ContractPage() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <ContractManagementPage />;
  }

  return (
    <ContractTemplate
      openDashboard={() => setShowDashboard(true)}
    />
  );
}// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   FileText,
//   Plus,
//   Search,
//   Edit3,
//   Trash2,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   Briefcase,
//   X,
//   TrendingUp,
//   Printer
// } from "lucide-react";

// // --- TYPES ---
// interface Contract {
//   id: string;
//   title: string;
//   clientName: string;
//   value: number;
//   status: "Active" | "Pending" | "Expired";
//   startDate: string;
//   endDate: string;
// }

// // --- INITIAL DUMMY DATA ---
// const INITIAL_CONTRACTS: Contract[] = [
//   {
//     id: "CON-2026-001",
//     title: "Enterprise Cloud Migration",
//     clientName: "Apex Global Technologies",
//     value: 45000,
//     status: "Active",
//     startDate: "2026-01-15",
//     endDate: "2027-01-14",
//   },
//   {
//     id: "CON-2026-002",
//     title: "SaaS Subscription Agreement",
//     clientName: "Vertex Media Group",
//     value: 12000,
//     status: "Pending",
//     startDate: "2026-06-01",
//     endDate: "2026-12-01",
//   },
//   {
//     id: "CON-2026-003",
//     title: "Security Audit & Compliance",
//     clientName: "SharkWeb Analytics",
//     value: 28000,
//     status: "Active",
//     startDate: "2026-03-10",
//     endDate: "2026-09-10",
//   },
//   {
//     id: "CON-2026-004",
//     title: "Legacy Infrastructure Support",
//     clientName: "OmniCorp Retail",
//     value: 18500,
//     status: "Expired",
//     startDate: "2025-05-01",
//     endDate: "2026-05-01",
//   },
// ];

// export default function ContractManagementPage() {
//   // --- STATE ---
//   const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("All");

//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//   const [editingContract, setEditingContract] = useState<Contract | null>(null);

//   // Form states
//   const [formTitle, setFormTitle] = useState("");
//   const [formClient, setFormClient] = useState("");
//   const [formValue, setFormValue] = useState("");
//   const [formStatus, setFormStatus] = useState<"Active" | "Pending" | "Expired">("Pending");
//   const [formStartDate, setFormStartDate] = useState("");
//   const [formEndDate, setFormEndDate] = useState("");

//   // --- DYNAMIC DASHBOARD METRICS ---
//   const metrics = useMemo(() => {
//     const totalContracts = contracts.length;
//     const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
//     const activeCount = contracts.filter((c) => c.status === "Active").length;
//     const pendingCount = contracts.filter((c) => c.status === "Pending").length;

//     return { totalContracts, totalValue, activeCount, pendingCount };
//   }, [contracts]);

//   // --- FILTERED CONTRACTS ---
//   const filteredContracts = useMemo(() => {
//     return contracts.filter((contract) => {
//       const matchesSearch =
//         contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         contract.id.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesStatus = statusFilter === "All" || contract.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [contracts, searchQuery, statusFilter]);

//   // --- ACTIONS ---
//   const openCreateModal = () => {
//     setModalMode("create");
//     setEditingContract(null);
//     setFormTitle("");
//     setFormClient("");
//     setFormValue("");
//     setFormStatus("Pending");
//     setFormStartDate(new Date().toISOString().split("T")[0]);
//     setFormEndDate("");
//     setIsModalOpen(true);
//   };

//   const openEditModal = (contract: Contract) => {
//     setModalMode("edit");
//     setEditingContract(contract);
//     setFormTitle(contract.title);
//     setFormClient(contract.clientName);
//     setFormValue(contract.value.toString());
//     setFormStatus(contract.status);
//     setFormStartDate(contract.startDate);
//     setFormEndDate(contract.endDate);
//     setIsModalOpen(true);
//   };

//   const handleSaveContract = (e: React.FormEvent) => {
//     e.preventDefault();

//     const contractData: Contract = {
//       id: modalMode === "edit" && editingContract ? editingContract.id : `CON-2026-0${contracts.length + 1}`,
//       title: formTitle || "Untitled Contract",
//       clientName: formClient || "Unknown Client",
//       value: parseFloat(formValue) || 0,
//       status: formStatus,
//       startDate: formStartDate,
//       endDate: formEndDate || formStartDate,
//     };

//     if (modalMode === "edit" && editingContract) {
//       setContracts(contracts.map((c) => (c.id === editingContract.id ? contractData : c)));
//     } else {
//       setContracts([contractData, ...contracts]);
//     }

//     setIsModalOpen(false);
//   };

//   const handleDeleteContract = (id: string) => {
//     if (confirm("Are you sure you want to delete this contract?")) {
//       setContracts(contracts.filter((c) => c.id !== id));
//     }
//   };

//   // --- SINGLE POPUP PRINT LOGIC (iframe approach) ---
//   const handlePrintContract = (contract: Contract) => {
//     // 1. Check for existing frame or create a hidden frame
//     let printIframe = document.getElementById("contract-print-frame") as HTMLIFrameElement;
//     if (!printIframe) {
//       printIframe = document.createElement("iframe");
//       printIframe.id = "contract-print-frame";
//       printIframe.style.position = "fixed";
//       printIframe.style.right = "0";
//       printIframe.style.bottom = "0";
//       printIframe.style.width = "0";
//       printIframe.style.height = "0";
//       printIframe.style.border = "0";
//       document.body.appendChild(printIframe);
//     }

//     const doc = printIframe.contentWindow?.document || printIframe.contentDocument;
//     if (!doc) return;

//     // 2. Document Generation
//     doc.open();
//     doc.write(`
//       <html>
//         <head>
//           <title>Print Contract - ${contract.id}</title>
//           <style>
//             body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #334155; padding: 40px; line-height: 1.6; }
//             .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
//             .title { font-size: 24px; font-weight: bold; color: #0f172a; margin: 0; }
//             .meta-id { font-family: monospace; color: #64748b; font-size: 14px; margin-top: 4px; }
//             .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
//             .section { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; }
//             .label { font-size: 11px; font-weight: 600; text-transform: uppercase; tracking: 0.05em; color: #64748b; margin-bottom: 4px; }
//             .value { font-size: 15px; font-weight: 500; color: #1e293b; }
//             .value-highlight { font-size: 18px; font-weight: 700; color: #2563eb; }
//             .footer { margin-top: 60px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
//             .signatures { margin-top: 80px; display: flex; justify-content: space-between; }
//             .sig-line { width: 220px; border-top: 1px solid #64748b; text-align: center; padding-top: 8px; font-size: 12px; font-weight: 500; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1 class="title">${contract.title}</h1>
//             <div class="meta-id">Contract Document Reference: ${contract.id}</div>
//           </div>
          
//           <div class="grid">
//             <div class="section">
//               <div class="label">Client / Counterparty Organization</div>
//               <div class="value">${contract.clientName}</div>
//             </div>
//             <div class="section">
//               <div class="label">Total Contract Value</div>
//               <div class="value value-highlight">$${contract.value.toLocaleString()}</div>
//             </div>
//           </div>

//           <div class="grid">
//             <div class="section">
//               <div class="label">Execution / Start Date</div>
//               <div class="value">${contract.startDate}</div>
//             </div>
//             <div class="section">
//               <div class="label">Termination / End Date</div>
//               <div class="value">${contract.endDate}</div>
//             </div>
//           </div>

//           <div class="section">
//             <div class="label">Current Operational Status</div>
//             <div class="value" style="font-weight: 600;">${contract.status}</div>
//           </div>

//           <div class="signatures">
//             <div class="sig-line">Service Provider Signature</div>
//             <div class="sig-line">Client Acceptance Signature</div>
//           </div>

//           <div class="footer">
//             Generated via SharkWeb Contract Management Subsystem &bull; Confidential Document
//           </div>
//         </body>
//       </html>
//     `);
//     doc.close();

//     // 3. Spool exactly one print layout cleanly without multi-window loops
//     setTimeout(() => {
//       printIframe.contentWindow?.focus();
//       printIframe.contentWindow?.print();
//     }, 150);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 bg-slate-950 min-h-screen">

//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
//             <Briefcase className="h-8 w-8 text-blue-500" /> Contract
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             Manage legal agreements, track variations, and monitor financial commitments.
//           </p>
//         </div>
//         <button
//           onClick={openCreateModal}
//           className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow transition-colors gap-2"
//         >
//           <Plus className="h-4 w-4" /> New Contract
//         </button>
//       </div>

//       {/* LITE DASHBOARD / METRIC CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
//           <div className="space-y-1">
//             <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Value</p>
//             <p className="text-2xl font-semibold text-white">${metrics.totalValue.toLocaleString()}</p>
//           </div>
//           <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
//             <TrendingUp className="h-5 w-5" />
//           </div>
//         </div>

//         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
//           <div className="space-y-1">
//             <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Contracts</p>
//             <p className="text-2xl font-semibold text-white">{metrics.activeCount}</p>
//           </div>
//           <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
//             <CheckCircle className="h-5 w-5" />
//           </div>
//         </div>

//         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
//           <div className="space-y-1">
//             <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending Approval</p>
//             <p className="text-2xl font-semibold text-white">{metrics.pendingCount}</p>
//           </div>
//           <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
//             <Clock className="h-5 w-5" />
//           </div>
//         </div>

//         <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
//           <div className="space-y-1">
//             <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Agreements</p>
//             <p className="text-2xl font-semibold text-white">{metrics.totalContracts}</p>
//           </div>
//           <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
//             <FileText className="h-5 w-5" />
//           </div>
//         </div>
//       </div>

//       {/* FILTER & SEARCH BAR */}
//       <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
//         <div className="relative w-full sm:max-w-xs">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
//           <input
//             type="text"
//             placeholder="Search title, client, or ID..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//           />
//         </div>
//         <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
//           {["All", "Active", "Pending", "Expired"].map((status) => (
//             <button
//               key={status}
//               onClick={() => setStatusFilter(status)}
//               className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === status
//                 ? "bg-slate-800 text-white border border-slate-700"
//                 : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
//                 }`}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* DATA TABLE */}
//       <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 text-xs font-medium tracking-wider uppercase">
//                 <th className="p-4">Contract ID / Title</th>
//                 <th className="p-4">Client</th>
//                 <th className="p-4">Value</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Duration</th>
//                 <th className="p-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800 text-sm">
//               {filteredContracts.length > 0 ? (
//                 filteredContracts.map((contract) => (
//                   <tr key={contract.id} className="hover:bg-slate-800/30 transition-colors">
//                     <td className="p-4">
//                       <div className="font-medium text-white">{contract.title}</div>
//                       <div className="text-xs text-slate-500 font-mono mt-0.5">{contract.id}</div>
//                     </td>
//                     <td className="p-4 text-slate-300 font-medium">{contract.clientName}</td>
//                     <td className="p-4 text-slate-200 font-semibold">${contract.value.toLocaleString()}</td>
//                     <td className="p-4">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1 ${contract.status === "Active"
//                           ? "bg-emerald-500/10 text-emerald-400"
//                           : contract.status === "Pending"
//                             ? "bg-amber-500/10 text-amber-400"
//                             : "bg-rose-500/10 text-rose-400"
//                           }`}
//                       >
//                         <span className={`h-1.5 w-1.5 rounded-full current-color ${contract.status === "Active" ? "bg-emerald-400" : contract.status === "Pending" ? "bg-amber-400" : "bg-rose-400"
//                           }`} />
//                         {contract.status}
//                       </span>
//                     </td>
//                     <td className="p-4 text-xs text-slate-400">
//                       <div>Start: {contract.startDate}</div>
//                       <div className="mt-0.5">End: {contract.endDate}</div>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="inline-flex items-center justify-end gap-1">
//                         <button
//                           onClick={() => handlePrintContract(contract)}
//                           className="p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
//                           title="Print Contract Overview"
//                         >
//                           <Printer className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => openEditModal(contract)}
//                           className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
//                           title="Edit Contract"
//                         >
//                           <Edit3 className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteContract(contract.id)}
//                           className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
//                           title="Delete Contract"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="p-8 text-center text-slate-500">
//                     <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-600" />
//                     No contracts found matching your evaluation parameters.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* INTERACTIVE MODAL DIALOG (CREATE / EDIT) */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">

//             <div className="p-5 border-b border-slate-800 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-white">
//                 {modalMode === "edit" ? "Modify Contract Record" : "Register Agreement Profile"}
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <form onSubmit={handleSaveContract} className="p-5 space-y-4 flex-1">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-400">Contract Title</label>
//                 <input
//                   type="text"
//                   required
//                   value={formTitle}
//                   onChange={(e) => setFormTitle(e.target.value)}
//                   placeholder="e.g., Service Level Agreement"
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-400">Client / Counterparty Organization</label>
//                 <input
//                   type="text"
//                   required
//                   value={formClient}
//                   onChange={(e) => setFormClient(e.target.value)}
//                   placeholder="e.g., Enterprise Industries Inc."
//                   className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-400">Total Contract Value ($)</label>
//                   <input
//                     type="number"
//                     required
//                     value={formValue}
//                     onChange={(e) => setFormValue(e.target.value)}
//                     placeholder="5000"
//                     className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-400">Status State</label>
//                   <select
//                     value={formStatus}
//                     onChange={(e) => setFormStatus(e.target.value as any)}
//                     className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Active">Active</option>
//                     <option value="Expired">Expired</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-400">Execution Date</label>
//                   <input
//                     type="date"
//                     required
//                     value={formStartDate}
//                     onChange={(e) => setFormStartDate(e.target.value)}
//                     className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-400">Termination Date</label>
//                   <input
//                     type="date"
//                     required
//                     value={formEndDate}
//                     onChange={(e) => setFormEndDate(e.target.value)}
//                     className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors"
//                 >
//                   {modalMode === "edit" ? "Apply Changes" : "Commit Record"}
//                 </button>
//               </div>
//             </form>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }