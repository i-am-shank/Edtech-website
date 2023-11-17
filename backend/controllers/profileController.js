const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");

// ========================================
// updateProfile-handler
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const { dateOfBirth = "", about = "", contactNumber } = req.body;

        // find profile by id
        const userDetails = await userModel.findById(id);

        // fetch user-id (from req.user .. inserted in auth-middleware)
        const id = req.user.id;

        // validate data
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "Please fill the compulsory fields, marked with *.",
            });
        }

        // find profile
        const currUserDetails = await userModel.findById(id);

        // fetch profile
        const profileDetails = await profileModel.findById(
            currUserDetails.additionalDetails
        );

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        // Now, the profile-details object is updated, but to save changes in db :-
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully !!",
            profileDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// ========================================
// profileDelete-handler
exports.deleteAccount = async (req, res) => {
    try {
        // fetch data (id)
        const id = req.user.id;

        // validate data
        const userDetails = await userModel.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete this user's profile first, from profile-model
        await profileModel.findByIdAndDelete({
            _id: userDetails.additionalDetails,
        });

        // Then delete the user-entry from user-model
        await userModel.findByIdAndDelete({ _id: id });

        // TODO : Unenroll user from all enrolled-courses (before deleting user-entry)
        // TODO : How can we schedule a request ?
        // TODO : What is a cron-job ?

        // return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully !!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully !",
        });
    }
};

// ============================================
// getAllUserDetails-handler
exports.getAllUserDetails = async (req, res) => {
    try {
        // fetch data (id .. req.user)
        const id = req.user.id;

        // validate data
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is invalid. Please try again.",
            });
        }

        // get all details from db-call
        const userDetails = await userModel
            .findById(id)
            .populate("additionalDetails")
            .exec();
        console.log(userDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "User's data is fetched successfully !!",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
