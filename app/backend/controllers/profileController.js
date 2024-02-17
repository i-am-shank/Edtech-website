// import modules =========================
require("dotenv").config();

const courseProgressModel = require("../models/courseProgressModel");
// import-models ==============================
const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");

// import util-files ==============================
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// ========================================
// updateProfile-handler
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const {
            dateOfBirth = "",
            about = "",
            contactNumber,
            gender,
        } = req.body;

        // fetch user-id (from req.user .. inserted in auth-middleware)
        const id = req.user.id;

        // validate data
        if (!contactNumber || !dateOfBirth || !id) {
            return res.status(400).json({
                success: false,
                message: "Please fill the compulsory fields, marked with *.",
            });
        }

        // find user-details by id
        const currUserDetails = await userModel.findById(id);

        // fetch profile (additionalDetails)
        const profileDetails = await profileModel.findById(
            currUserDetails.additionalDetails
        );

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        // Now, the profile-details object is updated, but to save changes in db :-
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully !!",
            profileDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// ========================================
// profileDelete-handler
exports.deleteAccount = async (req, res) => {
    try {
        // fetch data (id)
        const id = req.user.id;

        // validate data
        const userDetails = await userModel.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete this user's profile first, from profile-model
        await profileModel.findByIdAndDelete({
            _id: userDetails.additionalDetails,
        });

        // Then delete the user-entry from user-model
        await userModel.findByIdAndDelete({ _id: id });

        // TODO : Unenroll user from all enrolled-courses (before deleting user-entry)
        // TODO : How can we schedule a request ?
        // TODO : What is a cron-job ?

        // return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully !!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully !",
        });
    }
};

// ============================================
// getAllUserDetails-handler
exports.getAllUserDetails = async (req, res) => {
    try {
        // fetch data (id .. req.user)
        const id = req.user.id;

        // validate data
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is invalid. Please try again.",
            });
        }

        // get all details from db-call
        const userDetails = await userModel
            .findById(id)
            .populate("additionalDetails")
            .exec();
        console.log(userDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "User's data is fetched successfully !!",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================
// updateDP-handler
exports.updateDisplayPicture = async (req, res) => {
    try {
        // fetch picture
        const displayPicture = req.files.displayPicture;

        // fetch user-id
        const userId = req.user.id;

        // upload to cloudinary
        // (args --> file, folder, height, quality)
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);

        // put secure_url to the profile (update)
        // (args --> matching-condition, change, options)
        const updatedProfile = await userModel.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );

        // return response
        res.status(200).json({
            success: true,
            message: "Image Updated Successfully !",
            data: updatedProfile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =================================================
// getEnrolledCourses-handler
exports.getEnrolledCourses = async (req, res) => {
    try {
        // fetch id --> fetch userDetails (with courses)
        const userId = req.user.id;
        let userDetails = await userModel
            .findOne({
                _id: userId,
            })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        // ******************************
        // Below calculation (for progress percentage, in enrolled-courses page)

        userDetails = userDetails.toObject();
        // converting from document to object (to operate over it)

        // iterate over all courses ------------
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            var subSectionLength = 0;
            // total lecture-count --> needed for each course
            //      (for getting %)

            // iterate over sections ------------
            for (
                var j = 0;
                j < userDetails.courses[i].courseContent.length;
                j++
            ) {
                // Add total-duration (of j-th section, of i-th course)
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce(
                    (sum, curr) => sum + parseInt(curr.timeDuration),
                    0
                );

                // Update total-duration field
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                );

                // Add lecture-count (of j-th section, of i-th course)
                subSectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length;
            }

            // fetch completed-lecture-count of ith-course
            let courseProgressCount = await courseProgressModel.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            });
            courseProgressCount = courseProgressCount?.completedVideos.length;

            if (subSectionLength === 0) {
                // No lectures in course --> 100% complete
                //    (edge-case as this is denominator in calculating % .. & 0 can't be in denom)
                userDetails.courses[i].progressPercentage = 100;
            } else {
                // To make it to 2-decimal --> need multiplier
                const multiplier = Math.pow(10, 2);

                // Calculate progress-percentage ----------
                let percentProgress =
                    Math.round(
                        (courseProgressCount / subSectionLength) *
                            100 *
                            multiplier
                    ) / multiplier;
                // console.log(
                //     "Progress percent (profile-controller) : ",
                //     percentProgress
                // );
                userDetails.courses[i].progressPercentage = percentProgress;
            }
        }

        // ******************************

        // validation ------------
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Couldn't find any user with id: ${userId}`,
            });
        }

        // return response -------------
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
            message: "All enrolled-courses of the user fetched successfully !",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =================================================
// instructorDashboard-handler
exports.instructorDashboard = async (req, res) => {
    try {
    } catch (error) {}
};
