import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const ContactCard = ({ contact, onSelect, toggleBulkAction, isChecked }) => {
    return (
        <div className="contact-card" onClick={() => onSelect(contact)}>
            <input
                type="checkbox"
                onChange={(e) => {
                    e.stopPropagation();
                    toggleBulkAction(contact.id);
                }}
                checked={isChecked}
            />
            <div className="contact-info">
                <img src={contact.image || "https://via.placeholder.com/40"} alt={contact.name} className="contact-image" />
                <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.role} at {contact.company}</p>
                </div>
            </div>
            <p className="contact-email"><FaEnvelope /> {contact.email}</p>
            <p className="contact-phone"><FaPhone /> {contact.phone}</p>
        </div>
    );
};

export default ContactCard;
