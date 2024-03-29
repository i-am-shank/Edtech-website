// import components
// ==================================
import "./SubSectionModal.css";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";

// import hooks & React-tools
// ==================================
import { React } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// import API-call functions
// ==================================
import {
    createSubSection,
    updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";

// import reducers (from slices)
// ==================================
import { setCourse } from "../../../../../slices/courseSlice";

// import assets
// ==================================
import { RxCross1 } from "react-icons/rx";

export default function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {
    // initialise hooks
    // ===================
    const dispatch = useDispatch();

    // form variables
    // ===================
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    // states
    // ===================
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    // Render Handlers
    // ===================
    useEffect(() => {
        if (view || edit) {
            // Course is already created.. set all variable-values
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    // Handlers
    // ===================
    // Check if form is updated -------------
    const isFormUpdated = () => {
        const currentValues = getValues();

        // compare values ----------
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            // atleast one of the value is changed
            return true;
        } else {
            return false;
        }
    };

    // Handle edits in SubSection
    // ==================
    const handleEditSubSection = async () => {
        // have to do API call here (update operation)

        const currentValues = getValues();
        const formData = new FormData();

        // Append all values in this
        // (in NestedView.js .. previous-data, i.e. subSection & section-id is passed)
        formData.append("sectionId", modalData.sectionId);
        // modalData is subSection ..
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            // updated value.. so append this too in form-data
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        // show loading ----------
        setLoading(true);

        // fire API-call ----------
        const response = await updateSubSection(formData, token);

        // condition over API-call -----------
        if (response) {
            // Generate updated course, by attaching the updated subSection.
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? response : section
            );
            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            };
            dispatch(setCourse(updatedCourse));
        }

        // remove confirmation modal ----------
        setModalData(null);
        // hide loading ----------
        setLoading(false);
    };

    // Submit Handler
    // ==================
    const onSubmit = async (data) => {
        if (view) {
            // do nothing
            return;
        }
        if (edit) {
            if (!isFormUpdated) {
                // Nothing changed.. nothing to do
                toast.error("No changes made to the form");
            } else {
                handleEditSubSection();
            }
            return;
        }

        // Have to create SubSection (3rd case)
        // ================
        const formData = new FormData();
        // To check what values to append in form-data.. check where call is going
        // (atleast pass all the datas, recieved there)
        // In add-subsection .. section-id is passed as modalData (in NestedView.js)
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);

        // Show loading -----------
        setLoading(true);
        // fire API call -----------
        const response = await createSubSection(formData, token);

        // Condition over API-response -----------
        if (response) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? response : section
            );
            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            };
            dispatch(setCourse(updatedCourse));
        }

        // Close confirmation-modal ----------
        setModalData(null);
        // remove loading ----------
        setLoading(false);
    };

    return (
        <div className="subsection-modal">
            <div className="subsection-modal-content">
                {/* Modal Header */}
                {/* ====================== */}
                <div className="subsection-modal-header">
                    {/* Modal-Heading (conditional) */}
                    <p className="subsection-modal-heading">
                        {view && "Viewing"}
                        {add && "Adding"} {edit && "Editing"} Lecture
                    </p>

                    {/* Modal-exit-icon */}
                    <button
                        onClick={() => (!loading ? setModalData(null) : {})}
                    >
                        <RxCross1 className="subsection-modal-exit-btn" />
                    </button>
                </div>

                {/* Modal form */}
                {/* ====================== */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="subsection-modal-form"
                >
                    {/* Video upload */}
                    {/* ================ */}
                    {/* (visible only when either view OR edit is true .. handled by viewData & editData) */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    {/* Lecture Title */}
                    {/* ================ */}
                    <div className="subsection-modal-lecture-title-div">
                        <label className="subsection-modal-lecture-title-label">
                            Lecture Title{" "}
                            {!view && <sup className="compulsory-icon">*</sup>}
                        </label>
                        <input
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="subsection-modal-lecture-title-input"
                        />
                        {errors.lectureTitle && (
                            <span className="subsection-modal-lecture-title-error">
                                Lecture Title is required
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {/* ================= */}
                    <div className="subsection-modal-lecture-desc-div">
                        <label className="subsection-modal-lecture-desc-label">
                            Lecture Description
                        </label>
                        <textarea
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="subsection-modal-lecture-desc-input"
                        />
                        {errors.lectureDesc && (
                            <span className="subsection-modal-lecture-desc-error resize-x-none">
                                Lecture Description is required**
                            </span>
                        )}
                    </div>

                    {/* Form Submit btn */}
                    {/* =================== */}
                    {/* (
                        view --> no btn
                        edit --> "Save Changes" btn
                        add  --> "Save" btn
                        ) */}
                    {!view && (
                        <div>
                            <IconBtn
                                text={
                                    loading
                                        ? "Loading..."
                                        : edit
                                        ? "Save Changes"
                                        : "Save"
                                }
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
