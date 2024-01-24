import { createSlice } from "@reduxjs/toolkit";

// define slice
const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    loading: false,
};

// create & export slice
const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

// export reducer-functions
export const { setUser, setLoading } = profileSlice.actions;

// export the reducer
export default profileSlice.reducer;
