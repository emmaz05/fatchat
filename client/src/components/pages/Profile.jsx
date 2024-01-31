import React, { useState, useEffect } from "react";
import "./Profile.css";
import { get } from "../../../src/utilities"; // Import the get utility function

const Profile = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    get("/api/whoami").then((userData) => {
      setUser(userData);
    });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header className="header">
        <a href="#" className="fatchat">
          FatChat
        </a>
        <nav className="navbar">
          <a href="./">Home</a>
          <a href="./feed">Circles</a>
          <a href="./">Map</a>
          <a href="./profile">Profile</a>
        </nav>
      </header>

      <main className="profile-main">
        <section className="user-info">
          <img src={user.picture} alt="Profile" style={{ width: "100px", height: "100px" }} />
          <div className="user-details">
            <h1>{user.name}</h1>
            {/* Add other user information fields as needed */}
            <p>{user.bio}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
