// import components
// =================================
import "./UpdatePassword.css";
import IconBtn from "../../../common/IconBtn";

// import hooks & React-tools
// =================================
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import assets
// =================================
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// import API-call functions
// =================================
import { changePassword } from "../../../../services/operations/settingAPI";

export default function UpdatePassword() {
    // initialise hooks
    // ====================
    const navigate = useNavigate();

    // states
    // ====================
    const { token } = useSelector((state) => state.auth);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // form-fields
    // ====================
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handlers
    // ====================
    const submitPasswordForm = async (data) => {
        try {
            // fire API-call function
            await changePassword(token, data);
        } catch (error) {
            // Log error
            console.log("ERROR in password-submission : ", error.message);
        }
    };

    return (
        <div className="update-password">
            <form
                onSubmit={() => {
                    handleSubmit(submitPasswordForm);
                }}
                className="update-password-form"
            >
                {/* Form Fields */}
                {/* ======================= */}
                <div className="update-password-form-fields">
                    {/* Heading */}
                    {/* =============== */}
                    <h1 className="update-password-heading">Password</h1>

                    {/* Current & New Password */}
                    {/* =============== */}
                    <div className="update-password-fields">
                        {/* Current Password */}
                        <div className="update-password-current-password">
                            {/* Label */}
                            <label
                                htmlFor="oldPassword"
                                className="update-password-label"
                            >
                                Current Password
                            </label>

                            {/* Input-box */}
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className="update-password-input"
                                {...register("oldPassword", { required: true })}
                            />

                            {/* Eye-Icon */}
                            <span
                                onClick={() =>
                                    setShowOldPassword((prev) => !prev)
                                }
                                className="update-password-eye-icon"
                            >
                                {showOldPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>

                            {/* Error */}
                            {errors.oldPassword && (
                                <span className="update-password-error">
                                    Please enter your Current Password.
                                </span>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="update-password-new-password">
                            {/* Label */}
                            <label
                                htmlFor="newPassword"
                                className="update-password-label"
                            >
                                New Password
                            </label>

                            {/* Input-box */}
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="update-password-input"
                                {...register("newPassword", { required: true })}
                            />

                            {/* Eye-Icon */}
                            <span
                                onClick={() =>
                                    setShowNewPassword((prev) => !prev)
                                }
                                className="update-password-eye-icon"
                            >
                                {showNewPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>

                            {/* Error */}
                            {errors.newPassword && (
                                <span className="update-password-error">
                                    Please enter your New Password.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Buttons */}
                {/* ================ */}
                <div className="update-password-btns">
                    {/* Cancel btn ------------- */}
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                        className="update-password-cancel-btn"
                    >
                        Cancel
                    </button>

                    {/* Submit btn ------------- */}
                    <IconBtn type="submit" text="Update" />
                </div>
            </form>
        </div>
    );
}
