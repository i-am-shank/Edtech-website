// import components
// ====================================================
import "./EditCategory.css";
import IconBtn from "../../../common/IconBtn";

// import hooks & React-tools
// ====================================================
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// import API-call functions
// ====================================================
import {
    updateCategory,
    fetchCourseCategories,
} from "../../../../services/operations/categoryAPI";
import ErrorPage from "../../../../pages/ErrorPage";

export default function EditCategory() {
    // intialise hooks
    // ===================
    const { catalogName } = useParams();

    // states
    // ===================
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [categoryFound, setCategoryFound] = useState(false);

    // form-variables
    // ===================
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    // Render handlers
    // ===================
    useEffect(() => {
        // function definition -----------
        const fetchCategory = async () => {
            // start loading
            setLoading(true);

            // fire API-call (to find category) ----------
            // const response = await getCategory(categoryId, token);
            const response = await fetchCourseCategories();
            // console.log("Fetch category response : ", response);

            if (response) {
                // fetch category -----------
                const matchingCategories = response?.data?.data?.filter(
                    (ct) =>
                        ct.name.split(" ").join("-").toLowerCase() ===
                        catalogName
                );
                if (matchingCategories.length > 0) {
                    setCategoryFound(true);

                    const currentCategory = matchingCategories[0];
                    setCategory(currentCategory);

                    // Update name & description in form-fields ------------
                    setValue("categoryName", currentCategory.name);
                    setValue(
                        "categoryDescription",
                        currentCategory.description
                    );
                } else {
                    setCategoryFound(false);
                }
            }

            // stop loading
            setLoading(false);
        };

        // function call -----------
        fetchCategory();
    }, []);

    // Handlers
    // ===================
    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.categoryName !== category.name ||
            currentValues.categoryDescription !== category.description
        ) {
            // Atleast one of the values are changed
            return true;
        }
        return false;
    };

    const onSubmit = async (data) => {
        if (isFormUpdated()) {
            const currentValues = getValues();

            // console.log("EditCategory onSubmit-data : ", data);

            // Prepare form-data ----------
            const formData = new FormData();

            // Append all the fields (which are changed) -----------
            if (currentValues.categoryName !== category.name) {
                formData["name"] = data.categoryName;
                // console.log("Appending name");
                // formData.append("name", data.categoryName);
            }
            if (currentValues.categoryDescription !== category.description) {
                // console.log("Appending desc");
                formData["description"] = data.categoryDescription;
                // formData.append("description", data.categoryDescription);
            }

            // console.log("form-data : ", formData);

            // start loading ----------
            setLoading(true);

            // fire API-call ----------
            const response = await updateCategory(
                {
                    categoryId: category._id,
                    updatedData: formData,
                },
                token
            );

            // Condition over API-response ----------
            if (response) {
            }
            // console.log("updateCategory response : ", response);

            // end loading ----------
            setLoading(false);
        } else {
            // No changes in form
            toast.error("Form isn't updated. Please update something");
            return;
        }
    };

    // Handle loading case -------------
    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    // Handle no category found case -----------
    if (!categoryFound) {
        return (
            <div className="edit-category-no-category-found">
                <h1 className="no-category-found-heading">
                    The category you are looking for either doesn't exists, or
                    is updated by the admin to some other name.
                </h1>
                <ErrorPage />
            </div>
        );
    }

    return (
        <div className="edit-category">
            {/* Header */}
            {/* ===================== */}
            <div className="edit-category-header">
                {/* Heading ----------- */}
                <h1 className="edit-category-heading">Edit Category</h1>

                {/* Back btn ----------- */}
                <Link to="/dashboard/categories-list">Back</Link>
            </div>

            {/* Form */}
            {/* ===================== */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="edit-category-form"
            >
                {/* Category Name */}
                {/* ==================== */}
                <div className="edit-category-field">
                    {/* Label ----------- */}
                    <label
                        htmlFor="categoryName"
                        className="edit-category-label"
                    >
                        Category Name<sup className="compulsory-icon">*</sup>
                    </label>

                    {/* Input ----------- */}
                    <input
                        type="text"
                        id="categoryName"
                        placeholder="Enter Category Name"
                        {...register("categoryName", { required: true })}
                        className="edit-category-name-input edit-category-input"
                    />

                    {/* Error handling ------------ */}
                    {errors.categoryName && (
                        <span className="edit-category-name-error">
                            Category Name is required**
                        </span>
                    )}
                </div>

                {/* Category Description */}
                {/* ==================== */}
                <div className="edit-category-field">
                    {/* Label ------------ */}
                    <label
                        htmlFor="categoryDescription"
                        className="edit-category-label"
                    >
                        Category Description
                        <sup className="compulsory-icon">*</sup>
                    </label>

                    {/* Input ------------ */}
                    <textarea
                        id="categoryDescription"
                        placeholder="Enter Category Description"
                        {...register("categoryDescription", { required: true })}
                        className="edit-category-desc-input edit-category-input"
                    />

                    {/* Error handling ------------- */}
                    {errors.categoryDescription && (
                        <span className="edit-category-desc-error">
                            Category Description is required**
                        </span>
                    )}
                </div>

                {/* Submit btn */}
                {/* ================== */}
                <IconBtn type="submit" text="Save Changes" />
            </form>
        </div>
    );
}
