"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Provider, useDispatch, useSelector } from "react-redux";

import {
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});



interface SalesItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface SalesState {
  customerName: string;
  customerContact: string;
  customerAddress: string;
  customerGstin: string;
  paymentMode: string;
  paymentStatus: string;
  items: SalesItem[];
}

// ========================================================
// INITIAL STATE
// ========================================================

const initialState: SalesState = {
  customerName: "",
  customerContact: "",
  customerAddress: "",
  customerGstin: "",
  paymentMode: "Cash",
  paymentStatus: "Paid",
  items: [],
};

// ========================================================
// REDUX SLICE
// ========================================================

const salesSlice = createSlice({
  name: "sales",

  initialState,

  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof SalesState;
        value: string;
      }>
    ) => {
      (state[action.payload.field] as string) =
        action.payload.value;
    },

    addItem: (state, action: PayloadAction<SalesItem>) => {
      state.items.push(action.payload);
    },

    removeItem: (
      state,
      action: PayloadAction<string>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    resetForm: () => initialState,
  },
});

const {
  updateField,
  addItem,
  removeItem,
  resetForm,
} = salesSlice.actions;

// ========================================================
// RTK QUERY API
// ========================================================

export const salesApi = createApi({
  reducerPath: "salesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),

  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (salesData) => ({
        url: "/createSales",
        method: "POST",
        body: salesData,
      }),
    }),
  }),
});

const { useCreateSalesMutation } = salesApi;

// ========================================================
// STORE
// ========================================================

const localStore = configureStore({
  reducer: {
    sales: salesSlice.reducer,

    [salesApi.reducerPath]: salesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      salesApi.middleware
    ),
});

type RootState = ReturnType<
  typeof localStore.getState
>;

// ========================================================
// MAIN COMPONENT
// ========================================================

