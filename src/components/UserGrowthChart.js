import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// ✅ Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const UserGrowthChart = ({ darkMode }) => {
    const [growthData, setGrowthData] = useState([]);
    const token = useMemo(() => localStorage.getItem("token") || "", []);

    // ✅ Wrapped `fetchGrowthData` in useCallback to prevent re-creation
    const fetchGrowthData = useCallback(() => {
        fetch("http://localhost:5050/users/growth", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch growth data");
                }
                return response.json();
            })
            .then((data) => setGrowthData(Array.isArray(data) ? data : []))
            .catch((error) => console.error("Error fetching growth data:", error));
    }, [token]);

    useEffect(() => {
        fetchGrowthData();
        const interval = setInterval(fetchGrowthData, 10000); // ✅ Auto-refresh every 10s
        return () => clearInterval(interval);
    }, [fetchGrowthData]);

    // ✅ Memoize chartData to prevent unnecessary recalculations
    const chartData = useMemo(() => ({
        labels: growthData.map((entry) => entry.date),
        datasets: [
            {
                label: "New Users",
                data: growthData.map((entry) => entry.count),
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                fill: true,
            },
        ],
    }), [growthData]);

    const styles = {
        widget: {
            padding: "20px",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "white" : "black",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            transition: "background 0.3s, color 0.3s", // ✅ Smooth transition
        },
    };

    return (
        <div style={styles.widget} aria-label="User Growth Chart">
            <h3>User Growth</h3>
            <Line data={chartData} />
        </div>
    );
};

export default UserGrowthChart;







