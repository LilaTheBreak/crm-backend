const API_URL = "http://localhost:5050";

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
    }
    return data;
};

export const getProtectedData = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/protected-route`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    return response.json();
};
