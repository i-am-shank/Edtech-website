import HighlightText from "../HomePage/HighlightText";
import "./Quote.css";

export default function Quote() {
    return (
        <div className="quote">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform
            <HighlightText text={" combines technology"} />,
            <span className="orange-text"> expertise</span>, and community to
            create an{" "}
            <span className="light-orange-text">
                unparalleled education experience.
            </span>
        </div>
    );
}
