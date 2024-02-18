// import components
// ==================================
import "./Sidebar.css";
import SidebarLink from "./SidebarLink";

// import hooks
// ==================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import data
// ==================================
import { sidebarLinks } from "../../../data/dashboard-links";

// import API-functions
// ==================================
import { logout } from "../../../services/operations/authAPI";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

export default function Sidebar() {
    // initialise hooks
    // ====================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states
    // ====================
    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
    );
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // handle loading-case
    // ====================

    if (profileLoading || authLoading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                {/* Sidebar - links */}
                {/* =================== */}
                <div className="sidebar-links">
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) {
                            return null;
                        }

                        return (
                            <SidebarLink
                                key={link.id}
                                link={link}
                                iconName={link.icon}
                            />
                        );
                    })}
                </div>

                {/* Horizontal - line */}
                {/* =================== */}
                <div className="sidebar-horz-line"></div>

                {/* Settings & Logout */}
                {/* =================== */}
                <div className="sidebar-settings-logout">
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    {/* Logout button ------ */}
                    {/* On clicking.. confirmation-modal is rendered */}
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are You Sure ?",
                                text2: "You will be logged out of your Account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="sidebar-logout-btn"
                    >
                        <div className="sidebar-logout-btn-content">
                            <VscSignOut className="sidebar-logout-icon" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Confirmation - modal */}
            {/* (conditional rendering) */}
            {/* ========================= */}
            <div>
                {confirmationModal && (
                    <ConfirmationModal modalData={confirmationModal} />
                )}
            </div>
        </div>
    );
}
