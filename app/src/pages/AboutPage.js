// import components
// ==========================
import "./AboutPage.css";
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSection from "../components/core/HomePage/ReviewSection";

// import assets
// ==========================
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";

export default function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-page-content">
                {/* Section - 1 */}
                {/* ========================== */}
                <section className="about-section-1">
                    <div className="about-section-1-content">
                        {/* Heading ------------- */}
                        <header className="about-section-1-heading">
                            Driving Innovation in Online Education for a{" "}
                            <HighlightText text={"Brighter Future"} />
                            {/* Paragraph ------------- */}
                            <p className="about-section-1-heading-para">
                                StudyNotion is at the forefront of driving
                                innovation in online education. We're passionate
                                about creating a brighter future by offering
                                cutting-edge courses, leveraging emerging
                                technologies, and nurturing a vibrant learning
                                community.
                            </p>
                        </header>

                        {/* Gap ------------- */}
                        <div className="about-section-1-gap"></div>

                        {/* Images ------------- */}
                        <div className="about-section-1-images">
                            <img src={BannerImage1} alt="" />
                            <img src={BannerImage2} alt="" />
                            <img src={BannerImage3} alt="" />
                        </div>
                    </div>
                </section>

                {/* Section - 2 */}
                {/* ========================== */}
                <section className="about-section-2">
                    {/* Quote */}
                    <div className="about-section-2-quote">
                        <div className="about-section-2-gap"></div>
                        <Quote />
                    </div>
                </section>

                {/* Section - 3 */}
                {/* ========================== */}
                <section className="about-section-3">
                    {/* section-3 A */}
                    {/* ---------------- */}
                    <div className="about-section-3-a">
                        {/* Left-text ---------- */}
                        <div className="about-section-3-a-text">
                            <h1 className="about-section-3-a-heading">
                                Our Founding Story
                            </h1>
                            <p className="about-section-3-a-para">
                                Our e-learning platform was born out of a shared
                                vision and passion for transforming education.
                                It all began with a group of educators,
                                technologists, and lifelong learners who
                                recognized the need for accessible, flexible,
                                and high-quality learning opportunities in a
                                rapidly evolving digital world.
                            </p>
                            <p className="about-section-3-a-para">
                                As experienced educators ourselves, we witnessed
                                firsthand the limitations and challenges of
                                traditional education systems. We believed that
                                education should not be confined to the walls of
                                a classroom or restricted by geographical
                                boundaries. We envisioned a platform that could
                                bridge these gaps and empower individuals from
                                all walks of life to unlock their full
                                potential.
                            </p>
                        </div>

                        {/* Right-Image ----------- */}
                        <img
                            src={FoundingStory}
                            alt=""
                            className="about-section-3-a-img"
                        />
                    </div>

                    {/* section-3 B */}
                    {/* ---------------- */}
                    <div className="about-section-3-b">
                        {/* Section-3 B .. child 1 ----------- */}
                        <div className="about-section-3-b-child">
                            <h1 className="about-section-3-b-1-heading">
                                Our Vision
                            </h1>
                            <p className="about-section-3-b-para">
                                With this vision in mind, we set out on a
                                journey to create an e-learning platform that
                                would revolutionize the way people learn. Our
                                team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that
                                combines cutting-edge technology with engaging
                                content, fostering a dynamic and interactive
                                learning experience.
                            </p>
                        </div>

                        {/* Section-3 B .. child 2 ----------- */}
                        <div className="about-section-3-b-child">
                            <h1 className="about-section-3-b-2-heading">
                                Our Mission
                            </h1>
                            <p className="about-section-3-b-para">
                                Our mission goes beyond just delivering courses
                                online. We wanted to create a vibrant community
                                of learners, where individuals can connect,
                                collaborate, and learn from one another. We
                                believe that knowledge thrives in an environment
                                of sharing and dialogue, and we foster this
                                spirit of collaboration through forums, live
                                sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section - 4 */}
                {/* ========================== */}
                <StatsComponent />

                {/* Section - 5 */}
                {/* (world-class learning grid) */}
                {/* ========================== */}
                <section className="about-section-5">
                    <LearningGrid />
                    <ContactFormSection />
                </section>

                {/* Section - 6 */}
                {/* ========================== */}
                <section className="about-section-6">
                    <div>
                        <h1 className="about-section-6-heading">
                            Reviews from other learners
                        </h1>

                        {/* Review-section ----------- */}
                        <ReviewSection />
                    </div>
                </section>
            </div>

            {/* Footer */}
            {/* ========================== */}
            <Footer />
        </div>
    );
}
