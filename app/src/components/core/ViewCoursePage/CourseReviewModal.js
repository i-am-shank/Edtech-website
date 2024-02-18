// import components
// ====================================
import "./CourseReviewModal.css";
import IconBtn from "../../common/IconBtn";

// import hooks & React-tools
// ====================================
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";

// import API-call functions
// ====================================
import { createRating } from "../../../services/operations/courseDetailsAPI";

// import assets
// ====================================
import { RxCross2 } from "react-icons/rx";

export default function CourseReviewModal({ setReviewModal }) {
    // states
    // ==================
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    // Form States
    // ==================
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Render Handlers
    // ==================
    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    // Handlers
    // ==================
    const onSubmit = async (data) => {
        // Create entry in DB -----------
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );

        // Close review-modal -----------
        setReviewModal(false);
    };

    const ratingChange = (newRating) => {
        setValue("courseRating", newRating);
    };

    return (
        <div className="course-review-modal-wrapper">
            <div className="course-review-modal">
                {/* Modal header */}
                {/* ================= */}
                <div className="review-modal-header">
                    <p className="review-modal-heading">Add Review</p>
                    <button onClick={() => setReviewModal(false)}>
                        {/* cross icon */}
                        <RxCross2 className="review-modal-cross-icon" />
                    </button>
                </div>

                {/* Modal body */}
                {/* ================= */}
                <div className="review-modal-body">
                    {/* User-details ----------- */}
                    <div className="review-modal-body-header">
                        {/* Profile pic */}
                        <img
                            className="review-modal-profile-pic"
                            src={user?.image}
                            alt={user?.firstName + " profile"}
                        />
                        {/* Credentials */}
                        <div className="review-modal-credentials">
                            <p className="review-modal-name">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="review-modal-credential-text">
                                Posting Publicly
                            </p>
                        </div>
                    </div>

                    {/* Form ------------ */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="review-modal-form"
                    >
                        {/* Rating Stars */}
                        <ReactStars
                            count={5}
                            onChange={ratingChange}
                            size={24}
                            activeColor="#ffd700"
                        />

                        {/* Experience field */}
                        <div className="review-modal-experience">
                            <label
                                htmlFor="courseExperience"
                                className="review-modal-experience-label"
                            >
                                Add Your Experience{" "}
                                <sup className="compulsory-icon">*</sup>
                            </label>
                            <textarea
                                id="courseExperience"
                                placeholder="Add Your Experience"
                                {...register("courseExperience", {
                                    required: true,
                                })}
                                className="review-modal-experience-input resize-x-none"
                            />
                            {errors.courseExperience && (
                                <span className="review-modal-experience-error">
                                    Please Add Your Experience
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="review-modal-btns">
                            {/* Cancel btn */}
                            <button
                                className="review-modal-cancel-btn"
                                onClick={() => setReviewModal(false)}
                            >
                                Cancel
                            </button>

                            {/* Save btn */}
                            <IconBtn text="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
