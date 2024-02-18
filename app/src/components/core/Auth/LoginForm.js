import "./LoginForm.css";

// import hooks
// =================================
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import icons
// =================================
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// import services-files
// =================================
import { login } from "../../../services/operations/authAPI";

export default function LoginForm() {
    // getting hooks ------------
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states ------------
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    // get form-data ------------
    const { email, password } = formData;

    // event-handlers ------------
    // Update form-field-values on change
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    // Handle form-submit click
    const handleOnSubmit = (e) => {
        // Prevent-refresh.. before submit happens
        e.preventDefault();
        // Fire POST API-call
        dispatch(login(email, password, navigate));
    };

    return (
        <form className="login-form" onSubmit={handleOnSubmit}>
            {/* Email-field */}
            {/* ===================== */}
            <label className="email-field">
                {/* Email Label */}
                <p className="email-label">
                    Email Address <sup className="compulsory">*</sup>
                </p>

                {/* Email Input */}
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className="email-input"
                />
            </label>

            {/* Password-field */}
            {/* ===================== */}
            <label className="password-field">
                {/* Password label */}
                <p className="password-label">
                    Password <sup className="compulsory">*</sup>
                </p>

                {/* Password input */}
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    className="password-input"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />

                {/* Hide/Unhide password btn */}
                <span
                    className="hide-unhide-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>

                {/* Forgot password link */}
                <Link to="/forgot-password">
                    <p className="forgot-password-text">Forgot Password</p>
                </Link>
            </label>

            {/* Sign In button */}
            {/* ===================== */}
            <button className="sign-in-btn" type="submit">
                Sign In
            </button>
        </form>
    );
}
