import React, { useState, useEffect } from "react";
//import Card from "../modules/Card.js";
//import { Newpost } from "../modules/NewPostInput.js";
import Card from "../modules/Card.js";
import { get } from "../../utilities";
import SinglePost from "../modules/SinglePost.js";
const Feed = (props) => {
  const [posts, setPosts] = useState([]);


  //called when "Feed" component mounts

  useEffect(() => {
    document.title = "Feed";
    get("/api/posts").then((postObjs) =>{
      let reversedPostObjs = postObjs.reverse();
      setPosts(reversedPostObjs);
    });
  }, []);

   // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewPost = (postObj) => {
    setPosts([postObj].concat(posts));
  };

  let postsList = null;
  const hasPosts = posts.length !== 0;
  if (hasPosts) {
    postsList = posts.map((postObj) => (
      <Card
        key={`Card_${postObj._id}`}
        _id={postObj._id}
        creator_name={postObj.creator_name}
        creator_id={postObj.creator_id}
        userId={props.userId}
        caption={postObj.caption}
        coord={postObj.coord}
        loc_name={postObj.loc_name}
        user_pic={postObj.user_pic}
      />
      

      
     
    ));
  }

  const loadPosts = () => {
    document.getElementById("duh").innerHTML=String(postsList[0]._id);
    console.log(postsList)
  }
  
  
  return (
  <>
  {/* <div>Feed</div>
  <input type="text" id = "yo" readOnly 
  onFocus={() => {
    loadPosts();
  }}
  ></input>
  <div id="duh">
    :)
  </div>*/}
  
  
  {<div>
  <header class="header">
        <a href="#" class="fatchat">
          FatChat
        </a>
        <nav class="navbar">
          <a href="./">Home</a>
          <a href="./feed">Circles</a>
          <a href="./">Map</a>
          <a href="./profile">Profile</a>
        </nav>
      </header>
      
  </div>}
  {postsList}
  </>
  ); 
};

export default Feed;
