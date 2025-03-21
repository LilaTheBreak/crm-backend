import React, { useEffect, useState, useCallback, useMemo } from "react";
import { io } from "socket.io-client";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const ActivityLog = ({ showMessage = (msg) => alert(msg), darkMode }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useMemo(() => localStorage.getItem("token"), []);

    // ✅ Use useCallback to avoid recreating function on every render
    const fetchActivityLogs = useCallback(() => {
        fetch(`${API_URL}/activity`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }, // Ensure token is being sent
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch activity logs: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setActivities(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching activity logs:", error);
            setLoading(false);
        });
    }, [token]);
    

    useEffect(() => {
        fetchActivityLogs();

        // ✅ Initialize WebSocket connection
        const socket = io(API_URL, { auth: { token } });

        socket.on("activity", (newActivity) => {
            setActivities((prev) => {
                const isDuplicate = prev.some((activity) => activity.id === newActivity.id);
                return isDuplicate ? prev : [newActivity, ...prev];
            });
        });

        return () => {
            socket.disconnect(); // ✅ Clean up WebSocket on unmount
        };
    }, [fetchActivityLogs, token]);

    // ✅ Function to clear logs
    const clearLogs = async () => {
        try {
            const response = await fetch(`${API_URL}/activity/clear`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Failed to clear logs");
            }

            setActivities([]);
            showMessage("✅ Activity logs cleared");
        } catch (error) {
            console.error("Error clearing logs:", error);
            setError("❌ Failed to clear logs");
            showMessage("❌ Failed to clear logs");
        }
    };

    // ✅ Optimize recent activities
    const recentActivities = useMemo(() => activities.slice(0, 15), [activities]);

    return (
        <div style={{ background: darkMode ? "#333" : "white", color: darkMode ? "white" : "black", padding: "20px", borderRadius: "8px" }}>
            <h2>Activity Log</h2>
            <button onClick={clearLogs} style={{ padding: "10px", background: "#FF4B4B", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", marginBottom: "10px" }}>
                Clear Logs
            </button>

            {loading && <p>Loading activity logs...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && recentActivities.length === 0 && <p>No recent activity</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {recentActivities.map((activity, index) => (
                    <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        <span>{activity.message} - 🕒 {new Date(activity.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog;





