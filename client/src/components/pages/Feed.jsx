import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar.jsx";
const Feed = (props) => {
  const { userId } = props;
  const [posts, setPosts] = useState([]);

  //called when "Feed" component mounts

  useEffect(() => {
    document.title = "Feed";
    get("/api/posts").then((postObjs) => {
      let reversedPostObjs = postObjs.reverse();
      setPosts(reversedPostObjs);
    });
  }, []);

  let postsList = null;
  const hasPosts = posts.length !== 0;
  if (hasPosts) {
    postsList = posts.map((postObj) => (
      <Card
        key={`Card_${postObj._id}`}
        _id={postObj._id}
        creator_name={postObj.creator_name}
        creator_id={postObj.creatorid}
        userId={userId}
        caption={postObj.caption}
      />
    ));
  }

  return (
    <>
      <NavBar />
      {postsList}
    </>
  );
};

export default Feed;
