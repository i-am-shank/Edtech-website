// import assets
// ======================================
import signupImg from "../assets/Images/signup.webp";

// import templates
// ======================================
import Template from "../components/core/Auth/Template";

export default function Signup() {
    return (
        <Template
            title="Join the millions learning to code with StudyNotion for free"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            image={signupImg}
            formType="signup"
        />
    );
}
