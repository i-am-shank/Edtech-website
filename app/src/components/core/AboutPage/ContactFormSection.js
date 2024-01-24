// import components
// ========================
import "./ContactFormSection.css";
import ContactUsForm from "../../common/ContactUsForm";

export default function ContactFormSection() {
    return (
        <div className="contact-form-section">
            {/* Heading */}
            {/* ========================= */}
            <h1>Get in Touch</h1>

            {/* Subtitle */}
            {/* ========================= */}
            <p>We'd love to here for you, Please fill out this form.</p>

            {/* Form */}
            {/* ========================= */}
            <div>
                <ContactUsForm />
            </div>
        </div>
    );
}
