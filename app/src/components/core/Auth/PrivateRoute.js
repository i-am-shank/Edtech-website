// import hooks
// ===============================
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    // Fetch token (for authorisation)
    const { token } = useSelector((state) => state.auth);

    if (token !== null) {
        // Logged in !!
        // Provide access to path.
        return children;
    } else {
        // User not logged-in
        // Divert to Login-page
        return <Navigate to="/login" />;
    }
}
