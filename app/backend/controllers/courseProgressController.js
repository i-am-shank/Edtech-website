// Whenever student enrolls --> assign course-progress = 0

// import models
// ====================================
const courseProgressModel = require("../models/courseProgressModel");
const subSectionModel = require("../models/subSectionModel");

exports.updateCourseProgress = async (req, res) => {
    // fetch data ----------
    //      (course-id, sub-section-id)
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if subsection is valid ----------
        const subSection = await subSectionModel.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                error: "Invalid SubSection",
            });
        }

        // Check for any old entry
        let courseProgress = await courseProgressModel.findOne({
            courseId: courseId,
            userId: userId,
        });
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress doesn't exists",
            });
        } else {
            // An old entry exists
            // Check if already-completed subSection
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error: "SubSection already completed !",
                });
            } else {
                // Mark subSection as completed -----------
                courseProgress.completedVideos.push(subSectionId);
                // Also save the entry into db
                await courseProgress.save();

                // return response -----------
                return res.status(200).json({
                    success: true,
                    message: "Course Progress Updated !",
                    data: courseProgress,
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
