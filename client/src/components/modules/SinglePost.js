import React, { useState, useEffect } from "react";
import { get } from "../../../src/utilities";
import { Link } from "react-router-dom";
import "./NavBar.css";
import ReverseGeo from "../modules/ReverseGeo.jsx";

const SinglePost = (props) => {
  const { lat, lng } = props.coord || { lat: 0, lng: 0 };
  const [user, setUser] = useState(null);
  const [userImg, setUserImg] = useState("https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png");

  useEffect(() => {
    // Fetch user data for the creator of the post
    get(`/api/user/${props.creator_id}`).then((userData) => {
      setUser(userData);
      if (userData && userData.picture) {
        setUserImg(userData.picture);
      }
    });
  }, [props.creator_id]);

  return (
    <div className="Card-story">
      <img src={userImg} alt="Profile" style={{ width: "30px", height: "30px" }} />
      <Link to={`/profile/${props.creator_id}`} className="Card-storyUser u-link u-bold">
        <p className="Card-storyUser">{props.creator_name}</p>
      </Link>
      <p className="Card-storyContent">{props.caption}</p>
      <p>
        <ReverseGeo props = {props} lat={lat} lng={lng} />
      </p>
    </div>
  );
};

export default SinglePost;
