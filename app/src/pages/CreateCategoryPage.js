// import components
// =================================================
import "./CreateCategoryPage.css";
import IconBtn from "../components/common/IconBtn";

// import hooks & React-tools
// =================================================
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import API-call functions
// =================================================
import { createCategory } from "../services/operations/categoryAPI";

export default function CreateCategoryPage() {
    // initialise hooks
    // ====================
    const navigate = useNavigate();

    // states
    // ====================
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    // form-variables
    // ====================
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    // Handlers
    // ====================
    const onSubmit = async (data) => {
        console.log("Category name : ", data.categoryName);
        console.log("Category desc : ", data.categoryDescription);

        // Create a form-data ----------
        const formData = new FormData();

        // Append all the fields -----------
        formData.append("name", data.categoryName);
        formData.append("description", data.categoryDescription);

        // Show loading ----------
        setLoading(true);

        // fire API-call -----------
        const response = await createCategory(formData, token);

        // Condition on API-response ----------
        if (response) {
            console.log(
                "Fired Create Category function, from Create-category-page : ",
                response
            );
        }

        // Hide loading ----------
        setLoading(false);

        navigate("/");
    };

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="create-category">
            <h1 className="create-category-heading">Create Category</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="create-category-form"
            >
                {/* Category Name */}
                {/* ==================== */}
                <div className="create-category-field">
                    {/* Label ----------- */}
                    <label
                        htmlFor="categoryName"
                        className="create-category-label"
                    >
                        Category Name<sup className="compulsory-icon">*</sup>
                    </label>

                    {/* Input ----------- */}
                    <input
                        type="text"
                        id="categoryName"
                        placeholder="Enter Category Name"
                        {...register("categoryName", { required: true })}
                        className="create-category-name-input create-category-input"
                    />

                    {/* Error handling ------------ */}
                    {errors.categoryName && (
                        <span className="create-category-name-error">
                            Category Name is required**
                        </span>
                    )}
                </div>

                {/* Category Description */}
                {/* ==================== */}
                <div className="create-category-field">
                    {/* Label ------------ */}
                    <label
                        htmlFor="categoryDescription"
                        className="create-category-label"
                    >
                        Category Description
                        <sup className="compulsory-icon">*</sup>
                    </label>

                    {/* Input ------------ */}
                    <textarea
                        id="categoryDescription"
                        placeholder="Enter Category Description"
                        {...register("categoryDescription", { required: true })}
                        className="create-category-desc-input create-category-input"
                    />

                    {/* Error handling ------------- */}
                    {errors.categoryDescription && (
                        <span className="create-category-desc-error">
                            Category Description is required**
                        </span>
                    )}
                </div>

                {/* Submit btn */}
                {/* ================== */}
                <IconBtn type="submit" text="Create" />
            </form>
        </div>
    );
}
