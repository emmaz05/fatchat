import React from "react";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <header class="header">
      <div class="fatchat">
        <a href="#">FatChat</a>
      </div>
      <nav class="navbar">
        <a href="./">Home</a>
        <a href="./feed">Feed</a>
        <a href="./profile">Profile</a>
      </nav>
    </header>
  );
};

export default NavBar;
