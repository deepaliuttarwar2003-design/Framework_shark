// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { motion, AnimatePresence } from "framer-motion";


// // 1. REDUX TOOLKIT STATE SETUP 

// interface PurchaseItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   total: number;
// }

// interface PurchaseState {
//   supplierName: string;
//   companyName: string;
//   supplierContact: string;
//   supplierAddress: string;
//   gstin: string;
//   paymentStatus: string;
//   items: PurchaseItem[];
// }

// const initialState: PurchaseState = {
//   supplierName: "",
//   companyName: "",
//   supplierContact: "",
//   supplierAddress: "",
//   gstin: "",
//   paymentStatus: "Due",
//   items: [],
// };

// const purchaseSlice = createSlice({
//   name: "purchase",
//   initialState,
//   reducers: {
//     updateField: (state, action: PayloadAction<{ field: keyof PurchaseState; value: string }>) => {
//       (state[action.payload.field] as string) = action.payload.value;
//     },
//     addItem: (state, action: PayloadAction<PurchaseItem>) => {
//       state.items.push(action.payload);
//     },
//     removeItem: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     resetForm: () => initialState,
//   },
// });

// const { updateField, addItem, removeItem, resetForm } = purchaseSlice.actions;

// const localStore = configureStore({
//   reducer: {
//     purchase: purchaseSlice.reducer,
//   },
// });

// type RootState = ReturnType<typeof localStore.getState>;


// // 2. CORE WORKSPACE COMPONENT


// function PurchaseEntryForm() {
//   const dispatch = useDispatch();
  
//   // Connect cleanly to Redux State Slices
//   const formState = useSelector((state: RootState) => state.purchase);
//   const { supplierName, companyName, supplierContact, supplierAddress, gstin, paymentStatus, items } = formState;

//   // Local React State for Row Inputs
//   const [inputName, setInputName] = useState("");
//   const [inputQty, setInputQty] = useState<number>(1);
//   const [inputPrice, setInputPrice] = useState<string>("");

//   const handleFieldChange = (field: keyof PurchaseState, value: string) => {
//     dispatch(updateField({ field, value }));
//   };

//   const handleAddItemSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!inputName.trim()) {
//       alert("Please enter a valid product name.");
//       return;
//     }

//     const priceNum = parseFloat(inputPrice);
//     if (isNaN(priceNum) || priceNum < 0) {
//       alert("Please enter a valid price.");
//       return;
//     }

//     if (inputQty <= 0) {
//       alert("Quantity must be at least 1.");
//       return;
//     }

//     const newItem: PurchaseItem = {
//       id: crypto.randomUUID(),
//       name: inputName.trim(),
//       quantity: inputQty,
//       price: priceNum,
//       total: inputQty * priceNum,
//     };

//     dispatch(addItem(newItem));

//     // Reset clean states
//     setInputName("");
//     setInputQty(1);
//     setInputPrice("");
//   };

//   const grandTotal = items.reduce((acc, current) => acc + current.total, 0);

//   const handleSavePurchaseEntry = async () => {
//   if (!supplierName.trim() || !companyName.trim() || !supplierContact.trim()) {
//     alert("Please fill all required fields");
//     return;
//   }

//   if (items.length === 0) {
//     alert("Please add at least one item");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:8080/api/purchase", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formState),
//     });

//    const text = await response.text();

//    console.log("API Response:", text);
//     if (response.ok) {
//       alert("Purchase saved successfully");
//       dispatch(resetForm());
//     } else {
//       alert("Failed to save purchase");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Server Error");
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#f5f5f7] p-4 md:p-8 font-sans antialiased text-zinc-900 selection:bg-zinc-200">
//       <motion.div 
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="max-w-4xl mx-auto bg-white rounded-[24px] border border-zinc-200/80 shadow-xs overflow-hidden"
//       >
//         {/* Top Minimal Header Accent matching your image border line */}
//         <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center shadow-xs">
//           <Link href="/" className="text-sm font-medium opacity-90 hover:opacity-100 hover:underline transition-all">
//             ← Back to Dashboard
//           </Link>
//           <div className="flex items-center space-x-3">
//             <span className="text-xs bg-emerald-900/50 border border-emerald-600/30 px-2.5 py-1 rounded-full text-emerald-200 font-mono">POS Terminal</span>
//             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//           </div>
//         </div>

