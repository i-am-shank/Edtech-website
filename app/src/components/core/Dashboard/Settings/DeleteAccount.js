// import components
// =================================
import "./DeleteAccount.css";

// import hooks & React-tools
// =================================
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import assets
// =================================
import { FiTrash2 } from "react-icons/fi";

// import API-call functions
// =================================
import { deleteProfile } from "../../../../services/operations/settingAPI";

export default function DeleteAccount() {
    // initialise hooks
    // ====================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states
    // ====================
    const { token } = useSelector((state) => state.auth);

    // Handlers
    // ====================
    async function handleDeleteAccount() {
        try {
            // dispatch API-call function
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            // Log error
            console.log("ERROR in deleting account : ", error.message);
        }
    }

    return (
        <div className="delete-account-wrapper">
            <div className="delete-account">
                {/* Delete Icon */}
                {/* ============== */}
                <div className="delete-account-icon-wrapper">
                    <FiTrash2 className="delete-account-icon" />
                </div>

                {/* Delete Message & Btn */}
                {/* ============== */}
                <div className="delete-account-message-btn">
                    {/* Heading ------------- */}
                    <h2 className="delete-account-heading">Delete Account</h2>

                    {/* Delete text ------------- */}
                    <div className="delete-account-text">
                        <p>Would you like to delete account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your
                            account is permanent and will remove all the content
                            associated with it.
                        </p>
                    </div>

                    {/* Delete btn ------------- */}
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="delete-account-btn"
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div>
        </div>
    );
}
