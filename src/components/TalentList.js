import React, { useEffect, useState } from "react";

const TalentList = () => {
    const [talent, setTalent] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const token = localStorage.getItem("token"); // ✅ Add token for authentication

    // ✅ Fetch talent from backend (inside the component)
    useEffect(() => {
        fetch("http://localhost:5050/talent", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } // ✅ Include auth header
        })
        .then(response => response.json())
        .then(data => {
            console.log("Talent fetched:", data);
            setTalent(data);
        })
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    // ✅ Handle talent submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", name);
        formData.append("profile_image", image);

        fetch("http://localhost:5050/talent", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }, // ✅ Include token
            body: formData,
        })
        .then(response => response.json())
        .then(newTalent => {
            setTalent([...talent, newTalent.talent]); // ✅ Ensure the response format matches
            setName(""); 
            setImage(null); 
        })
        .catch(error => console.error("Error adding talent:", error));
    };

    return (
        <div>
            <h1>Talent List</h1>

            {/* Add Talent Form */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter talent name"
                    required
                />
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    accept="image/*"
                    required
                />
                <button type="submit">Add Talent</button>
            </form>

            {/* Talent List */}
            <ul>
                {talent.length > 0 ? (
                    talent.map((person) => (
                        <li key={person.id}>
                            <strong>{person.first_name}</strong> 
                            {person.profile_image && (
                                <img 
                                    src={`http://localhost:5050${person.profile_image}`} 
                                    alt={person.first_name} 
                                    width="100" 
                                    height="100" 
                                    style={{ borderRadius: "10px", objectFit: "cover" }} 
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No talent found.</p>
                )}
            </ul>
        </div>
    );
};

export default TalentList;
