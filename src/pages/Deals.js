import React from "react";
import "../styles/DealsPage.css"; // Ensure correct path

const DealsPage = () => {
  return (
    <div className="deals-container">
      <header className="deals-header">
        <h1>Deal Dashboard</h1>
        <div className="filters">
          <label>Select period:</label>
          <input type="date" />
          <input type="date" />
          <button>Filter</button>
          <button className="new-deal-btn">New Deal</button>
        </div>
      </header>

      <div className="deals-layout">
        {/* Deal Management Section */}
        <div className="deal-management">
          <h2>Deal Management</h2>
          <div className="deal-list">
            <div className="deal-item active">
              <span>✔️ Sony Activation Deal</span>
              <span className="status green">Active</span>
            </div>
            <div className="deal-item active">
              <span>✔️ Apple Social Media Deal</span>
              <span className="status green">Active</span>
            </div>
            <div className="deal-item pending">
              <span>⏳ Snapchat Speaking Event</span>
              <span className="status red">Pending</span>
            </div>
          </div>
        </div>

        {/* Deal Overview Section */}
        <div className="deal-overview">
          <h2>Deals Overview</h2>
          <div className="deal-stats">
            <p>Total Deals: <strong>25</strong></p>
            <p>Completed: <strong>18</strong></p>
            <p>Pending: <strong>7</strong></p>
          </div>
        </div>

        {/* Invoicing Section */}
        <div className="invoicing">
          <h2>Invoicing</h2>
          <p>Outstanding Invoices: <strong>$18,200</strong></p>
          <button>View Invoices</button>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;



