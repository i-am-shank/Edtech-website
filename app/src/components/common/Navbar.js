// import components
// =============================
import "./Navbar.css";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

// import hooks & React-tools
// =============================
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

// import API related modules
// =============================
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

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
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing SubLinks result : ", result);

            // Update the state of links-array
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could'nt fetch the category list : ", error);
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

    return (
        <div
            className={`navbar ${
                location.pathname === "/"
                    ? "navbar-homepage"
                    : "navbar-other-pages"
            }`}
        >
            <div className="navbar-content">
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
                                                        <p className="navbar-catalog-loader">
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

                {/* Navbar Menu */}
                {/* =========================== */}
                <button className="navbar-menu">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
        </div>
    );
}
