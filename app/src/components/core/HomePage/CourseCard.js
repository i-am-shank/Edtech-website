import "./CourseCard.css";

// import icons
// ==============================
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

export default function CourseCard({ cardData, currentCard, setCurrentCard }) {
    return (
        <div
            className={`course-card ${
                currentCard === cardData?.heading
                    ? "current-course-card"
                    : "other-course-card"
            }`}
            onClick={() => setCurrentCard(cardData?.heading)}
        >
            {/* Heading & Description */}
            {/* ========================= */}
            <div className="card-heading-description">
                {/* Heading --------------- */}
                <div
                    className={`card-heading ${
                        currentCard === cardData?.heading &&
                        "current-card-heading"
                    }`}
                    onClick={() => setCurrentCard(cardData?.heading)}
                >
                    {cardData?.heading}
                </div>

                {/* Description --------------- */}
                <div className="card-description">{cardData?.description}</div>
            </div>

            {/* Level & Flow-chart */}
            {/* ========================= */}
            <div
                className={`card-level-flowchart ${
                    currentCard === cardData?.heading
                        ? "active-card-level-flowchart"
                        : "inactive-card-level-flowchart"
                }`}
            >
                {/* Level --------------- */}
                <div className="card-level">
                    <HiUsers />
                    <p>{cardData?.level}</p>
                </div>

                {/* Flow-chart ---------------- */}
                <div className="card-flowchart">
                    <ImTree />
                    <p>{cardData?.lessionNumber} Lessons</p>
                </div>
            </div>
        </div>
    );
}
