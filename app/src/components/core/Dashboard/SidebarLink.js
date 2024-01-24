// import components
// ==============================
import "./SidebarLink.css";

// import hooks
// ==============================
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { useDispatch } from "react-redux";

// import assets
// ==============================
import * as Icons from "react-icons/vsc";

export default function SidebarLink({ link, iconName }) {
    // fetch data
    // ==================
    const Icon = Icons[iconName];

    // initialise hooks
    // ==================
    // Have to do conditional-styling
    const location = useLocation();
    const dispatch = useDispatch();

    // Match-route function
    // ==================
    // (manage options out of selection-tab .. using URL)
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <NavLink
            to={link.path}
            onClick={() => {}}
            className={`sidebar-link ${
                matchRoute(link.path)
                    ? "active-sidebar-link"
                    : "inactive-sidebar-link"
            }`}
        >
            {/* Left border (active-link) */}
            <span
                className={`sidebar-link-border ${
                    matchRoute(link.path) ? "active-border" : "inactive-border"
                }`}
            ></span>

            {/* Icon & Link-name */}
            <div className="sidebar-link-content">
                <Icon className="sidebar-link-icon" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}
