import "./App.css";

// import React-assets
// =============================
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// import pages
// =============================
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";

// import components
// =============================
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";

export default function App() {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Login & Signup pages */}
                {/* ==================== */}
                <Route
                    path="signup"
                    element={
                        <OpenRoute>
                            <SignupPage />
                        </OpenRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <OpenRoute>
                            <LoginPage />
                        </OpenRoute>
                    }
                />

                {/* Authentication pages */}
                {/* =================== */}
                <Route
                    path="forgot-password"
                    element={
                        <OpenRoute>
                            <ResetPasswordPage />
                        </OpenRoute>
                    }
                />
                <Route
                    path="update-password/:id"
                    element={
                        <OpenRoute>
                            <UpdatePasswordPage />
                        </OpenRoute>
                    }
                />
                <Route
                    path="verify-email"
                    element={
                        <OpenRoute>
                            <VerifyEmailPage />
                        </OpenRoute>
                    }
                />

                {/* About & Contact pages */}
                {/* ====================== */}
                <Route
                    path="about"
                    element={
                        <OpenRoute>
                            <AboutPage />
                        </OpenRoute>
                    }
                />
                <Route path="contact" element={<ContactPage />} />

                {/* Dashboard page routes */}
                {/* ====================== */}
                <Route
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="dashboard/my-profile"
                        element={<MyProfile />}
                    />
                    <Route path="dashboard/settings" element={<Settings />} />

                    {/* Student-only routes */}
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route
                                path="dashboard/enrolled-courses"
                                element={<EnrolledCourses />}
                            />
                            <Route path="dashboard/cart" element={<Cart />} />
                        </>
                    )}

                    {/* Instructor-only routes */}
                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route
                                path="dashboard/add-course"
                                element={<AddCourse />}
                            />
                        </>
                    )}
                </Route>

                {/* Error page */}
                {/* ====================== */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}
