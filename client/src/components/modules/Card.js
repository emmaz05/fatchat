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
 * @param {object} coord
 * @param {string} placeName
 * @param {string} user_pic
 */
const Card = (props) => {
  return (
    <div className="Card-container">
      <SinglePost
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        caption={props.caption}
        // lat={props.coord.lat}
        // lng={props.coord.lng}
        coord={props.coord}
        loc_name={props.loc_name}
        user_pic = {props.user_pic}

      />
    </div>
  );
};

export default Card;
