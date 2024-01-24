// import modules ========================
const nodemailer = require("nodemailer");
require("dotenv").config();

// mailSender-handler =======================
const mailSender = async (email, title, body) => {
    try {
        // Create transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Send mail using transporter
        let info = await transporter.sendMail({
            from: "StudyNotion - by Shashank",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        // Just to see, what is stored in this
        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

// export functions =========================
module.exports = mailSender;
