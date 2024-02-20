// import components
// ============================================
import "./CourseCard.css";
import RatingStars from "../../common/RatingStars";

// import hooks & React-tools
// ============================================
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import utility-functions
// ============================================
import GetAvgRating from "../../../utils/avgRating";

export default function CourseCard({ course, Height }) {
    // states
    // ===================
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    // Render handlers
    // ===================
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className="catalog-course-card">
            <Link to={`/courses/${course._id}`}>
                <div>
                    {/* Course Img */}
                    {/* ==================== */}
                    <div>
                        <img
                            src={course?.thumbnail}
                            alt="course thumbnail"
                            className={`${Height} catalog-course-card-img`}
                        />
                    </div>

                    {/* Course Details */}
                    {/* ==================== */}
                    <div className="catalog-course-card-details">
                        <p className="catalog-course-card-title">
                            {course?.courseName}
                        </p>
                        <p className="catalog-course-card-instructor">
                            By{" "}
                            <span className="catalog-course-card-instructor-name">
                                {course?.instructor?.firstName}{" "}
                                {course?.instructor?.lastName}
                            </span>
                        </p>
                        <div className="catalog-course-rating-wrapper">
                            <span className="catalog-course-rating-avg">
                                {avgReviewCount || 0}
                            </span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="catalog-course-rating-count">
                                {course?.ratingAndReviews?.length} Ratings
                            </span>
                        </div>
                        <p className="catalog-course-card-price">
                            Rs. {course?.price}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
