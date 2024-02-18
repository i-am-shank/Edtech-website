// import components
// ==================================
import "./ContactPage.css";
import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ContactForm from "../components/core/ContactPage/ContactForm";
import Footer from "../components/common/Footer";
import ReviewSection from "../components/core/HomePage/ReviewSection";

export default function ContactPage() {
    return (
        <div className="contact-page">
            {/* Contact-section */}
            {/* ====================== */}
            <div className="contactpage-contact-section">
                {/* Contact-details ------------- */}
                <div className="contactpage-contact-details">
                    <ContactDetails />
                </div>

                {/* Contact-form -------------- */}
                <div className="contactpage-contact-form">
                    <ContactForm />
                </div>
            </div>

            {/* Review-Slider section */}
            {/* ====================== */}
            <div className="contactpage-review-slider-section">
                {/* Heading ------------- */}
                <h1 className="contactpage-review-heading">
                    Reviews from other learners
                </h1>

                {/* Review-slider ------------- */}
                <ReviewSection />
            </div>

            {/* Footer */}
            {/* ====================== */}
            <Footer />
        </div>
    );
}
