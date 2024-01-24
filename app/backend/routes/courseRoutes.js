// Importing modules ===========================
const express = require("express");
const router = express.Router(); // attach routes to this
// This will be attached to the app (server)

// Importing controllers ============================
// course-controllers ---------------
const {
    createCourse,
    showAllCourses,
    getCourseDetails,
} = require("../controllers/courseController");

// category-controllers ---------------
const {
    createCategory,
    showAllCategory,
    categoryPageDetails,
} = require("../controllers/categoryController");

// section-controllers ---------------
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/sectionController");

// subsection-controllers ----------------
const {
    createSubsection,
    updateSubsection,
    deleteSubsection,
} = require("../controllers/subsectionController");

// ratingAndReview-controllers ----------------
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/ratingAndReviewController");

// Importing auth-Middlewares =============================
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin,
} = require("../middlewares/authMiddlewares");

// ===========================================
// Course-routes =============================
// ===========================================

// create-course (authorized instructor) ---------------
router.post("/createCourse", auth, isInstructor, createCourse);
// get-all-courses (all users) ----------------
router.get("/getAllCourses", showAllCourses);
// get-specific-course's-details (all users) ----------------
router.post("/getCourseDetails", getCourseDetails);

// ===========================================
// Section-routes ============================
// ===========================================

// add-section (authorized instructor) ---------------
router.post("/addSection", auth, isInstructor, createSection);
// update-section (authorized instructor) ---------------
router.post("/updateSection", auth, isInstructor, updateSection);
// delete-section (authorized instructor) ---------------
router.post("/deleteSection", auth, isInstructor, deleteSection);

// ===========================================
// Subsection-routes =========================
// ===========================================

// add-subsection (authorized instructor) ---------------
router.post("/addSubsection", auth, isInstructor, createSubsection);
// update-subsection (authorized instructor) ---------------
router.post("/updateSubsection", auth, isInstructor, updateSubsection);
// delete-subsection (authorized instructor) ---------------
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection);

// ==============================================
// Category-routes ==============================
// ==============================================

// create-category (admin) -----------------
router.post("/createCategory", auth, isAdmin, createCategory);
// show-all-categories (all users) ---------------
router.get("/showAllCategories", showAllCategory);
// get-a-category-details (all users) ---------------
router.post("/getCategoryPageDetails", categoryPageDetails);

// ==============================================
// RatingAndReview-routes =======================
// ==============================================

// create-rating (authorized student) ---------------
router.post("/createRating", auth, isStudent, createRating);
// get-average-rating (all users) ---------------
router.get("/getAverageRating", getAverageRating);
// get-all-ratings (all users) ---------------
router.get("/getReviews", getAllRating);

// Export Router ================================
module.exports = router;
