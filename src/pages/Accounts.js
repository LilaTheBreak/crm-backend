import React, { useEffect, useState } from "react";
import "../styles/Accounts.css";
import { FaEnvelope, FaPhone, FaGlobe, FaPlus, FaTrash, FaChartPie } from "react-icons/fa";
import "../styles/Accounts.css"; // ✅ Make sure this file exists

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ industry: "", location: "" });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAccount, setNewAccount] = useState({ name: "", website: "", industry: "", location: "", mainContact: "" });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch("http://localhost:5050/accounts");
            if (!response.ok) throw new Error("Failed to fetch accounts");
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const handleAddAccount = async () => {
        const newEntry = { ...newAccount, id: Date.now() };
        setAccounts([...accounts, newEntry]);
        setShowAddModal(false);
    };

    const filteredAccounts = accounts.filter(account =>
        (account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.industry.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.industry === "" || account.industry.includes(filters.industry)) &&
        (filters.location === "" || account.location.includes(filters.location))
    );

    return (
        <div className="accounts-container">
            {/* ✅ Header */}
            <div className="accounts-header">
                <h1>Account Dashboard</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search accounts..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="filter-button"><FaPlus /> Add Account</button>
                </div>
            </div>

            {/* ✅ Filters Section */}
            <div className="filter-section">
                <h3 className="filter-title">Filters</h3>
                <label className="filter-option">
                    Industry: 
                    <input type="text" name="industry" value={filters.industry} onChange={handleFilterChange} />
                </label>
                <label className="filter-option">
                    Location:
                    <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
                </label>
            </div>

            {/* ✅ Accounts Grid */}
            <div className="accounts-grid">
                {/* ✅ Accounts List */}
                <div className="accounts-list">
                    <h2>All Accounts</h2>
                    {filteredAccounts.length > 0 ? (
                        filteredAccounts.map((account) => (
                            <div key={account.id} className="account-card" onClick={() => setSelectedAccount(account)}>
                                <img src={account.logo || "https://via.placeholder.com/50"} alt={account.name} className="account-logo" />
                                <div className="account-info">
                                    <h3>{account.name}</h3>
                                    <p>{account.industry} - {account.location}</p>
                                </div>
                                <p className="account-contact">{account.mainContact}</p>
                            </div>
                        ))
                    ) : (
                        <p>No accounts found.</p>
                    )}
                </div>

                {/* ✅ Account Details Panel */}
                {selectedAccount && (
                    <div className="account-details">
                        <h2>{selectedAccount.name}</h2>
                        <p><FaGlobe /> <a href={selectedAccount.website} target="_blank" rel="noopener noreferrer">{selectedAccount.website}</a></p>
                        <p><strong>Industry:</strong> {selectedAccount.industry}</p>
                        <p><strong>Location:</strong> {selectedAccount.location}</p>
                        <p><strong>Main Contact:</strong> {selectedAccount.mainContact}</p>
                        <p><strong>Primary Email:</strong> <FaEnvelope /> {selectedAccount.email}</p>
                        <p><strong>Phone:</strong> <FaPhone /> {selectedAccount.phone}</p>

                        {/* ✅ Related Deals */}
                        <h3>Active Deals</h3>
                        <ul className="deal-management">
                            {selectedAccount.deals.map((deal, index) => (
                                <li key={index} className={deal.status === "Active" ? "deal-item active" : "deal-item inactive"}>
                                    {deal.name}
                                </li>
                            ))}
                        </ul>

                        {/* ✅ Related Contacts */}
                        <h3>Related Contacts</h3>
                        <div className="related-contacts">
                            {selectedAccount.contacts.map((contact, index) => (
                                <div key={index} className="contact-card">
                                    <img src={contact.image || "https://via.placeholder.com/40"} alt={contact.name} />
                                    <div>
                                        <h4>{contact.name}</h4>
                                        <p>{contact.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Performance & Campaign Stats */}
                        <div className="platform-stats">
                            <h3>Platform Demographic Stats</h3>
                            <button className="stats-button"><FaChartPie /> Instagram</button>
                        </div>

                        {/* ✅ Ad & Campaign Section */}
                        <div className="ads-container">
                            <h3>Ads By Page</h3>
                            <div className="ads-images">
                                <img src="https://via.placeholder.com/80" alt="Ad 1" />
                                <img src="https://via.placeholder.com/80" alt="Ad 2" />
                            </div>
                        </div>

                        {/* ✅ Current Campaigns */}
                        <div className="campaigns-container">
                            <h3>Current Campaigns</h3>
                            <textarea placeholder="Google Coachella Activation"></textarea>
                            <button className="send-report">Send Wrap-Up Report</button>
                        </div>
                    </div>
                )}
            </div>

            {/* ✅ Add Account Modal */}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Account</h2>
                        <input type="text" placeholder="Company Name" value={newAccount.name} onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })} />
                        <input type="text" placeholder="Website" value={newAccount.website} onChange={(e) => setNewAccount({ ...newAccount, website: e.target.value })} />
                        <input type="text" placeholder="Industry" value={newAccount.industry} onChange={(e) => setNewAccount({ ...newAccount, industry: e.target.value })} />
                        <input type="text" placeholder="Location" value={newAccount.location} onChange={(e) => setNewAccount({ ...newAccount, location: e.target.value })} />
                        <input type="text" placeholder="Main Contact" value={newAccount.mainContact} onChange={(e) => setNewAccount({ ...newAccount, mainContact: e.target.value })} />
                        <button onClick={handleAddAccount}>Save Account</button>
                        <button className="close-modal" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounts;


