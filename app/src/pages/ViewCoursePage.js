// import components
// =========================================
import "./ViewCoursePage.css";
import VideoDetailsSidebar from "../components/core/ViewCoursePage/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCoursePage/CourseReviewModal";

// import hooks & React-tools
// =========================================
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// import API-call functions
// =========================================
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

// import reducers (from slices)
// =========================================
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCoursePage() {
    // initialise hooks
    // ====================
    const { courseId } = useParams();
    const dispatch = useDispatch();

    // states
    // ====================
    const [reviewModal, setReviewModal] = useState(false);
    const { token } = useSelector((state) => state.auth);

    // Render Handlers
    // ====================
    useEffect(() => {
        // function definition -----------
        const setCourseSpecificDetails = async () => {
            // fire API call
            const courseData = await getFullDetailsOfCourse(courseId, token);
            // log response
            console.log("Course-data : ", courseData);

            // Update states in slices (using reducers)
            dispatch(
                setCourseSectionData(courseData.courseDetails?.courseContent)
            );
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            // Calculate lecture-count (& update it)
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
        };

        // function call ------------
        setCourseSpecificDetails();
    }, []);

    return (
        <div className="view-course-page-wrapper">
            <div className="view-course-page">
                {/* Sidebar */}
                {/* ================= */}
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                {/* Lecture Video */}
                {/* ================= */}
                <div className="view-course-lecture-wrapper">
                    <div className="view-course-lecture">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Review-Modal (for adding reviews) */}
            {/* ================== */}
            {reviewModal && (
                <CourseReviewModal setReviewModal={setReviewModal} />
            )}
        </div>
    );
}
