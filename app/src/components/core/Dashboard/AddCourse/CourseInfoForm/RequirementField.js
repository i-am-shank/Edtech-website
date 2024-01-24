// import components
// ======================================
import "./RequirementField.css";

// import hooks
// ======================================
import { useState, useEffect } from "react";

// import API-call functions
// ======================================

export default function RequirementField({
    name,
    label,
    register,
    errors,
    setValue,
    getValues,
}) {
    // states
    // ====================
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    // Render-handlers
    // ======================
    useEffect(() => {
        register(name, {
            required: true,
            // validate: (value) => value.length > 0,
        });
    });

    // Whenever list is updating, change the value mapped to "name"-variable
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    // Handlers
    // ====================
    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement(""); // reset current data (as it is already added)
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        // splice(index, count)
        // --> At position [index], remove (count)-elements.
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div className="requirement-field">
            {/* Label --------------- */}
            <label htmlFor={name}>
                {label}
                <sup>*</sup>
            </label>

            {/* Input-field ---------------- */}
            <div>
                {/* Input field */}
                {/* ================== */}
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="requirement-field-input"
                />

                {/* Add Button */}
                {/* ================== */}
                <button
                    type="button"
                    onClick={() => handleAddRequirement()}
                    className="requirement-field-add-btn"
                >
                    Add
                </button>
            </div>

            {/* Requirement-list ----------------- */}
            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((requirement, index) => {
                        return (
                            <li
                                key={index}
                                className="requirement-field-list-item"
                            >
                                <span>{requirement}</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveRequirement(index)
                                    }
                                    className="requirement-field-list-item-btn"
                                >
                                    clear
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
            {errors[name] && <span>{label} is required**</span>}
        </div>
    );
}
