import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Accounts.css"; // Ensure this file exists

const AccountDetails = () => {
    const { id } = useParams();

    return (
        <div className="account-details-container">
            <h1>Account Details - {id}</h1>
            <p>More information about this company will go here.</p>
        </div>
    );
};

export default AccountDetails;
