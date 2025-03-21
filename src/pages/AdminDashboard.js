import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserGrowthChart from "../components/UserGrowthChart";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [viewAllUsers, setViewAllUsers] = useState(false); // ✅ Toggle for Admin View
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); 
    const role = localStorage.getItem("role") || "user"; // ✅ Check if user is Admin

    useEffect(() => {
        if (!token) {
            navigate("/"); // ✅ Redirect to login if no token
        } else if (role !== "admin") {
            navigate("/dashboard"); // ✅ Redirect regular users to their own dashboard
        } else {
            fetchUsers();
        }
    }, [token, navigate, role]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5050/${viewAllUsers ? "users/all" : "users"}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                
                {/* ✅ Toggle to switch between Admin View & All Users */}
                <div className="admin-toggle">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={viewAllUsers} 
                            onChange={() => setViewAllUsers(!viewAllUsers)}
                        />
                        View All Users
                    </label>
                </div>

                <UserGrowthChart />
                
                {/* ✅ Admin-only User List */}
                {viewAllUsers && (
                    <div className="user-list">
                        <h2>All Users</h2>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>{user.name} - {user.role}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;










