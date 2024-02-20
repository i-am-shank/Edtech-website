// import components
// ==============================
import "./SidebarLink.css";

// import hooks
// ==============================
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { useDispatch } from "react-redux";

// import reducers (from slices)
// ==============================
import { setEditCourse } from "../../../slices/courseSlice";

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
            className={`sidebar-link ${
                matchRoute(link.path)
                    ? "active-sidebar-link"
                    : "inactive-sidebar-link"
            }`}
        >
            {/* Icon & Link-name */}
            <div
                className="sidebar-link-content"
                onClick={() => dispatch(setEditCourse(false))}
            >
                <Icon className="sidebar-link-icon" />
                <span className="sidebar-link-name">{link.name}</span>

                <span
                    className={`sidebar-link-border ${
                        matchRoute(link.path)
                            ? "active-border"
                            : "inactive-border"
                    }`}
                ></span>
            </div>
        </NavLink>
    );
}
