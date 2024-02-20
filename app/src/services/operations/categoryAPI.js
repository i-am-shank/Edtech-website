// import React-assets
// ===============================================
import { toast } from "react-hot-toast";

// import api-connector
// ===============================================
import { apiConnector } from "../apiConnector";

// import endpoints
// ===============================================
import { categories } from "../apis";
const { CREATE_CATEGORY_API } = categories;

export const createCategory = async (data, token) => {
    // initialise toast -------------
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -------------
        const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE_CATEGORY_API response : ", response);

        // Condition over response -------------
        if (!response?.data?.success) {
            throw new Error("Cannot create category !");
        } else {
            toast.success("A new category created !");
        }
    } catch (error) {
        console.log("CREATE_CATEGORY_API error : ", error);
        toast.error("Category creation failed ! ,", error.message);
    }

    toast.dismiss(toastId);
    return;
};
