// import components
// ==================================
import "./ContactPage.css";
import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ContactForm from "../components/core/ContactPage/ContactForm";
import Footer from "../components/common/Footer";

export default function ContactPage() {
    return (
        <div className="contact-page">
            {/* Contact-section */}
            {/* ====================== */}
            <div className="contact-section">
                {/* Contact-details ------------- */}
                <div className="contact-details">
                    <ContactDetails />
                </div>

                {/* Contact-form -------------- */}
                <div className="contact-form">
                    <ContactForm />
                </div>
            </div>

            {/* Review-Slider section */}
            {/* ====================== */}
            <div className="review-slider-section">
                {/* Heading ------------- */}
                <h1 className="review-heading">Reviews from other learners</h1>

                {/* Review-slider ------------- */}
                {/* <ReviewSlider /> */}
            </div>

            {/* Footer */}
            {/* ====================== */}
            <Footer />
        </div>
    );
}
