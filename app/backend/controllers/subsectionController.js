const subsectionModel = require("../models/subSectionModel");
// title, duration, description, url

const sectionModel = require("../models/sectionModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const subSectionModel = require("../models/subSectionModel");
require("dotenv").config();

// ========================================
// createSubsection-handler
exports.createSubsection = async (req, res) => {
    try {
        // fetch data (from req.body)
        const { sectionId, title, description } = req.body;

        // extract files/video
        const video = req.files.video;

        // validate data
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. Please try again.",
            });
        }
        // console.log("Lecture video : ", video);
        // store video-url (have to upload to cloudinary)
        // upload to cloudinary -------------
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        // create a sub-section -------------
        const subSectionDetails = await subsectionModel.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update section with this sub-section ---------
        //      (reference.. store id)
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
            data: updatedSection,
        });
    } catch (error) {
        console.error("Error creating new sub-section : ", error);
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
        // fetch updated-data values -----------
        const { sectionId, subSectionId, title, description } = req.body;

        // fetch target sub-section -----------
        const subSection = await subSectionModel.findById(subSectionId);

        // validate -----------
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Update subSection-data (as per new values)
        if (title !== undefined) {
            subSection.title = title;
        }
        if (description !== undefined) {
            subSection.description = description;
        }
        if (req.files && req.files.video !== undefined) {
            // Fetch video file & upload to cloudinary ------------
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            // Update video related data-values ----------
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        // Save the changes to subSection ----------
        await subSection.save();

        // fetch updated-section
        const updatedSection = await sectionModel
            .findById(sectionId)
            .populate("subSection");

        // return response ----------
        return res.json({
            success: true,
            data: updatedSection,
            message: "Section Updated Successfully !",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occured while updating the section",
        });
    }
};

// ========================================
// deleteSubsection-handler
exports.deleteSubsection = async (req, res) => {
    try {
        // fetch subSection & section ids -----------
        const { subSectionId, sectionId } = req.body;

        // Update section (removing subSection from it) ------------
        await sectionModel.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );

        // Delete subSection -----------
        const subSection = await subSectionModel.findByIdAndDelete({
            _id: subSectionId,
        });

        // Validate Deletion (accordingly return response)
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found, hence not deleted !",
            });
        } else {
            // Return updated-section (after subSection deleted.)
            const updatedSection = await sectionModel
                .findById(sectionId)
                .populate("subSection");

            return res.status(200).json({
                success: true,
                data: updatedSection,
                message: "SubSection deleted successfully !",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occured while deleting the SubSection !",
        });
    }
};
