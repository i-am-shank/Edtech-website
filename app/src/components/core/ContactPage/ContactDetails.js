// import components
// =================================
import "./ContactDetails.css";

// import assets
// =================================
import * as Icon1 from "react-icons/bi";
import * as Icon2 from "react-icons/io5";
import * as Icon3 from "react-icons/hi2";

// data
// =================================
const contactDetails = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
            "Akshay Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri from 8am to 5pm",
        details: "+123 456 7869",
    },
];

export default function ContactDetails() {
    return (
        <div className="contact-details">
            {contactDetails.map((contact, index) => {
                // Fetch icon
                // ======================
                let Icon =
                    Icon1[contact.icon] ||
                    Icon2[contact.icon] ||
                    Icon3[contact.icon];

                // return contact-detail
                // ======================
                return (
                    <div className="contact-detail" key={index}>
                        {/* Icon & heading ---------- */}
                        <div className="contact-icon-heading">
                            <Icon size={25} />
                            <h1 className="contact-heading">
                                {contact?.heading}
                            </h1>
                        </div>

                        {/* Description ---------- */}
                        <p className="contact-description">
                            {contact?.description}
                        </p>

                        {/* Detail ----------- */}
                        <p className="contact-detail-div">{contact?.details}</p>
                    </div>
                );
            })}
        </div>
    );
}
