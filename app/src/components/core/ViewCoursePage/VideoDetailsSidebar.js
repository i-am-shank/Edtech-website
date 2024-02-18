// import components
// ====================================
import "./VideoDetailsSidebar.css";

// import hooks & React-tools
// =====================================
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";

// import assets
// =====================================
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function VideoDetailsSidebar({ setReviewModal }) {
    // initialise hooks
    // =================
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();

    // states
    // =================
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    // Render handlers
    // =================
    useEffect(() => {
        // function definition -----------
        const setActiveFlags = () => {
            console.log("Completed Lectures : ", completedLectures);
            if (!courseSectionData.length) {
                // no data in section.. nothing to do
                return;
            } else {
                // fetch section-index (from section-id in url)
                const currentSectionIndex = courseSectionData.findIndex(
                    (data) => data._id === sectionId
                );

                // fetch subsection-index (from subsection-id in url & section-index)
                const currentSubSectionIndex = courseSectionData?.[
                    currentSectionIndex
                ]?.subSection.findIndex((data) => data._id === subSectionId);

                // fetch section-id
                const activeSectionId =
                    courseSectionData?.[currentSectionIndex]?._id;

                // fetch subSection-id (lecture visible)
                const activeSubSectionId =
                    courseSectionData[currentSectionIndex]?.subSection?.[
                        currentSubSectionIndex
                    ]?._id;

                // Update current-section state
                setActiveStatus(activeSectionId);
                // Update current-subsection state
                setVideoBarActive(activeSubSectionId);
            }
        };

        // function call ----------
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // Handlers
    // =================

    return (
        <div className="video-details-sidebar-wrapper">
            <div className="video-details-sidebar">
                {/* Buttons & Headings */}
                {/* ================== */}
                <div className="video-details-btns-headings">
                    {/* Buttons ----------- */}
                    <div className="video-details-btns">
                        {/* Back btn */}
                        <button
                            className="video-details-back-btn"
                            onClick={() => {
                                navigate("/dashboard/enrolled-courses");
                            }}
                        >
                            <IoIosArrowBack size={30} />
                        </button>

                        {/* Add Review btn */}
                        <IconBtn
                            text="Add Review"
                            onClick={() => setReviewModal(true)}
                            customClasses="ml-auto"
                        />
                    </div>

                    {/* Headings ----------- */}
                    <div className="video-details-headings">
                        {/* Course title */}
                        <p>{courseEntireData?.courseName}</p>

                        {/* Lecture count fraction */}
                        <p className="video-details-lecture-cnt">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                {/* Sections & Subsections */}
                {/* ================== */}
                <div className="video-details-sections-subsections">
                    {courseSectionData.map((section, index) => (
                        <div
                            className="video-details-section"
                            key={index}
                            onClick={() => setActiveStatus(section?._id)}
                        >
                            {/* section-title ------------ */}
                            <div className="video-details-section-title">
                                {/* Section name */}
                                <div className="video-details-section-name">
                                    {section?.sectionName}
                                </div>

                                {/* Arrow icon (with rotate logic) */}
                                <div className="video-details-section-icon-wrapper">
                                    <span
                                        className={`video-details-section-icon ${
                                            activeStatus ===
                                            section?.sectionName
                                                ? "video-details-section-active-icon"
                                                : "video-details-section-inactive-icon"
                                        }`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>

                            {/* subsections ------------ (if active section) */}
                            <div className="video-details-subsections-wrapper">
                                {activeStatus === section?._id && (
                                    <div className="video-details-subsections transtion-[height]">
                                        {section.subSection.map(
                                            (lecture, idx) => (
                                                <div
                                                    className={`video-details-subsection ${
                                                        videoBarActive ===
                                                        lecture._id
                                                            ? "video-details-subsection-active"
                                                            : "video-details-subsection-inactive"
                                                    }`}
                                                    key={idx}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture?._id}`
                                                        );
                                                        setVideoBarActive(
                                                            lecture?._id
                                                        );
                                                    }}
                                                >
                                                    {/* checkbox */}
                                                    <input
                                                        type="checkbox"
                                                        checked={completedLectures.includes(
                                                            lecture?._id
                                                        )}
                                                        onChange={() => {}}
                                                    />

                                                    {/* lecture-name */}
                                                    <span>
                                                        {lecture?.title}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                        )
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
