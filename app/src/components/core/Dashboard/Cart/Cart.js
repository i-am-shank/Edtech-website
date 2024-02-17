// import components
// ===============================
import "./Cart.css";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

// import hooks
// ===============================
import { useSelector } from "react-redux";

export default function Cart() {
    // states
    // ================
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="cart">
            {/* Heading */}
            {/* =============== */}
            <h1 className="cart-heading">Cart</h1>

            {/* Subtitle */}
            {/* =============== */}
            <p className="cart-subtitle">{totalItems} Courses in Cart</p>

            {/* Content */}
            <div className="cart-content-wrapper">
                {total > 0 ? (
                    <div className="cart-content">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                ) : (
                    <p className="cart-empty">Your Cart is Empty</p>
                )}
            </div>
        </div>
    );
}
