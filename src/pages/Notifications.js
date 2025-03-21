import React, { useEffect, useState, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import "../styles/NotificationsPage.css"; // Ensure this CSS file exists
import { FaPlus, FaBell, FaCheckCircle, FaSlack, FaApple } from "react-icons/fa";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [category, setCategory] = useState("all");
    const [tasks, setTasks] = useState([
        { id: 1, text: "Complete Sony Contract", completed: false },
        { id: 2, text: "Reply to Laura at Apple", completed: false },
        { id: 3, text: "Respond to Gifting Opportunities", completed: false },
        { id: 4, text: "Respond to Google Event Invite", completed: false },
    ]);

    const token = useMemo(() => localStorage.getItem("token"), []);

    // Fetch Notifications
    const fetchNotifications = useCallback(() => {
        fetch("http://localhost:5050/notifications", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setNotifications(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Error fetching notifications:", error));
    }, [token]);

    useEffect(() => {
        fetchNotifications();
        const socket = io("http://localhost:5050", { auth: { token } });

        socket.on("newNotification", (newNotification) => {
            playSound();
            setNotifications((prev) => [newNotification, ...prev]);
        });

        const interval = setInterval(fetchNotifications, 10000); // Auto-refresh every 10 sec

        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, [fetchNotifications, token]);

    const playSound = () => {
        const audio = new Audio("/notification.mp3");
        audio.play().catch((error) => console.error("Error playing sound:", error));
    };

    const filteredNotifications = useMemo(
        () => (category === "all" ? notifications : notifications.filter((n) => n.type === category)),
        [category, notifications]
    );

    const handleTaskClick = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deals = [
        { name: "Sony Activation Deal", status: "Active" },
        { name: "Apple Social Media Deal", status: "Active" },
        { name: "Snapchat Speaking Event", status: "Pending" },
    ];

    const upcomingEvents = ["26", "27", "28 - LFW Begins", "29", "30", "01", "02"];

    return (
        <div className="notifications-container">
            <h1><FaBell /> Notifications</h1>

            {/* Category Tabs */}
            <div className="category-tabs">
                {["all", "alerts", "messages", "system"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setCategory(type)}
                        className={category === type ? "active" : ""}
                    >
                        {type.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Notifications Feed */}
            <div className="widget latest-activity">
                <h3>Latest Activity</h3>
                {filteredNotifications.length === 0 ? (
                    <p>No notifications in this category.</p>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div key={notification.id} className="activity-card">
                            <div className="activity-header">
                                <span>{notification.type === "system" ? <FaSlack /> : <FaApple />}</span>
                                <strong>{notification.sender}</strong>
                            </div>
                            <p>{notification.message}</p>
                            <span className="activity-time">{notification.time}</span>
                        </div>
                    ))
                )}
            </div>

            {/* To-Do List */}
            <div className="widget to-do-list">
                <h3>To Do List <FaPlus className="add-icon" /></h3>
                {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`} onClick={() => handleTaskClick(task.id)}>
                        <FaCheckCircle /> {task.text}
                    </div>
                ))}
            </div>

            {/* Deal Management */}
            <div className="widget deal-management">
                <h3>Deal Management</h3>
                {deals.map((deal, index) => (
                    <p key={index} className="deal">{deal.name}</p>
                ))}
            </div>

            {/* Upcoming Events */}
            <div className="widget upcoming-events">
                <h3>Upcoming Events</h3>
                <div className="events-container">
                    {upcomingEvents.map((day, index) => (
                        <div key={index} className="event-day">{day}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;




