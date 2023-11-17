const userModel = require("../models/userModel");
const profileModel = require("../models/profileModel");
const otpModel = require("../models/otpModel");
const otpGeneraor = require("otp-generator");
const jwt = require("jsonwebtoken");

// sendOTP
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
                message: "User already registered",
            });
        } else {
            // generate OTP
            var otp = otpGeneraor.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            // verify if OTP is unique
            let result = await otpModel.findOne({ otp: otp });

            // Till we are getting a copied OTP, generate unique
            // Professionals use a unique OTP generator (some package)
            while (result) {
                otp = otpGeneraor.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                result = await otpModel.findOne({ otp: otp });
            }

            // create an OTP-object
            const otpPayload = { email, otp };

            // create a db-entry
            const otpBody = await otpModel.create(otpPayload);

            console.log(otpBody);

            res.status(200).json({
                success: true,
                message: "OTP sent Successfully",
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

// signUp
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
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
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

// logIn
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
            .populate("additionalDetails");
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
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Incorrect password. Please try again",
            });
        }
    } catch (error) {}
};

// change password (just a handler)
exports.changePassword = async (req, res) => {
    try {
        // fetch data from req.body
        // get old-password, new-password, confirm-password
        // validate data
        // update password in db
        // send mail (of password updated)
        // return response
    } catch (error) {}
};
