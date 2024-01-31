import React, { useState, useEffect } from "react";
import { get } from "../../../src/utilities";
import { Link } from "react-router-dom";
import "./NavBar.css";
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
import ReverseGeo from "../modules/ReverseGeo.jsx";

const SinglePost = (props) => {
  const { lat, lng } = props.coord || { lat: 0, lng: 0 };
//   const [user, setUser] = useState(null);
  const [userImg, setUserImg] = useState("https://cdn.iconscout.com/icon/free/png-256/free-ice-cream-1769297-1505070.png");
  if (props.user_pic){
    setUserImg(props.user_pic);
  }

//   useEffect(() => {
//     // Fetch user data for the creator of the post
//     get(`/api/user/${props.creator_id}`).then((userData) => {
//       setUser(userData);
//       if (userData && userData.picture) {
//         setUserImg(userData.picture);
//       }
//     });
//   }, [props.creator_id]);

  return (
    <div className="Card-story">
      
      {/* <Link to={`/profile/${props.creator_id}`} className="Card-storyUser u-link u-bold"> */}
        <p className="Card-storyUser"><img src={userImg} alt="Profile" style={{ width: "30px", height: "30px" }} />{props.creator_name}<div className="Card-atSymbol">@

        <ReverseGeo props = {props} lat={lat} lng={lng} /></div></p>
      {/* </Link> */}
      <p className="Card-storyContent">{props.caption}</p>
      <p>
        
      </p>
    </div>
  );
};

export default SinglePost;
