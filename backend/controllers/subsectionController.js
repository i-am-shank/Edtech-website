const subsectionModel = require("../models/subSectionModel");
// title, duration, description, url

const sectionModel = require("../models/sectionModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// ========================================
// createSubsection-handler
exports.createSubsection = async (req, res) => {
    try {
        // fetch data (from req.body)
        const { sectionId, title, timeDuration, description } = req.body;

        // extract files/video
        const video = req.files.videoFile;

        // validate data
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. Please try again.",
            });
        }
        // store video-url (have to upload to cloudinary)
        // upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        // create a sub-section
        const subSectionDetails = await subsectionModel.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update section with this sub-section (reference.. store id)
        const updatedSection = await sectionModel
            .findByIdAndUpdate(
                {
                    _id: sectionId,
                },
                {
                    $push: {
                        subSection: subSectionDetails._id,
                    },
                },
                { new: true }
            )
            .populate("subSection")
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-section created successfully !!",
            updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, while creating sub-section.",
            error: error.message,
        });
    }
};

// ========================================
// updateSubsection-handler
exports.updateSubsection = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({
            success: false,
            message,
        });
    }
};

// ========================================
// deleteSubsection-handler
exports.deleteSubsection = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
