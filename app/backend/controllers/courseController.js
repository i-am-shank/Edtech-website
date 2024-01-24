const courseModel = require("../models/courseModel");
const categoryModel = require("../models/categoryModel");
const userModel = require("../models/userModel");

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
            // tag,
            category,
            status,
            instructions,
            // thumbnail,
        } = req.body;

        // get thumbnail
        // const thumbnailImg = req.files.thumbnail;

        // validation
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            // !tag ||
            !category
            // !thumbnailImg
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
        // const thumbnailImage = await uploadImageToCloudinary(
        //     thumbnailImg,
        //     process.env.FOLDER_NAME
        // );

        // Create course entry in db
        // (instructor --> reference, i.e. id)
        const newCourse = await courseModel.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            // tag: tag,
            category: categoryDetails._id,
            // thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
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

// showAllCourses-handler
// ========================================
exports.showAllCourses = async (req, res) => {
    try {
        // fetch all courses from course-model
        const allCourses = await courseModel
            .find(
                {},
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
        // 2nd arg --> Providing properties.. to validate them & returning only those instances

        // return response
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully !!",
            data: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course-data.",
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
            .populate("instructor")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
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

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
