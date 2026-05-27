import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
    search: string;
    status: string;
}

const initialState: ProjectState = {
    search: "",
    status: "All",
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
});

export const { setSearch, setStatus } = projectSlice.actions;

export default projectSlice.reducer;