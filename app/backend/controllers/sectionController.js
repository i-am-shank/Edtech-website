const sectionModel = require("../models/sectionModel");
const courseModel = require("../models/courseModel");
const subSectionModel = require("../models/subSectionModel");

// =======================================
// createSection-handler
//      (create section , insert object-id in course-model)
//      When creating sub-section, insert it's id in section-model
exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body;

        // validate data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. Please try again.",
            });
        }

        // create section .. entry in db
        const newSection = await sectionModel.create({ sectionName });

        // Update section's-id in course-model
        const updatedCourseDetails = await courseModel
            .findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        courseContent: newSection._id,
                    },
                },
                { new: true }
            )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully !!",
            updatedCourseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section. Please try again",
            error: error.message,
        });
    }
};

// =======================================
// updateSection-handler
exports.updateSection = async (req, res) => {
    try {
        // fetch data (section-name)
        const { sectionName, sectionId, courseId } = req.body;

        // validate data
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties. Please try again.",
            });
        }

        // update data in section-db
        const section = await sectionModel.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        // 1st arg ==> matching condition
        // 2nd arg ==> updated properties
        // 3rd arg ==> return updated object as response

        // Generate updated-course (to return in response)
        const course = await courseModel
            .findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully !!",
            data: course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating section. Please try again.",
            error: error.message,
        });
    }
};

// =======================================
// deleteSection-handler
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        // Remove section from course -----------
        await courseModel.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        });

        // Fetch section ----------
        const section = await sectionModel.findById(sectionId);

        // Validate ----------
        console.log(sectionId, courseId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Delete all subSections -----------
        //      (of that section)
        await subSectionModel.deleteMany({ _id: { $in: section.subSection } });

        // Delete that section -----------
        await sectionModel.findByIdAndDelete(sectionId);

        // Find updated course & return ----------
        const course = await courseModel
            .findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted !",
            data: course,
        });

        // =====================================
        // =====================================

        // // fetch data (id)
        // // assuming that id is sent in params (url)
        // const { sectionId } = req.body;

        // // works with req.body (not with req.params .. check)
        // // course isn't get updated

        // // validate data
        // if (!sectionId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Section-id not found. Please try again !",
        //     });
        // }

        // // findByIdAndDelete
        // await sectionModel.findByIdAndDelete(sectionId);

        // // Do we need to delete section-entry from course-schema ?
        // // The id-arrays, which is present in course-model.

        // // return response
        // return res.status(200).json({
        //     success: true,
        //     message: "Section deleted successfully !!",
        // });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting section. Please try again.",
            error: error.message,
        });
    }
};
