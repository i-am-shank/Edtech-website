import "./ResetPasswordPage.css";

// import hooks & react-tools
// ===========================
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import API-call service
// ===========================
import { getResetPasswordToken } from "../services/operations/authAPI";

// import assets
// ===========================
import { BiArrowBack } from "react-icons/bi";

export default function ResetPasswordPage() {
    // initialise hooks -----------
    const dispatch = useDispatch();

    // Import states (from slices) ------------
    const { loading } = useSelector((state) => state.auth);

    // states -------------
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    // handlers -------------
    const handleOnSubmit = (e) => {
        e.preventDefault();

        // Have to send password-reset token
        // (resetPasswordToken-function of ResetPassword-controller of backend.) .. Backend call (API)
        dispatch(getResetPasswordToken(email, setEmailSent));
    };

    return (
        <div className="reset-password-page">
            {loading ? (
                // Show spinner
                <div className="spinner"></div>
            ) : (
                <div className="reset-password-content">
                    <h1 className="reset-password-header">
                        {/* Value depends on emailSent */}
                        {!emailSent
                            ? "Reset Your Password"
                            : "Check Your Email"}
                    </h1>

                    <p className="reset-password-description">
                        {/* Value depends on emailSent */}
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`}
                    </p>

                    {/* Form */}
                    {/* ============== */}
                    <form onSubmit={handleOnSubmit}>
                        {/* Input-box only shows, when Email not sent & for entering Email */}
                        {!emailSent && (
                            <label className="reset-password-label">
                                <p className="reset-password-label-text">
                                    Email Address{" "}
                                    <sup className="compulsory-icon">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    className="reset-password-input"
                                />
                            </label>
                        )}

                        {/* Submit button also depends on emailSent */}
                        <button
                            type="submit"
                            className="reset-password-submit-btn"
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    {/* Back to Login - link */}
                    <div className="reset-password-login-link">
                        <Link to="/login">
                            <p className="reset-password-login-text">
                                <BiArrowBack /> Back to Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
