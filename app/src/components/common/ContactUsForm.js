// import components
// ===============================
import "./ContactUsForm.css";

// import hooks
// ===============================
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// import data
// ===============================
import CountryCode from "../../data/countrycode.json";

export default function ContactUsForm() {
    // states
    // ========================
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    // Render-functions
    // ========================
    useEffect(() => {
        if (isSubmitSuccessful) {
            // Form is submitted --> reset form
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);
    // whenever a change in format of form happens --> reset-function changes.
    // Reset the form, whenever form is submitted OR format of form changes (on selection of a field).

    // Handlers
    // =========================
    // Send all data through a backend API-call function.
    const submitContactForm = async (data) => {
        console.log("Contact form data : ", data);
        try {
            setLoading(true);
            // const response = await apiConnector(
            //     "POST",
            //     contactusEndpoint.CONTACT_US_API,
            //     data
            // );
            const response = { status: "OK" };
            console.log("Contact form response : ", response);
            setLoading(false);
        } catch (error) {
            console.log("Error in contact-form submission : ", error.message);
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}
            className="contact-us-form"
        >
            {/* FirstName & LastName */}
            {/* ========================== */}
            <div className="contactus-firstname-lastname">
                {/* FirstName */}
                {/* ---------------- */}
                <div className="firstname-div">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        {...register("firstname", { required: true })}
                        className="contactus-input"
                    />
                    {errors.firstname && <span>Please enter first name</span>}
                </div>

                {/* LastName */}
                {/* ---------------- */}
                <div className="lastname-div">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        {...register("lastname")}
                        className="contactus-input"
                    />
                    {errors.lastname && <span>Please enter last name</span>}
                </div>
            </div>

            {/* Email Address */}
            {/* ========================== */}
            <div className="contactus-email">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    {...register("email", { required: true })}
                    className="contactus-input"
                />
                {errors.email && <span>Please enter email address</span>}
            </div>

            {/* Phone Number */}
            {/* ========================== */}
            <div className="contactus-phoneno">
                <label htmlFor="phonenumber">Phone Number</label>

                <div className="phoneno-div dropdown-input">
                    {/* Dropdown */}
                    <select
                        name="dropdown"
                        id="dropdown"
                        {...register("countrycode", { required: true })}
                        className="countrycode-select"
                    >
                        {CountryCode.map((element, index) => {
                            return (
                                <option
                                    key={index}
                                    value={element.code}
                                    className="phoneno-countrycode"
                                >
                                    {element.code} - {element.country}
                                </option>
                            );
                        })}
                    </select>

                    {/* Number-input */}
                    <input
                        type="number"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="12345 67890"
                        className="phoneno-input contactus-input"
                        // Specifying all validation-points (if not fulfilled, message will be shown in error-handling below)
                        {...register("phoneNo", {
                            required: {
                                value: true,
                                message: "Please enter your phone no.",
                            },
                            maxLength: {
                                value: 10,
                                message: "Invalid Phone Number",
                            },
                            minLength: {
                                value: 8,
                                message: "Invalid Phone Number",
                            },
                        })}
                    />
                </div>

                {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
            </div>

            {/* Message-box */}
            {/* ========================== */}
            <div className="contactus-message">
                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    {...register("message", { required: true })}
                    className="contactus-input"
                />
                {errors.message && <span>Please enter your message</span>}
            </div>

            {/* Submit button */}
            {/* =========================== */}
            <button type="submit" className="contactus-btn">
                Send Message
            </button>
        </form>
    );
}
