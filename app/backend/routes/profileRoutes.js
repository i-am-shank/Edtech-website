// import modules ================================
const express = require("express");
const router = express.Router();

// import controllers ===============================
const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/profileController");

// import middlewares ===============================
const { auth } = require("../middlewares/authMiddlewares");

// ===============================================
// Profile routes ================================
// ===============================================

// delete-profile (all users) ---------------
router.delete("/deleteProfile", auth, deleteAccount);

// update-profile (authorized user) --------------
router.put("/updateProfile", auth, updateProfile);

// get-user-details (authorized user) --------------
router.get("/getUserDetails", auth, getAllUserDetails);

// get-enrolled-courses (authorized user) -------------
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// update-dp (authorized user) -------------
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Export router ====================================
module.exports = router;
