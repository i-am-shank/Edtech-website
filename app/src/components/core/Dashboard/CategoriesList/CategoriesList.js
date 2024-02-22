// import components
// =================================================
import "./CategoriesList.css";
import ConfirmationModal from "../../../common/ConfirmationModal";
import IconBtn from "../../../common/IconBtn";

// import hooks & React-tools
// =================================================
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

// import API-call functions
// =================================================
import {
    fetchCourseCategories,
    deleteCategory,
} from "../../../../services/operations/categoryAPI";

// import assets
// =================================================
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

export default function CategoriesList() {
    // initialise hooks
    // =======================
    const navigate = useNavigate();

    // states
    // =======================
    const { token } = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // constants
    // =======================
    const TRUNCATE_LENGTH = 20;

    // Render Handlers
    // =======================
    useEffect(() => {
        // function definition ----------
        const fetchCategoriesList = async () => {
            // show loading
            setLoading(true);

            // fire API-call
            const response = await fetchCourseCategories();

            // condition over API-response
            if (response) {
                // console.log("Categories list : ", response);
                setCategories(response?.data?.data);
            }

            // hide loading
            setLoading(false);
        };

        // function call ----------
        fetchCategoriesList();
    }, []);

    // Handlers
    // =======================
    const handleCategoryDelete = async (categoryId) => {
        // show loading -----------
        setLoading(true);

        // fire API-call -----------
        await deleteCategory({ categoryId }, token);

        // hide loading ----------
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="categories-list">
            {/* Header */}
            {/* =================== */}
            <div className="categories-list-header">
                {/* Heading ------------- */}
                <div className="categories-list-heading">All Categories</div>

                {/* Add-Category btn ------------- */}
                <Link
                    to="/dashboard/create-category"
                    className="add-category-btn"
                >
                    <IconBtn text="Add a Category" />
                </Link>
            </div>

            {/* List */}
            {/* =================== */}
            <Table className="categories-list-table">
                {/* Table heading */}
                {/* =================== */}
                <Thead>
                    <Tr className="categories-list-header-row">
                        <Th className="categories-list-header-heading">
                            CATEGORY
                        </Th>
                        <Th className="categories-list-header-heading">
                            ACTIONS
                        </Th>
                    </Tr>
                </Thead>

                {/* Table body */}
                {/* =================== */}
                <Tbody>
                    {categories?.length === 0 ? (
                        <Tr>
                            <Td className="categories-list-no-category">
                                No Categories Found
                            </Td>
                        </Tr>
                    ) : (
                        categories.map((category, index) => (
                            <Tr
                                className="categories-list-category"
                                key={index}
                            >
                                {/* Name & Description ----------- */}
                                <Td className="categories-list-category-details">
                                    <p className="categories-list-category-name">
                                        {category.name}
                                    </p>
                                    <p className="categories-list-category-desc">
                                        {category.description.split(" ")
                                            .length > TRUNCATE_LENGTH
                                            ? category.description
                                                  .split(" ")
                                                  .splice(0, TRUNCATE_LENGTH)
                                                  .join(" ") + "..."
                                            : category.description}
                                    </p>
                                </Td>

                                {/* Action btns ------------ */}
                                <Td className="categories-list-category-btns">
                                    {/* Edit btn */}
                                    <button
                                        disabled={loading}
                                        className="categories-list-edit-category"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/edit-category/${category.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`
                                            )
                                        }
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    {/* Delete btn */}
                                    <button
                                        disabled={loading}
                                        className="categories-list-delete-category"
                                        onClick={() =>
                                            setConfirmationModal({
                                                text1: "Do you want to delete this category ?",
                                                text2: "Only this category will be deleted, & courses of this won't be visible in category.",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => {
                                                          handleCategoryDelete(
                                                              category._id
                                                          );
                                                          navigate("/");
                                                      }
                                                    : () => {},
                                                btn2Handler: !loading
                                                    ? () =>
                                                          setConfirmationModal(
                                                              null
                                                          )
                                                    : () => {},
                                            })
                                        }
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {/* Confirmation Modal */}
            {/* =================== */}
            {/*      (render conditionally) */}
            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    );
}
