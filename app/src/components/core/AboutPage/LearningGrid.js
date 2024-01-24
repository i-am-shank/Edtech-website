import HighlightText from "../HomePage/HighlightText";
import "./LearningGrid.css";

// import components
// ================================
import Button from "../HomePage/Button";

// data
// ================================
const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        textHighlight: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring change.",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring change.",
    },
    {
        order: 4,
        heading: "Rating Auto-grading",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring change.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring change.",
    },
];

export default function LearningGrid() {
    return (
        <div className="learning-grid">
            {LearningGridArray.map((card, index) => {
                return (
                    <div
                        className={`learning-grid-card ${
                            index === 0 && "learning-grid-card-1"
                        } ${card.order % 2 === 1 && "learning-grid-card-grey"}
                        ${
                            card.order % 2 === 0 &&
                            card.order > 0 &&
                            "learning-grid-card-black"
                        } ${card.order === 3 && "learning-grid-card-3"}`}
                        key={index}
                    >
                        {card.order === -1 ? (
                            <div className="first-learning-grid-card">
                                <h1 className="first-learning-card-heading">
                                    {card.heading}{" "}
                                    <HighlightText text={card.textHighlight} />
                                </h1>
                                <p className="first-learning-card-description">
                                    {card.description}
                                </p>
                                <div className="first-learning-card-btn">
                                    <Button active={true} linkto={card.btnLink}>
                                        {card.btnText}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="other-learning-grid-card">
                                <h1 className="other-grid-card-heading">
                                    {card.heading}
                                </h1>
                                <p className="other-grid-card-description">
                                    {card.description}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
