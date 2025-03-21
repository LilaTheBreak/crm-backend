import React from "react";
import "../styles/Settings.css";

const Settings = () => {
    return (
        <div className="settings-page">
            <h1 className="settings-header">Settings</h1>
            
            <div className="settings-container">
                {/* Admin Settings */}
                <div className="settings-section">
                    <h2>Admin Settings</h2>
                </div>
                
                {/* Integrations */}
                <div className="settings-card">
                    <h3>Integrations</h3>
                    <p>Connect Your Platforms</p>
                    <button className="btn">Slack</button>
                    <button className="btn">Email Settings</button>
                </div>

                {/* Calendar Settings */}
                <div className="settings-card">
                    <h3>Calendar Settings</h3>
                    <p>Manage your calendar integrations</p>
                </div>

                {/* Email Settings */}
                <div className="settings-card">
                    <h3>Email Settings</h3>
                    <p>Configure your email preferences</p>
                </div>

                {/* User & Role Management */}
                <div className="settings-card">
                    <h3>User & Role Management</h3>
                    <label>
                        Invite New Agents:
                        <input type="text" placeholder="Enter email..." />
                    </label>
                    <label>
                        Assign Roles:
                        <select>
                            <option>Admin</option>
                            <option>Agent Only</option>
                        </select>
                    </label>
                </div>

                {/* Security & Compliance */}
                <div className="settings-card">
                    <h3>Security & Compliance</h3>
                    <p>Manage security settings</p>
                    <button className="btn">Enable 2FA</button>
                    <button className="btn">Privacy Settings</button>
                </div>

                {/* Branding & Preferences */}
                <div className="settings-card">
                    <h3>Branding & Preferences</h3>
                    <p>Choose Theme:</p>
                    <button className="btn">Light</button>
                    <button className="btn">Dark</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;