import "./LearningLanguageSection.css";

// import components
// ================================
import HighlightText from "./HighlightText";

// import images
// ================================
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";

export default function LearningLanguageSection() {
    return (
        <div className="learning-language-section">
            <div className="learning-language-section-content">
                <div className="learning-lang-heading">
                    Your Swiss Knife for{" "}
                    <HighlightText text={" learning any language"} />
                </div>
                <div className="learning-lang-subheading">
                    Using spin making multiple languages easy. With 20+
                    languages realistic voice-over, progress tracking, custom
                    schedule and more.
                </div>

                <div className="learning-lang-content">
                    <img
                        src={know_your_progress}
                        alt="Know-your-progress pic"
                        className="learning-lang-img ll-img1"
                    />
                    <img
                        src={compare_with_others}
                        alt="Compare-with-others pic"
                        className="learning-lang-img ll-img2"
                    />
                    <img
                        src={plan_your_lessons}
                        alt="Plan-your-lessons pic"
                        className="learning-lang-img ll-img3"
                    />
                </div>
            </div>

            <div className="learning-lang-bottom">
                <Button
                    active={true}
                    linkto={"/signup"}
                    className="learning-lang-bottom-btn"
                >
                    Learn More
                </Button>
            </div>
        </div>
    );
}
