import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Use environment variables or fallback to default API URL
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

const Root = () => {
    const [clientId, setClientId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientId = async () => {
            console.log("🔍 Fetching Google Client ID from:", `${API_URL}/config`);
            try {
                const response = await fetch(`${API_URL}/config`);
                if (!response.ok) {
                    throw new Error(`❌ Failed to fetch Google Client ID: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data.googleClientId) {
                    throw new Error("⚠️ No Google Client ID received.");
                }
                console.log("✅ Google Client ID Fetched:", data.googleClientId);
                setClientId(data.googleClientId);
            } catch (err) {
                console.error("❌ Error fetching Google Client ID:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClientId();
    }, []);

    if (loading) {
        return <p>🔄 Loading Google Authentication...</p>;
    }

    if (error) {
        return <p style={{ color: "red", fontWeight: "bold" }}>⚠️ Error: {error}</p>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

// ✅ React 18 Compatible
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);















