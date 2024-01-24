// import components
// ====================================
import "./EditProfile.css";
import IconBtn from "../../../common/IconBtn";

// import hooks
// ====================================
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import API-functions
// ====================================
import { updateProfile } from "../../../../services/operations/settingAPI";

// data
// ====================================
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
    // initiate hooks
    // ====================
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states
    // ====================
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    // useForm-hook
    // ====================
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handlers
    // ====================
    const submitProfileForm = async (data) => {
        try {
            // API-call function
            dispatch(updateProfile(token, data));
        } catch (error) {
            // Log error
            console.log("ERROR MESSAGE : ", error.message);
        }
    };

    return (
        <div className="edit-profile">
            {/* Edit Profile form */}
            {/* ========================== */}
            <form
                onSubmit={handleSubmit(submitProfileForm)}
                className="edit-profile-form"
            >
                {/* Profile Information */}
                {/* ================================= */}
                <div className="edit-profile-info">
                    {/* Heading -------------- */}
                    <h2 className="edit-profile-info-heading">
                        Profile Information
                    </h2>

                    {/* First Name & Last Name ---------------- */}
                    <div className="edit-profile-firstname-lastname">
                        {/* First Name */}
                        <div className="edit-profile-firstname">
                            <label
                                htmlFor="firstName"
                                className="edit-profile-firstname-label"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                className="edit-profile-firstname-input"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className="edit-profile-name-error">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="edit-profile-lastname">
                            <label
                                htmlFor="lastName"
                                className="edit-profile-lastname-label"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="edit-profile-lastname-input"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (
                                <span className="edit-profile-name-error">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Date-of-birth & Gender ---------------- */}
                    <div className="edit-profile-dateOfBirth-gender">
                        {/* Date of Birth */}
                        <div className="edit-profile-dateOfBirth">
                            <label
                                htmlFor="dateOfBirth"
                                className="edit-profile-dateOfBirth-label"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="text"
                                className="edit-profile-dateOfBirth-input"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        message:
                                            "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={
                                    user?.additionalDetails?.dateOfBirth
                                }
                            />
                            {errors.dateOfBirth && (
                                <span className="edit-profile-dateOfBirth-error">
                                    Please enter your Date of Birth
                                </span>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="edit-profile-gender">
                            <label
                                htmlFor="gender"
                                className="edit-profile-gender-label"
                            >
                                Gender
                            </label>
                            <select
                                type="text"
                                className="edit-profile-gender-input"
                                name="gender"
                                id="gender"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {genders.map((gender, i) => {
                                    return (
                                        <option key={i} value={gender}>
                                            {gender}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.gender && (
                                <span className="edit-profile-gender-error">
                                    Please enter your gender.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Contact Number & About ----------------- */}
                    <div className="edit-profile-contactNumber-about">
                        {/* Contact Number */}
                        <div className="edit-profile-contactNumber">
                            <label
                                htmlFor="contactNumber"
                                className="edit-profile-contactNumber-label"
                            >
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="edit-profile-contactNumber-input"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please enter your Contact Number.",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Invalid Contact",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Invalid Contact Number",
                                    },
                                })}
                                defaultValue={
                                    user?.additionalDetails?.contactNumber
                                }
                            />
                            {errors.contactNumber && (
                                <span className="edit-profile-contactNumber-error">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>

                        {/* About */}
                        <div className="edit-profile-about">
                            <label
                                htmlFor="about"
                                className="edit-profile-about-label"
                            >
                                About
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio"
                                className="edit-profile-about-input"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {errors.about && (
                                <span className="edit-profile-about-error">
                                    Please enter your Bio.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                {/* ================================= */}
                <div className="edit-profile-btns">
                    {/* Cancel button -------------- */}
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                        className="edit-profile-cancel-btn"
                    >
                        Cancel
                    </button>

                    {/* Submit button -------------- */}
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </div>
    );
}
