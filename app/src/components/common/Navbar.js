// import components
// =============================
import "./Navbar.css";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

// import hooks & React-tools
// =============================
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

// import data & constants
// =============================
import { NavbarLinks } from "../../data/navbar-links";
import { ACCOUNT_TYPE } from "../../utils/constants";

// import assets
// =============================
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { MdClose } from "react-icons/md";

// import API related modules
// =============================
import { fetchCourseCategories } from "../../services/operations/categoryAPI";

// Temporarily adding subLinks (for testing)
// =============================
// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python",
//     },
//     {
//         title: "Web Dev",
//         link: "/catalog/web-development",
//     },
// ];

export default function Navbar() {
    // states
    // ======================
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    // initialise hooks
    // ======================
    const location = useLocation(); // fetch location-params from useLocation-hook

    // API call (to backend)
    // ======================
    const fetchSublinks = async () => {
        // show loading ----------
        setLoading(true);

        try {
            // fire API-call ----------
            const result = await fetchCourseCategories();
            // console.log("Printing SubLinks result : ", result);

            // Update the state of links-array
            setSubLinks(result);
        } catch (error) {
            // console.log("Could'nt fetch the category list : ", error);
        }

        // hide loading ----------
        setLoading(false);
    };

    // Only need to do API call when page loads for 1st time
    useEffect(() => {
        // Updating sub-links by self
        fetchSublinks();
    }, []);

    // Handler functions
    // =====================
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    // Mobile navbar show/hide handler ---------
    const show = useRef();
    const overlay = useRef();
    const showHideNavbar = () => {
        // console.log("show-Classlist : ", show.current.classList);
        // console.log("overlay-ClassList : ", overlay.current.classList);
        show.current.classList.toggle("navshow");
        overlay.current.classList.toggle("hidden");
    };

    // Mobile navbar close handler --------
    const closeNavbar = () => {
        show.current.classList.remove("navshow");
        overlay.current.classList.add("hidden");
        // console.log("Navbar closed !");
        return;
    };

    return (
        <div
            className={`navbar ${
                location.pathname === "/"
                    ? "navbar-homepage"
                    : "navbar-other-pages"
            }`}
        >
            <div className="navbar-content">
                {/* Desktop Navbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ============================================ */}
                {/* ============================================ */}

                {/* Logo */}
                {/* ==================== */}
                <Link to="/">
                    <img
                        src={logo}
                        alt=""
                        width={160}
                        height={42}
                        loading="lazy"
                    />
                </Link>

                {/* Navbar-links */}
                {/* ==================== */}
                <nav className="navbar-links">
                    <ul className="navbar-links-list">
                        {NavbarLinks.map((link, index) => {
                            return (
                                <li key={index} className="navbar-link">
                                    {link.title === "Catalog" ? (
                                        <>
                                            <div
                                                className={`catalog-div group ${
                                                    matchRoute(
                                                        "/catalog/:catalogName"
                                                    )
                                                        ? "navbar-link-text-active"
                                                        : "navbar-link-text"
                                                }`}
                                            >
                                                <p>{link.title}</p>
                                                <BsChevronDown />

                                                {/* Hover content */}
                                                <div className="catalog-hover-content">
                                                    {/* Diamond shape */}
                                                    <div className="diamond-shape"></div>

                                                    {/* Dropdown link-list */}
                                                    {loading ? (
                                                        <p className="loading-wrapper">
                                                            <div className="spinner"></div>
                                                        </p>
                                                    ) : subLinks.length ? (
                                                        <>
                                                            {/* Add below filter to subLinks ---------- */}
                                                            {/* .filter(
                                                                    (subLink) =>
                                                                        subLink
                                                                            ?.courses
                                                                            ?.length >=
                                                                        0
                                                                )
                                                                ? */}

                                                            {subLinks?.map(
                                                                (
                                                                    subLink,
                                                                    index
                                                                ) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(
                                                                                " "
                                                                            )
                                                                            .join(
                                                                                "-"
                                                                            )
                                                                            .toLowerCase()}`}
                                                                        className="navbar-catalog-link"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p>
                                                                            {
                                                                                subLink.name
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="navbar-catalog-no-courses">
                                                            No Courses Found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p
                                                className={`${
                                                    matchRoute(link?.path)
                                                        ? "navbar-link-text-active"
                                                        : "navbar-link-text"
                                                }`}
                                            >
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Login, Signup OR Dashboard links */}
                {/* ==================== */}
                <div className="dashboard-links">
                    {/* Condition over state --> user .. to show cart-icon */}
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="navbar-cart-link">
                            <AiOutlineShoppingCart className="navbar-cart-icon" />
                            {totalItems > 0 && (
                                <span className="navbar-cart-count">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show login button */}
                    {token === null && (
                        <Link to="/login">
                            <button className="auth-btn">Log In</button>
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show signup button */}
                    {token === null && (
                        <Link to="/signup">
                            <button className="auth-btn">Sign Up</button>
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show dashboard related content */}
                    {token !== null && <ProfileDropDown />}

                    {/* Just to visualise, when token !== null */}
                    {/* {token !== null && <p>Token - not null</p>} */}
                </div>

                {/* Mobile Navbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ============================================ */}
                {/* ============================================ */}

                <div className="navbar-mobile-navbar">
                    {/* Cart link */}
                    {/* ==================== */}
                    <div>
                        {user &&
                            user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                <div className="navbar-mobile-cart">
                                    <Link
                                        to="/dashboard/cart"
                                        className="navbar-mobile-cart-link"
                                    >
                                        <div>
                                            <AiOutlineShoppingCart className="navbar-mobile-cart-icon" />
                                        </div>
                                        {totalItems > 0 && (
                                            <span className="navbar-mobile-item-cnt">
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            )}
                    </div>

                    {/* Navbar Menu */}
                    {/* =========================== */}
                    <div
                        className={`navbar-menu ${
                            token !== null &&
                            user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR
                                ? "navbar-menu-student"
                                : "navbar-menu-instructor"
                        } ${
                            token === null
                                ? "navbar-menu-logout"
                                : "navbar-menu-login"
                        }`}
                    >
                        {/* Menu icon ----------- */}
                        <AiOutlineMenu
                            fontSize={24}
                            fill="#AFB2BF"
                            className="navbar-mobile-hamburger"
                            onClick={() => showHideNavbar()}
                        />
                        <div
                            className="navbar-mobile-hamburger-overlay"
                            ref={overlay}
                            onClick={() => showHideNavbar()}
                        ></div>

                        {/* Navbar Mobile Links */}
                        {/* =================== */}
                        <div
                            className="navbar-mobile-hamburger-show mobNav"
                            ref={show}
                        >
                            <nav className="navbar-mobile-links" ref={show}>
                                {/* Close Navbar btn -------------- */}
                                <button
                                    onClick={() => closeNavbar()}
                                    className="navbar-mobile-close"
                                >
                                    <MdClose fontSize={24} fill="#AFB2BF" />
                                </button>

                                {/* Login link ----------- */}
                                {token === null && (
                                    <Link to="/login">
                                        <button
                                            onClick={() => showHideNavbar()}
                                            className="navbar-mobile-auth-btn"
                                        >
                                            Login
                                        </button>
                                    </Link>
                                )}

                                {/* Signup link ----------- */}
                                {token === null && (
                                    <Link
                                        to="/signup"
                                        className="navbar-mobile-signup-link"
                                    >
                                        <button
                                            onClick={() => showHideNavbar()}
                                            className="navbar-mobile-auth-btn"
                                        >
                                            Signup
                                        </button>
                                    </Link>
                                )}

                                {/* Dashboard link ----------- */}
                                {token !== null && (
                                    <div className="navbar-mobile-dashboard-link">
                                        {/* <p className="navbar-mobile-dashboard-text">
                                        Dashboard
                                    </p> */}
                                        <ProfileDropDown />
                                    </div>
                                )}

                                {/* Separation div */}
                                <div className="navbar-mobile-separation-div"></div>

                                {/* Categories header ------------ */}
                                <p className="navbar-mobile-categories-header">
                                    Catalog
                                </p>

                                {/* Categories list ------------ */}
                                <div className="navbar-mobile-categories-list">
                                    {subLinks.length < 0 ? (
                                        <div></div>
                                    ) : (
                                        subLinks?.map((element, index) => (
                                            <Link
                                                to={`/catalog/${element.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`}
                                                key={index}
                                                onClick={() => showHideNavbar()}
                                                className="navbar-mobile-category"
                                            >
                                                <p className="navbar-mobile-category-name">
                                                    {element?.name}
                                                </p>
                                            </Link>
                                        ))
                                    )}
                                </div>
                                {/* Separation div */}
                                <div className="navbar-mobile-separation-div"></div>

                                {/* About link ------------ */}
                                <Link
                                    to="/about"
                                    onClick={() => showHideNavbar()}
                                    className="navbar-mobile-page-link"
                                >
                                    <p className="navbar-mobile-page-name">
                                        About
                                    </p>
                                </Link>

                                {/* Contact link ------------ */}
                                <Link
                                    to="/contact"
                                    onClick={() => showHideNavbar()}
                                    className="navbar-mobile-page-link"
                                >
                                    <p className="navbar-mobile-page-name">
                                        Contact
                                    </p>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
