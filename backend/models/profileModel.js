const mongoose = require("mongoose");

// 1:08:00

/*
Profile-schema :
    1. gender
    2. dateOfBirth
    3. about
    4. contactNumber
*/

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
});

module.exports = mongoose.model("Profile", profileSchema);
