// import components
// =======================================
import "./CourseCard.css";
import RatingStars from "../../common/RatingStars";

// import hooks & React-tools
// =======================================
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// import utility-functions
// =======================================
import getAvgRating from "../../../utils/avgRating";

export default function CourseCard({ course, height }) {
    // states
    // ================
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    // Render handlers
    // ================
    useEffect(() => {
        // Calculate avg rating ---------
        const count = getAvgRating(course.ratingAndReviews);
        // Update avg rating state ----------
        setAvgReviewCount(count);
    }, [course]);

    return (
        <>
            {/* Link takes to course-page */}
            <NavLink to={`/courses/${course._id}`}>
                <div className="course-card-content">
                    {/* Course Img */}
                    {/* ================ */}
                    <div className="course-card-img-wrapper">
                        <img
                            src={course?.thumbnail}
                            alt="thumbnail"
                            className={`course-card-img ${height}`}
                        />
                    </div>

                    {/* Course Details */}
                    {/* ================ */}
                    <div className="course-card-details">
                        {/* Course Title =--------- */}
                        <p className="course-card-title">
                            {course?.courseName}
                        </p>
                        {/* Course Instructor ---------- */}
                        <p className="course-card-instructor">
                            {course?.instructor?.firstName}{" "}
                            {course?.instructor?.lastName}
                        </p>
                        {/* Course Rating ---------- */}
                        <div className="course-rating-wrapper">
                            {/* Avg. rating */}
                            <span className="course-rating-avg">
                                {avgReviewCount || 0}
                            </span>
                            {/* Stars */}
                            <RatingStars reviewCount={avgReviewCount} />
                            {/* No. of Rating */}
                            <span className="course-rating-count">
                                {course?.ratingAndReviews?.length} Ratings
                            </span>
                        </div>
                        {/* Course Price ---------- */}
                        <p className="course-card-price">₹ {course?.price}</p>
                    </div>
                </div>
            </NavLink>
        </>
    );
}
