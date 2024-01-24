// import components
// ===============================
import "./RenderTotalAmount.css";
import IconBtn from "../../../common/IconBtn";

// import hooks & React-tools
// ===============================
import { useSelector } from "react";

export default function RenderTotalAmount() {
    // states
    // ================
    const { total, cart } = useSelector((state) => state.cart);

    // Handlers
    // ================
    const handleBuyCourse = () => {
        // Payment Gateway isn't ready
        // So, do console-log for time-being
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses:", courses);

        // (ToDo) API integrate => Takes us to payment-gateway
    };

    return (
        <div className="total-amount">
            <p>Total:</p>

            {/* Amount ----------- */}
            <p>Rs {total}</p>

            {/* Buy btn ----------- */}
            <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}
                customClasses={"w-full justify-center"}
            />
        </div>
    );
}