function SalesEntryForm() {
  const dispatch = useDispatch();

  const [createSales, { isLoading }] =
    useCreateSalesMutation();

  const formState = useSelector(
    (state: RootState) => state.sales
  );

  const {
    customerName,
    customerContact,
    customerAddress,
    customerGstin,
    paymentMode,
    paymentStatus,
    items,
  } = formState;

  const [inputName, setInputName] =
    useState("");

  const [inputQty, setInputQty] =
    useState<number>(1);

  const [inputPrice, setInputPrice] =
    useState<string>("");

  const handleFieldChange = (
    field: keyof SalesState,
    value: string
  ) => {
    dispatch(updateField({ field, value }));
  };

  const handleAddItemSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!inputName.trim()) {
      alert("Please enter product name.");
      return;
    }

    const priceNum = parseFloat(inputPrice);

    if (isNaN(priceNum) || priceNum < 0) {
      alert("Please enter valid price.");
      return;
    }

    if (inputQty <= 0) {
      alert("Quantity must be at least 1.");
      return;
    }
    
    const newItem: SalesItem = {
      id: crypto.randomUUID(),

      name: inputName.trim(),

      quantity: inputQty,

      price: priceNum,

      total: inputQty * priceNum,
    };

    dispatch(addItem(newItem));

    setInputName("");
    setInputQty(1);
    setInputPrice("");
  };

  const grandTotal = items.reduce(
    (acc, current) => acc + current.total,
    0
  );

  // ========================================================
  // SAVE SALES ENTRY
  // ========================================================

  const handleSaveSalesEntry = async () => {
    if (
      !customerName.trim() ||
      !customerContact.trim()
    ) {
      alert(
        "Please fill all required customer fields."
      );

      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item.");

      return;
    }

    try {
      const response = await createSales(
        formState
      ).unwrap();

      console.log("Sales Saved:", response);

      alert("Sales invoice saved successfully!");

      dispatch(resetForm());

    } catch (error) {
      console.error(error);

      alert("Failed to save sales entry.");
    }
  };

  return (
    <div
      className={`${inter.className} min-h-screen bg-[#f5f5f7] p-4 md:p-8 text-zinc-900`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="max-w-4xl mx-auto bg-white rounded-[24px] border border-zinc-200 overflow-hidden shadow-sm"
      >
        {/* HEADER */}

        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-sm hover:underline"
          >
            ← Back to Dashboard
          </Link>
       
          <span className="text-xs bg-emerald-900 px-3 py-1 rounded-full">
            Billing Module
          </span>
        </div>

        {/* CONTENT */}

        <div className="p-6 md:p-10 space-y-8">

          {/* TITLE */}

          <div>
            <h1 className="text-3xl font-extrabold">
              Sales Register Entry
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              Generate outbound invoices.
            </p>
          </div>

          {/* CUSTOMER DETAILS */}

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-zinc-400 border-b pb-2">
              Customer Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  handleFieldChange(
                    "customerName",
                    e.target.value
                  )
                }
                placeholder="Customer Name"
                className="w-full h-10 border rounded-lg px-3 text-sm"
              />

              <input
                type="text"
                value={customerContact}
                onChange={(e) =>
                  handleFieldChange(
                    "customerContact",
                    e.target.value
                  )
                }
                placeholder="Customer Contact"
                className="w-full h-10 border rounded-lg px-3 text-sm"
              />

              <textarea
                value={customerAddress}
                onChange={(e) =>
                  handleFieldChange(
                    "customerAddress",
                    e.target.value
                  )
                }
                placeholder="Customer Address"
                className="w-full h-20 border rounded-lg p-3 text-sm md:col-span-2"
              />

              <input
                type="text"
                value={customerGstin}
                onChange={(e) =>
                  handleFieldChange(
                    "customerGstin",
                    e.target.value
                  )
                }
                placeholder="Customer GSTIN"
                className="w-full h-10 border rounded-lg px-3 text-sm md:col-span-2"
              />
            </div>
          </div>

          {/* ADD ITEMS */}

          <div className="space-y-4">

            <h3 className="text-xs font-bold uppercase text-zinc-400 border-b pb-2">
              Products
            </h3>

            <form
              onSubmit={handleAddItemSubmit}
              className="grid grid-cols-12 gap-2 bg-zinc-50 p-3 rounded-xl border"
            >
              <input
                type="text"
                value={inputName}
                onChange={(e) =>
                  setInputName(e.target.value)
                }
                placeholder="Product Name"
                className="col-span-12 md:col-span-5 h-10 border rounded-lg px-3 text-sm"
              />

              <input
                type="number"
                value={inputQty}
                onChange={(e) =>
                  setInputQty(
                    parseInt(e.target.value) || 0
                  )
                }
                placeholder="Qty"
                className="col-span-4 md:col-span-2 h-10 border rounded-lg px-3 text-sm"
              />

              <input
                type="number"
                value={inputPrice}
                onChange={(e) =>
                  setInputPrice(e.target.value)
                }
                placeholder="Price"
                className="col-span-5 md:col-span-3 h-10 border rounded-lg px-3 text-sm"
              />

              <Button
                type="submit"
                className="col-span-3 md:col-span-2 h-10 bg-emerald-800 hover:bg-emerald-900"
              >
                Add
              </Button>
            </form>

            {/* TABLE */}

            <div className="border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-100 text-xs uppercase">
                    <th className="p-3">
                      Product
                    </th>

                    <th className="p-3">
                      Qty
                    </th>

                    <th className="p-3">
                      Price
                    </th>

                    <th className="p-3">
                      Total
                    </th>

                    <th className="p-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence>

                    {items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-10 text-center text-zinc-400"
                        >
                          No items added
                        </td>
                      </tr>
                    ) : (
                      items.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          className="border-t"
                        >
                          <td className="p-3">
                            {item.name}
                          </td>

                          <td className="p-3 text-center">
                            {item.quantity}
                          </td>

                          <td className="p-3 text-center">
                            ₹
                            {item.price.toFixed(
                              2
                            )}
                          </td>

                          <td className="p-3 text-center font-bold text-emerald-700">
                            ₹
                            {item.total.toFixed(
                              2
                            )}
                          </td>

                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  removeItem(
                                    item.id
                                  )
                                )
                              }
                              className="text-rose-600 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}

                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* TOTAL */}

          <div className="flex justify-between items-center bg-zinc-50 border rounded-xl px-5 py-4">
            <span className="text-sm font-bold">
              Grand Total
            </span>

            <span className="text-2xl font-black text-emerald-800">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>

          {/* PAYMENT */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              value={paymentMode}
              onChange={(e) =>
                handleFieldChange(
                  "paymentMode",
                  e.target.value
                )
              }
              className="w-full h-10 border rounded-lg px-3 text-sm"
            >
              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>
            </select>

            <select
              value={paymentStatus}
              onChange={(e) =>
                handleFieldChange(
                  "paymentStatus",
                  e.target.value
                )
              }
              className="w-full h-10 border rounded-lg px-3 text-sm"
            >
              <option value="Paid">
                Paid
              </option>

              <option value="Due">
                Due
              </option>

              <option value="Partial">
                Partial
              </option>
            </select>
          </div>

          {/* SAVE BUTTON */}

          <Button
            type="button"
            onClick={handleSaveSalesEntry}
            disabled={isLoading}
            className="relative z-10 w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl"
          >
            {isLoading
              ? "Saving..."
              : "Generate & Save Sales Invoice"}
          </Button>

        </div>
      </motion.div>
    </div>
  );
}

// ========================================================
// EXPORT PAGE
// ========================================================

export default function SalesEntryPage() {
  return (
    <Provider store={localStore}>
      <SalesEntryForm />
    </Provider>
  );
}