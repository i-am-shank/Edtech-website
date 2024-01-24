// A link is sent, which redirects to a UI (reset password)

// import modules ===========================
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// import models ===========================
const userModel = require("../models/userModel");

// import utils ===========================
const mailSender = require("../utils/mailSender");

// resetPasswordToken - function
//   ..this function generates reset-password link & does mail sending task
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch data (email from req.body)
        const { email } = req.body;

        // validate data
        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "No email present, can't reset your password. Please try again.",
            });
        }

        // check user for this email ?
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Your email is not registered",
            });
        }

        // generate token (also set expiration time)
        const token = crypto.randomUUID();

        // update user by adding token & expiration time
        const updatedDetails = await userModel.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );
        // 1st arg ==> matching condition
        // 2nd arg ==> changed arguments
        // 3rd arg ==> return new object as response

        // generate url (with token) ---- url of frontend
        const url = `http://localhost:3000/update-password/${token}`;
        // Different token for different-users --> different links.

        // Send mail returning url
        await mailSender(
            email,
            "Password Reset Link",
            `Password Reset Link: ${url}`
        );

        // return response
        return res.status(200).json({
            success: true,
            message:
                "Email with reset password link is sent successfully. Please check your inbox & spam folder.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while password reset.",
        });
    }
};

// resetPassword - function
//   ..this performs UPDATE operation on db.
exports.resetPassword = async (req, res) => {
    try {
        // fetch data
        const { password, confirmPassword, token } = req.body;

        // validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again.",
            });
        }

        // Have to update password in user's entry, to find user's entry, will use JWT in our access & search the user based on that JWT.
        // =============================
        // Get User-details from db using JWT
        const userDetails = await userModel.findOne({ token: token });

        // If no user-entry present .. invalid token / time-expired
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "Token is invalid.",
            });
        }

        // Token time-check
        if (userDetails.resetPasswordExpires < Date.now()) {
            // Password got expired (expiry time passed)
            return res.status(500).json({
                success: false,
                message: "Token is expired. Please regenerate your token.",
            });
        }

        // If all checks passed.. =============
        // Hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        await userModel.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password reset is successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong in updating new password to database.",
        });
    }
};
