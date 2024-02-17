export default function getAvgRating(ratingArr) {
    if (ratingArr?.length === 0) {
        return 0;
    }

    // Find total-sum of all ratings ----------
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating;
        return acc;
    }, 0);

    // Multiplier (to go )
    const multiplier = Math.pow(10, 1);
    const avgReviewCount =
        Math.round((totalReviewCount / ratingArr?.length) * multiplier) /
        multiplier;

    return avgReviewCount;
}
