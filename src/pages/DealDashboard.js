import React from 'react';
import './DealDashboard.css'; // Assuming you have a corresponding CSS file

const deals = [
  { name: 'Sony Activation Deal', status: 'active' },
  { name: 'Apple Social Media Deal', status: 'inactive' },
  { name: 'Snapchat Speaking Event', status: 'active' },
  { name: 'Sony Activation Deal', status: 'pending' }
];

const DealDashboard = () => {
  return (
    <div className="deal-dashboard">
      <h1>Deal Dashboard</h1>
      <div className="deal-filters">
        <button>Select period</button>
        <input type="date" />
        <input type="date" />
      </div>
      <div className="deals-list">
        {deals.map((deal, index) => (
          <div key={index} className={`deal ${deal.status}`}>
            <span>{deal.name}</span>
            <span className={`status ${deal.status}`}>{deal.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealDashboard;

