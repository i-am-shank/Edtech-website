import { createSlice } from "@reduxjs/toolkit";

// define initial state
const initialState = {
    // try to fetch token from local storage, as it isn't deleted even when browser is closed

    token: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null,
    // If found in local-storage, parse the json, else set token null.

    signupData: null,
    loading: false,
};

// create & export slice
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

// export all reducer-functions
export const { setToken, setSignupData, setLoading } = authSlice.actions;

// export the reducer
export default authSlice.reducer;
