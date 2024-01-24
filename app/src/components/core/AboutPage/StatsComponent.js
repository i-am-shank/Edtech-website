// import components
// ===============================
import "./StatsComponent.css";

// Data
// ===============================
const Stats = [
    {
        count: "5K",
        label: "Active Students",
    },
    {
        count: "10+",
        label: "Mentors",
    },
    {
        count: "200+",
        label: "Courses",
    },
    {
        count: "50+",
        label: "Awards",
    },
];

export default function StatsComponents() {
    return (
        <section className="stats-components">
            <div className="stats-components-content">
                <div className="stats-list">
                    {Stats.map((data, index) => {
                        return (
                            <div className="stat" key={index}>
                                <h1 className="stat-heading-1">{data.count}</h1>
                                <h2 className="stat-heading-2">{data.label}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
