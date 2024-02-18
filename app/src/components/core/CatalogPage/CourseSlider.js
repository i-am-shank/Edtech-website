// import components
// ===================================
import "./CourseSlider.css";
import CourseCard from "./CourseCard";

// import hooks & React-tools
// ===================================
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

export default function CourseSlider({ courses }) {
    return (
        <>
            {courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    className="course-slider-swiper"
                    breakpoints={{
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {courses?.map((course, index) => (
                        <SwiperSlide key={index}>
                            <CourseCard course={course} height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="course-slider-no-course">No Course Found</p>
            )}
        </>
    );
}
