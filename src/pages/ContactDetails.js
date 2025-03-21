import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ContactDetails.css";

const ContactDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch(`http://localhost:5050/contacts/${id}`);
                if (!response.ok) throw new Error("Contact not found");
                const data = await response.json();
                setContact(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    if (loading) return <p>Loading contact details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!contact) return <p>Contact not found.</p>;

    return (
        <div className="contact-details-container">
            <h1>{contact.name}</h1>
            <p><strong>Role:</strong> {contact.role} at {contact.company}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Location:</strong> {contact.location || "Not provided"}</p>
            <p><strong>Status:</strong> {contact.status || "N/A"}</p>

            <h3>Related Deals</h3>
            {contact.deals?.length > 0 ? (
                <ul>
                    {contact.deals.map((deal, index) => (
                        <li key={index} className={deal.status === "Active" ? "active-deal" : "completed-deal"}>
                            {deal.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No deals found.</p>
            )}

            <h3>Activity Log</h3>
            {contact.activity?.length > 0 ? (
                <div className="activity-log">
                    {contact.activity.map((log, index) => (
                        <div key={index} className="activity-entry">
                            <p><strong>{log.type}:</strong> {log.description}</p>
                            <p className="activity-date">{log.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No activity found.</p>
            )}
        </div>
    );
};

export default ContactDetails;

