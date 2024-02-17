// import components
// ===============================
import "./RenderTotalAmount.css";
import IconBtn from "../../../common/IconBtn";

// import hooks & React-tools
// ===============================
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import API-related modules
// ===============================
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

export default function RenderTotalAmount() {
    // initialise hooks
    // ================
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states
    // ================
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    // Handlers
    // ================
    const handleBuyCourse = () => {
        // Payment Gateway isn't ready
        // So, do console-log for time-being
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch);
        console.log("Bought these courses:", courses);

        // (ToDo) API integrate => Takes us to payment-gateway
    };

    return (
        <div className="total-amount">
            <p className="total-amount-title">Total:</p>

            {/* Amount ----------- */}
            <p className="total-amount-amount">Rs {total}</p>

            {/* Buy btn ----------- */}
            <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}
                customClasses={"w-full justify-center"}
            />
        </div>
    );
}
