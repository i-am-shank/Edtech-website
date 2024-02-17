export const formatDate = (dateString) => {
    // Generate date -----------
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Fetch different time-components ------------
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";

    // Generate the time string ------------
    //       (from above data)
    const formattedTime = `${hour % 12} : ${minutes
        .toString()
        .padStart(2, "0")} ${period}`;

    console.log("formattedDate : ", formattedDate);
    console.log("formattedTime : ", formattedTime);

    // return date (in required format) -----------
    return `${formattedDate} | ${formattedTime}`;
};
