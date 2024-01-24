// 1:45

import "./VerifyEmailPage.css";

// import hooks
// ===============================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import react-modules
// ===============================
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";

// import API-call-functions
// ===============================
import { sendOtp, signUp } from "../services/operations/authAPI";

// import assets
// ===============================
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

export default function VerifyEmailPage() {
    // States
    // ==================
    const [otp, setOtp] = useState("");
    const { signupData, loading } = useSelector((state) => state.auth);

    // initialise hooks
    // ==================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check for signup-data (if not, send to signup-page)
    // ==================
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);

    // Handlers
    // ==================
    const handleOnSubmit = (e) => {
        // Prevent form-reload
        e.preventDefault();
        // dispatch signUp-action ------------
        // arguments --> (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate)
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    };

    return (
        <div className="verify-email-page">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="verify-email-content">
                    <h1 className="verify-email-heading">Verify Email</h1>
                    <p className="verify-email-para">
                        A verification code has been sent to you. Enter the code
                        below
                    </p>

                    {/* Form (OTP) */}
                    {/* ================== */}
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow:
                                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="otp-input"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />

                        {/* Submit-btn ---------- */}
                        <button type="submit" className="verify-email-btn">
                            Verify Email
                        </button>
                    </form>

                    {/* Lower links */}
                    <div className="verify-email-links">
                        {/* Back to signup ----------- */}
                        <Link to="/signup">
                            <p className="verify-email-signup">
                                <BiArrowBack /> Back to Signup
                            </p>
                        </Link>

                        {/* Resend OTP ----------- */}
                        <button
                            onClick={() =>
                                dispatch(sendOtp(signupData.email, navigate))
                            }
                            className="verify-email-resend-otp"
                        >
                            <RxCountdownTimer /> Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
