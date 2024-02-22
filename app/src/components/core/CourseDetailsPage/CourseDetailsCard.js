// import components
// ===================================
import "./CourseDetailsCard.css";

// import hooks & React-tools
// ===================================
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

// import assets
// ===================================
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

// import constants
// ===================================
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

export default function CourseDetailsCard({
    course,
    setConfirmationModal,
    handleBuyCourse,
}) {
    // initialise hooks
    // ===============
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states
    // ===============
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    // Fetch course-data
    // ===============
    const { thumbnail, price: CurrentPrice, _id: courseId } = course;

    // Handlers
    // ===============
    const handleAddToCart = () => {
        // neither instructor, nor un-authenticated users.
        if (user && user?.account_type === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course !");
        }
        if (token) {
            // fire reducer ---------
            // console.log("Dispatching add to cart !");
            dispatch(addToCart(course));
            return;
        } else {
            // Un-authenticated user (not logged-in)
            // Show confirmation modal -----------
            setConfirmationModal({
                text1: "You are not logged in !",
                text2: "Please login to add to cart",
                btn1Text1: "Login",
                btn2Text2: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            });
        }
    };

    const handleShare = () => {
        // Copy link to clipboard ---------
        copy(window.location.href);
        // Show "link copied" toast ---------
        toast.success("Link copied to clipboard !");
    };

    return (
        <div className="course-details-card-wrapper">
            <div className="course-details-card">
                {/* Course thumbnail */}
                {/* ================ */}
                <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="course-details-card-thumbnail"
                />

                {/* Course info */}
                {/* ================ */}
                <div className="course-details-course-info">
                    {/* Price ------------ */}
                    <p className="course-details-card-price">
                        ₹ {CurrentPrice}
                    </p>

                    {/* Buttons ------------ */}
                    <div className="course-details-card-btns">
                        {/* Buy btn */}
                        {/* ============== */}
                        {/* (conditional function & text) */}
                        <button
                            onClick={
                                user &&
                                course?.studentsEnrolled.includes(user?._id)
                                    ? () =>
                                          navigate(
                                              "/dashboard/enrolled-courses"
                                          )
                                    : handleBuyCourse
                            }
                            className="course-details-card-buy-btn"
                        >
                            {user &&
                            course?.studentsEnrolled.includes(user?._id)
                                ? "Go to Course"
                                : "Buy Now"}
                        </button>

                        {/* Add to Cart btn */}
                        {/* ============== */}
                        {/* (only visible if course not bought) */}
                        {!course.studentsEnrolled.includes(user?._id) && (
                            <button
                                onClick={() => handleAddToCart()}
                                className="course-details-card-cart-btn"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                    {/* Guarantee ------------ */}
                    <div>
                        <p className="course-details-card-guarantee">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>

                    {/* Bottom texts ------------ */}
                    <div className="course-details-card-bottom">
                        <p className="course-details-card-bottom-title">
                            This Course Includes:
                        </p>
                        <div className="course-details-card-bottom-points">
                            {course?.instructions?.map((item, index) => (
                                <p
                                    key={index}
                                    className="course-details-card-bottom-point"
                                >
                                    <BsFillCaretRightFill />
                                    <span>{item}</span>
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Share button ------------ */}
                    <div className="course-details-card-share">
                        <button
                            className="course-details-card-share-btn"
                            onClick={() => handleShare()}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
