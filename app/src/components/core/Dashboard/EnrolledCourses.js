// import components
// ================================
import "./EnrolledCourses.css";

// import hooks & React-tools
// ================================
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

// import API-call functions
// ================================
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
    // initialise hooks
    // ======================
    const navigate = useNavigate();

    // states
    // ======================
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    // Handlers
    // ======================
    // Get Enrolled Courses -------------
    const getEnrolledCourses = async () => {
        try {
            // fire API-call function
            const response = await getUserEnrolledCourses(token);
            // Update state
            setEnrolledCourses(response);
            console.log("Enrolled Courses : ", response);
        } catch (error) {
            // log error
            console.log("Unable to fetch enrolled courses.");
        }
    };

    // Renders
    // ==============
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="enrolled-courses">
            {/* Heading */}
            {/* ================ */}
            <h1 className="enrolled-courses-heading">Enrolled Courses</h1>

            {/* Map the Courses */}
            {/* ================ */}
            <div className="enrolled-courses-list">
                {!enrolledCourses ? (
                    // show loading
                    <div className="enrolled-courses-loader">
                        <div className="spinner"></div>
                    </div>
                ) : // check length of courses-array
                !enrolledCourses.length ? (
                    // Length = 0
                    <p className="enrolled-courses-no-courses">
                        You have not enrolled in any course yet.
                    </p>
                ) : (
                    <div className="enrolled-course-wrapper">
                        {/* Heading */}
                        {/* =================== */}
                        <div className="enrolled-courses-list-heading">
                            <p className="enrolled-courses-heading-name">
                                Course Name
                            </p>
                            <p className="enrolled-courses-heading-duration">
                                Duration
                            </p>
                            <p className="enrolled-courses-heading-progress">
                                Progress
                            </p>
                        </div>

                        {/* Course names :- */}
                        {/* =================== */}
                        <div className="enrolled-courses-list-content">
                            {enrolledCourses.map((course, index, arr) => (
                                <div
                                    className={`enrolled-courses-list-course ${
                                        index === arr.length - 1
                                            ? "enrolled-courses-list-last-course"
                                            : "enrolled-courses-list-other-course"
                                    }`}
                                    key={index}
                                >
                                    {/* Course Details ------- */}
                                    <div
                                        className="enrolled-course-details"
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                            );
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <img
                                            src={course.thumbnail}
                                            alt="course_img"
                                            className="enrolled-course-details-thumbnail"
                                        />

                                        {/* Course Info */}
                                        <div className="enrolled-course-details-info">
                                            <p className="enrolled-course-info-name">
                                                {course.courseName}
                                            </p>
                                            <p className="enrolled-course-info-description">
                                                {course.courseDescription
                                                    .length > 50
                                                    ? `${course.courseDescription.slice(
                                                          0,
                                                          50
                                                      )}...`
                                                    : course.courseDescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration -------- */}
                                    <div className="enrolled-course-duration">
                                        {course?.totalDuration}
                                    </div>

                                    {/* Progress --------- */}
                                    <div className="enrolled-course-progress">
                                        <p className="enrolled-course-progress-text">
                                            Progress:{" "}
                                            {course.progressPercentage || 0}%
                                        </p>

                                        {/* Progress bar */}
                                        <ProgressBar
                                            completed={
                                                course.progressPercentage || 0
                                            }
                                            height="8px"
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
