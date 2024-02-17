// import components
// ===================
import "./UpdatePasswordPage.css";

// import hooks
// ===================
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import icons
// ===================
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

// import services (API call functions)
// ===================
import { resetPassword } from "../services/operations/authAPI";

export default function UpdatePasswordPage() {
    // initialise hooks -------------
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // states (from slice) -------------
    const { loading } = useSelector((state) => state.auth);

    // states --------------
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const { password, confirmPassword } = formData;

    // Handlers ---------------
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleOnSubmit = (e) => {
        // Prevent form from refreshing
        e.preventDefault();
        // Fetch reset-password-token (from URL)
        const token = location.pathname.split("/").at(-1);
        // Dispatch action
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    };

    return (
        <div className="update-password-page">
            {loading ? (
                <div className="spinner">Loading...</div>
            ) : (
                <div className="update-password-page-content">
                    {/* Heading & Sub-heading */}
                    {/* ===================== */}
                    <h1 className="update-password-heading">
                        Choose new Password
                    </h1>
                    <div className="update-password-subheading">
                        Almost done. Enter your new password and you are all
                        set.
                    </div>

                    {/* Form */}
                    {/* ==================== */}
                    <form
                        onSubmit={handleOnSubmit}
                        className="update-password-form"
                    >
                        {/* Password-field */}
                        {/* ======================== */}
                        <label className="update-password-label">
                            <p className="update-password-label-text">
                                New Password{" "}
                                <sup className="compulsory-icon">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter new password"
                                className="update-password-input"
                            />
                            {/* Eye-icons .. closed/open */}
                            <span
                                className="update-password-eye-icon"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <AiFillEyeInvisible fontSize={24} />
                                ) : (
                                    <AiFillEye fontSize={24} />
                                )}
                            </span>
                        </label>

                        {/* Confirm-Password field */}
                        {/* ========================= */}
                        <label className="update-confirm-password-label">
                            <p className="update-password-label-text">
                                Confirm Password
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Enter password again"
                                className="update-password-input"
                            />
                            {/* Eye-icons .. closed/open */}
                            <span
                                className="update-password-eye-icon"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            >
                                {showConfirmPassword ? (
                                    <AiFillEyeInvisible fontSize={24} />
                                ) : (
                                    <AiFillEye fontSize={24} />
                                )}
                            </span>
                        </label>

                        {/* Submit-button */}
                        {/* ========================= */}
                        <button type="submit">
                            {/* <Button active={true} linkto=""> */}
                            Reset Password
                            {/* </Button> */}
                        </button>
                    </form>

                    {/* Login-link */}
                    {/* ====================== */}
                    <div>
                        <Link to="/login">
                            <p>
                                <BiArrowBack /> Back to Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
