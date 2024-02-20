// import components
// ===============================
import "./MyProfile.css";

// import hooks & React-tools
// ===============================
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

// import assets
// ===============================
import { RiEditBoxLine } from "react-icons/ri";

export default function MyProfile() {
    // states
    // ================
    const { user } = useSelector((state) => state.profile);

    // initialise hooks
    // ================
    const navigate = useNavigate();

    return (
        <div className="my-profile-wrapper">
            <div className="my-profile">
                {/* Heading */}
                {/* ================ */}
                <h1 className="my-profile-heading">My Profile</h1>

                {/* User-name section */}
                {/* ================ */}
                <div className="my-profile-user-name">
                    {/* Content (text & img) ----------- */}
                    <div className="my-profile-user-name-content">
                        <img
                            src={user?.image}
                            alt={`profile-${user?.firstName}`}
                            className="my-profile-user-image"
                        />
                        <div className="my-profile-user-name-text">
                            <p className="my-profile-user-name-text-1">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className="my-profile-user-name-text-2">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Button ----------- */}
                    <div className="my-profile-user-name-edit-btn">
                        <IconBtn
                            text="Edit"
                            onClick={() => {
                                navigate("/dashboard/settings");
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>
                </div>

                {/* About section */}
                {/* ================ */}
                <div className="my-profile-about-section">
                    {/* Top-row --------- */}
                    <div className="my-profile-about-section-top-row">
                        <p className="my-profile-about-section-heading">
                            About
                        </p>
                        <IconBtn
                            text="Edit"
                            onClick={() => {
                                navigate("/dashboard/settings");
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>
                    <p
                        className={`${
                            user?.additionalDetails?.about
                                ? "my-profile-about-text"
                                : "my-profile-about-placeholder"
                        } my-profile-about-section-content`}
                    >
                        {user?.additionalDetails?.about ??
                            "Write Something about yourself"}
                    </p>
                </div>

                {/* Personal details section */}
                {/* ================ */}
                <div className="my-profile-personal-details">
                    {/* Heading & btn -------- */}
                    <div className="my-profile-personal-details-heading-btn">
                        <p className="my-profile-personal-details-heading">
                            Personal Details
                        </p>
                        <IconBtn
                            text="Edit"
                            onClick={() => {
                                navigate("/dashboard/settings");
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>

                    {/* Data --------- */}
                    <div className="my-profile-personal-details-data">
                        {/* Left Data ---------- */}
                        <div className="my-profile-personal-details-data-left">
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    First Name
                                </p>
                                <p className="my-profile-personal-details-data-output">
                                    {user?.firstName ?? "Add First Name"}
                                </p>
                            </div>
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    Email
                                </p>
                                <p className="my-profile-personal-details-data-output">
                                    {user?.email ?? "Add Email"}
                                </p>
                            </div>
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    Gender
                                </p>
                                <p className="my-profile-personal-details-data-output">
                                    {user?.additionalDetails?.gender ??
                                        "Add Gender"}
                                </p>
                            </div>
                        </div>

                        {/* Right Data ---------- */}
                        <div className="my-profile-personal-details-data-right">
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    Last Name
                                </p>
                                <p className="my-profile-personal-details-data-output">
                                    {user?.lastName ?? "Add Last Name"}
                                </p>
                            </div>
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    Phone Number
                                </p>
                                <p className="my-profile-personal-details-data-output">
                                    {user?.additionalDetails?.contactNumber ??
                                        "Add Contact Number"}
                                </p>
                            </div>
                            <div>
                                <p className="my-profile-personal-details-data-label">
                                    Date of Birth
                                </p>
                                <div className="my-profile-personal-details-data-output">
                                    {user?.additionalDetails?.dateOfBirth ??
                                        "Add Date of Birth"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
