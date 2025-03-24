import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

// 🌍 Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

const Root = () => {
  const [clientId, setClientId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientId = async () => {
      const configEndpoint = `${API_URL}/config`;
      console.log("🔍 Fetching Google Client ID from:", configEndpoint);

      try {
        const response = await fetch(configEndpoint);
        if (!response.ok) {
          throw new Error(`❌ Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.googleClientId) {
          throw new Error("⚠️ Google Client ID missing in response.");
        }

        console.log("✅ Fetched Client ID:", data.googleClientId);
        setClientId(data.googleClientId);
      } catch (err) {
        console.error("❌ Error loading config:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();
  }, []);

  if (loading) return <p>🔄 Loading Google Auth...</p>;
  if (error) return <p style={{ color: "red", fontWeight: "bold" }}>⚠️ {error}</p>;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

// 🔁 Mount root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);
















