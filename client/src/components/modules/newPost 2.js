import React, { useState } from "react";

import "./NewPost.css";
import { post } from "../../utilities";

const addPost = (value) => {
  const body = { content: value };
  post("/app/story", body).then((post) => {
    ProgressPlugin.addNewPost(post);
  });
};
