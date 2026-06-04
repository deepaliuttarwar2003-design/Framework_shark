interface EstimatesState {
  list: Estimate[];
  isHydrated: boolean;
}

const initialState: EstimatesState = {
  list: [],
  isHydrated: false
};

const estimatesSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    hydrateEstimates: (state, action: PayloadAction<Estimate[]>) => {
      state.list = action.payload;
      state.isHydrated = true;
    },
    addEstimate: (state, action: PayloadAction<Omit<Estimate, 'id'>>) => {
      const newEstimate = { id: Date.now(), ...action.payload };
      state.list.unshift(newEstimate);
    },
    updateEstimate: (state, action: PayloadAction<Estimate>) => {
      const index = state.list.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteEstimate: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    }
  }
});

const { hydrateEstimates, addEstimate, updateEstimate, deleteEstimate } = estimatesSlice.actions;
