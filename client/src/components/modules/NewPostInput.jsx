import React, { useState } from "react";

import "./NewPost.css";
import { post } from "../../utilities";

const NewPostInput = (props) => {
  const [captionVal, setCaptionVal] = useState("");
  const [locVal, setLocVal] = useState("");

  // called whenever the user types in the new post input box
  const handleCapChange = (event) => {
    setCaptionVal(event.target.value);
  };

  const handleLocChange = (event) => {
    setLocVal(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleCapSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(captionVal);
    setCaptionVal("");
    handleLocSubmit();
  };

  const handleLocSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(locVal);
    setLocVal("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={"caption"}
        value={captionVal}
        onChange={handleCapChange}
        className="NewPostInput-caption"
      />
      <input
        type="text"
        placeholder={"location"}
        value={locVal}
        onChange={handleLocChange}
        className="NewPostInput-location"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleCapSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const NewPost = (props) => {
  const addPost = (captionVal, locVal) => {
    const body = { caption: captionVal, location: locVal };
    post("/api/post", body).then((post) => {
      // props.addNewPost(post);
    });
  };
  return <NewPostInput onSubmit={addPost} />;
};

export { NewPost };
