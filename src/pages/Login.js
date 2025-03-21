import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";
import logo from "../assets/logo.png";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="The Break Logo" className="login-logo" />
                <h2 className="portal-title">Talent Management Portal</h2>
                <div className="google-button">
                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log("✅ Login Success:", response);

                            try {
                                // Decode the JWT token
                                const decodedToken = jwtDecode(response.credential);
                                console.log("🔍 Decoded Token:", decodedToken);

                                // Extract user details
                                const firstName = decodedToken.given_name || "User";
                                const profilePicture = decodedToken.picture || "https://via.placeholder.com/40";

                                // Store data in localStorage
                                localStorage.setItem("token", response.credential);
                                localStorage.setItem("user", JSON.stringify({ firstName, profilePicture }));

                                // Redirect to dashboard
                                window.location.href = "/dashboard"; 
                            } catch (error) {
                                console.error("❌ Error decoding JWT token:", error);
                                alert("An error occurred while logging in. Please try again.");
                            }
                        }}
                        onError={() => {
                            console.error("❌ Google Login Failed");
                            alert("Google Login Failed. Please try again.");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;























