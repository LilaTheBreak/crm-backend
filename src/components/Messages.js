import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

const Messages = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // ✅ Fetch past messages from the database
        fetch(`http://localhost:5050/messages?sender_id=${senderId}&receiver_id=${receiverId}`)
            .then((response) => response.json())
            .then((data) => setMessages(Array.isArray(data) ? data : []))
            .catch((error) => console.error("Error fetching messages:", error));

        // ✅ Listen for incoming messages
        socket.on(`message:${receiverId}`, (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off(`message:${receiverId}`);
    }, [senderId, receiverId]);

    // ✅ Send Message
    const sendMessage = (e) => {
        e.preventDefault();
        const messageData = { sender_id: senderId, receiver_id: receiverId, message: newMessage };

        // Send message via WebSocket
        socket.emit("sendMessage", messageData);

        // Update UI immediately (Optimistic UI)
        setMessages((prev) => [...prev, { sender_id: senderId, message: newMessage }]);
        setNewMessage("");
    };

    return (
        <div>
            <h2>Messages</h2>
            <div style={{
                height: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px"
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        textAlign: msg.sender_id === senderId ? "right" : "left",
                        marginBottom: "8px"
                    }}>
                        <strong>{msg.sender_id === senderId ? "You" : `User ${msg.sender_id}`}:</strong>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            
            {/* Message Input */}
            <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    required
                    style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />
                <button type="submit" style={{
                    background: "#007bff",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer"
                }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Messages;

