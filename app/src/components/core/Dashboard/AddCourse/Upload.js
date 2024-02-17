// import components
// ================================
import "./Upload.css";

// import hooks & React-tools
// ================================
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

// import assets
// ================================
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) {
    const { course } = useSelector((state) => state.course);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    );
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            previewFile(file);
            setSelectedFile(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
    });

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    useEffect(() => {
        register(name, { required: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register]);

    useEffect(() => {
        setValue(name, selectedFile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue]);

    return (
        <div className="upload-wrapper">
            {/* Label */}
            {/* ===================== */}
            <label className="upload-label" htmlFor={name}>
                {label} {!viewData && <sup className="compulsory-icon">*</sup>}
            </label>

            {/* Input field */}
            {/* ===================== */}
            {/* (conditional rendering for preview-mode) */}
            <div
                className={`${
                    isDragActive
                        ? "active-upload-content"
                        : "inactive-upload-content"
                } upload-content`}
            >
                {/* Preview Source ----------- */}
                {previewSource ? (
                    <div className="upload-preview-source">
                        {!video ? (
                            <img
                                src={previewSource}
                                alt="Preview"
                                className="upload-preview-img"
                            />
                        ) : (
                            <Player
                                aspectRatio="16:9"
                                playsInline
                                src={previewSource}
                            />
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource("");
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                                className="upload-cancel-btn"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    // Upload Input wrapper --------------
                    <div className="upload-input-wrapper" {...getRootProps()}>
                        <input {...getInputProps()} ref={inputRef} />
                        <div className="upload-icon-wrapper">
                            <FiUploadCloud className="upload-icon" />
                        </div>
                        <p className="upload-para">
                            Drag and drop an {!video ? "image" : "video"}, or
                            click to{" "}
                            <span className="upload-browse">Browse</span> a file
                        </p>
                        <ul className="upload-requirements">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
            {errors[name] && (
                <span className="upload-error">{label} is required</span>
            )}
        </div>
    );
}
