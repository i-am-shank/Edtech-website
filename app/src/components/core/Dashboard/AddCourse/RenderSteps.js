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
                    <div key={item.id} className="render-step-wrapper">
                        <div
                            className={`render-step ${
                                step === item.id
                                    ? "active-render-step"
                                    : "inactive-render-step"
                            }`}
                        >
                            {step > item.id ? (
                                // item is processed (show tick)
                                <FaCheck />
                            ) : (
                                // This form-step is remaining (show step no.)
                                item.id
                            )}
                        </div>

                        {/* Dashes */}
                        {item.id !== steps.length && (
                            <div>{/* Add dashes here */}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Title of Form-count */}
            {/* ===================== */}
            <div className="render-steps-titles">
                {steps.map((item) => (
                    <div key={item.id} className="render-steps-title">
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            {/* Form */}
            {/* ===================== */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {/* {step === 3 && <PublishCourseForm />} */}
        </div>
    );
}
