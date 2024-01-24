import "./CodeBlocks.css";

// import components
// ================================
import Button from "./Button";

// import icons
// ================================
import { FaArrowRight } from "react-icons/fa";

// import modules
// ================================
import { TypeAnimation } from "react-type-animation";

export default function CodeBlocks({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) {
    return (
        <div className={`codeblocks ${position}`}>
            {/* Section 1 --> text */}
            {/* ======================== */}
            <div className="codeblocks-section-1">
                {heading}
                <div className="codeblocks-section-1-subheading">
                    {subheading}
                </div>
                {/* Buttons */}
                <div className="codeblocks-btns">
                    {/* Button - 1 */}
                    {/* ============== */}
                    <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="codeblocks-btn">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </Button>

                    {/* Button - 2 */}
                    {/* ============== */}
                    <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className="codeblocks-btn">{ctabtn2.btnText}</div>
                    </Button>
                </div>
            </div>

            {/* Section 2 --> code-editor-anim */}
            {/* ======================== */}
            <div className="codeblocks-section-2">
                {/* BG-gradient .. of backgroundGradient */}

                {/* Left-numbering */}
                <div className="codeblocks-code-numbering">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                {/* Right-code */}
                <div className={`codeblocks-code-div ${codeColor}`}>
                    <TypeAnimation
                        sequence={[codeblock, 4000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
}
