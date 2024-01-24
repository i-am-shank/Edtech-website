import "./ExploreMore.css";

// import hooks
// ===================================
import { useState } from "react";

// import components
// ===================================
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

// import data
// ===================================
import { HomePageExplore } from "../../../data/homepage-explore";

// data
// ===================================
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

export default function ExploreMore() {
    // States
    // ==========================
    // By default .. "Free" tab is currentTab
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    // By default, courses are corresponding courses of default-currentTab (0th index)
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    // By default, 1st course is in white (currentCard)
    const [currentCard, setCurrentCard] = useState(
        HomePageExplore[0].courses[0].heading
    );

    const setMyCards = (tabName) => {
        // Update tab-name
        setCurrentTab(tabName);

        // Fetch data of that tab .. to update courses & currentCard
        const result = HomePageExplore.filter((tab) => tab.tag === tabName);

        // Update courses
        setCourses(result[0].courses);

        // Update currentCard
        setCurrentCard(result[0].courses[0].heading);
    };

    return (
        <div className="explore-more">
            {/* Explore more section */}
            {/* =========================== */}
            <div className="explore-more-section">
                Unlock the <HighlightText text={"Power of Code"} />
                <p className="explore-more-text">
                    Learn to build anything you can imagine
                </p>
            </div>

            {/* Tabs section */}
            {/* =========================== */}
            <div className="tabs-section drop-shadow-[0_1.5px_rgba(255, 255, 255, 0.25)]">
                {tabsName.map((tabName, index) => {
                    return (
                        <div
                            key={index}
                            className={`explore-more-tab ${
                                currentTab === tabName
                                    ? "explore-more-current-tab"
                                    : "explore-more-other-tab"
                            }`}
                            onClick={() => setMyCards(tabName)}
                        >
                            {tabName}
                        </div>
                    );
                })}
            </div>

            {/* Cards Separation */}
            {/* =========================== */}
            <div className="tabs-cards-separation"></div>

            {/* Cards Group */}
            {/* =========================== */}
            <div className="cards-group">
                {courses.map((course, index) => {
                    return (
                        <CourseCard
                            key={index}
                            cardData={course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    );
                })}
            </div>
        </div>
    );
}
