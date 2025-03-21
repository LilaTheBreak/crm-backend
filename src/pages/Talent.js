import React, { useState, useEffect } from "react";
import "../styles/Talent.css";
import { FaCalendarAlt, FaTasks, FaDollarSign, FaChartLine, FaFileAlt, FaPlus } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

// Simulated talent data (this should be replaced with an API fetch)
const talentData = {
    "Lewis Hamilton": {
        name: "Lewis Hamilton",
        profileImage: "https://example.com/lewis-hamilton.jpg",
        email: "lewis@example.com",
        tasks: [
            { id: 1, text: "Sony Activation Deal", done: false },
            { id: 2, text: "Apple Social Media Deal", done: false },
            { id: 3, text: "Snapchat Speaking Event", done: false },
        ],
        deals: [
            { name: "Apple Lunch May 6th", status: "Active" },
            { name: "Apple Lunch May 5th", status: "Active" },
        ],
        invoices: "$18,200",
        performance: {
            followers: "100M",
            engagement: "100M",
            topics: ["Sport", "Fashion"],
            manager: "John Smith",
        }
    },
    "Patricia Bright": {
        name: "Patricia Bright",
        profileImage: "https://example.com/patricia-bright.jpg",
        email: "patricia@example.com",
        tasks: [
            { id: 1, text: "YouTube Brand Collab", done: true },
            { id: 2, text: "Instagram Live with Sephora", done: false },
        ],
        deals: [
            { name: "Nike Campaign June 15th", status: "Active" },
            { name: "Fenty Beauty Shoot", status: "Active" },
        ],
        invoices: "$25,000",
        performance: {
            followers: "1.1M",
            engagement: "4.2%",
            topics: ["Beauty", "Fashion"],
            manager: "Alice Johnson",
        }
    }
};

const Talent = () => {
    const [selectedTalent, setSelectedTalent] = useState("Lewis Hamilton");
    const [talent, setTalent] = useState(talentData[selectedTalent]);
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [newTask, setNewTask] = useState('');

    // ✅ Update talent when dropdown changes
    useEffect(() => {
        setTalent(talentData[selectedTalent]);
    }, [selectedTalent]);

    const handleTaskClick = (id) => {
        setTalent(prev => ({
            ...prev,
            tasks: prev.tasks.map(task =>
                task.id === id ? { ...task, done: !task.done } : task
            ),
        }));
    };

    const addNewTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = { id: Date.now(), text: newTask, done: false };
        setTalent(prev => ({
            ...prev,
            tasks: [...prev.tasks, newTaskObj]
        }));
        setNewTask('');
    };

    return (
        <div className="talent-container">
            {/* ✅ Header Section */}
            <div className="talent-header">
                <h1>Talent Dashboard</h1>
                <div className="talent-actions">
                    <button className="new-deal-btn"><FaPlus /> New Deal</button>
                    <button className="load-templates-btn"><FaFileAlt /> Load Templates</button>
                </div>
            </div>

            {/* ✅ Filters & Talent Dropdown */}
            <div className="filters-bar">
                <label>Select period:</label>
                <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                <span> to </span>
                <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                
                {/* Dropdown to select talent */}
                <select value={selectedTalent} onChange={(e) => setSelectedTalent(e.target.value)}>
                    {Object.keys(talentData).map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            {/* ✅ Profile Section */}
            <div className="talent-profile">
                <img src={talent.profileImage} alt={talent.name} className="talent-image" />
                <h2>{talent.name}</h2>
                <p>{talent.email}</p>
            </div>

            {/* ✅ Task Management */}
            <div className="widget tasks">
                <h3><FaTasks /> Tasks</h3>
                {talent.tasks.map(task => (
                    <div key={task.id} onClick={() => handleTaskClick(task.id)} className={task.done ? "task-done" : ""}>
                        {task.done ? '✅' : '❌'} {task.text}
                    </div>
                ))}
                <div className="add-task">
                    <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task" />
                    <button onClick={addNewTask}><FaPlus /> Add Task</button>
                </div>
            </div>

            {/* ✅ Calendar Section */}
            <div className="widget calendar">
                <h3><FaCalendarAlt /> Calendar</h3>
                <p>Suggested Attendances:</p>
                <p>📅 {talent.deals[0].name}</p>
                <p>⚠️ Scheduling Conflict: {talent.deals[1].name}</p>
            </div>

            {/* ✅ Charts */}
            <div className="widget chart">
                <h3>Deal Dashboard</h3>
                <Pie data={{
                    labels: ["Speaking Events", "Social Media", "Ambassador Deals", "Other"],
                    datasets: [{ data: [13.1, 28.6, 28, 30.3], backgroundColor: ["#6B5B95", "#FF6F61", "#F7CAC9", "#ddd"] }]
                }} />
            </div>
        </div>
    );
};

export default Talent;




