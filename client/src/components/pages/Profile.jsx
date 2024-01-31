import React, { useState, useEffect } from "react";
import "./Profile.css";
import NavBar from "../modules/NavBar";
import { get, put } from "../../../src/utilities"; // Import the get and put utility functions
import Card from "../modules/Card.js";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = props;

  useEffect(() => {
    // Fetch user data from the server
    get("/api/whoami").then((userData) => {
      setUser(userData);
      setBio(userData.bio || ""); // Set bio state with user's current bio
    });

    // Fetch user's posts from the server
    get("/api/posts").then((postObjs) => {
      setUserPosts(postObjs);
    });
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Save the updated bio to the server
    put("/api/updateBio", { user_id: user._id, bio }).then((response) => {
      if (response.success) {
        // Once saved, update the user object with the new bio.
        setUser({ ...user, bio });
        // Toggle editing off
        setEditing(false);
      } else {
        console.error("Bio update failed:", response.message);
      }
    });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  console.log("postObj:", userPosts);
  console.log("userid: ", userId);
  const filteredUserPosts = userPosts.filter((postObj) => postObj.creatorid === userId);

  return (
    <div>
      <NavBar />

      <main className="profile-main">
        <section className="user-info">
          <img src={user.picture} alt="Profile" style={{ width: "100px", height: "100px" }} />
          <div className="user-details">
            <h1>{user.name}</h1>
            {editing ? (
              <>
                <textarea value={bio} onChange={handleBioChange} />
                <button onClick={handleSaveClick}>Save Bio</button>
              </>
            ) : (
              <>
                <p>{user.bio}</p>
                <button onClick={handleEditClick}>Edit Bio</button>
              </>
            )}
          </div>
        </section>

        <section className="user-posts">
          <h2>Your Chats</h2>
          {filteredUserPosts.reverse().map((postObj) => (
            <Card
              key={`Card_${postObj._id}`}
              _id={postObj._id}
              creator_name={postObj.creator_name}
              creator_id={postObj.creator_id}
              userId={props.userId}
              caption={postObj.caption}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Profile;
