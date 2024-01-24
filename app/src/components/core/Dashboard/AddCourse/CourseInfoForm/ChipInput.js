// import components
// ===================================
import "./ChipInput.css";

// import hooks & React-tools
// ===================================
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import assets
// ===================================
import { MdClose } from "react-icons/md";

export default function ChipInput({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) {
    // states
    // =========================
    const { editCourse, course } = useSelector((state) => state.course);
    // Managing tags (array of chips, each chip is for each tag)
    const [chips, setChips] = useState([]);

    // Render-handlers
    // =========================
    useEffect(() => {
        if (editCourse) {
            // In editing mode
            setChips(course?.tag);
        } else {
            // In course-creation mode
            // Register the tags-array
            register(name, {
                required: true,
                validate: (value) => value.length > 0,
            });
        }
    });

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    // Handlers
    // =========================
    // Function to handle user-input of tags (comma separated functionality)
    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            // A new tag is getting created
            // Prevent reload of the key-down event
            event.preventDefault();

            // Fetch tag-input & remove leading/trailing spaces
            const chipValue = event.target.value.trim();

            // Check there is an input-tag & it isn't already in chips-array
            if (chipValue && !chips.includes(chipValue)) {
                // Update the chips-array
                const newChips = [...chips, chipValue];
                setChips(newChips);

                // Reset the current-tag variable (so user could enter further tags)
                event.target.value = "";
            }
        }
    };

    // Handle tag-removal from tags-array
    const handleDeleteChip = (chipIndex) => {
        // Filter all other chips, except the one at chipIndex
        const newChips = chips.filter((_, index) => index !== chipIndex);
        setChips(newChips);
    };

    return (
        <div className="chip-input">
            <label htmlFor={name} className="chip-input-label">
                {label} <sup className="compulsory-icon">*</sup>
            </label>

            {/* Entered-Tags & Tag-input field */}
            <div className="chip-input-tags-and-input">
                {/* Chips */}
                {/* ================ */}
                {chips.map((chip, index) => (
                    <div key={index} className="chip-input-chip">
                        {/* Tag-value ----------- */}
                        {chip}

                        {/* Delete-tag btn ----------- */}
                        <button
                            type="button"
                            className="chip-input-chip-delete-btn"
                            onClick={() => handleDeleteChip(index)}
                        >
                            <MdClose className="chip-input-delete-icon" />
                        </button>
                    </div>
                ))}

                {/* Chip input */}
                {/* ================ */}
                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="chip-input-tag-input"
                />
            </div>

            {/* Error */}
            {/* ====================== */}
            {errors[name] && (
                <span className="course-info-errors">
                    {label} is required**
                </span>
            )}
        </div>
    );
}
