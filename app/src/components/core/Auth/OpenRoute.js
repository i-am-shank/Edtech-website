// This will prevent authenticated users from accessing these routes

// import hooks & inbuilt-functions
// ==================================
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
    // Check if authenticated user is there or any other user
    const { token } = useSelector((state) => state.auth);

    if (token === null) {
        // User is not authenticated .. provide access
        return children;
    } else {
        // Authenticated user .. divert to profile-dashboard (don't provide access)
        return <Navigate to="/dashboard/my-profile" />;
    }
}
