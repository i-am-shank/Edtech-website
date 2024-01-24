import "./Navbar.css";

// import modules
// =============================
import { Link, matchPath } from "react-router-dom";

// import data
// =============================
import { NavbarLinks } from "../../data/navbar-links";

// import assets
// =============================
import logo from "../../assets/Logo/Logo-Full-Light.png";

// import icons
// =============================
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

// import hooks
// =============================
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// import components
// =============================
import ProfileDropDown from "../core/Auth/ProfileDropDown";

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
    // fetch states
    // ======================
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const location = useLocation(); // fetch location-params from useLocation-hook

    // API call (to backend)
    // ======================
    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);

            // Just for debugging
            console.log("Printing SubLinks result : ", result);

            // Update the state of links-array
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
    };

    // Only need to do API call when page loads for 1st time
    useEffect(() => {
        // Commenting function-call, as API-call isn't working
        // Updating sub-links by self
        fetchSublinks();
    }, []);

    // Handler functions
    // =====================
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className="navbar">
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
                <nav>
                    <ul className="navbar-links-list">
                        {NavbarLinks.map((link, index) => {
                            return (
                                <li key={index} className="navbar-link">
                                    {link.title === "Catalog" ? (
                                        <div className="catalog-div group">
                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            {/* Hover content */}
                                            <div className="catalog-hover-content">
                                                {/* Diamond shape */}
                                                <div className="diamond-shape"></div>

                                                {/* Dropdown link-list */}

                                                {subLinks.length ? (
                                                    subLinks.map(
                                                        (subLink, index) => (
                                                            <Link
                                                                to={`${subLink.link}`}
                                                                key={index}
                                                            >
                                                                <p>
                                                                    {
                                                                        subLink.name
                                                                    }
                                                                </p>
                                                            </Link>
                                                        )
                                                    )
                                                ) : (
                                                    <div>0 links</div>
                                                )}
                                            </div>
                                        </div>
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
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="cart-link">
                            <AiOutlineShoppingCart />
                            {totalItems > 0 && (
                                <span className="cart-count">{totalItems}</span>
                            )}
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show login button */}
                    {token === null && (
                        <Link to="/login">
                            <button className="auth-btn login-btn">
                                Log In
                            </button>
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show signup button */}
                    {token === null && (
                        <Link to="/signup">
                            <button className="auth-btn signup-btn">
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {/* Condition over state --> token .. to show dashboard related content */}
                    {token !== null && <ProfileDropDown />}

                    {/* Just to visualise, when token !== null */}
                    {/* {token !== null && <p>Token - not null</p>} */}
                </div>
            </div>
        </div>
    );
}
