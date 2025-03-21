import React, { useState } from "react";
import "../styles/ReportsPage.css";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("custom");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filters, setFilters] = useState({
    talent: "",
    platform: "",
    dealStatus: "",
  });

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", filters, dateRange);
    // Logic to fetch data from CRM and generate reports
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      {/* Report Type Selection */}
      <div className="report-type">
        <h3>Report Type</h3>
        <label>
          <input 
            type="radio" 
            name="reportType" 
            value="custom" 
            checked={reportType === "custom"} 
            onChange={() => setReportType("custom")}
          />
          Custom Report
        </label>
        <label>
          <input 
            type="radio" 
            name="reportType" 
            value="summary" 
            checked={reportType === "summary"} 
            onChange={() => setReportType("summary")}
          />
          Client - Talent Summary Report
        </label>
      </div>

      {/* Date Range Selection */}
      <div className="date-range">
        <h3>Select Date Range:</h3>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>

      {/* Report Filters */}
      <div className="report-filters">
        <h3>Filters</h3>
        <select onChange={(e) => setFilters({ ...filters, talent: e.target.value })}>
          <option value="">Select Talent</option>
          <option value="Lewis Hamilton">Lewis Hamilton</option>
          <option value="Cristiano Ronaldo">Cristiano Ronaldo</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, platform: e.target.value })}>
          <option value="">Select Platform</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, dealStatus: e.target.value })}>
          <option value="">Select Deal Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Report Archive */}
      <div className="report-archive">
        <h3>Archive</h3>
        <div className="archive-item">LEWIS HAMILTON – COMMISSION SUMMARY – JULY – SEP 2025</div>
        <div className="archive-item">LEWIS HAMILTON – COMMISSION SUMMARY – SOCIAL MEDIA STATISTICS</div>
        <div className="archive-item">LEWIS HAMILTON – COMMISSION SUMMARY – ALL TIME</div>
      </div>

      {/* Generate Report Button */}
      <button className="generate-report-btn" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default ReportsPage;
