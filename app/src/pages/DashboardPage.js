// import components
// ==================================
import "./DashboardPage.css";
import Sidebar from "../components/core/Dashboard/Sidebar";

// import hooks & React-tools
// ==================================
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
    // states
    // ========================
    // Same state-name from 2 different slices (auth-slice & profile-slice)
    // So naming both the states, differently !!
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className="loading-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            {/* ====================== */}
            <Sidebar />

            {/* Main Content */}
            {/* ====================== */}
            <div className="dashboard-contents">
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
