const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

// import templates =======================
const { otpTemplate } = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },
});

// For OTP verification, mail needs to be sent here (before db-entry happens)
// Pre-middleware

// Function to send OTP-verification mail
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            otpTemplate(otp)
        );
        // Arguments : (email, title, body)
        // console.log("Email sent successfully : ", mailResponse);
    } catch (error) {
        // console.log("Error occured while sending OTP verification mail.", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    // email & otp are properties of this instance of otpSchema
    next();
});

module.exports = mongoose.model("OTP", otpSchema);
