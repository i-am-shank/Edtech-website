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
import CatalogPage from "./pages/CatalogPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ViewCoursePage from "./pages/ViewCoursePage";
import CreateCategoryPage from "./pages/CreateCategoryPage";

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
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import VideoDetails from "./components/core/ViewCoursePage/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import CategoriesList from "./components/core/Dashboard/CategoriesList/CategoriesList";
import EditCategory from "./components/core/Dashboard/CategoriesList/EditCategory";

export default function App() {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="App">
            <Navbar className="navbar-element" />
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

                {/* Course route */}
                <Route
                    path="courses/:courseId"
                    element={<CourseDetailsPage />}
                />

                {/* View Course routes */}
                {/* =================== */}
                <Route
                    element={
                        <PrivateRoute>
                            <ViewCoursePage />
                        </PrivateRoute>
                    }
                >
                    {/* (student-only routes) */}
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route
                                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element={<VideoDetails />}
                            />
                        </>
                    )}
                </Route>

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

                {/* Catalog, About & Contact pages */}
                {/* ====================== */}
                <Route path="catalog/:catalogName" element={<CatalogPage />} />
                <Route path="about" element={<AboutPage />} />
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

                    {/* Admin-only routes */}
                    {/* -------------------- */}
                    {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                        <>
                            <Route
                                path="dashboard/create-category"
                                element={<CreateCategoryPage />}
                            />
                            <Route
                                path="dashboard/categories-list"
                                element={<CategoriesList />}
                            />
                            <Route
                                path="dashboard/edit-category/:catalogName"
                                element={<EditCategory />}
                            />
                        </>
                    )}

                    {/* Student-only routes */}
                    {/* -------------------- */}
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
                    {/* -------------------- */}
                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route
                                path="dashboard/add-course"
                                element={<AddCourse />}
                            />
                            <Route
                                path="dashboard/my-courses"
                                element={<MyCourses />}
                            />
                            <Route
                                path="dashboard/edit-course/:courseId"
                                element={<EditCourse />}
                            />
                            <Route
                                path="dashboard/instructor"
                                element={<InstructorDashboard />}
                            />
                        </>
                    )}
                </Route>

                {/* Error page */}
                {/* ====================== */}
                {/* <Route path="*" element={<ErrorPage />} /> */}

                {/* Redirects all non-existing-links */}
                {/* ====================== */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </div>
    );
}
