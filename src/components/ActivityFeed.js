import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.error("⚠️ No token found. Make sure the user is logged in.");
            return;
        }

        // Fetch past activities
        fetch("http://localhost:5050/activity", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
            setActivities(Array.isArray(data) ? data : []);
        })
        .catch(error => {
            console.error("Error fetching activity logs:", error);
        });

        // Connect to WebSocket for real-time updates
        const socket = io("http://localhost:5050", {
            auth: { token },
            transports: ["websocket"], // Ensure WebSocket is used over polling
        });

        socket.on("activity", (newActivity) => {
            if (newActivity && typeof newActivity.message === "string") {
                setActivities(prev => [newActivity.message, ...prev.slice(0, 9)]); // Keep last 10 activities
            } else {
                console.warn("Received invalid activity format:", newActivity);
            }
        });

        socket.on("connect_error", (err) => {
            console.error("❌ WebSocket connection failed:", err.message);
        });

        return () => {
            socket.disconnect();
        };
    }, [token]);

    return (
        <div>
            <h2>Recent Activity</h2>
            <ul>
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))
                ) : (
                    <p>No recent activity</p>
                )}
            </ul>
        </div>
    );
};

export default ActivityFeed;
