// import hooks & React-tools
// ====================================
import { toast } from "react-hot-toast";

// import reducers from slice
// ====================================
import { setLoading, setUser } from "../../slices/profileSlice";

// import API-connector
// ====================================
import { apiConnector } from "../apiConnector";

// import API-call functions
// ====================================
import { logout } from "./authAPI";

// import Endpoints
// ====================================
import { profileEndpoints } from "../apis";
const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

// ============================================
// Get User Details ===========================
// ============================================
export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        // Start loader -----------
        dispatch(setLoading(true));
        try {
            // fire API-call -----------
            const response = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            // console.log("GET_USER_DETAILS API Response : ", response);

            // condition 0ver response ------------
            if (!response.data.success) {
                // throw error
                throw new Error(response.data.message);
            } else {
                // fetch profile-pic OR generate from dicebear
                const userImage = response.data.data.image
                    ? response.data.data.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

                // Update profile-pic
                dispatch(
                    setUser({
                        ...response.data.data,
                        image: userImage,
                    })
                );
            }
        } catch (error) {
            // dispatch logout ------------
            dispatch(logout(navigate));
            // log error -----------
            // console.log("GET_USER_DETAILS API error : ", error);
            // Error toast -----------
            toast.error("Could not get user details");
        }

        // Dismiss toast & clear loading ------------
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

// ============================================
// Get User-Enrolled Courses ==================
// ============================================
export async function getUserEnrolledCourses(token) {
    // Initialise toast-id -----------
    const toastId = toast.loading("Loading...");

    // Initialise courses-array ------------
    let courses = [];

    try {
        // API-call for fetching courses -------------
        // console.log("Calling API for enrolled courses");
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        // console.log("Enrolled Courses API called");

        // Condition over response ------------
        if (!response.data.success) {
            // throw error
            throw new Error(response.data.message);
        } else {
            // Update the courses-array (from response)
            courses = response.data.data;
        }
    } catch (error) {
        // Log error -----------
        // console.log("GET_USER_ENROLLED_COURSES_API API error : ", error);
        // Error toast -----------
        toast.error("Could not get Enrolled Courses");
    }

    // Dismiss toast-id ----------
    toast.dismiss(toastId);

    // return courses-array ----------
    return courses;
}

// ============================================
// Get Instructor-Data ========================
// ============================================
export async function getInstructorData(token) {
    // initiate toast & result-array
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        // fire API-call (using endpoint)
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        // console.log("GET_INSTRUCTOR_API response : ", response);

        // Update result
        result = response?.data?.courses;
    } catch (error) {
        // console.log("GET_INSTRUCTOR_API error : ", error);
        toast.error("Could not fetch Instructor data !");
    }

    // dismiss toast & return result
    toast.dismiss(toastId);
    return result;
}
