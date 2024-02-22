// import modules ========================
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// cloudinaryConnect-handler ================
exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            // Configuring cloudinary to upload media-files
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    } catch (error) {
        // console.log(error);
    }
};
