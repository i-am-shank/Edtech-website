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
import "swiper/css/navigation";
import { Autoplay, Mousewheel, Keyboard } from "swiper";

// import React Skeleton modules
// ================================================
import "react-loading-skeleton/dist/skeleton.css";

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
    const [loading, setLoading] = useState(true);
    const truncateWords = 15;

    // Render handlers
    // ================
    useEffect(() => {
        // function definition ----------
        const fetchAllReviews = async () => {
            // start loading
            setLoading(true);

            // fire API-call
            const response = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            );
            // console.log("Fetched reviews : ", response.data);

            // Condition over API-response
            if (response.data?.success) {
                setReviews(response.data?.data);
            }

            // hide loading
            setLoading(false);
        };

        // function call ----------
        fetchAllReviews();
    }, []);

    return (
        <div className="review-section">
            {/* Review slider */}
            {/* =================== */}
            <Swiper
                allowSlidePrev={true}
                slidesPerView={1}
                spaceBetween={20}
                pagination={false}
                loop={true}
                freeMode={false}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Mousewheel, Keyboard, Autoplay]}
                className="review-section-slider"
                style={{
                    "--swiper-navigation-size": "20px",
                }}
                rewind={false}
                centeredSlides={true}
                navigation={false}
                mousewheel={{
                    enabled: true,
                    forceToAxis: true,
                }}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                breakpoints={{
                    300: { slidesPerView: 1.1, spaceBetween: 10 },
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.1 },
                }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="review-section-card">
                            {/* Header */}
                            {/* ================ */}
                            <div className="review-section-header">
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

                                <div className="review-user-course-names">
                                    {/* User name ----------- */}
                                    <h1 className="review-user-name">
                                        {review?.user?.firstName}{" "}
                                        {review?.user?.lastName}
                                    </h1>

                                    {/* Course name ----------- */}
                                    <h2 className="review-course-name">
                                        {review?.course?.courseName}
                                    </h2>
                                </div>
                            </div>

                            {/* Review */}
                            {/* ================ */}
                            <p className="review-section-review">
                                {review?.review
                                    .split(" ")
                                    .splice(0, 15)
                                    .join(" ")}
                                {/* Conditionally add continuation dots */}
                                {review?.review.split(" ").length > 15
                                    ? ` ...`
                                    : ""}
                            </p>

                            {/* Ratings */}
                            {/* ================ */}
                            <div className="review-section-ratings">
                                {/* Review rating ----------- */}
                                <h3 className="review-section-rating">
                                    {review?.rating.toFixed(1)}
                                </h3>

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
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
