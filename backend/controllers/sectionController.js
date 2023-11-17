const sectionModel = require("../models/sectionModel");
const courseModel = require("../models/courseModel");

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
        const { sectionName, sectionId } = req.body;

        // validate data
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties. Please try again.",
            });
        }

        // update data in db
        const section = await sectionModel.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        // 1st arg ==> matching condition
        // 2nd arg ==> updated properties
        // 3rd arg ==> return updated object as response

        // No need to update in course.. as course has id stored in it, which will be constant even after update

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully !!",
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
        // fetch data (id)
        // assuming that id is sent in params (url)
        const { sectionId } = req.params;

        // validate data
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "Section-id not found. Please try again !",
            });
        }

        // findByIdAndDelete
        await sectionModel.findByIdAndDelete(sectionId);

        // Do we need to delete section-entry from course-schema ?
        // The id-arrays, which is present in course-model.

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully !!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting section. Please try again.",
            error: error.message,
        });
    }
};
