// import React-tools
// ==============================
import { toast } from "react-hot-toast";

// import reducers (from slice)
// ==============================
import { updateCompletedLectures } from "../../slices/viewCourseSlice";

// import API-connector
// ==============================
import { apiConnector } from "../apiConnector";

// import API-Endpoints
// ==============================
import { courseEndpoints } from "../apis";
const {
    // Get --------------
    GET_ALL_COURSE_API,
    GET_COURSE_DETAILS_API,
    GET_COURSE_CATEGORIES_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    // CREATE -------------
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    CREATE_RATING_API,
    // UPDATE -------------
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    LECTURE_COMPLETION_API,
    // DELETE -------------
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
} = courseEndpoints;

// Writing API-call functions (in same order .. as imported)

// ((((((((((((((((((( GET )))))))))))))))))))

// ===========================================
// Get All Courses ---------------------------
// ===========================================
export const getAllCourses = async () => {
    // initialise toast-id & course-array -----------
    const toastId = toast.loading("Loading...");
    let courses = [];

    try {
        // fire API-call -----------
        const response = await apiConnector("GET", GET_ALL_COURSE_API);
        // condition over API-response -----------
        if (!response?.data?.success) {
            throw new Error("Could not fetch all courses");
        } else {
            courses = response?.data?.data;
        }
    } catch (error) {
        // Log error & show error-toast ----------
        console.log("GET_ALL_COURSE_API API error : ", error);
        toast.error(error.message);
    }

    // dismiss toast-id & return course-array -----------
    toast.dismiss(toastId);
    return courses;
};

// ===========================================
// Get Course Details ------------------------
// ===========================================
export const fetchCourseDetails = async (courseId) => {
    // initialise toast-id & courseDetails -----------
    const toastId = toast.loading("Loading...");
    let courseDetails = null;

    try {
        // fire API-call ------------
        const response = await apiConnector("POST", GET_COURSE_DETAILS_API, {
            courseId,
        });
        console.log("GET_COURSE_DETAILS_API API response : ", response);

        // Condition over API-response ------------
        if (!response.data.success) {
            throw new Error(response.data.message);
        } else {
            courseDetails = response.data;
        }
    } catch (error) {
        // Log error & update courseDetails -------------
        console.log("GET_COURSE_DETAILS_API API error : ", error);
        courseDetails = error.response.data;
    }

    // dismiss toast-id & return courseDetails ------------
    toast.dismiss(toastId);
    return courseDetails;
};

// ===========================================
// Get Course Categories ---------------------
// ===========================================
export const fetchCourseCategories = async () => {
    // initialise categories-array ------------
    let categories = [];

    try {
        // fire API-call ------------
        const response = await apiConnector("GET", GET_COURSE_CATEGORIES_API);
        console.log("GET_COURSE_CATEGORIES_API API response : ", response);

        // Condition over response ------------
        if (!response?.data?.success) {
            throw new Error("Could not fetch Course-Categories");
        } else {
            // Update categories-array
            categories = response?.data?.data;
        }
    } catch (error) {
        // Log error & Error-toast ------------
        console.log("GET_COURSE_CATEGORIES_API API error : ", error);
        toast.error(error.message);
    }

    // return categories-array ------------
    return categories;
};

