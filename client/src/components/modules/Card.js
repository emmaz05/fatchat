import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost.js";
//import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

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
 */
const Card = (props) => {
  //const [comments, setComments] = useState([]);

  useEffect(() => {
    // get("/api/comment", { parent: props._id }).then((comments) => {
    //   setComments(comments);
    // });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
//   

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

      />
     
    </div>
  );
};

export default Card;
