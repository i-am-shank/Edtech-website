// import components
// ======================================
import "./EditCourse.css";
import RenderSteps from "../AddCourse/RenderSteps";

// import hooks & React-tools
// ======================================
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import API-call functions
// ======================================
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";

// import reducers (from slices)
// ======================================
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

export default function EditCourse() {
    // initialise hooks
    // ==================
    const dispatch = useDispatch();

    // constants
    // ==================
    const { courseId } = useParams();

    // states
    // ==================
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    // Render handlers
    // ==================
    useEffect(() => {
        // function definition ----------
        const populateCourseDetails = async () => {
            // start loading ----------
            setLoading(true);

            // fire API-call ----------
            const response = await getFullDetailsOfCourse(courseId, token);

            // condition over API-response -----------
            if (response?.courseDetails) {
                // Update course-edit state -----------
                dispatch(setEditCourse(true));

                // Update the course --------
                dispatch(setCourse(response?.courseDetails));
            }

            // stop loading ----------
            setLoading(false);
        };

        // function call -----------
        populateCourseDetails();
    }, []);

    // Loader handlers
    // ==================

    if (loading) {
        // return loader --------
        return (
            <div className="edit-course-loader">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="edit-course">
            <h1 className="edit-course-heading">Edit Course</h1>

            {/* If course has data.. show it */}
            <div className="edit-course-content">
                {course ? (
                    <RenderSteps />
                ) : (
                    <p className="edit-course-no-course-found">
                        Course Not Found
                    </p>
                )}
            </div>
        </div>
    );
}
