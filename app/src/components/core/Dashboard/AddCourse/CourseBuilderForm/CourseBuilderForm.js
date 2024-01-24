// import components
// ===================================

import "./CourseBuilderForm.css";
import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

// import hooks & React-tools
// ===================================
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// import assets
// ===================================
import { GrAddCircle } from "react-icons/gr";
import { BiRightArrow } from "react-icons/bi";

// import reducers (from slices)
// ===================================
import {
    setCourse,
    setEditCourse,
    setStep,
} from "../../../../../slices/courseSlice";

// import API-call functions
// ===================================
import {
    createSection,
    updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

export default function CourseBuilderForm() {
    // initialise hooks
    // ==================
    const dispatch = useDispatch();

    // states
    // ==================
    const [editSectionName, setEditSectionName] = useState(null);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    // form-tools
    // ==================
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Handlers
    // ==================
    // Remove Section from edit-mode --------------
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    // Navigation handlers --------------
    const goBack = () => {
        // Go to 1 step (in edit mode)
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            // Atleast course should have some content
            toast.error("Please add atleast one section in course.");
            return;
        } else {
            if (
                course.courseContent.some(
                    (section) => section.subSection.length === 0
                )
            ) {
                // Atlease one lecture in each section
                toast.error("Please add atleast 1 lecture in each section");
                return;
            } else {
                // All validation done .. go to 3rd step
                dispatch(setStep(3));
            }
        }
    };

    // Submit handler ---------------
    const onSubmit = async (data) => {
        // 2 modes (create Section & edit Section)
        setLoading(true);
        let response = null;
        // console.log("Course builder data : ", data);

        if (editSectionName) {
            // Section (Edit mode)
            response = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            );
            // console.log("Section updated response : ", response);
        } else {
            // Section (creation mode)
            response = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id,
                },
                token
            );
        }

        // Update values (if valid response)
        if (response) {
            // Update course with current-section
            dispatch(setCourse(response));
            // Current Section is processed --> stop edit-section-mode
            setEditSectionName(null);
            // Reset form-field (for next sections)
            setValue("sectionName", "");
            // console.log("Section created/updated response : ", response);
        }

        // Remove loading
        setLoading(false);
    };

    // Edit-Section handler ----------------
    // Edit btn click (of Nested view)
    //     --> toggle edit-mode
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            // Section already in edit-mode
            cancelEdit();
            return;
        } else {
            // Make section in edit-mode
            setEditSectionName(sectionId);
            setValue("sectionName", sectionName);
        }
    };

    return (
        <div className="course-builder-wrapper">
            <p>Course Builder</p>

            {/* Form */}
            {/* =============================== */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="course-builder-form"
            >
                <div>
                    <label htmlFor="sectionName">
                        Section name<sup>*</sup>
                    </label>
                    <input
                        id="sectionName"
                        placeholder="Add Section name"
                        {...register("sectionName", { required: true })}
                        className="course-builder-section-input"
                    />
                    {errors.sectionName && (
                        <span>Section name is required**</span>
                    )}
                </div>

                {/* Create Section btn */}
                {/* =================== */}
                <div className="course-builder-create-section-btn-div">
                    <IconBtn
                        type="submit"
                        text={
                            editSectionName
                                ? "Edit Section Name"
                                : "Create Section"
                        }
                        outline={true}
                        customClasses={"text-white"}
                    >
                        <GrAddCircle
                            className="course-builder-create-section-btn"
                            size={20}
                        />
                    </IconBtn>

                    {/* Cancel edit btn ------- */}
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="course-builder-cancel-edit-btn"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Course - content (NestedView) */}
            {/* ======================= */}
            <div className="course-builder-course-content">
                {course?.courseContent?.length > 0 && (
                    <NestedView
                        handleChangeEditSectionName={
                            handleChangeEditSectionName
                        }
                    />
                )}
            </div>

            {/* Back & Next btns */}
            {/* ======================= */}
            <div className="course-builder-btns">
                <button onClick={goBack} className="course-builder-back-btn">
                    Back
                </button>

                <IconBtn
                    text="Next"
                    onClick={goToNext}
                    className="course-builder-next-btn"
                >
                    <BiRightArrow />
                </IconBtn>
            </div>
        </div>
    );
}
