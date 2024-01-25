import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import Map from "./Map";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
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

      <header class="header">
        <a href="#" class="fatchat">
          FatChat
        </a>
        <nav class="navbar">
          <a href="">Home</a>
          <a href="">Circles</a>
          <a href="./Map.jsx">Map</a>
          <a href="./Profile.jsx">Profile</a>
        </nav>
      </header>

      <Map />
      {/* {mapsData && <Maps locations={mapsData} />}
      <script
        async
        defer
        src={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM&libraries=places`"
        }
      ></script> */}
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
