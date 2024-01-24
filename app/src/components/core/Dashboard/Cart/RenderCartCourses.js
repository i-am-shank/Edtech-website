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

    return (
        <div className="cart-courses">
            {cart.map((course, index) => {
                <div className="cart-course" key={index}>
                    {/* Course Content */}
                    {/* =============== */}
                    <div className="cart-course-content">
                        <img src={course?.thumbnail} alt="" />
                        <div className="cart-course-details">
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>

                            {/* Rating --------- */}
                            <div>
                                {/* Average Rating */}
                                <span>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<IoIosStarOutline />}
                                    fullIcon={<IoIosStar />}
                                />
                                {/* Review count */}
                                <span>
                                    {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Button & Price */}
                    {/* =============== */}
                    <div>
                        {/* Delete Btn ---------- */}
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>

                        {/* Price ---------- */}
                        <p>Rs {course?.price}</p>
                    </div>
                </div>;
            })}
        </div>
    );
}
