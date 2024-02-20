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
import {
    FreeMode,
    Pagination,
    Autoplay,
    Navigation,
    Mousewheel,
    Keyboard,
} from "swiper";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CourseSlider({ courses }) {
    return (
        <>
            {courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    allowSlidePrev={1}
                    spaceBetween={20}
                    loop={false}
                    pagination={true}
                    modules={[
                        FreeMode,
                        Pagination,
                        Navigation,
                        Mousewheel,
                        Keyboard,
                    ]}
                    className="course-slider-swiper"
                    freeMode={true}
                    navigation={true}
                    breakpoints={{
                        300: { slidesPerView: 2.1, spaceBetween: 10 },
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.1 },
                    }}
                    mousewheel={{
                        enabled: true,
                        forceToAxis: true,
                    }}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: true,
                    }}
                >
                    {courses?.map((course, index) => (
                        <SwiperSlide key={index}>
                            <CourseCard
                                course={course}
                                height={"h-[100px] lg:h-[250px]"}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="course-slider-no-course">
                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className="">
                            <Skeleton className="no-course-skeleton-1" />
                            <Skeleton className="no-course-skeleton-2" />
                            <Skeleton className="no-course-skeleton-3" />
                            <Skeleton className="no-course-skeleton-3" />
                        </div>
                    </SkeletonTheme>
                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className="">
                            <Skeleton className="no-course-skeleton-1" />
                            <Skeleton className="no-course-skeleton-2" />
                            <Skeleton className="no-course-skeleton-3" />
                            <Skeleton className="no-course-skeleton-3" />
                        </div>
                    </SkeletonTheme>
                    <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                        <div className="">
                            <Skeleton className="no-course-skeleton-1" />
                            <Skeleton className="no-course-skeleton-2" />
                            <Skeleton className="no-course-skeleton-3" />
                            <Skeleton className="no-course-skeleton-3" />
                        </div>
                    </SkeletonTheme>
                </p>
            )}
        </>
    );
}
