// Importing modules ===========================
const express = require("express");
const router = express.Router(); // attach routes to this
// This will be attached to the app (server)

// Importing controllers ============================
// course-controllers ---------------
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    editCourse,
    deleteCourse,
} = require("../controllers/courseController");

// courseProgress-controllers ----------------
const {
    updateCourseProgress,
} = require("../controllers/courseProgressController");

// category-controllers ---------------
const {
    createCategory,
    showAllCategory,
    categoryPageDetails,
    deleteCategory,
    editCategory,
    getCategory,
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
router.get("/getAllCourses", getAllCourses);
// get-specific-course's-details (all users) ----------------
router.post("/getCourseDetails", getCourseDetails);
// get-full-course's details (authorized users) ---------------
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// get-courses of an instructor (authorized, instructor) ---------------
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// edit a course (authorized, instructor) ----------------
router.post("/editCourse", auth, isInstructor, editCourse);
// delete a course (authorized, instructor) ----------------
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// update course progress (authorized, student) ----------------
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

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
// get-a-category (authorized users) ---------------
router.get("/getCategory", auth, getCategory);
// get-a-category-details (all users) ---------------
router.post("/getCategoryPageDetails", categoryPageDetails);
// edit-a-category (admin) -----------------
router.post("/editCategory", auth, isAdmin, editCategory);
// delete-a-category (admin) ------------------
router.post("/deleteCategory", auth, isAdmin, deleteCategory);

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
