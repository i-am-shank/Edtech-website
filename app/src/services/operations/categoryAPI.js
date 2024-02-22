// import React-assets
// ===============================================
import { toast } from "react-hot-toast";

// import api-connector
// ===============================================
import { apiConnector } from "../apiConnector";

// import endpoints
// ===============================================
import { categories } from "../apis";
const {
    CREATE_CATEGORY_API,
    CATEGORIES_API,
    UPDATE_CATEGORY_API,
    DELETE_CATEGORY_API,
    GET_CATEGORY_API,
} = categories;

// ===========================================
// Create Category ---------------------------
// ===========================================
export const createCategory = async (data, token) => {
    // initialise toast -------------
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("CREATE_CATEGORY_API response : ", response);

        // Condition over response -------------
        if (!response?.data?.success) {
            throw new Error("Cannot create category !");
        } else {
            toast.success("A new category created !");
        }
    } catch (error) {
        // console.log("CREATE_CATEGORY_API error : ", error);
        toast.error("Category creation failed ! ,", error.message);
    }

    toast.dismiss(toastId);
    return;
};

// ===========================================
// Get Course Categories ---------------------
// ===========================================
export const fetchCourseCategories = async () => {
    // initialise categories-array ------------
    let categories = [];

    try {
        // fire API-call ------------
        const response = await apiConnector("GET", CATEGORIES_API);
        // console.log("CATEGORIES_API API response : ", response);

        // Condition over response ------------
        if (!response?.data?.success) {
            throw new Error("Could not fetch Course-Categories");
        } else {
            // Update categories-array
            categories = response?.data?.data;
        }
    } catch (error) {
        // Log error & Error-toast ------------
        // console.log("CATEGORIES_API API error : ", error);
        toast.error("Error in fetching Course-categories !");
    }

    // return categories-array ------------
    return categories;
};

// ===========================================
// Get Category ------------------------------
// ===========================================
export const getCategory = async (data, token) => {
    // initialise category & toast-id -----------
    let category = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -----------
        const response = await apiConnector("GET", GET_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("GET_CATEGORY_API API response : ", response);

        // // Condition over response ----------
        // if (!response?.data?.success) {
        //     throw new Error("Could not fetch Category !");
        // } else {
        //     toast.success("Category fetched successfully !");
        //     category = response?.data?.data;
        // }
    } catch (error) {
        // console.log("GET_CATEGORY_API API error : ", error);
        toast.error("Error in fetching the category !");
    }

    toast.dismiss(toastId);
    return category;
};

// ===========================================
// Update Course Category --------------------
// ===========================================
export const updateCategory = async (data, token) => {
    // initialise category & toast-id ------------
    let category = null;
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call ------------
        const response = await apiConnector("POST", UPDATE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("UPDATE_CATEGORY_API API response : ", response);

        // Condition over response -----------
        if (!response?.data?.success) {
            throw new Error("Could not update Category !");
        } else {
            // Success-toast & update-category ------------
            toast.success("Course Category Updated !");
            category = response?.data?.data;
        }
    } catch (error) {
        // Log-error & error-toast ------------
        // console.log("UPDATE_CATEGORY_API API error : ", error);
        toast.error("Error in Updating Category !");
    }

    // Dismiss toastId & return category -----------
    toast.dismiss(toastId);
    return category;
};

// ===========================================
// Delete Course Category --------------------
// ===========================================
export const deleteCategory = async (data, token) => {
    // initialise toast -------------
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector("POST", DELETE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("DELETE_CATEGORY_API response : ", response);

        // Condition over response -------------
        if (!response?.data?.success) {
            throw new Error("Cannot delete category !");
        } else {
            toast.success("Category delete successfully !");
        }
    } catch (error) {
        // console.log("DELETE_CATEGORY_API error : ", error);
        toast.error("Category deletion failed !");
    }

    toast.dismiss(toastId);
    return;
};
