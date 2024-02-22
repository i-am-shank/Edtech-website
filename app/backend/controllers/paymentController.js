// import modules
// =====================================
const mongoose = require("mongoose");
const crypto = require("crypto");

// import models
// =====================================
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

// import config. files
// =====================================
const { instance } = require("../config/razorpay");

// import utility files
// =====================================
const mailSender = require("../utils/mailSender");

// import templates
// =====================================
const {
    paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const courseProgressModel = require("../models/courseProgressModel");

// =====================================
// Order initiation --------------------
// =====================================

exports.capturePayment = async (req, res) => {
    // fetch data ----------
    //     (all courses, userId-string)
    const { courses } = req.body;
    const userIdStr = req.user.id;

    // Validate courses ----------
    if (courses.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Please provide course id",
        });
    }

    // Calculate total amount
    // ==============
    let totalAmount = 0;
    for (const courseId of courses) {
        try {
            // fetch course-data ---------
            let course = await courseModel.findById(courseId);

            // condition on API-response -----------
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            // Convert userId (from string)
            const userId = new mongoose.Types.ObjectId(userIdStr);

            // Check if user is already enrolled ---------
            if (course.studentsEnrolled.includes(userId)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled in course !",
                });
            } else {
                // All checks passed
                //    add the course-price
                totalAmount += course.price;
            }
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Create order
    //     (using instance.. options argument)
    // ==============
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        // order creation ---------
        const paymentResponse = await instance.orders.create(options);

        // send response ---------
        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order !",
        });
    }
};

// =====================================
// Payment verification ----------------
// =====================================

exports.verifyPayment = async (req, res) => {
    // fetch data ----------
    //    (For payment verification (needed) :
    //       order-id, payment-id, signature)
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    // Validation ----------
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({
            success: false,
            message: "Payment failed !",
        });
    }

    // Generate expected-signature -----------
    //    (as per razorpay-documentation)
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    // Compare signatures -----------
    if (expectedSignature === razorpay_signature) {
        // Enroll student in course ---------
        await enrollStudents(courses, userId, res);

        // return response ----------
        return res.status(200).json({
            success: true,
            message: "Payment Verified !",
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "Payment failed !",
        });
    }
};

// =========================================
// Enroll Student --------------------------
// =========================================

const enrollStudents = async (courses, userId, res) => {
    // 2 steps :
    //     1. Insert userId of student under all courses.
    //     2. Insert all courseId(s) in students enrolled-courses array.

    // Validation -----------
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide data for courses & userId !",
        });
    }

    // Insert userId to all courses ---------

    for (const courseId of courses) {
        try {
            // find each course & update
            //     (1st arg --> matching condition)
            //     (2nd arg --> updation)
            //     (3rd arg --> return updated-object)
            const enrolledCourse = await courseModel.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            // Validation ---------
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message:
                        "Course not find course, while enrolling student in them !",
                });
            }

            // Initialise the course-progress as 0 ----------
            const courseProgress = await courseProgressModel.create({
                courseId: courseId,
                userId: userId,
                completeVideos: [],
            });

            // Insert each courseId to user-object ----------
            // Also associate the courseProgress with the student ---------- (add only id)
            const enrolledStudent = await userModel.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            // Send mail to student ----------
            const emailResponse = await mailSender(
                enrollStudents.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );
            // console.log("Email Sent Successfully !", emailResponse);
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
};

// =========================================
// Send Payment-success email --------------
// =========================================

exports.sendPaymentSuccessEmail = async (req, res) => {
    // fetch data --------
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    // Validation ---------
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields !",
        });
    }

    try {
        // find student-object ----------
        const enrolledStudent = await userModel.findById(userId);

        // fire API-call (to send mail) ---------
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );

        return res.status(200).json({
            success: true,
            data: enrolledStudent,
            message: "Payment Success Email is sent successfully !",
        });
    } catch (error) {
        // console.log("Error in sending successful payment email : ", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't send Payment success email !",
        });
    }
};
