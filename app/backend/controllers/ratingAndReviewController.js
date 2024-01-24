const ratingAndReviewModel = require("../models/ratingAndReviewModel");
const courseModel = require("../models/courseModel");
const { response } = require("express");
const { default: mongoose } = require("mongoose");

// createRating - handler
// ======================================
exports.createRating = async (req, res) => {
    try {
        // fetch userId
        const userId = req.user.id; // added in auth-middleware

        // fetch data from req.body (rating & review & course-id)
        const { rating, review, courseId } = req.body;

        // Check if user is enrolled or not
        const courseDetails = await courseModel.find({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
        });
        // If a courseDetails is found --> user is already enrolled --> then only add review
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "User is not enrolled in the course",
            });
        } else {
            // Now this user is eligible to review the course

            // Check if already reviewed (single review allowed)
            const alreadyReviewed = await ratingAndReviewModel.findOne({
                user: userId,
                course: courseId,
            });
            if (alreadyReviewed) {
                // Can't review again
                return res.status(403).json({
                    success: false,
                    message:
                        "Course is already reviewed by the user. Can't review again !",
                });
            } else {
                // Create rating
                const ratingReview = await ratingAndReviewModel.create({
                    user: userId,
                    rating,
                    review,
                    course: courseId,
                });

                // Attach this rating with course-model
                const updatedCourseDetails =
                    await courseModel.findByIdAndUpdate(
                        { _id: courseId },
                        {
                            $push: {
                                ratingAndReviews: ratingReview._id,
                            },
                        },
                        { new: true }
                    );
                console.log(updatedCourseDetails);

                // return response
                return res.status(200).json({
                    success: true,
                    message: "Rating and Review created successfully !",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getAverageRating - handler
// ======================================
exports.getAverageRating = async (req, res) => {
    try {
        // fetch data (courseId)
        const courseId = req.body.courseId;

        // calculate avg rating
        const result = await ratingAndReviewModel.aggregate([
            // fetch all those ratingAndReviews, whose course-property matches with courseId (string --> ObjectId conversion also done`  )
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            // Now, can group these ratings
            {
                // Have to tell here, to group on what basis
                $group: {
                    // this will group all entries into single group
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                        // $avg --> returns average-value of rating-property
                    },
                },
            },
        ]);
        // return rating

        if (result.length > 0) {
            // got some rating
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        } else {
            // ratings doesn't exists .. course with 0 ratings
            return res.status(200).json({
                success: true,
                averageRating: 0,
                message: "Average Rating is 0, no ratings given till now.",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getAllRating - handler
//    (All ratings.. independent of course)
// ======================================
exports.getAllRating = async (req, res) => {
    try {
        // fetch data (none needed)
        // Get all ratings
        const allReviews = await ratingAndReviewModel
            .find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
