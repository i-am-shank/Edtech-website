// import components
// ========================================
import "./RatingStars.css";

// import hooks & React-tools
// ========================================
import { useEffect, useState } from "react";

// import assets
// ========================================
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
} from "react-icons/ti";

export default function RatingStars({ reviewCount, starSize }) {
    // states
    // ==================
    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    });

    // Render Handlers
    // ==================
    useEffect(() => {
        const wholeStars = Math.floor(reviewCount) || 0;

        setStarCount({
            full: wholeStars,
            half: Number.isInteger(reviewCount) ? 0 : 1,
            empty: Number.isInteger(reviewCount)
                ? 5 - wholeStars
                : 4 - wholeStars,
        });
    }, [reviewCount]);

    return (
        <div className="rating-stars">
            {/* Full Stars */}
            {/* =================== */}
            {[...new Array(starCount.full)].map((star, index) => {
                return <TiStarFullOutline key={index} size={starSize || 20} />;
            })}

            {/* Half Stars */}
            {/* =================== */}
            {[...new Array(starCount.half)].map((star, index) => {
                return <TiStarHalfOutline key={index} size={starSize || 20} />;
            })}

            {/* Empty Stars */}
            {/* =================== */}
            {[...new Array(starCount.empty)].map((star, index) => {
                return <TiStarOutline key={index} size={starSize || 20} />;
            })}
        </div>
    );
}
