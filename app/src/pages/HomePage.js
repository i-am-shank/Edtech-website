// import components
// ===========================
import "./HomePage.css";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSection from "../components/core/HomePage/ReviewSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

// import icons
// ===========================
import { FaArrowRight } from "react-icons/fa";

// import hooks & React-tools
// ===========================
import { Link } from "react-router-dom";

// import files
// ===========================
import Banner from "../assets/Images/banner.mp4";

export default function HomePage() {
    return (
        <div>
            {/* =========================== */}
            {/* Section 1  .... black */}
            {/* =========================== */}
            <div className="homepage-section-1">
                {/* Button */}
                {/* ============================================== */}
                <Link to={"/signup"} className="homepage-instructor-btn">
                    {/* top-button */}
                    <div className="group homepage-outer-btn-div">
                        <div className="homepage-inner-btn-div">
                            <p>Become an Instructor</p> <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                {/* ============================================== */}
                <div className="homepage-future-heading">
                    Empower Your Future with{" "}
                    <HighlightText text={"Coding Skills"} />
                </div>

                {/* Sub-heading */}
                {/* ============================================== */}
                <div className="homepage-future-subheading">
                    With our online coding courses, you can learn at your own
                    pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and
                    personalized feedback from instructors.
                </div>

                {/* {Buttons .. yellow / black} */}
                {/* ============================================== */}
                <div className="homepage-buttons">
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>

                    <Button active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>
                </div>

                {/* Video .. */}
                {/* ============================================== */}
                <div className="homepage-video-div">
                    <video className="homepage-video" muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Text & Codes - 1 */}
                {/* ============================================== */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="homepage-codeblocks-heading-div">
                                Unlock your{" "}
                                <HighlightText text={"coding potential"} /> with
                                our online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            btnText: "Try It Yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html> \n <html> \n <head> \n <title> Example </title> \n <link rel="stylesheet" href="styles.css"> \n </head> \n <body> \n <h1> <a href="/"> Header </a> </h1> \n </body> \n </html>
                            `}
                        backgroundGradient={
                            <div className="homepage-codeblock-1 absolute"></div>
                        }
                    />
                </div>

                {/* Text & Codes - 2 */}
                {/* ============================================== */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="homepage-codeblocks-heading-div">
                                Start{" "}
                                <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import IconBtn from "../components/common/IconBtn";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nexport default function Home() => {\nreturn (\n<div>Home</div>\n);\n}\n`}
                        backgroundGradient={
                            <div className="homepage-codeblock-2 absolute"></div>
                        }
                    />
                </div>

                {/* Explore more */}
                {/* ============================================== */}
                <ExploreMore />
            </div>

            {/* =========================== */}
            {/* Section 2  .... white */}
            {/* =========================== */}
            <div className="homepage-section-2">
                {/* Bg with buttons */}
                <div className="homepage-bg-and-btns">
                    <div className="homepage-section-2-btns-div-1">
                        <div className="homepage-above-btn-gap"></div>
                        <div className="homepage-section-2-btns">
                            <Button active={true} linkto={"/signup"}>
                                <div className="homepage-section-2-btn">
                                    Explore Full Catalogue
                                    <FaArrowRight />
                                </div>
                            </Button>

                            <Button active={false} linkto={"/signup"}>
                                <div className="homepage-section-2-btn-2">
                                    Learn More
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Skills for Job -- content */}
                <div className="homepage-skills-for-job">
                    {/* Job-skills heading */}
                    <div className="homepage-job-skills-heading">
                        <div className="homepage-job-skills-heading-content">
                            Get the skills for a{" "}
                            <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className="homepage-job-skills-text">
                            <div className="homepage-job-skills-text-content">
                                The modern StudyNotion is the one who dictates
                                its own terms. Today, to be a competitive
                                specialist requires more than professional
                                skills.
                            </div>
                            <Button active={true} linkto={"/signup"}>
                                <div>Learn More</div>
                            </Button>
                        </div>
                    </div>

                    {/* TimeLine Section  .. image/text */}
                    <TimelineSection />

                    {/* Learning Languate Section */}
                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section 3  .... black */}
            <div className="homepage-section-3">
                {/* Instructor-section */}
                <InstructorSection />

                {/* Review-section */}
                <h1 className="homepage-review-section">
                    Reviews from other learners
                </h1>
                <ReviewSection />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
