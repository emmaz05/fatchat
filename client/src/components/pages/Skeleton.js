import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import Map from "./Map";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "163008839093-p24qoqcjhot1em5llpo21ka3rka04dqi.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  // var map;
  // var marker;
  // var infoWindow;

  // function initMap() {
  //   console.log("fjrieowfjr");
  //   var options = {
  //     center: { lat: 42.3601, lng: -71.0942 },
  //     zoom: 15,
  //   };

  //   map = new google.maps.Map(document.getElementById("map"), options);

  //   const image = "ice cream.png";

  //   marker = new google.maps.Marker({
  //     position: { lat: 42.3601, lng: -71.0942 },
  //     map,
  //     title: "test post",
  //     icon: image,
  //   });

  //   infoWindow = new google.maps.InfoWindow({
  //     content:
  //       '<div id="content">' +
  //       '<h1 id="postTitle" class="postTitle">Sam Manolis</h1>' +
  //       "<p>I love to eat.</p>" +
  //       "</div>",
  //   });

  //   marker.addListener("click", function () {
  //     infoWindow.open(map, marker);
  //   });
  // }

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
