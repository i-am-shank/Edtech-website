// import hooks & React-tools
// ===================================
import { toast } from "react-hot-toast";

// import API-related modules
// ===================================
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
    // initialise result & toast -----------
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        // fire API-call -----------
        const response = await apiConnector(
            "POST",
            catalogData.CATALOGPAGEDATA_API,
            { categoryId: categoryId }
        );
        console.log("GET CATALOGUE response : ", response);

        // condition over API-response ----------
        if (!response?.data?.success) {
            throw new Error("Could not fetch Category-page data");
        } else {
            result = response?.data;
        }
    } catch (error) {
        console.log("CATALOG PAGE DATA API error : ", error);
        toast.error(error.message);
        result = error.response?.data;
    }

    // Dismiss toast & return result ------------
    toast.dismiss(toastId);
    return result;
};
