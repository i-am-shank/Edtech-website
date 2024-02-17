// import components
// ====================================
import "./CourseInformationForm.css";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import ChipInput from "./ChipInput";
import Upload from "../Upload";

// import hooks & React-tools
// ====================================
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// import API-call functions
// ====================================
import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";

// import reducers (from slices)
// ====================================
import { setStep, setCourse } from "../../../../../slices/courseSlice";

// import assets
// ====================================
import { HiOutlineCurrencyRupee } from "react-icons/hi";

// import constants
// ====================================
import { COURSE_STATUS } from "../../../../../utils/constants";

export default function CourseInformationForm() {
    // initialise hooks
    // ==================
    const dispatch = useDispatch();

    // states
    // ==================
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const { step, course, editCourse } = useSelector((state) => state.course);

    // form-variables
    // ==================
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    // Handlers
    // ==================

    // Render-handlers
    // ==================
    useEffect(() => {
        const getCategories = async () => {
            // start loading ------------
            setLoading(true);

            // fire API-call ------------
            const categories = await fetchCourseCategories();
            // console.log("Course Categories : ", categories);

            // Condition over API-response ------------
            if (categories.length > 0) {
                setCourseCategories(categories);
            }

            // stop loading -----------
            setLoading(false);
        };

        if (editCourse) {
            // There are many data in course.
            // If editing is required, set the values
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, [step]);

    // Submit-handlers
    // ==================

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !==
                course.instructions.toString()
        ) {
            // Course is updated (atleast one of the value)
            return true;
        } else {
            return false;
        }
    };

    // handle Next-btn click
    const onSubmit = async (data) => {
        // editCourse -> false (by-default)
        // So, Course-creation (default mode)

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                // Insert all form-data in below object
                const formData = new FormData();

                // Add course-id
                formData.append("courseId", course._id);

                // Add all other form-field values
                // (courseName, courseDescription, price, tag, whatYouWillLearn, category, instructions, thumbnailImage)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (
                    currentValues.courseShortDesc !== course.courseDescription
                ) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (
                    currentValues.courseTags.toString() !==
                    course.tag.toString()
                ) {
                    formData.append("tag", JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    );
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }

                // Now purpose of editCourse is done.
                // Fire API-call for it.

                setLoading(true);
                const response = await editCourseDetails(formData, token);
                setLoading(false);
                if (response) {
                    // go to next step
                    dispatch(setStep(2));
                    // Update course
                    dispatch(setCourse(response));
                }
            } else {
                toast.error("No changes in form. Form isn't updated !");
            }
        } else {
            // User hasn't came to edit the course
            // Instead course-creation is done.

            const formData = new FormData();

            // Add all form-field-values to formData-object
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("tag", JSON.stringify(data.courseTags));
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append(
                "instructions",
                JSON.stringify(data.courseRequirements)
            );
            formData.append("thumbnailImage", data.courseImage);

            // Can add any field to this object (if needed further)
            // Here adding status (just to check form-status)
            formData.append("status", COURSE_STATUS.DRAFT);

            // fire API-call (to add course details)
            // ==================
            setLoading(true);
            const response = await addCourseDetails(formData, token);

            // condition on API-response
            // ==================
            if (response) {
                // go to next step of course-creation
                dispatch(setStep(2));
                // Update course (with current added data)
                dispatch(setCourse(response));
                console.log("Updated Step : ", step);
            }
            setLoading(false);
            console.log("PRINTING FORMDATA : ", formData);
            console.log("PRINTING RESPONSE : ", response);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="course-info-form">
            {/* Course Title */}
            {/* ==================== */}
            <div className="course-info-form-field">
                <label htmlFor="courseTitle" className="course-info-label">
                    Course Title<sup className="compulsory-icon">*</sup>
                </label>
                <input
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="course-info-course-title-input course-info-input"
                />
                {errors.courseTitle && (
                    <span className="course-info-error">
                        Course Title is Required**
                    </span>
                )}
            </div>

            {/* Course Short Desc */}
            {/* ==================== */}
            <div className="course-info-form-field">
                <label htmlFor="courseShortDesc" className="course-info-label">
                    Course Short Description
                    <sup className="compulsory-icon">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className="course-info-input course-info-course-short-desc-input resize-x-none"
                />
                {errors.courseShortDesc && (
                    <span className="course-info-error">
                        Course Description is required**
                    </span>
                )}
            </div>

            {/* Course Price */}
            {/* ==================== */}
            <div className="course-info-form-field">
                <label htmlFor="coursePrice" className="course-info-label">
                    Course Price<sup className="compulsory-icon">*</sup>
                </label>
                <input
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    {...register("coursePrice", {
                        required: true,
                        valueAsNumber: true,
                    })}
                    className="course-info-input course-info-course-price-input"
                />
                {/* Rupee icon */}
                <HiOutlineCurrencyRupee className="course-info-course-price-icon" />
                {errors.coursePrice && (
                    <span className="course-info-error">
                        Course Price is required**
                    </span>
                )}
            </div>

            {/* Course Category */}
            {/* ==================== */}
            <div className="course-info-form-field">
                <label htmlFor="courseCategory" className="course-info-label">
                    Course Category<sup className="compulsory-icon">*</sup>
                </label>
                <select
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                    className="course-info-input course-info-course-category-options"
                >
                    {/* Default option :- */}
                    <option value="" disabled>
                        Choose a Category
                    </option>

                    {/* Fetched categories :- */}
                    {!loading &&
                        courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && (
                    <span className="course-info-error">
                        Course Category is required**
                    </span>
                )}
            </div>

            {/* Tags */}
            {/* ==================== */}
            <div className="course-info-tags">
                <ChipInput
                    label="Tags"
                    name="courseTags"
                    placeholder="Enter Tags and press Enter"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>

            {/* Thumbnail */}
            {/* ===================== */}
            <div className="course-info-thumbnail">
                {/* Upload - component for uploading & showing preview of media */}
                <Upload
                    name="courseImage"
                    label="Course Thumbnail"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    editData={editCourse ? course?.thumbnail : null}
                />
            </div>

            {/* Benefits */}
            {/* ====================== */}
            <div className="course-info-form-field">
                <label htmlFor="courseBenefits" className="course-info-label">
                    Benefits of the course
                    <sup className="compulsory-icon">*</sup>
                </label>

                <textarea
                    id="courseBenefits"
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="course-info-input course-info-benefits-input resize-x-none"
                />
                {errors.courseBenefits && (
                    <span className="course-info-error">
                        Benefits of the course are required**
                    </span>
                )}
            </div>

            {/* Requirements */}
            {/* ====================== */}
            <RequirementField
                name="courseRequirements"
                label="Requirements / Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Form Btns */}
            {/* ====================== */}
            <div className="course-info-btns">
                {/* Continue without saving */}
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className="course-info-btn-1"
                    >
                        Continue Without Saving
                    </button>
                )}

                {/* Save Changes */}
                <IconBtn
                    type="submit"
                    text={!editCourse ? "Next" : "Save Changes"}
                />
            </div>
        </form>
    );
}
