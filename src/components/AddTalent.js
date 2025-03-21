import React, { useState } from "react";

const AddTalent = ({ onTalentAdded }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        industry: "",
        bio: "",
        profile_image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });

        const response = await fetch("http://localhost:5050/talent", {
            method: "POST",
            body: formDataObj
        });

        const result = await response.json();
        if (response.ok) {
            alert("Talent added successfully!");
            onTalentAdded(result.talent); // Update talent list
        } else {
            alert("Error adding talent: " + result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="industry" placeholder="Industry" onChange={handleChange} />
            <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
            <input type="file" name="profile_image" onChange={handleFileChange} />
            <button type="submit">Add Talent</button>
        </form>
    );
};

export default AddTalent;
