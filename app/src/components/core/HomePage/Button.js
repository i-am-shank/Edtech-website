import "./Button.css";

import { Link } from "react-router-dom";

export default function Button({ children, active, linkto }) {
    return (
        <Link to={linkto}>
            <div
                className={`button-children ${
                    active ? "bg-yellow-50 text-black" : "bg-richblack-800"
                } hover:scale-95 transition-all duration-200`}
            >
                {children}
            </div>
        </Link>
    );
}
