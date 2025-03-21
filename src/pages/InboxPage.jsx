import React, { useState, useEffect } from "react";
import "../styles/InboxPage.css";
import { FaSearch, FaSlack, FaFilter } from "react-icons/fa";

function InboxPage() {
  const [talentList, setTalentList] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch the list of talents on mount
  useEffect(() => {
    async function fetchTalents() {
      try {
        const response = await fetch("/api/talents");
        const data = await response.json();
        setTalentList(data);
        if (data.length > 0) {
          setSelectedTalent(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch talents:", err);
      }
    }
    fetchTalents();
  }, []);

  // Fetch messages for the selected talent
  useEffect(() => {
    if (!selectedTalent) return;
    async function fetchMessages() {
      try {
        const response = await fetch(`/api/inbox?talentId=${selectedTalent}`);
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    }
    fetchMessages();
  }, [selectedTalent]);

  const handleTalentChange = (e) => {
    setSelectedTalent(e.target.value);
  };

  return (
    <div className="inbox-container">
      {/* Header with search and filter */}
      <div className="inbox-header">
        <h1>Inbox</h1>
        <div className="inbox-controls">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <FaSearch className="search-icon" />
          </div>
          <button className="filter-button">
            <FaFilter /> Filter
          </button>
          <FaSlack className="slack-icon" />
        </div>
      </div>

      {/* Talent Selection */}
      <div className="talent-selection">
        <label>View By Talent:</label>
        <select value={selectedTalent || ""} onChange={handleTalentChange}>
          {talentList.map((talent) => (
            <option key={talent.id} value={talent.id}>
              {talent.name}
            </option>
          ))}
        </select>
      </div>

      {/* Talent Profile Section */}
      <div className="talent-profile">
        <img src="https://via.placeholder.com/120" alt="Talent" className="talent-image" />
        <h2>Lewis Hamilton</h2>

        {/* Tasks */}
        <div className="talent-tasks">
          <h3>Awaiting Reply</h3>
          <ul>
            <li>Sony Activation Deal <span className="status active"></span></li>
            <li>Apple Social Media Deal <span className="status active"></span></li>
            <li>Snapchat Speaking Event <span className="status pending"></span></li>
          </ul>
        </div>

        {/* Email Notifications */}
        <div className="email-notifications">
          <h3>Email Notifications</h3>
          <ul>
            <li>Laura Opened "Re-Booking 8th" <span className="notification-icon">📩</span></li>
            <li>Laura Clicked www.thebreakco.co <span className="notification-icon">🔗</span></li>
          </ul>
        </div>
      </div>

      {/* Messages Section */}
      <div className="inbox-messages">
        <div className="inbox-column">
          <h3>All Inbound</h3>
          {messages.length === 0 ? <p>No messages found.</p> : (
            messages.map((msg) => (
              <div className="message-card unread" key={msg.id}>
                <p><strong>{msg.sender}</strong></p>
                <p>{msg.text}</p>
                <p className="timestamp">{msg.timestamp}</p>
              </div>
            ))
          )}
        </div>

        <div className="priority-inbox">
          <h3>Priority</h3>
          {messages.filter((msg) => msg.priority).map((msg) => (
            <div className="message-card priority" key={msg.id}>
              <p><strong>{msg.sender}</strong></p>
              <p>{msg.text}</p>
              <p className="timestamp">{msg.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InboxPage;

