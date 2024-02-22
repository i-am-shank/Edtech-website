// import templates
// ===================================
const { contactUsEmail } = require("../mail/templates/contactFormRes");

// import utility-files
// ===================================
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
    // fetch data
    // ================
    //   (email, firstname, lastname, message, phoneNo, countrycode)
    const { email, firstname, lastname, message, phoneNo, countrycode } =
        req.body;
    // console.log(req.body);

    try {
        // fire API-call (for sending mail) ------------
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(
                email,
                firstname,
                lastname,
                message,
                phoneNo,
                countrycode
            )
        );
        // console.log("Email Res : ", emailRes);

        // return response ------------
        return res.json({
            success: true,
            message: "Email send successfully",
            data: emailRes,
        });
    } catch (error) {
        // log error ------------
        // console.log("Error : ", error);
        // console.log("Error message : ", error.message);

        // return error-response ------------
        return res.status(500).json({
            success: false,
            message: "Something went wrong in sending mail",
        });
    }
};
