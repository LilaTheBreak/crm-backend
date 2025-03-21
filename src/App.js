import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import Notifications from "./pages/Notifications";
import ActivityLog from "./pages/ActivityLog";
import Calendar from "./pages/Calendar";
import Talent from "./pages/Talent";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails"; // ✅ Contact Details Page
import Accounts from "./pages/Accounts"; // ✅ Fixed naming consistency
import AccountDetails from "./pages/AccountDetails"; // ✅ Individual Account Pages
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import InboxPage from "./pages/InboxPage";
import Deals from "./pages/Deals";
import StatisticsPage from "./pages/StatisticsPage";
import ReportsPage from "./pages/ReportsPage";

import "./styles/App.css";

// ✅ Get user role from local storage
const getUserRole = () => localStorage.getItem("role") || "user";

function DashboardLayout() {
    const role = getUserRole();

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* ✅ Admin Routes */}
                    {role === "admin" && (
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    )}

                    {/* ✅ Core Pages */}
                    <Route path="/talent" element={<Talent />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/contacts/:id" element={<ContactDetails />} /> {/* ✅ Contact Details */}
                    <Route path="/accounts" element={<Accounts />} /> {/* ✅ FIXED naming */}
                    <Route path="/accounts/:id" element={<AccountDetails />} /> {/* ✅ Individual Accounts */}
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/activity" element={<ActivityLog />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/inbox" element={<InboxPage />} />

                    {/* ✅ Deals & Statistics */}
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/statistics" element={<StatisticsPage />} />

                    {/* ✅ Reports Page */}
                    <Route path="/reports" element={<ReportsPage />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<DashboardLayout />} />
        </Routes>
    );
}

export default App;






















































