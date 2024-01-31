import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  const [profilePicture, setProfilePicture] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setProfilePicture(user.picture);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    //<Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }
      />
      <Route path="/profile/:userId" element={<Profile />} />

      <Route path="/map" element={<Map userId={userId} />} />
      <Route
        path="/feed"
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        element={<Feed userId={userId} />}
      />

      <Route
        path="/profile"
        element={<Profile asdf={profilePicture} />}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
