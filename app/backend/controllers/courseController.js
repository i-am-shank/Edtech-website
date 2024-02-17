// import models
// =================================
const courseModel = require("../models/courseModel");
const categoryModel = require("../models/categoryModel");
const userModel = require("../models/userModel");
const courseProgressModel = require("../models/courseProgressModel");
const sectionModel = require("../models/sectionModel");
const subSectionModel = require("../models/subSectionModel");

// import utility-function
// =================================
const { convertSecondsToDuration } = require("../utils/secToDuration");

// Utility file to upload image to media-server
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// createCourse-handler
// ========================================
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,
            category,
            status,
            instructions: _instructions,
        } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Convert tag & instructions (from stringified-array to array)
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        console.log("tag : ", tag);
        console.log("instructions : ", instructions);

        // validation
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !instructions.length
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. Please try again.",
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }

        // Authorize -- Instructor (only this accountType can create courses)
        const userId = req.user.id;
        const instructorDetails = await userModel.findById(userId, {
            accountType: "Instructor",
        });
        console.log("Instructor Details : ", instructorDetails);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found !!",
            });
        }

        // Validate category
        // In course-model, category is reference of a category from category-model, i.e. category is an id
        const categoryDetails = await categoryModel.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category is not found !!",
            });
        }

        // Upload image on cloudinary -- secure url in response
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);

        // Create course entry in db
        // (instructor --> reference, i.e. id)
        const newCourse = await courseModel.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions,
        });

        // Add course entry in user-schema too
        await userModel.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // Add course entry in tag-schema too
        await categoryModel.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully !!",
            data: newCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

// getAllCourses-handler
// ========================================
exports.getAllCourses = async (req, res) => {
    try {
        // Fetch all courses (with instructor) -----------
        const allCourses = await courseModel
            .find(
                {
                    status: "Published",
                },
                {
                    courseName: true,
                    price: true,
                    thumbnail: true,
                    instructor: true,
                    ratingAndReviews: true,
                    studentsEnrolled: true,
                }
            )
            .populate("instructor")
            .exec();

        // return response -----------
        return res.status(200).json({
            success: true,
            data: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: "Can't fetch All-Courses",
            error: error.message,
        });
    }
};

// getCourseDetails-handler
// ========================================
exports.getCourseDetails = async (req, res) => {
    try {
        // fetch data (courseId .. req.body)
        const { courseId } = req.body;

        // Query all properties.. also populating many (stored as ids)
        const courseDetails = await courseModel
            .find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl",
                },
            })
            .exec();
        // Nested query.. populated.. & executed

        // Validate data
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `No Course found with id : ${courseId} !`,
            });
        }

        // // Calculate totalDuration -----------
        let totalDurationInSeconds = 0;
        courseDetails.forEach((course) => {
            course.courseContent.forEach((section) => {
                section.subSection.forEach((subSection) => {
                    const timeDurationInSeconds = parseInt(
                        subSection.timeDuration
                    );
                    totalDurationInSeconds += timeDurationInSeconds;
                });
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: {
                courseDetails,
                totalDuration,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getFullCourseDetails-handler
// ========================================
exports.getFullCourseDetails = async (req, res) => {
    try {
        // fetch data -----------
        const { courseId } = req.body;
        const userId = req.user.id;

        // fetch courseDetails (populating all fields) -----------
        //    (instructor-additionalDetails, category, ratingAndReviews, courseContent-subSection)
        const courseDetails = await courseModel
            .findOne({
                _id: courseId,
            })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // Get course-progress count -----------
        let courseProgressCount = await courseProgressModel.findOne({
            courseId: courseId,
            userId: userId,
        });
        console.log("courseProgressCount : ", courseProgressCount);

        // Validate courseDetails -----------
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }

        // Calculate total-duration
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            });
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // return response ------------
        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getInstructorCourses-handler
// ========================================
exports.getInstructorCourses = async (req, res) => {
    try {
        console.log("In getInstructorCourses controller");
        // fetch data ----------
        const instructorId = req.user.id;

        // find courses belonging to instructor ----------
        const instructorCourses = await courseModel
            .find({
                instructor: instructorId,
            })
            .sort({
                createdAt: -1,
            });

        console.log("Instructor Courses (controller) : ", instructorCourses);

        // return response ----------
        return res.status(200).json({
            success: true,
            data: instructorCourses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};

// editCourse-handler
// ========================================
exports.editCourse = async (req, res) => {
    try {
        // fetch data ----------
        const { courseId } = req.body;
        const updates = req.body;

        // fetch course ----------
        const course = await courseModel.findById(courseId);

        // validate course ----------
        if (!course) {
            return res.status(404).json({
                error: "Course not found",
            });
        }

        // If thumbnail img if found, update it -----------
        if (req.files) {
            console.log("thumbnail update");
            // fetch img
            const thumbnail = req.files.thumbnailImage;
            // upload to cloudinary & update-url
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Upload only fields (present in request body)
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        // Save the updated-course ----------
        await course.save();

        // Fetch all details of updated-course ----------
        const updatedCourse = await courseModel
            .findOne({
                _id: courseId,
            })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // return response ----------
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, in editing-course",
            error: error.message,
        });
    }
};

// deleteCourse-handler
// ========================================
exports.deleteCourse = async (req, res) => {
    try {
        // fetch data ---------
        const { courseId } = req.body;

        // fetch the course & validate it ----------
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        // Unenroll students from the course ---------
        //    (pull the course from all students-courses.)
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await userModel.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            });
        }

        // sections & sub-sections are removed ----------
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            // Delete subSections
            const section = await sectionModel.findById(sectionId);
            if (section) {
                const subSections = section.subSection;
                for (const subSectionId of subSections) {
                    await subSectionModel.findByIdAndDelete(subSectionId);
                }
            }

            // Delete section
            await sectionModel.findByIdAndDelete(sectionId);
        }

        // Delete course ----------
        await courseModel.findByIdAndDelete(courseId);

        // return response ----------
        return res.status(200).json({
            success: true,
            message: "Course delete successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
