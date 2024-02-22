const { instance } = require("../config/razorpay");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");

const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

// capture payment & initiate the razorpay order
exports.capturePayment = async (req, res) => {
    // get course-id & user-id (so we can capture payment)
    // course-id  -->  req.body
    const { courseId } = req.body;
    // user-id  -->  payload (appended in our code)
    const userId = req.user.id;

    // validation
    // valid courseId
    if (!courseId) {
        return res.status(404).json({
            success: false,
            message: "Please provide valid course id.",
        });
    }

    // valid courseDetail
    let courseDetail;
    try {
        courseDetail = await courseModel.findById(courseId);
        if (!courseDetail) {
            return res.status(404).json({
                success: false,
                message: "Could not find the course !!",
            });
        }

        // user already paid for the same course ?
        // userId is of string-type, & in studentsEnrolled .. id is Object-id
        const user_id = new mongoose.Types.ObjectId(userId);
        if (courseDetail.studentsEnrolled.includes(user_id)) {
            return res.status(200).json({
                success: false,
                message: "Student is already enrolled !!",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    // create order
    const amount = courseDetail.price;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: courseId,
            userId,
        },
    };

    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        // console.log(paymentResponse);

        // return response
        return res.status(200).json({
            success: true,
            courseName: courseDetail.courseName,
            courseDescription: courseDetail.courseDescription,
            thumbnail: courseDetail.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }
};

// verifySignature-handler
// =============================================
exports.verifySignature = async (req, res) => {
    // webhookSecret --> stored on server
    // The razorpay hits webhook, & in that request the hashed-signature is passed (to authorize)
    const webhookSecret = "12345678";
    const signature = req.headers("x-razorpay-signature");
    // To authorize, will match the hashed-form of webhookSecret to signature

    // This function creates "Hash-based Message Authentication Code (Hmac)"
    // Hmac --> Hashing-algo + Secret-key
    // SHA .. these algorithms don't use a secret key (only difference between these algos. & Hmac)
    const shasum = crypto.createHmac("sha256", webhookSecret);
    // got an hmac-object

    // convert this hmac-object to string
    shasum.update(JSON.stringify(req.body));

    // When hashing algo runs on a text/input --> output is called "Digest"
    const digest = shasum.digest("hex");

    // Try to match signature & digest
    if (signature === digest) {
        // console.log("Payment is authorized !");

        // fetch userId --> req.user (this time not possible.. as API is hit by webhook, not by user's-HTTP-request)
        // notes is used, in which both userId & courseId is passed (& notes is passed in options-object, while creating order)
        // req.body.payload.payment.entity.notes
        // To identify above path by own, console.log(req)

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            // fulfill action ================
            // 1. find the course & enroll the student in it
            const enrolledCourse = await courseModel.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            // Validate response
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found !",
                });
            }

            // console.log("enrolledCourse : ", enrolledCourse);

            // 2. find the student & add the course to their enrolled-courses array
            const enrolledStudent = await userModel.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );

            // Validate response
            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "Student enrolling into course, is not found !",
                });
            }

            // console.log("enrolledStudent : ", enrolledStudent);

            // Send Course Enrollment Confirmation mail
            // ==============================
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations ! You are onboarded into new StudyNotion course.",
                courseEnrollmentEmail
            );
            // console.log(emailResponse);

            // return response
            return res.status(200).json({
                success: true,
                message: "Signature verified & course added.",
            });
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else {
        // signature isn't matching
        // return response
        return res.status(400).json({
            success: false,
            message: "Invalid request, signature not matching !!",
        });
    }

    // What is checkSum ?  (find out)
};

// Order-create ---> Payment-authorized ---> Action
// Action ==> Enroll in course (2 step process :-)
// 1.  (user --> courses[] --> courseId)
// 2.  (Course --> studentsEnrolled[] --> userId)
