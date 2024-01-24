import "./InstructorSection.css";

// import images
// =====================================
import Instructor from "../../../assets/Images/Instructor.png";

// import components
// =====================================
import HighlightText from "./HighlightText";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

export default function InstructorSection() {
    return (
        <div className="instructor-section">
            <div className="instructor-section-content">
                <div className="instructor-section-left">
                    <img
                        src={Instructor}
                        alt={"Instructor pic"}
                        className="instructor-img"
                    />
                </div>
                <div className="instructor-section-right">
                    <div className="instructor-section-right-heading">
                        Become an <HighlightText text={"Instructor"} />
                    </div>

                    <p className="instructor-section-right-text">
                        Instructor from around the world teach millions of
                        students on StudyNotion. We provide the tools and skills
                        to teach what you love.
                    </p>

                    <div className="instructor-section-right-bottom">
                        <Button active={true} linkto={"/signup"}>
                            <div className="instructor-btn-text">
                                Start Learning Today <FaArrowRight />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
