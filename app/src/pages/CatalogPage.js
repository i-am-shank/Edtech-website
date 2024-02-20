// import components
// ======================================
import "./CatalogPage.css";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import CourseCard from "../components/core/CatalogPage/CourseCard";
import ErrorPage from "../pages/ErrorPage";

// import hooks & React-tools
// ======================================
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import API-related modules
// ======================================
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/getCatalogPageData";

export default function CatalogPage() {
    // initialise hooks
    // =================
    const { catalogName } = useParams();

    // states
    // =================
    const { loading } = useSelector((state) => state.profile);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);

    // Render Handlers
    // =================
    // Fetch categories-id ---------
    //      (every time a new-catalog opens)
    useEffect(() => {
        // Function definition
        // ===============
        const getCategories = async () => {
            // fetch categories --------------
            const response = await apiConnector(
                "GET",
                categories.CATEGORIES_API
            );

            // fetch category-id --------------
            //   (of the category currently selected)
            //     (replace space by '-')
            const categoryId = response?.data?.data?.filter(
                (ct) =>
                    ct.name.split(" ").join("-").toLowerCase() === catalogName
            )[0]._id;

            // Update category-id -------------
            setCategoryId(categoryId);
        };

        // Function call
        // ===============
        getCategories();
    }, [catalogName]);

    // Fetch category-page details ------------
    //      (everytime the categoryId is updated)
    useEffect(() => {
        // Function definition ----------
        const getCategoryDetails = async () => {
            try {
                // fire API-call
                const response = await getCatalogPageData(categoryId);
                console.log("Category page details : ", response);

                // Update Category-page data
                setCatalogPageData(response);
            } catch (error) {
                console.log(
                    "Error in fetching category-page details : ",
                    error
                );
            }
        };

        // Function call ----------
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    // Loading & Error Handler
    // =============================
    if (loading || !catalogPageData) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }
    if (!loading && !catalogPageData.success) {
        // Some error in fetching catalog-page-data
        return <ErrorPage />;
    }

    return (
        <div className="catalog-page">
            {/* Page Header =============== */}
            {/* ====================== */}
            <div className="catalog-page-header">
                <div className="catalog-page-header-content">
                    {/* category link-tree */}
                    <p className="catalog-page-header-link-tree">
                        {`Home / Catalog / `}
                        <span className="catalog-page-header-link-category-name">
                            {/* Category name */}
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    {/* category name */}
                    <p className="catalog-page-header-category-name">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    {/* category description */}
                    <p className="catalog-page-header-category-description">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Start Courses */}
            {/* ====================== */}
            <div className="catalog-start-courses">
                <p className="catalog-start-courses-heading">
                    Courses to get you started
                </p>
                <div className="catalog-start-courses-categories">
                    {/* Most Popular ----------- */}
                    <button
                        className={`catalog-start-courses-category ${
                            active === 1
                                ? "catalog-start-courses-active-category"
                                : "catalog-start-courses-inactive-category"
                        }`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </button>
                    {/* New ----------- */}
                    <button
                        className={`catalog-start-courses-category ${
                            active === 2
                                ? "catalog-start-courses-active-category"
                                : "catalog-start-courses-inactive-category"
                        }`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </button>
                </div>

                {/* Start courses - content ------------- */}

                <CourseSlider
                    courses={catalogPageData?.data?.selectedCategory?.courses}
                />
            </div>

            {/* Top Courses */}
            {/* ====================== */}
            <div className="catalog-page-top-courses">
                <p className="catalog-section-heading">
                    Courses Similar to{" "}
                    {catalogPageData?.data?.selectedCategory?.name}
                </p>

                {/* Top courses - content ------------- */}
                <div className="catalog-page-top-courses-content">
                    <CourseSlider
                        courses={
                            catalogPageData?.data?.differentCategory?.courses
                        }
                    />
                </div>
            </div>

            {/* Frequently Bought */}
            {/* ====================== */}
            <div className="catalog-page-frequently-bought">
                <p className="catalog-section-heading">Frequently Bought</p>

                {/* Frequently bought - content ------------- */}
                <div className="catalog-frequently-bought-courses">
                    {catalogPageData?.data?.mostSellingCourses
                        ?.slice(0, 4)
                        .map((course, index) => (
                            <CourseCard
                                course={course}
                                key={index}
                                height={"h-[100px] lg:h-[400px]"}
                            />
                        ))}
                </div>
            </div>

            {/* Footer */}
            {/* ====================== */}
            <Footer />
        </div>
    );
}
