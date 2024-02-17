// import components
// ===========================================
import "./CourseAccordionBar.css";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

// import hooks & React-tools
// ===========================================
import { useEffect, useState, useRef } from "react";

// import assets
// ===========================================
import { AiOutlineDown } from "react-icons/ai";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
    // initialise hooks
    // ==================
    const contentEl = useRef(null);

    // states
    // ==================
    const [active, setActive] = useState(false);
    const [sectionHeight, setSectionHeight] = useState(0);

    // Render handlers
    // ==================
    useEffect(() => {
        setActive(isActive?.includes(course._id));
    }, [isActive]);

    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0);
    }, [active]);

    return (
        <div className="course-accordion-bar">
            {/* Section titles */}
            {/* =================== */}
            <div className="course-accordion-section-titles-wrapper">
                <div
                    className="course-accordion-section-titles"
                    onClick={() => {
                        handleActive(course._id);
                    }}
                >
                    {/* Section name ----------- */}
                    <div className="course-accordion-section-name">
                        <i
                            className={
                                isActive.includes(course._id)
                                    ? "course-accordion-section-icon-active"
                                    : "course-accordion-section-icon-inactive"
                            }
                        >
                            <AiOutlineDown />
                        </i>
                        <p>{course?.sectionName}</p>
                    </div>

                    {/* Lecture count ------------ */}
                    <div className="course-accordion-lecture-cnt-wrapper">
                        <span className="course-accordion-lecture-cnt">
                            {`${course.subSection.length || 0} lecture(s)`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Subsection (lectures) list */}
            {/* =================== */}
            <div
                className="course-accordion-subsection-list-wrapper"
                ref={contentEl}
                style={{
                    height: sectionHeight,
                }}
            >
                <div className="course-accordion-subsection-list">
                    {course?.subSection?.map((subSection, index) => {
                        return (
                            <CourseSubSectionAccordion
                                subSection={subSection}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
