import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

import ReverseGeo from "../modules/ReverseGeo.jsx";
/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} caption of the story
 * @param {object} coord of the story
 */


const SinglePost = (props) => {
  const {lat, lng} = props.coord || {lat: 0, lng: 0};
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="Card-storyUser u-link u-bold">
        <p className="Card-storyUser">{props.creator_name}</p>
      </Link>
      <p className="Card-storyContent">
        {props.caption}</p>
        <p>Lng: {lat}
        <br></br>
        Lat: {lng}
      </p>
      <p>
      <ReverseGeo lat={lat} lng={lng}/>
      </p>
    </div>
  );
};

export default SinglePost;
