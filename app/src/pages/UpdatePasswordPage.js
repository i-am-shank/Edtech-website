// import components
// ===================
import Button from "../components/core/HomePage/Button";
import "./UpdatePasswordPage.css";

// import hooks
// ===================
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import icons
// ===================
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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
        dispatch(resetPassword(password, confirmPassword, token));
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
                        <label>
                            <p>New Password</p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter new password"
                                className="update-password-password"
                            />
                            {/* Eye-icons .. closed/open */}
                            <span
                                className="update-password-icon"
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
                        <label>
                            <p>Confirm Password</p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Enter password again"
                                className="update-password-password"
                            />
                            {/* Eye-icons .. closed/open */}
                            <span
                                className="update-password-icon"
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
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
