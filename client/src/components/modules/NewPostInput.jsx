import React, { useState, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "./NewPost.css";
import { post, get } from "../../utilities";

const NewPostInput = (props) => {
  const [captionVal, setCaptionVal] = useState("");
  const [address, setAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    get("/api/whoami").then((userData) => {
      setUser(userData);
    });
  }, []);

  // called whenever the user types in the new post input
  const handleCapChange = (event) => {
    setCaptionVal(event.target.value);
  };

  const handleCapSubmit = async (event) => {
    event.preventDefault();
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log(latLng);
      props.onSubmit(captionVal, latLng, placeName, user);
      setCaptionVal("");
      setAddress("");
      setPlaceName("");
      console.log(user);
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const handleSelect = async (value) => {
    setAddress(value);
    setPlaceName(value);
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={"Caption your Chat..."}
        value={captionVal}
        onChange={handleCapChange}
        className="NewPostInput-input"
      />
      <div className="search-bar">
        {
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
                <input {...getInputProps({ placeholder: "Add Location..." })} />
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
        }
      </div>
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit!"
        onClick={handleCapSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const NewPost = (props) => {
  const addPost = (captionVal, latLng, placeName, user) => {
    const body = { caption: captionVal, coord: latLng, loc_name: placeName, user_pic: user.picture}; // Use the placeName
    post("/api/post", body).then((post) => {
      // props.addNewPost(post);
    });
  };
  return <NewPostInput onSubmit={addPost} />;
};

export { NewPost };
