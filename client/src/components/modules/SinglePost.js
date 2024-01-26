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
 */
const SinglePost = (props) => {
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Card-storyContent">{props.caption}</p>
    </div>
  );
};

export default SinglePost;
