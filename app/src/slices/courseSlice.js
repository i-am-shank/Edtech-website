// import React-tools
// =================================
import { createSlice } from "@reduxjs/toolkit";

// initial state (states which are needed)
// =================================
const initialState = {
    // For managing course-creation form-steps :
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
};

// Slice creation (reducer definition)
// =================================
const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        // Reducers (for individual states) -----------
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload;
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
        // Reducers (for a functionality) ------------
        resetCourseState: (state) => {
            state.step = 1;
            state.course = null;
            state.editCourse = false;
        },
    },
});

// Export Reducers (as actions)
// ===============================
export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
} = courseSlice.actions;

// Export the Reducer (of slice)
// ===============================
export default courseSlice.reducer;
