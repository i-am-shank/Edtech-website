import "./ProfileDropDown.css";

// import hooks
// =============================
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import custom hooks
// =============================
import useOnClickOutside from "../../../hooks/useOnClickOutside";

// import API-call functions
// =============================
import { logout } from "../../../services/operations/authAPI";

// import icons
// =============================
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";

export default function ProfileDropDown() {
    // Initializing hooks
    // ===============================
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null);

    // states
    // ===============================
    const [open, setOpen] = useState(false);

    // Control clicks, out of specified area
    // ===============================
    useOnClickOutside(ref, () => setOpen(false));

    // validation
    // ===============================
    if (!user) return null;

    return (
        <button className="dashboard" onClick={() => setOpen(true)}>
            <div className="dashboard-img-icon">
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="dashboard-img"
                />
                <AiOutlineCaretDown className="dashboard-icon" />
            </div>

            {open && (
                // drop-down-list
                // ============================
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="drop-down-list"
                    ref={ref}
                >
                    {/* Dashboard-link -------------- */}
                    <Link
                        to="/dashboard/my-profile"
                        onClick={() => setOpen(false)}
                    >
                        <div className="dashboard-link">
                            <VscDashboard className="dashboard-link-text" />
                            Dashboard
                        </div>
                    </Link>

                    {/* Logout-link -------------- */}
                    <div
                        className="dashboard-logout-link"
                        onClick={() => {
                            dispatch(logout(navigate));
                            setOpen(false);
                        }}
                    >
                        <VscSignOut className="dashboard-signout-component" />
                        Logout
                    </div>
                </div>
            )}
        </button>
    );
}
