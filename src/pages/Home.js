import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import moment from "moment";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Home = () => {
  const [selectedTalent, setSelectedTalent] = useState("All Talent");
  const [deals, setDeals] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [agentCommission, setAgentCommission] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);

  useEffect(() => {
    fetchDeals();
    fetchStatistics();
  }, [selectedTalent]);

  const fetchDeals = async () => {
    try {
      const response = await fetch(`/api/deals?talent=${selectedTalent}`);
      const data = await response.json();
      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/statistics`);
      const data = await response.json();
      setStatistics(data);
      setInquiries(data.inquiriesPerMonth);
      setAgentCommission(data.agentCommission);
      setTotalIncome(data.totalIncome);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const inquiryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Inquiries Per Month",
        data: inquiries,
        backgroundColor: "#6B5B95",
      },
    ],
  };

  const commissionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Agent Commission",
        data: agentCommission,
        backgroundColor: "#FF6F61",
      },
    ],
  };

  const incomeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Income",
        data: totalIncome,
        backgroundColor: ["#6B5B95", "#FF6F61"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Hello Jennifer</h2>
        <div className="filter-section">
          <label>Select period:</label>
          <input type="date" />
          <input type="date" />
          <select onChange={(e) => setSelectedTalent(e.target.value)}>
            <option value="All Talent">All Talent</option>
            <option value="Talent 1">Talent 1</option>
            <option value="Talent 2">Talent 2</option>
          </select>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Active Deals</h3>
          <p>${statistics.activeDeals || "0"}</p>
        </div>
        <div className="card">
          <h3>Total Income</h3>
          <p>${statistics.totalIncome || "0"}</p>
        </div>
        <div className="card">
          <h3>Deal Success Rate</h3>
          <p>{statistics.successRate || "0"}%</p>
        </div>
        <div className="card">
          <h3>New Deals</h3>
          <p>{statistics.newDeals || "0"}</p>
        </div>

        <div className="chart-card">
          <h3>Inquiry Breakdown</h3>
          <Doughnut data={inquiryData} />
        </div>

        <div className="chart-card">
          <h3>Inquiries Per Month</h3>
          <Bar data={inquiryData} />
        </div>

        <div className="chart-card">
          <h3>Agent Commission Per Month</h3>
          <Bar data={commissionData} />
        </div>

        <div className="chart-card">
          <h3>Total Income Per Month</h3>
          <Bar data={incomeData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
