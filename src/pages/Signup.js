import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("❌ Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5050/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Signup failed");
            }

            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000); // ✅ Redirect after success
        } catch (err) {
            setError(err.message || "Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            background: darkMode ? "#222" : "#fff",
            color: darkMode ? "white" : "black",
            borderRadius: "10px",
            boxShadow: darkMode ? "0px 0px 10px rgba(255,255,255,0.2)" : "0px 0px 10px rgba(0,0,0,0.1)",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: darkMode ? "1px solid white" : "1px solid #ccc",
            background: darkMode ? "#333" : "white",
            color: darkMode ? "white" : "black",
        },
        button: {
            width: "100%",
            padding: "10px",
            background: loading ? "#999" : "#28a745",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: "5px",
        },
        errorText: {
            color: "red",
        },
        successText: {
            color: "green",
        },
    };

    return (
        <div style={styles.container}>
            <h2>Signup</h2>
            {error && <p style={styles.errorText}>{error}</p>}
            {success && <p style={styles.successText}>✅ Signup successful! Redirecting...</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
};

export default Signup;