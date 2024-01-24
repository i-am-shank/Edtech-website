import "./ResetPasswordPage.css";

// import hooks & react-tools
// ===========================
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import API-call service
// ===========================
import { getResetPasswordToken } from "../services/operations/authAPI";
import Button from "../components/core/HomePage/Button";

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
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>
                        {/* Value depends on emailSent */}
                        {!emailSent
                            ? "Reset Your Password"
                            : "Check Your Email"}
                    </h1>

                    <p>
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
                            <label>
                                <p>Email Address:</p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    className="update-password-password"
                                />
                            </label>
                        )}

                        {/* Submit button also depends on emailSent */}
                        <button type="submit">
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    {/* Back to Login - link */}
                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
