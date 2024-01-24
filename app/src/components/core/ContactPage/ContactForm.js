// import components
// ================================
import ContactUsForm from "../../common/ContactUsForm";
import "./ContactForm.css";

export default function ContactForm() {
    return (
        <div className="contact-form">
            {/* Heading ------------- */}
            <h1 className="contact-form-heading">
                Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>

            {/* Paragraph ------------- */}
            <p className="contact-form-para">
                Tell us more about yourself and what you&apos;re got in mind.
            </p>

            {/* Contact-us form -------------- */}
            <div className="contact-form-form">
                <ContactUsForm />
            </div>
        </div>
    );
}
