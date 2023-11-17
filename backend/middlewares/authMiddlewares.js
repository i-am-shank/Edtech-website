const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/userModel");

// Auth
exports.auth = async (req, res, next) => {
    try {
        // verify JTW (correct or not)
        // Extract token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorisation").replace("Bearer ", "");

        // Validate token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        } else {
            // verify jwt based on secret-key
            try {
                const decode = await jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode);
                req.user = decode;
            } catch (err) {
                // Verification issue
                return res.status(401).json({
                    success: false,
                    message: "Token is invalid",
                });
            }

            // Go to next middleware
            next();
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "JWT token validation produced some error.",
        });
    }
};

// isStudent (match role)
exports.isStudent = async (req, res) => {
    try {
        // accountType is inside req-body
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message:
                    "Access denied. This is a protected route only for Students.",
            });
        } else {
            // user is a Student
            // call next middleware
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified.",
        });
    }
};

// isInstructor
exports.isInstructor = async (req, res) => {
    try {
        // accountType is inside req-body
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message:
                    "Access denied. This is a protected route only for Instructor.",
            });
        } else {
            // user is an Instructor
            // call next middleware
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified.",
        });
    }
};

// isAdmin
exports.isAdmin = async (req, res) => {
    try {
        // accountType is inside req-body
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message:
                    "Access denied. This is a protected route only for Admin.",
            });
        } else {
            // user is an Admin
            // call next middleware
            next();
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified.",
        });
    }
};
