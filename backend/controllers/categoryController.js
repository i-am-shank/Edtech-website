const categoryModel = require("../models/categoryModel");

// createCategory-handler
// ========================================

exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;

        // validate data
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields marked compulsory are required.",
            });
        }

        // create entry in db
        const categoryDetails = await categoryModel.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully !!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// showAllCategory-handler
// =====================================

exports.showAllCategory = async (req, res) => {
    try {
        // get all category
        const allCategory = await categoryModel.find(
            {},
            { name: true, description: true }
        );
        // all category must have name & description

        // return response (containing all tags)
        res.status(200).json({
            success: true,
            message: "All Categories are returned successfully !!",
            data: allCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        // fetch data
        const { categoryId } = req.body;

        // Get courses for the specified category
        const selectedCategory = await categoryModel
            .findById(categoryId)
            .populate("courses")
            .exec();

        // Handle the case when category isn't found
        if (!selectedCategory) {
            console.log("Category not found !!");
            return res.status(404).json({
                success: false,
                message: "Category not found !!",
            });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category !");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category !",
            });
        }

        const selectedCourses = selectedCategory.courses;

        // Get courses for other categories
        const categoriesExceptSelected = await categoryModel
            .find({
                _id: { $ne: categoryId },
            })
            .populate("courses")
            .exec();

        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await categoryModel.find().populate("courses");
        const allCourses = allCategories.flatMap(
            (category) => category.courses
        );
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // return response
        res.status(200).json({
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// 35:00