//         <div className="p-6 md:p-10 space-y-8">
//           {/* Header Block Typography */}
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Purchase Entry</h1>
//             <p className="text-sm text-zinc-500 font-medium mt-1">Configure parameters to generate database ledger entries.</p>
//           </div>

//           {/* Supplier Grid Input Layout Block */}
//           <div className="space-y-4">
//             <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b pb-1.5">Supplier Details</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide"><span className="text-rose-500 mr-1">*</span>Supplier Name</label>
//                 <input
//                   type="text"
//                   value={supplierName}
//                   onChange={(e) => handleFieldChange("supplierName", e.target.value)}
//                   placeholder="Enter supplier name"
//                   className="w-full h-10 border border-zinc-200 rounded-lg px-3 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all font-medium"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide"><span className="text-rose-500 mr-1">*</span>Company Name</label>
//                 <input
//                   type="text"
//                   value={companyName}
//                   onChange={(e) => handleFieldChange("companyName", e.target.value)}
//                   placeholder="Enter company name"
//                   className="w-full h-10 border border-zinc-200 rounded-lg px-3 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all font-medium"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide"><span className="text-rose-500 mr-1">*</span>Supplier Contact</label>
//                 <input
//                   type="text"
//                   value={supplierContact}
//                   onChange={(e) => handleFieldChange("supplierContact", e.target.value)}
//                   placeholder="Enter phone (for WhatsApp) or email"
//                   className="w-full h-10 border border-zinc-200 rounded-lg px-3 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all font-medium"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide">Supplier Address</label>
//                 <textarea
//                   value={supplierAddress}
//                   onChange={(e) => handleFieldChange("supplierAddress", e.target.value)}
//                   placeholder="Enter full address"
//                   className="w-full h-20 border border-zinc-200 rounded-lg p-3 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all font-medium resize-none"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide">GSTIN</label>
//                 <input
//                   type="text"
//                   value={gstin}
//                   onChange={(e) => handleFieldChange("gstin", e.target.value)}
//                   placeholder="Enter GSTIN"
//                   className="w-full h-10 border border-zinc-200 rounded-lg px-3 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all font-medium"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Dynamic Interactive Purchase Items Module Layout */}
//           <div className="space-y-4">
//             <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b pb-1.5">Purchase Items</h3>

//             {/* Top Row: File Input Block matching your screen placement */}
//             <div className="flex items-center space-x-3 text-sm bg-zinc-50 p-3 rounded-lg border border-zinc-150">
//               <span className="font-semibold text-zinc-600 text-xs uppercase tracking-wider">Upload Invoice:</span>
//               <input 
//                 type="file" 
//                 className="text-xs text-zinc-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 transition-colors cursor-pointer"
//               />
//             </div>

//             {/* Quick Line Item Append Row Bar Form */}
//             <form onSubmit={handleAddItemSubmit} className="grid grid-cols-12 gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200 items-center">
//               <div className="col-span-12 md:col-span-5">
//                 <input
//                   type="text"
//                   value={inputName}
//                   onChange={(e) => setInputName(e.target.value)}
//                   placeholder="Product Name"
//                   className="w-full h-9 border border-zinc-200 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 font-medium transition-all"
//                 />
//               </div>
//               <div className="col-span-4 md:col-span-2">
//                 <input
//                   type="number"
//                   value={inputQty}
//                   onChange={(e) => setInputQty(parseInt(e.target.value) || 0)}
//                   placeholder="Qty"
//                   min="1"
//                   className="w-full h-9 border border-zinc-200 rounded-md px-2 text-sm bg-white text-center focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 font-semibold transition-all"
//                 />
//               </div>
//               <div className="col-span-5 md:col-span-3">
//                 <input
//                   type="number"
//                   value={inputPrice}
//                   onChange={(e) => setInputPrice(e.target.value)}
//                   placeholder="Price (₹)"
//                   min="0"
//                   step="any"
//                   className="w-full h-9 border border-zinc-200 rounded-md px-2 text-sm bg-white text-center focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 font-semibold transition-all"
//                 />
//               </div>
//               <div className="col-span-3 md:col-span-2">
//                 <button
//                   type="submit"
//                   className="w-full h-9 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-md transition-colors shadow-xs active:scale-95 cursor-pointer"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </form>

