import "./Tab.css";

export default function Tab({ tabData, field, setField }) {
    return (
        <div
            className="tab-content"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
        >
            {tabData.map((tab) => (
                <button
                    className={`tab-data ${
                        field === tab.type ? "tab-match" : "tab-unmatch"
                    }`}
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                >
                    {tab?.tabName}
                </button>
            ))}
        </div>
    );
}
