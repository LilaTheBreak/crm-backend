import React, { useEffect, useState, useCallback, useMemo } from "react";

const UserManagement = ({ showMessage }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useMemo(() => localStorage.getItem("token") || "", []);
    const userRole = useMemo(() => localStorage.getItem("role") || "user", []);

    // ✅ Wrapped in useCallback to avoid unnecessary re-renders
    const fetchUsers = useCallback(() => {
        setLoading(true);
        fetch("http://localhost:5050/users", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load users");
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // ✅ Now included in dependencies

    const changeUserRole = (userId, newRole) => {
        fetch(`http://localhost:5050/users/${userId}/role`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update role");
                }
                return response.json();
            })
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
                showMessage(`✅ Role updated successfully`);
            })
            .catch((error) => {
                console.error("Error updating user role:", error);
                showMessage("❌ Failed to update role");
            });
    };

    const deleteUser = (userId) => {
        fetch(`http://localhost:5050/users/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete user");
                }
                return response.json();
            })
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                showMessage(`❌ User deleted`);
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                showMessage("❌ Failed to delete user");
            });
    };

    const styles = {
        container: {
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
        },
        th: {
            background: "#007bff",
            color: "white",
            padding: "10px",
            textAlign: "left",
        },
        td: {
            padding: "10px",
            borderBottom: "1px solid #ddd",
        },
        select: {
            padding: "5px",
            borderRadius: "5px",
        },
        deleteButton: {
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "5px",
        },
    };

    if (loading) return <p role="status">Loading users...</p>;
    if (error) return <p role="alert" style={{ color: "red" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2>User Management</h2>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table style={styles.table} aria-label="User management table">
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Username</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Role</th>
                            {userRole === "admin" && <th style={styles.th}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td style={styles.td}>{user.id}</td>
                                <td style={styles.td}>{user.username}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    {userRole === "admin" ? (
                                        <select
                                            value={user.role}
                                            onChange={(e) => changeUserRole(user.id, e.target.value)}
                                            style={styles.select}
                                            aria-label={`Change role for ${user.username}`}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                {userRole === "admin" && (
                                    <td style={styles.td}>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => deleteUser(user.id)}
                                            aria-label={`Delete ${user.username}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;