//             {/* Shadcn UI Native Equivalent Table Block Frame Component Layout */}
//             <div className="border border-zinc-200/80 rounded-xl overflow-hidden bg-white shadow-xs">
//               <table className="w-full text-left border-collapse min-w-[500px]">
//                 <thead>
//                   <tr className="bg-zinc-50/70 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-400">
//                     <th className="p-3.5">Product</th>
//                     <th className="p-3.5 text-center">Quantity</th>
//                     <th className="p-3.5 text-center">Price</th>
//                     <th className="p-3.5 text-center">Total</th>
//                     <th className="p-3.5 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm divide-y divide-zinc-100 font-medium text-zinc-700">
//                   <AnimatePresence mode="popLayout">
//                     {items.length === 0 ? (
//                       <motion.tr 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         key="empty-state"
//                       >
//                         <td colSpan={5} className="p-12 text-center text-zinc-400">
//                           <div className="flex flex-col items-center justify-center space-y-2">
//                             <span className="text-3xl bg-zinc-50 w-12 h-12 rounded-full flex items-center justify-center border border-zinc-100 shadow-xs">📥</span>
//                             <span className="text-xs font-semibold tracking-tight text-zinc-400">No data available inside invoice</span>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ) : (
//                       items.map((item) => (
//                         <motion.tr 
//                           key={item.id}
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, x: -15 }}
//                           transition={{ type: "spring", stiffness: 500, damping: 35 }}
//                           className="hover:bg-zinc-50/40 transition-colors"
//                         >
//                           <td className="p-3.5 text-zinc-950 font-bold">{item.name}</td>
//                           <td className="p-3.5 text-center text-zinc-600 font-bold">{item.quantity}</td>
//                           <td className="p-3.5 text-center text-zinc-500">₹{item.price.toFixed(2)}</td>
//                           <td className="p-3.5 text-center font-extrabold text-emerald-800">₹{item.total.toFixed(2)}</td>
//                           <td className="p-3.5 text-center">
//                             <button
//                               type="button"
//                               onClick={() => dispatch(removeItem(item.id))}
//                               className="text-zinc-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold px-2 py-1 rounded transition-all cursor-pointer"
//                             >
//                               Remove
//                             </button>
//                           </td>
//                         </motion.tr>
//                       ))
//                     )}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="border-t border-zinc-100 my-4" />

//           {/* Pricing Calculation Columns and Action Dispatches */}
//           <div className="space-y-5">
//             <div className="flex justify-between items-center bg-zinc-50 border px-5 py-4 rounded-xl">
//               <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Total Amount Ledger:</span>
//               <span className="text-2xl font-black text-emerald-800 tracking-tight">₹{grandTotal.toFixed(2)}</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Upload Payment Receipt</label>
//                 <input 
//                   type="file" 
//                   className="text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 transition-colors cursor-pointer"
//                 />
//               </div>
              
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Payment Status</label>
//                 <select
//                   value={paymentStatus}
//                   onChange={(e) => handleFieldChange("paymentStatus", e.target.value)}
//                   className="w-full h-10 border border-zinc-200 rounded-lg px-3 text-sm bg-white font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 transition-all cursor-pointer"
//                 >
//                   <option value="Due">⚠️ Due</option>
//                   <option value="Paid">✅ Paid</option>
//                   <option value="Partial">🔄 Partial</option>
//                 </select>
//               </div>
//             </div>

//             {/* Global Dispatch Form Submission Control Trigger */}
//             <button
//               type="button"
//               onClick={handleSavePurchaseEntry}
//               className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-center tracking-wide transition-all shadow-xs active:scale-[0.99] mt-2 block cursor-pointer"
//             >
//               Save Purchase Entry
//             </button>
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function PurchaseEntryPage() {
//   return (
//     <Provider store={localStore}>
//       <PurchaseEntryForm />
//     </Provider>
//   );
// }