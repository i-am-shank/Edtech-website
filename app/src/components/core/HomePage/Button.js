// import components
// ====================================
import "./Button.css";

// import hooks & React-tools
// ====================================
import { Link } from "react-router-dom";

export default function Button({ children, active, linkto }) {
    return (
        <Link to={linkto}>
            <div
                className={`button-children ${
                    active
                        ? "active-button-children"
                        : "inactive-button-children"
                } hover:scale-95 transition-all duration-200`}
            >
                {children}
            </div>
        </Link>
    );
}
