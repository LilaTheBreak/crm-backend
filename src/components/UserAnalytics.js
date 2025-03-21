import React, { useEffect, useState } from "react";

const UserAnalytics = ({ darkMode }) => {
    const [userCount, setUserCount] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        
        const fetchUserCount = async () => {
            try {
                const response = await fetch("http://localhost:5050/users/count", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user count");

                const data = await response.json();
                setUserCount(data.count);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        fetchUserCount(); // Initial Fetch
        const interval = setInterval(fetchUserCount, 10000); // ✅ Auto-refresh every 10s

        return () => clearInterval(interval); // Cleanup
    }, [token]);

    return (
        <div style={{
            padding: "20px",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "white" : "black",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "background 0.3s, color 0.3s",
        }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{userCount}</p>
        </div>
    );
};

export default UserAnalytics;





