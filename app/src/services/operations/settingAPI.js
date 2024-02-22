// import hooks & React-tools
// ==================================
import { toast } from "react-hot-toast";

// import slices
// ==================================
import { setUser } from "../../slices/profileSlice";

// import API-call functions
// ==================================
import { logout } from "./authAPI";

// import API-connector
// ==================================
import { apiConnector } from "../apiConnector";

// import API-endpoints
// ==================================
import { settingsEndpoints } from "../apis";
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

// ===========================================
// Update Display Picture ====================
// ===========================================

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        // Initialise toast-id
        const toastId = toast.loading("Loading...");

        try {
            // API-call -------------
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );

            // Testing API-response -------------
            // console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE : ", response);

            // Condition over API-response --------------
            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // Success-toast
                toast.success("Display Picture Updated Successfully");
                dispatch(setUser(response.data.data));
            }
        } catch (error) {
            // Log error & Failure-toast
            // console.log("UPDATE_DISPLAY_PICTURE_API API ERROR : ", error);
            toast.error("Could Not Update Display Picture");
        }

        // Dismiss toast-id
        toast.dismiss(toastId);
    };
}

// ===========================================
// Update Profile ============================
// ===========================================

export function updateProfile(token, formData) {
    return async (dispatch) => {
        // Initialise toast-id
        const toastId = toast.loading("Loading...");

        try {
            // API call -------------
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            // console.log("UPDATE_PROFILE_API API RESPONSE : ", response);

            // Condition over API-response -------------
            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // Fetch DP ..or.. Make DP out of dicebear-API
                const userImage = response.data.updatedUserDetails.image
                    ? response.data.updatedUserDetails.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

                // Dispatch API-call function
                dispatch(
                    setUser({
                        ...response.data.updatedUserDetails,
                        image: userImage,
                    })
                );

                // Success toast
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            // Log error -----------
            // console.log("UPDATE_PROFILE_API API ERROR : ", error);
            // Error toast -----------
            toast.error("Could Not Update Profile");
        }

        // Dismiss toast-id -----------
        toast.dismiss(toastId);
    };
}

// ===========================================
// Change Password ===========================
// ===========================================
export async function changePassword(token, formData) {
    // Initiate toast-id -----------
    const toastId = toast.loading("Loading...");

    try {
        // API-call --------------
        const response = await apiConnector(
            "POST",
            CHANGE_PASSWORD_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        // console.log("CHANGE_PASSWORD_API API RESPONSE : ", response);

        // Condition over response --------------
        if (!response.data.success) {
            throw new Error(response.data.message);
        } else {
            // Success toast
            toast.success("Password Changed Successfully");
        }
    } catch (error) {
        // Log error
        // console.log("CHANGE_PASSWORD_API API ERROR : ", error);
        // Error toast
        toast.error("Error in changing Password !");
    }

    // Dismiss toast-id ------------
    toast.dismiss(toastId);
}

// ===========================================
// Delete Profile ============================
// ===========================================
export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        // Initiate toast-id --------------
        const toastId = toast.loading("Loading...");

        try {
            // API-call ---------------
            const response = await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            // console.log("DELETE_PROFILE_API API RESPONSE : ", response);

            // Condition over API-response --------------
            if (!response.data.success) {
                // Throw error
                throw new Error(response.data.message);
            } else {
                // Success toast
                toast.success("Profile Deleted Successfully");
                // Dispatch API-call function (logout)
                dispatch(logout(navigate));
            }
        } catch (error) {
            // Log error
            // console.log("DELETE_PROFILE_API API ERROR : ", error);
            // Error toast
            toast.error("Could Not Delete Profile");
        }

        // Dismiss toast-id -------------
        toast.dismiss(toastId);
    };
}
