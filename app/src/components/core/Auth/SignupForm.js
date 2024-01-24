import "./SignupForm.css";

// import hooks
// ===============================
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import react-assets
// ===============================
import { toast } from "react-hot-toast";

// import icons
// ===============================
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// import API-functions
// ===============================
import { sendOtp } from "../../../services/operations/authAPI";

// import slice
// ===============================
import { setSignupData } from "../../../slices/authSlice";

// import constants
// ===============================
import { ACCOUNT_TYPE } from "../../../utils/constants";

// import components
// ===============================
import Tab from "../../common/Tab";

export default function SignupForm() {
    // get hooks --------------
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states ---------------
    // Student OR Instructor (default is student)
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    // Form-field state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    // Hide/unhide password-value (default => hidden)
    const [showPassword, setShowPassword] = useState(false);
    // Hide/unhide confirm-password-value (default => hidden)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // data --------------
    // form-field variables
    const { firstName, lastName, email, password, confirmPassword } = formData;
    // data to pass to Tab-component (to build student/instructor option-tab)
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ];

    // Handlers ----------------
    // Form-field value-update handler
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    // Form-submit handler
    const handleOnSubmit = (e) => {
        // Prevent reset before submit
        e.preventDefault();

        // validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match !");
            return;
        }

        // combine all data to 1-object
        const signupData = {
            ...formData,
            accountType,
        };

        // Update signup-data.. to get them saved (to use after otp-verification)
        dispatch(setSignupData(signupData));

        // Send OTP for verification
        dispatch(sendOtp(formData.email, navigate));

        // Reset form & account-type tab (for communicating submit action, visually)
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    };

    // ===================================
    // ===================================

    return (
        <div className="signup-form-content">
            {/* AccountType tab */}
            {/* ============================ */}
            <Tab
                tabData={tabData}
                field={accountType}
                setField={setAccountType}
            />

            {/* Form */}
            {/* ============================ */}
            <form onSubmit={handleOnSubmit} className="signup-form">
                {/* FirstName & LastName fields */}
                {/* =============== */}
                <div className="signup-names">
                    {/* FirstName-field ------------ */}
                    <label className="signup-firstName">
                        {/* Text */}
                        <p className="signup-general-text">
                            FirstName <sup className="compulsory">*</sup>
                        </p>

                        {/* Input-field */}
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            style={{
                                boxShadow:
                                    "inset 0xp -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="signup-general-input"
                        />
                    </label>

                    {/* LastName-field ------------- */}
                    <label className="signup-lastName">
                        {/* Text */}
                        <p className="signup-general-text">
                            Last Name <sup className="compulsory">*</sup>
                        </p>

                        {/* Input-field */}
                        <input
                            required
                            type="text"
                            className="signup-general-input"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                    </label>
                </div>

                {/* Email field */}
                {/* =============== */}
                <label className="email-field">
                    {/* Text */}
                    <p className="signup-general-text">
                        Email Address <sup className="compulsory">*</sup>
                    </p>

                    {/* Input-field */}
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        style={{
                            boxShadow:
                                "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="signup-general-input"
                    />
                </label>

                {/* Password fields */}
                {/* =============== */}
                <div className="signup-password-fields">
                    {/* Create Password ------------- */}
                    <label className="signup-password">
                        {/* Text */}
                        <p className="signup-general-text">
                            Create Password <sup className="compulsory">*</sup>
                        </p>

                        {/* Input-field */}
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="signup-password-input"
                        />

                        {/* Hide/Unhide password */}
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="signup-show-hide-password"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible
                                    fontSize={24}
                                    fill="#AFB2BF"
                                />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    {/* Confirm Password -------------- */}
                    <label className="signup-confirm-password">
                        {/* Text */}
                        <p className="signup-general-text">
                            Confirm Password <sup className="compulsory">*</sup>
                        </p>

                        {/* Input-field */}
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="signup-password-input"
                        />

                        {/* Hide/Unhide password */}
                        <span
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            className="signup-show-hide-password"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible
                                    fontSize={24}
                                    fill="#AFB2BF"
                                />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                {/* =============== */}
                <button type="submit" className="signup-create-account-btn">
                    Create Account
                </button>
            </form>
        </div>
    );
}
