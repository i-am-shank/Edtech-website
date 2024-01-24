// import components
// ==========================
import "./IconBtn.css";

export default function IconBtn({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) {
    return (
        <button
            className={`icon-btn ${customClasses} ${
                outline ? "icon-btn-outline" : "icon-btn-no-outline"
            }`}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {children ? (
                <div className="icon-btn-content">
                    <span
                        className={`${outline && "icon-btn-outline-content"}`}
                    >
                        {text}
                    </span>
                    {children}
                </div>
            ) : (
                <p>{text}</p>
            )}
        </button>
    );
}
