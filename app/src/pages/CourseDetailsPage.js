// import components
// ====================================
import "./CourseDetailsPage.css";
import ErrorPage from "../pages/ErrorPage";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/CourseDetailsPage/CourseDetailsCard";
import Footer from "../components/common/Footer";
import CourseAccordionBar from "../components/core/CourseDetailsPage/CourseAccordionBar";

// import hooks & React-tools
// ====================================
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// import services
// ====================================
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { formatDate } from "../services/formatDate";

// import utility functions
// ====================================
import getAvgRating from "../utils/avgRating";

// import assets
// ====================================
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export default function CourseDetailsPage() {
    // initialise hooks
    // =================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states
    // =================
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [hourDuration, setHourDuration] = useState(0);
    const [minuteDuration, setMinuteDuration] = useState(0);
    const [isActive, setIsActive] = useState([]);

    // Handlers
    // =================

    const handleActive = (id) => {
        // Maintain array of open-sections
        // Toggle active-state ---------
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e !== id)
        );
    };

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        } else {
            // Someone who isn't logged-in is trying to buy course
            setConfirmationModal({
                text1: "Your are not logged in !",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            });
        }
    };

    // Render Handlers
    // =================
    //     (update course-data, avg-rating, lecture-count)
    useEffect(() => {
        // Function definition ----------
        const getCourseFullDetails = async () => {
            try {
                // fire API-call
                const response = await fetchCourseDetails(courseId);
                console.log(
                    "Printing CourseData : ",
                    response.data.courseDetails[0]
                );

                // Update course-data
                setCourseData(response.data.courseDetails[0]);
            } catch (error) {
                console.log("Could not fetch course details");
            }
        };

        // Function call -----------
        getCourseFullDetails();
    }, [courseId]);

    useEffect(() => {
        // calculate avg-rating
        const count = getAvgRating(courseData?.ratingAndReviews);

        // Update avg-rating
        setAvgReviewCount(count);
    }, [courseData]);

    useEffect(() => {
        let lectures = 0;

        // iterate on sections of course-data
        //     (count sub-sections)
        courseData?.courseContent?.forEach((section) => {
            lectures += section.subSection.length || 0;
        });

        // Update lecture-count
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    useEffect(() => {
        let duration = 0;

        courseData?.courseContent?.forEach((section) => {
            section.subSection?.forEach((lecture) => {
                duration += lecture.timeDuration;
            });
        });

        // Update course-duration
        let hours = Math.floor(duration / 60);
        let minutes = Math.floor(duration % 60);
        setHourDuration(hours);
        setMinuteDuration(minutes);
    }, [courseData]);

    // Loading & No Course handlers
    // =======================
    if (loading || !courseData) {
        return (
            <div className="course-details-loader">
                <div className="spinner"></div>
            </div>
        );
    }

    // Error handler (in course-data fetching)
    // =======================
    if (!courseData) {
        return (
            <div className="course-details-error">
                <ErrorPage />
            </div>
        );
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData;

    return (
        <div className="course-details-page">
            {/* ============================ */}
            {/* Hero Section =============== */}
            {/* ============================ */}
            <div className="course-details-hero-section-wrapper">
                <div className="course-details-hero-section">
                    {/* Header */}
                    {/* ================ */}
                    <div className="course-details-header">
                        {/* Course Thumbnail ---------- */}
                        <div className="course-details-thumbnail-wrapper">
                            <div className="course-details-thumbnail-div"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="course-details-thumbnail"
                            />
                        </div>

                        {/* Credentials ---------- */}
                        <div className="course-details-credentials">
                            {/* Name */}
                            <div>
                                <p className="course-details-coursename">
                                    {courseName}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="course-details-description">
                                {courseDescription}
                            </p>

                            {/* Ratings & Reviews */}
                            <div className="course-details-ratings-reviews">
                                <span className="course-details-avg-review">
                                    {avgReviewCount}
                                </span>
                                <RatingStars
                                    reviewCount={avgReviewCount}
                                    starSize={24}
                                />
                                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                            </div>

                            {/* Instructor */}
                            <div className="course-details-instructor-details">
                                <p>
                                    Created By{" "}
                                    {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>

                            {/* Date, Time, Language */}
                            <div className="course-details-time-language">
                                <p className="course-details-time">
                                    <BiInfoCircle /> Created At{" "}
                                    {formatDate(createdAt)}
                                </p>
                                <p className="course-details-language">
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>

                        {/* Buttons ----------- */}
                        <div className="course-details-btns">
                            <p className="course-details-btns-price">
                                ₹ {price}
                            </p>
                            {/* Buy Btn */}
                            <button
                                className="course-details-buy-btn"
                                onClick={() => handleBuyCourse()}
                            >
                                Buy Now
                            </button>
                            {/* Add to Cart Btn */}
                            <button className="course-details-cart-btn">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Course card */}
                    {/* ================ */}
                    <div className="course-details-course-card">
                        <CourseDetailsCard
                            course={courseData}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            {/* ============================ */}
            {/* Content Section ============ */}
            {/* ============================ */}
            <div className="course-details-content-section-wrapper">
                <div className="course-details-content-section">
                    {/* What You'll Learn - box */}
                    {/* ================ */}
                    <div className="course-details-learn-box">
                        <p className="course-details-learn-box-label">
                            What You Will Learn
                        </p>
                        <div className="course-details-learn-points">
                            {whatYouWillLearn}
                        </div>
                    </div>

                    {/* Course Content */}
                    {/* ================ */}
                    <div className="course-details-course-content">
                        {/* Course Content titles ---------- */}
                        <div className="course-details-course-content-titles">
                            <p className="course-details-course-content-heading">
                                Course Content:
                            </p>

                            {/* Course Statistics */}
                            <div className="course-details-course-stats-wrapper">
                                <div className="course-details-course-stats">
                                    <span>
                                        {courseContent.length} section(s)
                                    </span>

                                    <span>{totalNoOfLectures} lectures</span>

                                    <span>
                                        {`${hourDuration}h ${minuteDuration}m`}{" "}
                                        total length
                                    </span>
                                </div>

                                <div className="course-details-collapse-sections-btn-wrapper">
                                    <button
                                        onClick={() => setIsActive([])}
                                        className="course-details-collapse-sections-btn"
                                    >
                                        Collapse all Sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}
                        {/* ----------------- */}
                        <div className="course-details-accordion">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                        {/* Author Details */}
                        {/* ----------------- */}
                        <div className="course-details-author-details">
                            <p className="course-details-author-details-heading">
                                Author
                            </p>
                            <div className="course-details-author-details-info">
                                <img
                                    src={
                                        instructor.image
                                            ? instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName}%20${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="course-details-author-details-dp"
                                />

                                <p className="course-details-author-details-names">
                                    {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>
                            <div className="course-details-author-details-about">
                                {instructor?.additionalDetails?.about}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            {/* ================ */}
            <Footer />

            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    );
}
