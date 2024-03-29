import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import Map from "./Map";
import NavBar from "../modules/NavBar";
import { NewPost } from "../modules/NewPostInput";
import "../../utilities.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_I
const GOOGLE_CLIENT_ID = "163008839093-p24qoqcjhot1em5llpo21ka3rka04dqi.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const [mapsData, setMapsData] = useState(null);

  useEffect(() => {
    const fetchMapsData = async () => {
      try {
        // Make a request to your server's endpoint
        const response = await axios.get("/maps-data");
        setMapsData(response.data);
      } catch (error) {
        console.error("Error fetching maps data:", error);
      }
    };

    fetchMapsData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <header class="bar">
        <div class="fatchat">
          <a href="#">FatChat</a>
        </div>
        <nav class="navbar">
          <a href="./">Home</a>
          <a href="./feed">Feed</a>
          <a href="./profile">Profile</a>
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </nav>
      </header>
      <Map userId={userId} />
      <NewPost userId={userId} />
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
