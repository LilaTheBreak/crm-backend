import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaChartLine,
  FaFileAlt,
  FaUserCircle,
  FaBriefcase,
  FaLightbulb,
  FaQuestionCircle,
} from "react-icons/fa";
import "../styles/Sidebar.css";
import logo from "../assets/LogoWhite.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clears stored session data
    sessionStorage.clear();
    navigate("/"); // ✅ Redirects to login page
  };

  return (
    <nav className="sidebar">
      {/* ✅ Sidebar Header with Logo */}
      <div className="sidebar-header">
        <img src={logo} alt="The Break" className="sidebar-logo" />
      </div>

      {/* ✅ Main Navigation */}
      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard"><FaHome /> Dashboard</NavLink></li>
        <li><NavLink to="/talent"><FaUserCircle /> Talent</NavLink></li>
        <li><NavLink to="/contacts"><FaUserFriends /> Contacts</NavLink></li>
        <li><NavLink to="/accounts"><FaBriefcase /> Accounts</NavLink></li>
        <li><NavLink to="/inbox"><FaEnvelope /> Inbox</NavLink></li>
        <li><NavLink to="/calendar"><FaCalendarAlt /> Calendar</NavLink></li>
        <li><NavLink to="/deals"><FaChartBar /> Deals</NavLink></li>
        <li><NavLink to="/statistics"><FaChartLine /> Statistics</NavLink></li>
        <li><NavLink to="/reports"><FaFileAlt /> Reports</NavLink></li>
        <li><NavLink to="/notifications"><FaBell /> Notifications</NavLink></li>
        <li><NavLink to="/settings"><FaCog /> Settings</NavLink></li>
      </ul>

      {/* ✅ Footer Links */}
      <ul className="sidebar-footer">
        <li><NavLink to="/training-portal"><FaLightbulb /> Training Portal</NavLink></li>
        <li><NavLink to="/account"><FaUserCircle /> Account</NavLink></li>
        <li><NavLink to="/help"><FaQuestionCircle /> Help</NavLink></li>
        <li>
          <button onClick={handleLogout} className="logout-link">
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;





















