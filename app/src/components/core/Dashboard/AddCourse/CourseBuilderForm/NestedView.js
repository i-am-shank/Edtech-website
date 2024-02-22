// import components
// ===================================
import "./NestedView.css";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";

// import hooks & React tools
// ===================================
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// import API-call functions
// ===================================
import {
    deleteSection,
    deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

// import reducers (from slices)
// ===================================
import { setCourse } from "../../../../../slices/courseSlice";

// import assets
// ===================================
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

export default function NestedView({ handleChangeEditSectionName }) {
    // initialise hooks
    // ===================
    const dispatch = useDispatch();

    // states
    // ===================
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    // 3 modes for lecture (3 flags needed)
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // Handlers
    // ===================
    // Delete Section handler -------------
    const handleDeleteSection = async (sectionId) => {
        // fire API call
        const response = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        });
        // Condition over response
        if (response) {
            dispatch(setCourse(response));
        }
        // Remove confirmation modal
        setConfirmationModal(null);
    };

    // Delete Sub-Section handler --------------
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        // fire API call
        const response = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
        });
        // condition over API-response
        if (response) {
            // Generated updated-course -----------
            //      (using updated-subSection)
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? response : section
            );
            //   (If sectionId matches.. updated the section in course)
            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            };

            // Update the course -----------
            dispatch(setCourse(updatedCourse));
        }
        // Remove confirmation modal
        setConfirmationModal(null);
    };

    // Render Handlers
    // ===================
    useEffect(() => {
        // console.log("Rendering it again !");
    }, [course]);

    return (
        <div className="nested-view-wrapper">
            {/* Nested View ------------- */}
            <div className="nested-view">
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        {/* Section details */}
                        {/* (for corresponding section) */}
                        {/* ====================== */}
                        <summary className="nested-view-section-summary">
                            {/* Title ------------ */}
                            <div className="nested-view-section-title">
                                <RxDropdownMenu className="nested-view-section-dropdown" />
                                <p className="nested-view-section-name">
                                    {section.sectionName}
                                </p>
                            </div>

                            {/* Buttons ------------ */}
                            <div className="nested-view-section-btns">
                                {/* Edit Btn */}
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit className="nested-view-section-btn" />
                                </button>

                                {/* Delete Btn */}
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () =>
                                                handleDeleteSection(
                                                    section._id
                                                ),
                                            btn2Handler: () =>
                                                setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="nested-view-section-btn" />
                                </button>

                                <span className="nested-view-section-slash">
                                    |
                                </span>

                                {/* Drop-down Btn */}
                                <BiSolidDownArrow className="nested-view-section-btn" />
                            </div>
                        </summary>

                        {/* Sub-section details */}
                        {/* (for corresponding section) */}
                        {/* ====================== */}
                        <div className="nested-view-subsections">
                            {/* Sub-sections list --------- */}
                            {section?.subSection?.map((data) => (
                                <div
                                    className="nested-view-subsection"
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                >
                                    {/* Subsection-title */}
                                    <div className="nested-view-subsection-title-div">
                                        <RxDropdownMenu className="nested-view-subsection-dropdown" />
                                        <p className="nested-view-subsection-title">
                                            {data.title}
                                        </p>
                                    </div>

                                    {/* Subsection-buttons */}
                                    {/*   (have to stop the propagation of set-view on-click function of parent div.. to this div) */}
                                    <div
                                        className="nested-view-subsection-btns"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Edit Btn */}
                                        <button
                                            onClick={() =>
                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })
                                            }
                                        >
                                            <MdEdit className="nested-view-subsection-btn" />
                                        </button>

                                        {/* Delete Btn */}
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub Section",
                                                    text2: "Selected Lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(
                                                            data._id,
                                                            section._id
                                                        ),
                                                    btn2Handler: () =>
                                                        setConfirmationModal(
                                                            null
                                                        ),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="nested-view-subsection-btn" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Lecture btn --------- */}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="nested-view-add-lecture"
                            >
                                <AiOutlinePlus className="nested-view-add-icon" />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Modals (show conditionally) */}
            {/* ======================= */}
            <div className="nested-view-modals">
                {addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection}
                        setModalData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <div></div>
                )}
            </div>

            {/* Confirmation modal (only if data is there) */}
            {/* ==================== */}
            <div className="nested-view-confirmation-modal">
                {confirmationModal ? (
                    <ConfirmationModal modalData={confirmationModal} />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
