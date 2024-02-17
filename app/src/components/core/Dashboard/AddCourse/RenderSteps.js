// import components
// ==================================
import "./RenderSteps.css";
import CourseInformationForm from "./CourseInfoForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm";
import PublishCourseForm from "./PublishCourseForm/PublishCourseForm";

// import hooks
// ==================================
import { useSelector } from "react-redux";

// import assets
// ==================================
import { FaCheck } from "react-icons/fa";

export default function RenderSteps() {
    // states
    // ==================
    const { step } = useSelector((state) => state.course);

    // data
    // ==================
    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

    return (
        <div className="render-steps-wrapper">
            {/* Step Count */}
            {/* ===================== */}
            <div className="render-steps">
                {steps.map((item) => (
                    <>
                        <div key={item.id} className="render-step">
                            <button
                                className={`render-step-btn ${
                                    step === item.id
                                        ? "active-render-step-btn"
                                        : "inactive-render-step-btn"
                                } ${step > item.id && "next-render-step-btn"}`}
                            >
                                {step > item.id ? (
                                    // item is processed (show tick)
                                    <FaCheck className="render-step-check-icon" />
                                ) : (
                                    // This form-step is remaining (show step no.)
                                    item.id
                                )}
                            </button>
                        </div>

                        {/* Dashes */}
                        {item.id !== steps.length && (
                            <>
                                {/* Add dashes here */}
                                <div
                                    className={`render-steps-dashes ${
                                        step > item.id
                                            ? "next-render-steps-dashes"
                                            : "prev-render-steps-dashes"
                                    }`}
                                ></div>
                            </>
                        )}
                    </>
                ))}
            </div>

            {/* Title of Form-count */}
            {/* ===================== */}
            <div className="render-steps-titles">
                {steps.map((item) => (
                    <div key={item.id}>
                        <div className="render-step-text">
                            <p
                                className={`render-step-title ${
                                    step >= item.id
                                        ? "next-render-step-title"
                                        : "prev-render-step-title"
                                }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form */}
            {/* ===================== */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourseForm />}
        </div>
    );
}
