import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import Navbar from "./modules/NavBar.jsx";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import mainPage from "../components/mainPage/mainPage.js";

import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

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

      <Route path="/map" element={<Map />} />
      <Route path="/feed" element={<Feed />} />
      {/* <Route path="/main" element={<mainPage />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>/**//*
    <Router>
      <Skeleton path = "/" handleLogin={handleLogin} handleLogout={handleLogout} />
      <Profile path="/profile/" />
      <NotFound default />
    </Router>*/
    
  );
};

export default App;
