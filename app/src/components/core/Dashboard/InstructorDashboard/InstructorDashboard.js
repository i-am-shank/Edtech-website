// import components
// =======================================
import "./InstructorDashboard.css";
import InstructorChart from "./InstructorChart";

// import hooks & React-tools
// =======================================
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// import API-call functions
// =======================================
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";

export default function InstructorDashboard() {
    // states
    // ==================
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    // Render handlers
    // ==================
    useEffect(() => {
        // function definition -----------
        const getCourseDataWithStats = async () => {
            // show loading
            setLoading(true);

            // fire API-call
            const instructorApiData = await getInstructorData(token);
            const instructorCoursesData = await fetchInstructorCourses(token);

            console.log("Instructor-Api data : ", instructorApiData);

            // Condition over API-response
            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if (instructorCoursesData) {
                setCourses(instructorCoursesData);
            }

            // hide loading
            setLoading(false);
        };

        // function call ------------
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    );
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );

    return (
        <div className="instructor-dboard-wrapper">
            <div className="instructor-dboard">
                {/* Header */}
                {/* ================ */}
                <div className="instructor-dboard-header">
                    <h1 className="instructor-dboard-header-heading">
                        Hi {user?.firstName}
                    </h1>
                    <p className="instructor-dboard-header-para">
                        Let's start something new
                    </p>
                </div>

                {loading ? (
                    <div className="loading-wrapper">
                        <div className="spinner"></div>
                    </div>
                ) : courses.length > 0 ? (
                    <div>
                        {/* Visualize & Stats */}
                        {/* ================ */}
                        <div>
                            {/* Pie chart  OR  No chart */}
                            {/* ============== */}
                            {totalAmount > 0 || totalStudents > 0 ? (
                                <InstructorChart courses={instructorData} />
                            ) : (
                                <div className="instructor-dboard-no-chart">
                                    <p className="instructor-dboard-no-chart-heading">
                                        Visualize
                                    </p>
                                    <p className="instructor-dboard-no-chart-para">
                                        Not Enough Data to Visualize
                                    </p>
                                </div>
                            )}

                            {/* Statistics */}
                            {/* ============== */}
                            <div className="instructor-dboard-statistics">
                                <p className="instructor-dboard-statistics-heading">
                                    Statistics
                                </p>

                                <div className="instructor-dboard-statistics-stats">
                                    {/* Courses ----------- */}
                                    <div>
                                        <p className="instructor-dboard-stat-heading">
                                            Total Courses
                                        </p>
                                        <p className="instructor-dboard-stat-data">
                                            {courses.length}
                                        </p>
                                    </div>

                                    {/* Students ----------- */}
                                    <div>
                                        <p className="instructor-dboard-stat-heading">
                                            Total Students
                                        </p>
                                        <p className="instructor-dboard-stat-data">
                                            {totalStudents}
                                        </p>
                                    </div>

                                    {/* Income ----------- */}
                                    <div>
                                        <p className="instructor-dboard-stat-heading">
                                            Total Income
                                        </p>
                                        <p className="instructor-dboard-stat-data">
                                            {totalAmount}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Your Courses */}
                        {/* ================ */}
                        <div className="instructor-dboard-courses">
                            {/* Courses Heading ------------ */}
                            <div className="instructor-dboard-courses-header">
                                <p className="instructor-dboard-courses-header-heading">
                                    Your Courses
                                </p>
                                <NavLink to="/dashboard/my-courses">
                                    <p className="instructor-dboard-courses-header-para">
                                        View all
                                    </p>
                                </NavLink>
                            </div>

                            {/* Courses ------------- */}
                            <div className="instructor-dboard-courses-wrapper">
                                {courses.slice(0, 3).map((course) => (
                                    <div
                                        className="instructor-dboard-course"
                                        key={course._id}
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="instructor-dboard-course-thumbnail"
                                        />
                                        <div className="instructor-dboard-course-details">
                                            <p className="instructor-dboard-course-name">
                                                {course.courseName}
                                            </p>
                                            <div className="instructor-dboard-course-stat">
                                                <p className="instructor-dboard-course-stat-data">
                                                    {
                                                        course.studentsEnrolled
                                                            .length
                                                    }{" "}
                                                    {course.studentsEnrolled
                                                        .length > 1
                                                        ? " students"
                                                        : " student"}
                                                </p>
                                                <p className="instructor-dboard-course-stat-data">
                                                    {" "}
                                                    |{" "}
                                                </p>
                                                <p className="instructor-dboard-course-stat-data">
                                                    ₹ {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // No Courses
                    // ==================
                    <div className="instructor-dboard-no-courses">
                        <p className="instructor-dboard-no-courses-heading">
                            You have not create any courses yet.
                        </p>
                        <NavLink to="/dashboard/addCourse">
                            <p className="instructor-dboard-no-courses-btn">
                                Create a Course
                            </p>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}
