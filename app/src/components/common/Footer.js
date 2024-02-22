import "./Footer.css";

// import modules
// ==================================
import { Link } from "react-router-dom";

// import images
// ==================================
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// import icons
// ==================================
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// import links
// ==================================
import { FooterLink2 } from "../../data/footer-links";

// Data
// ==================================
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code Challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

export default function Footer() {
    return (
        <div className="footer-section">
            {/* ================================================== */}
            {/* Footer Above Section ======================= */}
            {/* ================================================== */}
            <div className="footer-above">
                <div className="footer-above-content">
                    {/* Section - 1 */}
                    {/* ============================ */}
                    <div className="footer-above-section-1">
                        {/* Part - 1 (section - 1) */}
                        <div className="footer-above-section-1-part-1">
                            {/* Part - 1 .. image & heading */}
                            <img src={Logo} alt="" className="part-1-img" />
                            <h1 className="part-1-heading">Company</h1>

                            {/* Part - 1 .. links */}
                            <div className="part-1-links">
                                {["About", "Careers", "Affiliates"].map(
                                    (ele, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="part-1-link-element-div"
                                            >
                                                <Link to={ele.toLowerCase()}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* Part - 1 .. icons */}
                            <div className="part-1-icons">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>

                        {/* Part - 2 (section - 1) */}
                        <div className="footer-above-section-1-part-2">
                            {/* Part - 2 .. heading - 1 */}
                            <h1 className="part-2-heading">Resources</h1>

                            {/* Part - 2 .. links - 1 */}
                            <div className="part-2-links-1">
                                {Resources.map((ele, index) => {
                                    return (
                                        <div
                                            className="part-2-links-1-element"
                                            key={index}
                                        >
                                            <Link
                                                to={ele
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}
                                            >
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Part - 2 .. heading - 2 */}
                            <h1 className="part-2-heading-2">Support</h1>

                            {/* Part - 2 .. links - 2 */}
                            <div className="part-2-links-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>

                        {/* Part - 3 (section - 1) */}
                        <div className="footer-above-section-1-part-3">
                            {/* Part - 3 .. heading - 1 */}
                            <h1 className="part-3-heading-1">Plans</h1>

                            {/* Part - 3 .. links - 1 */}
                            <div className="part-3-links">
                                {Plans.map((ele, index) => {
                                    return (
                                        <div
                                            className="part-3-links-element"
                                            key={index}
                                        >
                                            <Link
                                                to={ele
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}
                                            >
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Part - 3 .. heading - 2 */}
                            <h1 className="part-3-heading-2">Community</h1>

                            {/* Part - 3 .. links - 2 */}
                            <div className="part-3-links-2">
                                {Community.map((ele, index) => {
                                    return (
                                        <div
                                            className="part-3-links-element"
                                            key={index}
                                        >
                                            <Link
                                                to={ele
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}
                                            >
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Section - 2 */}
                    {/* ============================= */}
                    <div className="footer-above-section-2">
                        {FooterLink2.map((ele, i) => {
                            return (
                                <div
                                    className="footer-above-section-2-lists"
                                    key={i}
                                >
                                    {/* List Heading */}
                                    <h1 className="footer-above-section-2-lists-heading">
                                        {ele.title}
                                    </h1>

                                    {/* List elements */}
                                    <div className="footer-above-section-2-lists-elements">
                                        {ele.links.map(
                                            (current_link, index) => {
                                                return (
                                                    <div
                                                        className="footer-above-section-2-lists-element"
                                                        key={index}
                                                    >
                                                        <Link
                                                            to={
                                                                current_link.link
                                                            }
                                                        >
                                                            {current_link.title}
                                                        </Link>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ================================================== */}
            {/* Footer Bottom Section ====================== */}
            {/* ================================================== */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    {/* Footer Bottom links */}
                    {/* ================================ */}
                    <div className="footer-bottom-list">
                        {BottomFooter.map((ele, i) => {
                            return (
                                <div
                                    key={i}
                                    className={` ${
                                        BottomFooter.length - 1 === i
                                            ? ""
                                            : "footer-bottom-list-element"
                                    } px-3`}
                                >
                                    <Link
                                        to={ele
                                            .split(" ")
                                            .join("-")
                                            .toLocaleLowerCase()}
                                    >
                                        {ele}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Bottom Text */}
                    {/* ================================ */}
                    <div className="footer-bottom-text">
                        Made with ❤️ by Shanks © StudyNotion 2023
                    </div>
                </div>
            </div>
        </div>
    );
}
