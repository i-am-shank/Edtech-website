// import components
// ==========================
import "./ConfirmationModal.css";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <p className="confirmation-modal-text1">{modalData.text1}</p>
                <p className="confirmation-modal-text2">{modalData.text2}</p>

                {/* Buttons */}
                <div className="confirmation-modal-btns">
                    {/* Button 1 -------- */}
                    <IconBtn
                        onClick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />

                    {/* Button 2 -------- */}
                    <button
                        className="confirmation-modal-btn2"
                        onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
}
