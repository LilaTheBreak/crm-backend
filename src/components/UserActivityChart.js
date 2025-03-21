import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ✅ Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserActivityChart = ({ darkMode }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "User Activity",
                data: [10, 20, 15, 30, 25],
                backgroundColor: darkMode ? "rgba(255, 99, 132, 0.6)" : "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: darkMode ? "white" : "black",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: darkMode ? "white" : "black",
                },
            },
            y: {
                ticks: {
                    color: darkMode ? "white" : "black",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{
            padding: "20px",
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "white" : "black",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            transition: "background 0.3s, color 0.3s",
            height: "300px"
        }}>
            <h3>User Activity</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default UserActivityChart;


