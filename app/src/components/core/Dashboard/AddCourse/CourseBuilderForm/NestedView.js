// import components
// ===================================
import "./NestedView.css";
import SubSectionModal from "./SubSectionModal";

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
import ConfirmationModal from "../../../../common/ConfirmationModal";

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

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        // fire API call
        const response = await deleteSubSection(
            {
                courseId: subSectionId,
                sectionId,
            },
            token
        );
        // condition over API-response
        if (response) {
            dispatch(setCourse(response));
        }
        // Remove confirmation modal
        setConfirmationModal(null);
    };

    useEffect(() => {
        console.log("Rendering it again !");
    }, [course]);

    return (
        <div className="nested-view-wrapper">
            <p>Nested View</p>
            <div className="nested-view">
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        {/* Section details */}
                        {/* (for corresponding section) */}
                        {/* ====================== */}
                        <summary className="nested-view-section-summary">
                            {/* Title */}
                            <div className="nested-view-section-title">
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>

                            {/* Buttons ------------ */}
                            <div className="nested-view-btns">
                                {/* Edit Btn */}
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit />
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
                                    <RiDeleteBin6Line />
                                </button>

                                <span>|</span>

                                {/* Drop-down Btn */}
                                <BiSolidDownArrow className="nested-view-more-btn" />
                            </div>
                        </summary>

                        {/* Sub-section details */}
                        {/* (for corresponding section) */}
                        {/* ====================== */}
                        <div className="nested-view-section-subsections">
                            {/* Sub-sections list --------- */}
                            {section?.subSection?.map((data) => (
                                <div
                                    className="nested-view-section-subsection"
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                >
                                    {/* Subsection-title */}
                                    <div className="nested-view-subsection-title">
                                        <RxDropdownMenu />
                                        <p>{data.title}</p>
                                    </div>

                                    {/* Subsection-buttons */}
                                    <div className="nested-view-subsection-btns">
                                        {/* Edit Btn */}
                                        <button
                                            onClick={() =>
                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })
                                            }
                                        >
                                            <MdEdit />
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
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Lecture btn --------- */}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="nested-view-add-lecture"
                            >
                                <AiOutlinePlus />
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

// 1:34
