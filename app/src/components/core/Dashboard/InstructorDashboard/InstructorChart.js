// import components
// =====================================
import "./InstructorChart.css";

// import hooks & React-tools
// =====================================
import { useState } from "react";

// import Graph-related React-tools
// =====================================
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
    // states
    // ================
    const [currentChart, setCurrentChart] = useState("students");

    // Handlers
    // ================
    // To generate random colors ----------
    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            // Create a random color
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`;

            // Push the color in array
            colors.push(color);
        }
        return colors;
    };

    // Create data (for chart of student-info)
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    };

    // Create data (for chart of income-info)
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    };

    // Create options
    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div className="instructor-chart-wrapper">
            <div className="instructor-chart">
                <p className="instructor-chart-heading">Visualize</p>

                {/* Buttons */}
                {/* ================= */}
                <div className="instructor-chart-btns">
                    <button
                        onClick={() => setCurrentChart("students")}
                        className={`instructor-chart-btn ${
                            currentChart === "students"
                                ? "instructor-chart-active-btn"
                                : "instructor-chart-inactive-btn"
                        }`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setCurrentChart("income")}
                        className={`instructor-chart-btn ${
                            currentChart === "income"
                                ? "instructor-chart-active-btn"
                                : "instructor-chart-inactive-btn"
                        }`}
                    >
                        Income
                    </button>
                </div>

                {/* Pie chart */}
                {/* ================ */}
                <div className="instructor-chart-pie-chart">
                    <Pie
                        data={
                            currentChart === "students"
                                ? chartDataForStudents
                                : chartDataForIncome
                        }
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
