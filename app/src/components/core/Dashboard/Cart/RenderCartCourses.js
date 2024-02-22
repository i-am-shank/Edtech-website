// import components
// ===============================
import "./RenderCartCourses.css";

// import hooks & React-tools
// ===============================
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";

// import assets
// ===============================
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

// import API-call functions
// ===============================
import { removeFromCart } from "../../../../slices/cartSlice";

export default function RenderCartCourses() {
    // intialise hooks
    // =============
    const dispatch = useDispatch();

    // states
    // =============
    const { cart } = useSelector((state) => state.cart);

    // useEffect(() => {
    //     console.log("Print cart : ", cart);
    // }, []);

    return (
        <div className="cart-courses">
            {cart.map((course, index) => (
                <div
                    className={`cart-course ${
                        index !== cart.length - 1 && "cart-last-course"
                    } ${index !== 0 && "cart-course-after-first"}`}
                    key={course._id}
                >
                    {/* Course Content */}
                    {/* =============== */}
                    <div className="cart-course-content">
                        <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className="cart-course-thumbnail"
                        />
                        <div className="cart-course-details">
                            <p className="cart-course-details-coursename">
                                {course?.courseName}
                            </p>
                            <p className="cart-course-details-category">
                                {course?.category?.name}
                            </p>

                            {/* Rating --------- */}
                            <div className="cart-course-details-rating">
                                {/* Average Rating */}
                                <span className="cart-course-details-avg-rating">
                                    4.8
                                </span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<IoIosStarOutline />}
                                    fullIcon={<IoIosStar />}
                                />
                                {/* Review count */}
                                <span className="cart-course-details-review-count">
                                    {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Button & Price */}
                    {/* =============== */}
                    <div className="cart-btn-price-wrapper">
                        {/* Delete Btn ---------- */}
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="cart-delete-btn"
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>

                        {/* Price ---------- */}
                        <p className="cart-price">₹ {course?.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
