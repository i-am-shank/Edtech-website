// import components
// ================================
import "./EnrolledCourses.css";

// import hooks & React-tools
// ================================
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

// import API-call functions
// ================================
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
    // states
    // ===============
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    // Handlers
    // ===============
    // Get Enrolled Courses -------------
    const getEnrolledCourses = async () => {
        try {
            // fire API-call function
            const response = await getUserEnrolledCourses(token);
            // Update state
            setEnrolledCourses(response);
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
                    <div className="spinner"></div>
                ) : // check length of courses-array
                !enrolledCourses.length ? (
                    // Length = 0
                    <p>You have not enrolled in any course yet.</p>
                ) : (
                    <div className="enrolled-course-wrapper">
                        <div className="enrolled-courses-list-heading">
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>

                        {/* Course cards :- */}
                        <div className="enrolled-courses-list-content">
                            {enrolledCourses.map((course, index) => {
                                <div>
                                    {/* Course Details ------- */}
                                    <div className="enrolled-course-details">
                                        {/* Thumbnail */}
                                        <img src={course.thumbnail} alt="" />

                                        {/* Course Info */}
                                        <div className="enrolled-course-info">
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
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
                                        <div className="enrolled-course-progress-bar">
                                            <ProgressBar
                                                completed={
                                                    course.progressPercentage ||
                                                    0
                                                }
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
