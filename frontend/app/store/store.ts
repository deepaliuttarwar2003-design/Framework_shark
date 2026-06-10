import { configureStore } from '@reduxjs/toolkit';
import { invoiceApiSlice } from '../invoice/api/invoiceApi';

export const store = configureStore({
  reducer: {
    [invoiceApiSlice.reducerPath]: invoiceApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoiceApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;