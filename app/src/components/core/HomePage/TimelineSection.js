import "./TimelineSection.css";

// import images
// ================================
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

export default function TimelineSection() {
    // Left content text
    const timeline = [
        {
            Logo: Logo1,
            heading: "Leadership",
            Description: "Fully committed to the success company",
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            Description: "Students will always be our top priority",
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            Description: "The ability to switch is an important skill",
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            Description: "Code your way to a solution",
        },
    ];

    return (
        <div className="timeline-section">
            <div className="timeline-section-content">
                {/* Left section */}
                {/* =================== */}
                <div className="timeline-left">
                    {timeline.map((element, index) => {
                        return (
                            <div className="timeline-element" key={index}>
                                <div className="timeline-element-content">
                                    {/* image */}
                                    <div className="timeline-element-left">
                                        <img src={element.Logo} alt="" />
                                    </div>

                                    {/* text-content */}
                                    <div className="timeline-element-right">
                                        <h2 className="timeline-element-heading">
                                            {element.heading}
                                        </h2>
                                        <p className="timeline-element-para">
                                            {element.Description}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`timeline-element-h-div ${
                                        timeline.length - 1 === index
                                            ? "timeline-last-element-h-div"
                                            : "timeline-other-element-h-div"
                                    }`}
                                ></div>
                            </div>
                        );
                    })}
                </div>

                {/* Right section */}
                {/* =================== */}
                <div className="timeline-right">
                    {/* Green section (overlapped) ----------- */}
                    <div className="overlap-div">
                        <div className="overlap-div-left">
                            <p className="overlap-text-heading">10</p>
                            <p className="overlap-text-para">
                                Years of Experience
                            </p>
                        </div>

                        <div className="overlap-div-right">
                            <p className="overlap-text-heading">250</p>
                            <p className="overlap-text-para">Type of courses</p>
                        </div>
                    </div>

                    {/* Timeline-image ------------ */}
                    <img
                        src={timelineImage}
                        alt="timelineImage"
                        className="timeline-image"
                    />
                </div>
            </div>
        </div>
    );
}
