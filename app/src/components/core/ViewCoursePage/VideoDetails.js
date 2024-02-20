// import components
// =========================================
import "./VideoDetails.css";
import IconBtn from "../../common/IconBtn";

// import hooks & React-tools
// =========================================
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

// import API-call functions
// =========================================
import { markLectureAsCompleted } from "../../../services/operations/courseDetailsAPI";

// import reducers (from slice)
// =========================================
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

export default function VideoDetails() {
    // initialise hooks
    // ==================
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerReference = useRef();
    const location = useLocation();

    // states
    // ==================
    const { courseId, sectionId, subSectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse);
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewSource, setPreviewSource] = useState("");

    // Render Handlers
    // ==================
    //     (handle first render)
    useEffect(() => {
        // function definition ----------
        const setVideoSpecificDetails = async () => {
            // Validate data
            if (!courseSectionData.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            } else {
                // All 3 ids are present
                // fetch the active-lecture id
                const filteredSection = courseSectionData.filter(
                    (course) => course._id === sectionId
                );

                const filteredVideoData =
                    filteredSection?.[0]?.subSection.filter(
                        (lecture) => lecture._id === subSectionId
                    );

                // Update the video-data
                setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail);
                setVideoEnded(false);
            }
        };

        // function call ----------
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // Handlers
    // ==================
    //     (No prev. btn on 1st video.. to handle this)
    const isFirstVideo = () => {
        // 1st video .. 1st subSection of 1st section
        //    (both section-index & subSection-index .. 0)

        // fetch indices -----------
        //      (of section & subSection)
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        // Logic ------------
        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        } else {
            return false;
        }
    };

    //     (No next. btn on last video.. to handle this)
    const isLastVideo = () => {
        // Last video .. last subSection of last section
        //    (section-index === secion.length-1)
        //    (subsection-index === subsection.length-1)

        // fetch indices ------------
        //      (of section & subSection)
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        // Calculate array lengths -----------
        const sectionCount = courseSectionData.length;
        const subSectionCount =
            courseSectionData[currentSectionIndex].subSection.length;

        // Logic -------------
        if (
            currentSectionIndex === sectionCount - 1 &&
            currentSubSectionIndex === subSectionCount - 1
        ) {
            return true;
        } else {
            return false;
        }
    };

    //     (To handle navigation .. following 2 handlers)
    const goToPrevVideo = () => {
        // If subSection is not the 1st video of section.. go to prev. video of that section
        // Else .. go to last video of prev. section

        // fetch section & subSection indices -------------
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSubSectionIndex !== 0) {
            // go to the prev. video in same section
            const prevSubSectionId =
                courseSectionData[currentSectionIndex].subSection[
                    currentSubSectionIndex - 1
                ]._id;

            // navigate to the video
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } else {
            // go to last video of prev. section
            const prevSectionId =
                courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionCount =
                courseSectionData[currentSectionIndex - 1].subSection.length;

            const prevSubSectionId =
                courseSectionData[currentSectionIndex - 1].subSection[
                    prevSubSectionCount - 1
                ]._id;

            // navigate to the video
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }
    };

    const goToNextVideo = () => {
        // If next video exists in current section.. go to it.
        // Else.. go to 1st video of next section

        // fetch section & subSection indices -------------
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId);

        // fetch array counts -----------
        const subSectionCount =
            courseSectionData[currentSectionIndex].subSection.length;

        if (currentSubSectionIndex !== subSectionCount - 1) {
            // go to next lecture in same section
            const nextSubSectionId =
                courseSectionData[currentSectionIndex].subSection[
                    currentSubSectionIndex + 1
                ]._id;

            // navigate to the video
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } else {
            // go to 1st lecture of next section

            const nextSectionId =
                courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId =
                courseSectionData[currentSectionIndex + 1].subSection[0]._id;

            // navigate to the video
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    };

    const handleLectureCompletion = async () => {
        // dummy code.. as no controller for
        //   "Update Course Progress"

        // start loading ----------
        setLoading(true);

        // fire API-call (mark completed)
        const response = await markLectureAsCompleted(
            {
                courseId: courseId,
                subSectionId: subSectionId,
            },
            token
        );

        // Update state ----------
        if (response) {
            console.log("Firing update-completed-lectures !");
            dispatch(updateCompletedLectures(subSectionId));
        }

        // hide loading ---------
        setLoading(false);
    };

    return (
        <div className="video-details">
            {!videoData ? (
                <img
                    src={previewSource}
                    alt="Preview"
                    className="video-details-no-video"
                />
            ) : (
                <Player
                    ref={playerReference}
                    aspectRatio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                >
                    <BigPlayButton position="center" />

                    {/* Btns */}
                    {/* ================= */}
                    {/*     (render when video ends) */}
                    {videoEnded && (
                        <div className="video-details-btns full">
                            {/* Mark as completed btn ------------- */}
                            {!completedLectures.includes(subSectionId) && (
                                <IconBtn
                                    disabled={loading}
                                    onClick={() => handleLectureCompletion()}
                                    text={
                                        !loading
                                            ? "Mark As Completed"
                                            : "Loading..."
                                    }
                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                />
                            )}

                            {/* Rewatch btn -------------- */}
                            <IconBtn
                                disabled={loading}
                                onClick={() => {
                                    if (playerReference?.current) {
                                        playerReference.current?.seek(0);
                                        setVideoEnded(false);
                                    }
                                }}
                                text="Rewatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            />

                            {/* Prev & Next btn --------------- */}
                            <div className="video-details-prev-next-btns">
                                {/* Previous btn */}
                                {!isFirstVideo() && (
                                    <button
                                        className="video-details-prev-btn"
                                        onClick={() => goToPrevVideo()}
                                        disabled={loading}
                                    >
                                        Prev
                                    </button>
                                )}

                                {/* Next btn */}
                                {!isLastVideo() && (
                                    <button
                                        className="video-details-next-btn"
                                        onClick={() => goToNextVideo()}
                                        disabled={loading}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}

            {/* Video titles */}
            {/* ================== */}
            <h1 className="video-details-video-title">{videoData?.title}</h1>
            <p className="video-details-video-desc">{videoData?.description}</p>
        </div>
    );
}
