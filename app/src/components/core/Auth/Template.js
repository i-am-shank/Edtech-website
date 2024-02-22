import "./Template.css";

// import hooks
// =============================
import { useSelector } from "react-redux";

// import assets
// =============================
import frameImg from "../../../assets/Images/frame.png";

// import forms
// =============================
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Template({
    title,
    description1,
    description2,
    image,
    formType,
}) {
    // states -------------
    const { loading } = useSelector((state) => state.auth);

    return (
        <div className="template min-h-[calc(100vh - 3.54rem)]">
            {loading ? (
                <div className="loading-wrapper">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="template-div">
                    {/* Signup/Login form , Heading + Description */}
                    {/* ================== */}
                    <div className="template-left">
                        {/* Heading -------------- */}
                        <h1 className="template-heading">{title}</h1>

                        {/* Description -------------- */}
                        <p className="template-description">
                            {/* Description : 1 ----------- */}
                            <span className="template-description1">
                                {" "}
                                {description1}
                            </span>
                            {/* Description : 2 ----------- */}
                            <span className="template-description2">
                                {" "}
                                {description2}
                            </span>
                        </p>

                        {/* Login ..OR.. Signup --- form */}
                        {formType === "signup" ? <SignupForm /> : <LoginForm />}
                    </div>

                    {/* Image & Frame */}
                    {/* ================== */}
                    <div className="template-right">
                        {/* Frame ------------- */}
                        <img
                            src={frameImg}
                            alt="Pattern"
                            width={558}
                            height={504}
                            loading="lazy"
                        />

                        {/* Image ------------- */}
                        <img
                            src={image}
                            alt="Students"
                            width={558}
                            height={504}
                            loading="lazy"
                            className="template-right-img"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
