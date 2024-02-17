// import components
// ================================================
import "./ReviewSection.css";

// import hooks & React-tools
// ================================================
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";

// import React swiper modules
// ================================================
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";

// import API-related modules
// ================================================
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apis";

// import assets
// ================================================
import { FaStar } from "react-icons/fa";

export default function ReviewSection() {
    // states
    // ================
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    // Render handlers
    // ================
    useEffect(() => {
        // function definition ----------
        const fetchAllReviews = async () => {
            // fire API-call
            const response = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            );
            console.log("Fetched reviews : ", response.data);

            // Condition over API-response
            if (response.data?.success) {
                setReviews(response.data?.data);
            }
        };

        // function call ----------
        fetchAllReviews();
    }, []);

    return (
        <div className="review-section-wrapper">
            <div className="review-section">
                {/* Review heading */}
                {/* =================== */}
                <h2 className="review-section-heading">
                    Review from other learners
                </h2>

                {/* Review slider */}
                {/* =================== */}
                <div className="review-section-slider">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={24}
                        loop={true}
                        freeMode={true}
                        autoplay={{
                            delay: 2500,
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className="review-section-slider-swiper"
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                {/* User image ----------- */}
                                <img
                                    src={
                                        review?.user?.image
                                            ? review?.user?.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}%20${review?.user?.lastName}`
                                    }
                                    alt="Profile Pic"
                                    className="review-section-review-img"
                                />

                                {/* User name ----------- */}
                                <p>
                                    {review?.user?.firstName}{" "}
                                    {review?.user?.lastName}
                                </p>

                                {/* Course name ----------- */}
                                <p>{review?.course?.courseName}</p>

                                {/* Review ----------- */}
                                <p>
                                    {review?.review
                                        .split(" ")
                                        .splice(0, 15)
                                        .join(" ")}
                                    {/* Conditionally add continuation dots */}
                                    {review?.review.split(" ").length > 15
                                        ? ` ...`
                                        : ""}
                                </p>

                                {/* Review rating ----------- */}
                                <p>{review?.rating.toFixed(1)}</p>

                                {/* Review stars ----------- */}
                                <ReactStars
                                    count={5}
                                    value={review?.rating}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
