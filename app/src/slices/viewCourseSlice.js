// import React-tools
// ===============================
import { createSlice } from "@reduxjs/toolkit";

// initial state
// ===============================
const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
};

// Course-slice
// ===============================
const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        // Course-data related -------------
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload;
        },
        // Lectures related -------------
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload;
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload;
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [
                ...state.completedLectures,
                action.payload,
            ];
        },
    },
});

// Export all reducers from actions
// ==============================
export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions;

// Export the reducer of slice
// ==============================
export default viewCourseSlice.reducer;
