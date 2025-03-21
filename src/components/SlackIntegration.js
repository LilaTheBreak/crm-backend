import React, { useState } from "react";

const SlackIntegration = () => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const sendMessage = async () => {
        try {
            const response = await fetch("http://localhost:5050/slack/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            if (data.success) {
                setStatus("✅ Message sent!");
            } else {
                setStatus("❌ Failed to send message");
            }
        } catch (error) {
            setStatus("❌ Error connecting to Slack");
        }
    };

    return (
        <div className="slack-integration">
            <h3>Send a Message to Slack</h3>
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send to Slack</button>
            <p>{status}</p>
        </div>
    );
};

export default SlackIntegration;

