import React, { useEffect, useState } from "react";
import "../styles/StatisticsPage.css";
import { FaSync } from "react-icons/fa";

const StatisticsPage = () => {
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5050/statistics"); // ✅ Check this URL!
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
            setError("Failed to load statistics. Please try again.");
        }
    };

    const fetchInstagramStats = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/scrape_instagram?username=patriciabright`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch Instagram stats:", error);
        }
    };
    

    return (
        <div className="statistics-container">
            <h1>Statistics Dashboard</h1>
            
            <button className="refresh-button" onClick={fetchData}>
                <FaSync /> Refresh Data
            </button>

            {error && <p className="error-message">{error}</p>}

            {statistics ? (
                <div className="statistics-grid">
                    <div className="stat-card">
                        <h2>Total Deals</h2>
                        <p>{statistics.totalDeals || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Active Campaigns</h2>
                        <p>{statistics.activeCampaigns || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Completed Projects</h2>
                        <p>{statistics.completedProjects || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Revenue Generated</h2>
                        <p>${statistics.revenueGenerated?.toLocaleString() || "0"}</p>
                    </div>
                </div>
            ) : (
                <p>Loading statistics...</p>
            )}
        </div>
    );
};

export default StatisticsPage;



