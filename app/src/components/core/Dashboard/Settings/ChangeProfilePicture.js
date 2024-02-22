// import components
// =================================
import "./ChangeProfilePicture.css";
import IconBtn from "../../../common/IconBtn";

// import hooks
// =================================
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import assets
// =================================
import { FiUpload } from "react-icons/fi";

// import API functions
// =================================
import { updateDisplayPicture } from "../../../../services/operations/settingAPI";

export default function ChangeProfilePicture() {
    // states
    // =======================
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    // initialise hooks
    // =======================
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    // Handlers
    // =======================
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    };

    const handleFileUpload = () => {
        try {
            // console.log("uploading...");
            // start loading ------------
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            // dispatch API-call-function
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                // If successful.. remove loading
                setLoading(false);
            });
        } catch (error) {
            // console.log("Error in Profile pic change : ", error.message);
        }
    };

    // Preview-file-handler
    // ========================
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // Render-handling
    // ========================
    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile);
        }
    }, [imageFile]);

    return (
        <div>
            <div className="change-dp">
                <div className="change-dp-content">
                    {/* Image */}
                    {/* ================= */}
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="change-dp-img"
                    />

                    {/* Main Content */}
                    {/* ================= */}
                    <div className="change-dp-main-content">
                        <p>Change Profile Picture</p>

                        <div className="change-dp-settings">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="change-dp-file-input"
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="change-dp-file-select-btn"
                            >
                                Select
                            </button>
                            <IconBtn
                                text={loading ? "Uploading..." : "Upload"}
                                onClick={handleFileUpload}
                            >
                                {!loading && (
                                    <FiUpload className="upload-dp-btn-content" />
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
