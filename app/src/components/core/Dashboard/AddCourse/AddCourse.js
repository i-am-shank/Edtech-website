// import components
// ===============================
import "./AddCourse.css";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    return (
        <div className="add-course-wrapper">
            <div className="add-course">
                {/* Heading & Form */}
                {/* ==================== */}
                <div className="add-course-content">
                    {/* Heading ------------ */}
                    <h1 className="add-course-heading">Add Course</h1>

                    {/* Form ------------ */}
                    {/* Conditionally show 1 of 3 forms */}
                    <div className="add-course-form">
                        <RenderSteps />
                    </div>
                </div>

                {/* Instructions */}
                {/* ==================== */}
                <div className="add-course-instructions">
                    <p className="add-course-instructions-heading">
                        Code Upload Tips
                    </p>
                    <ul className="add-course-instructions-list">
                        <li>Set the Course Price option or make it free.</li>
                        <li>
                            Standard size for the course thumbnail is 1024x578.
                        </li>
                        <li>
                            Video section contains the course overview video.
                        </li>
                        <li>
                            Course Builder is where you create & organise a
                            course.
                        </li>
                        <li>
                            Add Topics in the Course Builder section to create
                            lessons, quizzes, and assignments.
                        </li>
                        <li>
                            Information from the Additional Data section shows
                            up in the course single page.
                        </li>
                        <li>
                            Make Announcements to notify any important notes to
                            all enrolled students at once.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
