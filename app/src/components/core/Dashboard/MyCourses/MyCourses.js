// import components
// ================================
import "./MyCourses.css";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "./CoursesTable";

// import hooks & React-tools
// ================================
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import API call functions
// ================================
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";

// import assets
// ================================
import { VscAdd } from "react-icons/vsc";

// tab only for instructor
export default function MyCourses() {
    // initialise hooks
    // ===============
    const navigate = useNavigate();

    // states
    // ===============
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);

    // Render handlers
    // ===============
    useEffect(() => {
        const fetchCourses = async () => {
            // fire API call ----------
            const response = await fetchInstructorCourses(token);
            if (response) {
                setCourses(response);
            }
        };

        // function call
        fetchCourses();
    }, []);

    return (
        <div className="my-courses">
            <div className="my-courses-header">
                <h1 className="my-courses-heading">My Courses</h1>
                <IconBtn
                    text="Add Course"
                    onClick={() => navigate("/dashboard/add-course")}
                >
                    <VscAdd />
                </IconBtn>
            </div>

            {courses && (
                <CoursesTable courses={courses} setCourses={setCourses} />
            )}
        </div>
    );
}
