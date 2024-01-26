import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import "./NewPost.css";
import { post } from "../../utilities";

const NewPostInput = (props) => {
  const [captionVal, setCaptionVal] = useState("");
  const [address, setAddress] = useState("");

  // called whenever the user types in the new post input bo
  const handleCapChange = (event) => {
    setCaptionVal(event.target.value);
  };

  const handleCapSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log(latLng);
      props.onSubmit(captionVal, latLng);
      setCaptionVal("");
      setAddress("");
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const handleSelect = async (value) => {
    setAddress(value);
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
      <div className="search-bar">
        <PlacesAutocomplete
          bootstrapURLKeys={{
            key: "AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM",
            libraries: ["places"],
          }}
          value={address}
          onChange={(value) => setAddress(value)}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <>
              <input {...getInputProps({ placeholder: "Search places..." })} />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      </div>
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
  const addPost = (captionVal, latLng) => {
    const body = { caption: captionVal, coord: latLng };
    post("/api/post", body).then((post) => {
      props.addNewPost(post);
    });
  };
  return <NewPostInput onSubmit={addPost} />;
};

export { NewPost };