// ===========================================
// Get an Instructor's all courses -----------
// ===========================================
export const fetchInstructorCourses = async (token) => {
    // initialise instructorCourses & toast-id ------------
    let instructorCourses = [];
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -----------
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("GET_ALL_INSTRUCTOR_COURSES_API API response : ", response);

        // Condition over API-response ------------
        if (!response?.data?.success) {
            throw new Error("Could not fetch an Instructor's courses");
        } else {
            // Update instructorCourses - array -------------
            instructorCourses = response?.data?.data;
        }
    } catch (error) {
        // Log error & Error-toast
        console.log("GET_ALL_INSTRUCTOR_COURSES API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return instructorCourses --------------
    toast.dismiss(toastId);
    return instructorCourses;
};

// ===========================================
// Get Full-details of a course --------------
// ===========================================
export const getFullDetailsOfCourse = async (courseId, token) => {
    // initialise toast-id & courseFullDetails -------------
    const toastId = toast.loading("...");
    let courseFullDetails = null;

    try {
        // fire API-call ------------
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log(
            "GET_FULL_COURSE_DETAILS_AUTHENTICATED API response : ",
            response
        );

        // Condition over response ------------
        if (!response.data.success) {
            throw new Error(response.data.message);
        } else {
            // Update courseFullDetails ------------
            courseFullDetails = response?.data?.data;
        }
    } catch (error) {
        // Log error & Update courseFullDetails -------------
        console.log(
            "GET_FULL_COURSE_DETAILS_AUTHENTICATED_API API error : ",
            error
        );
        courseFullDetails = error.response.data;
    }

    // Dismiss toast-id & return courseFullDetails -------------
    toast.dismiss(toastId);
    return courseFullDetails;
};

// (((((((((((((((((( CREATE ))))))))))))))))))

// ===========================================
// Add Course Details ------------------------
// ===========================================
export const addCourseDetails = async (data, token) => {
    // initialise courseDetails & toast-id -----------
    let courseDetails = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });

        // log response (for checking) ------------
        console.log("CREATE_COURSE_API API response : ", response);

        // Condition over response ------------
        if (!response?.data?.success) {
            throw new Error("Could not add Course Details");
        } else {
            // Success toast & Update courseDetails ------------
            toast.success("Course Details Added Successfully");
            courseDetails = response?.data?.data;
        }
    } catch (error) {
        // Log Error & Show Error-toast -------------
        console.log("CREATE_COURSE_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return courseDetails --------------
    toast.dismiss(toastId);
    return courseDetails;
};

// ===========================================
// Create a Section --------------------------
// ===========================================
export const createSection = async (data, token) => {
    // initialise section & toast-id ------------
    let section = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE_SECTION_API API response : ", response);

        // Condition over response -------------
        if (!response?.data?.success) {
            throw new Error("Could not Create Section");
        } else {
            // Success-toast & update section-variable ------------
            toast.success("Course Section Created");
            section = response?.data?.updatedCourseDetails;
        }
    } catch (error) {
        // Log error & show error-toast ------------
        console.log("CREATE_SECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return section ------------
    toast.dismiss(toastId);
    return section;
};

// ===========================================
// Create a Subsection -----------------------
// ===========================================
export const createSubSection = async (data, token) => {
    // initiate subSection & toast-id ------------
    let subSection = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            data,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("CREATE_SUBSECTION_API API response : ", response);

        // Condition over response ------------
        if (!response?.data?.success) {
            throw new Error("Could not Add Lecture");
        } else {
            // Success-toast & update subSection ------------
            toast.success("Lecture Added");
            subSection = response?.data?.data;
        }
    } catch (error) {
        // Log error & show error-toast ------------
        console.log("CREATE_SUBSECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return subSection -------------
    toast.dismiss(toastId);
    return subSection;
};

// ===========================================
// Creating a Rating -------------------------
// ===========================================
export const createRating = async (data, token) => {
    // initialise toast-id & success -----------
    let success = false;
    const toastId = toast.loading("Loading...");

    try {
        // fire API call -----------
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE_RATING_API API response : ", response);

        // Condition over API-respone -----------
        if (!response?.data?.success) {
            throw new Error("Could not Create Rating");
        } else {
            // Success-toast & Update success-variable -----------
            toast.success("Rating Created");
            success = true;
        }
    } catch (error) {
        // Update success-variable & log error & Error-toast ------------
        success = false;
        console.log("CREATE_RATING_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return success
    toast.dismiss(toastId);
    return success;
};

// ((((((((((((((((((( UPDATE )))))))))))))))))))

// ===========================================
// Edit Course Details -----------------------
// ===========================================
export const editCourseDetails = async (data, token) => {
    // initialise courseDetails & toast-id ------------
    let courseDetails = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ---------

        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        });
        console.log("EDIT_COURSE_API API response : ", response);

        // Condition on API-response -----------
        if (!response?.data?.success) {
            throw new Error("Could not update Course Details");
        } else {
            // Success-toast & update courseDetails -----------
            toast.success("Course Details Updated Successfully");
            courseDetails = response?.data?.data;
        }
    } catch (error) {
        // Log error & show error-toast -----------
        console.log("EDIT_COURSE_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return courseDetails ------------
    toast.dismiss(toastId);
    return courseDetails;
};

// ===========================================
// Update a Section --------------------------
// ===========================================
export const updateSection = async (data, token) => {
    // initialise section & toast-id -----------
    let section = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_SECTION_API API response : ", response);

        // Condition over response ------------
        if (!response?.data?.success) {
            throw new Error("Could not Update Section");
        } else {
            // Success-toast & update section ------------
            toast.success("Course Section Updated");
            section = response?.data?.data;
        }
    } catch (error) {
        // Log error & Error-toast ------------
        console.log("UPDATE_SECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toastId & return section ----------
    toast.dismiss(toastId);
    return section;
};

// ===========================================
// Update a Subsection -----------------------
// ===========================================
export const updateSubSection = async (data, token) => {
    // initialise subSection & toast-id -------------
    let subSection = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector(
            "POST",
            UPDATE_SUBSECTION_API,
            data,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("UPDATE_SUBSECTION_API API response : ", response);

        // Condition over response -------------
        if (!response?.data?.success) {
            throw new Error("Could not Update Sub-section");
        } else {
            // Success-toast & update subSection-var -----------
            toast.success("Lecture Updated");
            subSection = response?.data?.data;
        }
    } catch (error) {
        // Log error & Show error-toast -------------
        console.log("UPDATE_SUBSECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return subSection ------------
    toast.dismiss(toastId);
    return subSection;
};

// ===========================================
// Mark a lecture as complete ----------------
// ===========================================
export const markLectureAsCompleted = async (data, token) => {
    // initialise result & toast-id --------------
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector(
            "POST",
            LECTURE_COMPLETION_API,
            data,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("LECTURE_COMPLETION_API API response : ", response);

        // Condition over response --------------
        if (!response.data.message) {
            throw new Error(response.data.error);
        } else {
            // Success-toast & Update result --------------
            toast.success("Lecture Completed");
            result = true;
        }
    } catch (error) {
        // Log error & Error-toast & update result-variable --------------
        console.log("LECTURE_COMPLETION_API API error : ", error);
        toast.error(error.message);
        result = false;
    }

    // Dismiss toast-id & return result -----------------
    toast.dismiss(toastId);
    return result;
};

// ((((((((((((((((((( DELETE )))))))))))))))))))

// ===========================================
// Delete a Section --------------------------
// ===========================================
export const deleteSection = async (data, token) => {
    // initialise result-variable & toast-id -------------
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE_SECTION_API API response : ", response);

        // Condition on response ------------
        if (!response?.data?.success) {
            throw new Error("Could not Delete Section");
        } else {
            // Success-toast & update result -----------
            toast.success("Course Section Deleted");
            result = response?.data?.data;
        }
    } catch (error) {
        // Log error & show error-toast ------------
        console.log("DELETE_SECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return result -----------
    toast.dismiss(toastId);
    return result;
};

// ===========================================
// Delete a SubSection -----------------------
// ===========================================
export const deleteSubSection = async (data, token) => {
    // initialise result & toast-id -----------
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector(
            "POST",
            DELETE_SUBSECTION_API,
            data,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("DELETE_SUBSECTION_API API response : ", response);

        // Condition over API-response -----------
        if (!response?.data?.success) {
            throw new Error("Could not Delete SubSection");
        } else {
            // Success-toast & update result-variable -----------
            toast.success("Lecture Deleted");
            result = response?.data?.data;
        }
    } catch (error) {
        // Log error & Error-toast -----------
        console.log("DELETE_SUBSECTION_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id & return result -----------
    toast.dismiss(toastId);
    return result;
};

// ===========================================
// Delete a Course ---------------------------
// ===========================================
export const deleteCourse = async (data, token) => {
    // initialise toast-id -----------
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE_COURSE_API API response : ", response);

        // Condition over API-response ------------
        if (!response?.data?.success) {
            throw new Error("Could not delete Course");
        } else {
            // Success toast -----------
            toast.success("Course Deleted");
        }
    } catch (error) {
        // Log error & Error-toast -----------
        console.log("DELETE_COURSE_API API error : ", error);
        toast.error(error.message);
    }

    // Dismiss toast-id -----------
    toast.dismiss(toastId);
};
