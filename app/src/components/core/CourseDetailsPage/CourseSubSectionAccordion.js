// import components
// ====================
import "./CourseSubSectionAccordion.css";

// import assets
// ====================
import { HiOutlineVideoCamera } from "react-icons/hi";

export default function CourseSubSectionAccordion({ subSection }) {
    return (
        <div className="course-subsection-accordion-wrapper">
            <div className="course-subsection-accordion">
                <div className="course-subsection-accordion-content">
                    <span>
                        <HiOutlineVideoCamera />
                    </span>

                    <p>{subSection?.title}</p>
                </div>
            </div>
        </div>
    );
}
