// import components
// ===============================
import "./ContactUsForm.css";

// import hooks
// ===============================
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// import API-connector & API-endpoints
// ===============================
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";

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

    // Handlers
    // =========================
    // Send all data through a backend API-call function.
    const submitContactForm = async (data) => {
        // console.log("Contact form data : ", data);
        try {
            // show loading ----------
            setLoading(true);

            // fire API-call ----------
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );

            // console.log("Contact form response : ", response);
            toast.success(
                "Message sent successfully ! Please view your inbox for confirmation"
            );

            // hide loading ----------
            setLoading(false);
        } catch (error) {
            // console.log("Error in contact-form submission : ", error.message);
            setLoading(false);
        }
    };

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
                    <label htmlFor="firstname" className="contactus-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter First Name"
                        {...register("firstname", { required: true })}
                        className="contactus-input"
                    />
                    {errors.firstname && (
                        <span className="contactus-error">
                            Please enter first name
                        </span>
                    )}
                </div>

                {/* LastName */}
                {/* ---------------- */}
                <div className="lastname-div">
                    <label htmlFor="lastname" className="contactus-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Last Name"
                        {...register("lastname")}
                        className="contactus-input"
                    />
                </div>
            </div>

            {/* Email Address */}
            {/* ========================== */}
            <div className="contactus-email">
                <label htmlFor="email" className="contactus-label">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    {...register("email", { required: true })}
                    className="contactus-input"
                />
                {errors.email && (
                    <span className="contactus-error">
                        Please enter email address
                    </span>
                )}
            </div>

            {/* Phone Number */}
            {/* ========================== */}
            <div className="contactus-phoneno">
                <label htmlFor="phonenumber" className="contactus-label">
                    Phone Number
                </label>

                <div className="contactus-countrycode-phoneno">
                    {/* Dropdown */}
                    <div className="contactus-countrycode-div">
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", { required: true })}
                            className="contactus-input"
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
                    </div>

                    {/* Number-input */}
                    <div className="contactus-phoneno-input">
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            className="contactus-input"
                            // Specifying all validation-points (if not fulfilled, message will be shown in error-handling below)
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Please enter your phone no.",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Invalid Phone Number",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Invalid Phone Number",
                                },
                            })}
                        />
                    </div>
                </div>

                {errors.phoneNo && (
                    <span className="contactus-error">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            {/* Message-box */}
            {/* ========================== */}
            <div className="contactus-message">
                <label htmlFor="message" className="contactus-label">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    {...register("message", { required: true })}
                    className="contactus-input"
                />
                {errors.message && (
                    <span className="contactus-error">
                        Please enter your message
                    </span>
                )}
            </div>

            {/* Submit button */}
            {/* =========================== */}
            <button
                type="submit"
                className={`contactus-submit-btn ${
                    !loading && "contactus-loaded-submit-btn"
                }`}
            >
                Send Message
            </button>
        </form>
    );
}
