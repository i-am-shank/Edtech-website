// import components
// =================================
import "./PublishCourseForm.css";
import IconBtn from "../../../../common/IconBtn";

// import hooks & React-tools
// =================================
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import API-call functions
// =================================
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

// import reducers (from slices)
// =================================
import { setStep, resetCourseState } from "../../../../../slices/courseSlice";

// import constants
// =================================
import { COURSE_STATUS } from "../../../../../utils/constants";

export default function PublishCourseForm() {
    // initiate hooks
    // ===================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form-variables
    // ===================
    const { register, handleSubmit, setValue, getValues } = useForm();

    // states
    // ===================
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    // Render Handlers
    // ===================
    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            // Already published course.
            setValue("public", true);
        }
    }, []);

    // Handlers
    // ===================
    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToCourses = () => {
        // Reset the current course-state ---------
        dispatch(resetCourseState());

        // Navigate to My-Courses tab ---------
        navigate("/dashboard/my-courses");
    };

    const handleCoursePublish = async () => {
        // Generate data, fire API call using it.
        if (
            (course?.status === COURSE_STATUS.PUBLISHED &&
                getValues("public") === true) ||
            (course.status === COURSE_STATUS.DRAFT &&
                getValues("public") === false)
        ) {
            // Either course already published || No updation in course (course is same as draft one)
            // No need to fire API call ---------
            // On saving  ==>  Show all course
            goToCourses();
            return;
        } else {
            // Form is updated !
            // generate the new form-data ---------
            const formData = new FormData();
            formData.append("courseId", course._id);
            // Course can have either of 2 states :
            const courseStatus = getValues("public")
                ? COURSE_STATUS.PUBLISHED
                : COURSE_STATUS.DRAFT;
            formData.append("status", courseStatus);

            // Fire API-call ----------
            setLoading(true);
            const response = await editCourseDetails(formData, token);

            // Condition over API-response -----------
            if (response) {
                // Show all course ---------
                goToCourses();
            }
            setLoading(false);
        }
    };

    const onSubmit = () => {
        handleCoursePublish();
    };

    return (
        <div className="publish-course-form-wrapper">
            <p className="publish-course-header">Publish Settings</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Check box ---------- */}
                <div className="publish-course-checkbox">
                    <label
                        htmlFor="public"
                        className="publish-course-checkbox-label"
                    >
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="border-gray-300 publish-course-checkbox-input"
                        />
                        <span className="publish-course-checkbox-label-text">
                            Make this Course as Public
                        </span>
                    </label>
                </div>

                {/* btns ----------- */}
                <div className="publish-course-btns">
                    <button
                        disabled={loading}
                        type="button"
                        onClick={() => goBack()}
                        className="publish-course-back-btn"
                    >
                        Back
                    </button>

                    <IconBtn disabled={loading} text="Save Changes" />
                </div>
            </form>
        </div>
    );
}
