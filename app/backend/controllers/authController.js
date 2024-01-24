// import modules =================================
const userModel = require("../models/userModel");
const profileModel = require("../models/profileModel");
const otpModel = require("../models/otpModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// import utils =================================
const mailSender = require("../utils/mailSender");

// import templates =================================
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// import env-variables =================================
require("dotenv").config();

// sendOTP-handler =================================
exports.sendOTP = async (req, res) => {
    try {
        // fetch email
        const { email } = req.body;

        // Check if user already exists
        const checkUserPresent = await userModel.findOne({ email });

        if (checkUserPresent) {
            // No need to send OTP & user already signed-up.

            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        } else {
            // generate OTP
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            console.log("Reached level 1 !!");

            // verify if OTP is unique
            let result = await otpModel.findOne({ otp: otp });

            // Till we are getting a copied OTP, generate unique
            // Professionals use a unique OTP generator (some package)
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                console.log("Reached level 2 !!");
                // result = await otpModel.findOne({ otp: otp });
            }

            // create an OTP-object
            const otpPayload = { email, otp };

            // create a db-entry
            const otpBody = await otpModel.create(otpPayload);

            console.log("Reached level 3 !!");

            console.log(otpBody);

            res.status(200).json({
                success: true,
                message: "OTP sent Successfully",
                otp,
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

// signUp-handler ====================================
exports.signUp = async (req, res) => {
    try {
        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // validate data
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // 2 password match (password & confirm password)
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match, please try again.",
            });
        }

        // check if user already exists ?
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // find most recent OTP stored for user
        const recentOtp = await otpModel
            .find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        // createdAt(-1) .. find meaning

        // validate OTP
        if (recentOtp.length === 0) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Incorrect OTP",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Create profile-entry in db.. to refer in additionalDetails (as _id)
        const profileDetails = await profileModel.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        // Initially storing no values.. in these additional profile-details (will allow users to edit further)

        // create user-entry in db
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`,
            // DiceBear API (for creating image with initials)
            // https://api.dicebear.com/7.x/<styleName>/svg
            // styleName = "initials"
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again.",
        });
    }
};

// login-handler =====================================
exports.login = async (req, res) => {
    try {
        // fetch data from req.body
        const { email, password } = req.body;

        // validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again.",
            });
        }

        // Check if user exists ?
        const user = await userModel
            .findOne({ email })
            .populate("additionalDetails")
            .exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        // Generate JWT, after matching password
        if (await bcrypt.compare(password, user.password)) {
            // Passwords match
            // Create JWT

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            // Insert JWT in user-object
            user.token = token;
            // To prevent password, hide it from user-object
            user.password = undefined;

            // Create cookie & send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully !!",
            });
        } else {
            // Passwords isn't matching
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure. Please try again !",
        });
    }
};

// changePassword-handler ================================
exports.changePassword = async (req, res) => {
    try {
        // fetch data from req.user
        const userDetails = await userModel.findById(req.user.id);

        // get old-password, new-password, confirm-password
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // validate old-password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
            // Old password doesn't match with stored password.. user needs to enter correct password
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again !",
            });
        }

        // Match new-password & confirm-password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The password & confirm password do not match.",
            });
        }

        // Hash the password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        // update password in db
        // (args --> match-condition, change, options)
        const updatedUserDetails = await userModel.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // send mail (of password updated)
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );

            // Log confirmation text .. for testing
            console.log("Email sent successfully: ", emailResponse.response);
        } catch (error) {
            // Error in sending mail
            console.log("Error occured while sending email : ", error);
            // handle error --> send response
            return res.status(500).json({
                success: false,
                message: "Error occured while sending email",
                error: error.message,
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error occured while updating password : ", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while updating password",
            error: error.message,
        });
    }
};
