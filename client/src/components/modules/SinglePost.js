import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} caption of the story
 * @param {string} coord of the story
 */
const SinglePost = (props) => {
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="Card-storyUser u-link u-bold">
        <p className="Card-storyUser">{props.creator_name}</p>
      </Link>
      <p className="Card-storyContent">
        {props.caption}
        {props.coord}
      </p>
    </div>
  );
};

export default SinglePost;
