import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contacts.css";
import { FaPlus, FaDownload, FaFilter, FaList, FaTh, FaTrash } from "react-icons/fa";
import ContactCard from "../components/ContactCard";

const Contacts = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("list");
    const [bulkActions, setBulkActions] = useState([]);
    const [filters, setFilters] = useState({ role: "", company: "" });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", role: "", company: "" });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch("http://localhost:5050/contacts");
            if (!response.ok) throw new Error("Failed to fetch contacts");
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const toggleBulkAction = (contactId) => {
        setBulkActions((prev) =>
            prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]
        );
    };

    const deleteSelectedContacts = () => {
        setContacts(contacts.filter(contact => !bulkActions.includes(contact.id)));
        setBulkActions([]);
    };

    const handleAddContact = async () => {
        const newEntry = { ...newContact, id: Date.now() };
        setContacts([...contacts, newEntry]);
        setShowAddModal(false);
    };

    const filteredContacts = contacts.filter(contact =>
        (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.role === "" || contact.role.includes(filters.role)) &&
        (filters.company === "" || contact.company.includes(filters.company))
    );

    return (
        <div className="contacts-container">
            {/* ✅ Header */}
            <div className="contacts-header">
                <h1>Contact Directory</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="filter-button"><FaFilter /> Filter</button>
                    <button className="add-contact-btn" onClick={() => setShowAddModal(true)}><FaPlus /> Add Contact</button>
                </div>
            </div>

            {/* ✅ Filters & Bulk Actions */}
            <div className="filter-section">
                <h3 className="filter-title">Filters</h3>
                <label className="filter-option">
                    Role: 
                    <input type="text" name="role" value={filters.role} onChange={handleFilterChange} />
                </label>
                <label className="filter-option">
                    Company:
                    <input type="text" name="company" value={filters.company} onChange={handleFilterChange} />
                </label>
                <button className="export-button"><FaDownload /> Export</button>
            </div>

            {/* ✅ View Mode Toggle */}
            <div className="table-view">
                <button className="filter-button" onClick={() => setViewMode("list")}><FaList /> List View</button>
                <button className="filter-button" onClick={() => setViewMode("grid")}><FaTh /> Grid View</button>
            </div>

            {/* ✅ Bulk Actions */}
            {bulkActions.length > 0 && (
                <div className="bulk-actions">
                    <button className="bulk-button" onClick={deleteSelectedContacts}><FaTrash /> Delete</button>
                    <button className="bulk-button"><FaDownload /> Export</button>
                </div>
            )}

            <div className="contacts-grid">
                {/* ✅ Contact List */}
                <div className="contacts-list">
                    <h2>All Contacts</h2>
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onSelect={() => navigate(`/contacts/${contact.id}`)}
                                toggleBulkAction={toggleBulkAction}
                                isChecked={bulkActions.includes(contact.id)}
                            />
                        ))
                    ) : (
                        <p>No contacts found.</p>
                    )}
                </div>
            </div>

            {/* ✅ Add Contact Modal */}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Contact</h2>
                        <input type="text" placeholder="Full Name" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
                        <input type="email" placeholder="Email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
                        <input type="text" placeholder="Phone" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} />
                        <input type="text" placeholder="Role" value={newContact.role} onChange={(e) => setNewContact({ ...newContact, role: e.target.value })} />
                        <input type="text" placeholder="Company" value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })} />
                        <button onClick={handleAddContact}>Save Contact</button>
                        <button className="close-modal" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;


