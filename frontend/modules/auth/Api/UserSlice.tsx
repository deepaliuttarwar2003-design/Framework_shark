import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            // console.log("User info set in state and localStorage:", action.payload);
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;