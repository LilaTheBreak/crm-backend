import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { FaTimes, FaPlus } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { jwtDecode } from "jwt-decode";
import slackLogo from "../assets/Slack-logo.png";

const Dashboard = () => {
    const [selectedTalent, setSelectedTalent] = useState("All Talent");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [widgets, setWidgets] = useState(["income", "deals", "successRate", "events", "charts"]);
    const [user, setUser] = useState({ name: "User", profileImage: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({
                    name: decodedToken.given_name || "User",
                    profileImage: decodedToken.picture || "https://via.placeholder.com/40",
                });
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    }, []);

    const removeWidget = (widget) => setWidgets(widgets.filter(w => w !== widget));
    const addWidget = (widget) => !widgets.includes(widget) && setWidgets([...widgets, widget]);

    return (
        <div className="dashboard-container">
            {/* ✅ Top Bar */}
            <div className="dashboard-top-bar">
                <div className="user-info">
                    <img src={user.profileImage} alt="User" className="user-avatar" />
                    <h2>Hello, {user.name}</h2>
                </div>
                <div className="filters">
                    <label>Select period:</label>
                    <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                    <span> to </span>
                    <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                    <select value={selectedTalent} onChange={(e) => setSelectedTalent(e.target.value)}>
                        <option>All Talent</option>
                        <option>Lewis Hamilton</option>
                        <option>Other Talent</option>
                    </select>
                    <button className="apply-filters">Apply Filters</button>
                    <button className="customize-dashboard">Customize Dashboard</button>
                </div>
                <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="slack-button">
                    <img src={slackLogo} alt="Slack" className="slack-logo" /> Slack
                </a>
            </div>

            {/* ✅ Widgets Section */}
            <div className="dashboard-widgets">
                {widgets.includes("income") && (
                    <div className="stat-box">
                        <h3>Total Income</h3>
                        <p>$250,000</p>
                        <button className="close-widget" onClick={() => removeWidget("income")}><FaTimes /></button>
                    </div>
                )}
                {widgets.includes("deals") && (
                    <div className="stat-box">
                        <h3>Active Deals</h3>
                        <p>$100,000</p>
                        <button className="close-widget" onClick={() => removeWidget("deals")}><FaTimes /></button>
                    </div>
                )}
                {widgets.includes("successRate") && (
                    <div className="stat-box">
                        <h3>Deal Success Rate</h3>
                        <p>36.2%</p>
                        <button className="close-widget" onClick={() => removeWidget("successRate")}><FaTimes /></button>
                    </div>
                )}
            </div>

            {/* ✅ Add Widget Section */}
            <div className="add-widgets">
                <h3>Add Widgets</h3>
                {["income", "deals", "successRate", "events", "charts"].map(widget => (
                    !widgets.includes(widget) && (
                        <button key={widget} onClick={() => addWidget(widget)}><FaPlus /> {widget}</button>
                    )
                ))}
            </div>
        </div>
    );
};

export default Dashboard;











