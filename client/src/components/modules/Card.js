import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost.js";
import "./NavBar.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 * @param {string} coord of the post
 */
const Card = (props) => {
  return (
    <div className="Card-container">
      <SinglePost
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        caption={props.caption}
        coord={props.coord}
      />
    </div>
  );
};

export default Card;
