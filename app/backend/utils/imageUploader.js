const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    // options are used to manipulate images
    const options = { folder };

    // height & quality can be used to compress images
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"; // to handle multiple file-formats.

    // Following is syntax of cloudinary documentation.
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};
