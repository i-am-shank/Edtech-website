// import components
// ========================
import "./ContactFormSection.css";
import ContactUsForm from "../../common/ContactUsForm";

export default function ContactFormSection() {
    return (
        <div className="contact-form-section">
            {/* Heading */}
            {/* ========================= */}
            <h1 className="contact-form-heading">Get in Touch</h1>

            {/* Subtitle */}
            {/* ========================= */}
            <p className="contact-form-text">
                We'd love to here for you, Please fill out this form.
            </p>

            {/* Form */}
            {/* ========================= */}
            <div className="contact-us-form">
                <ContactUsForm />
            </div>
        </div>
    );
}
