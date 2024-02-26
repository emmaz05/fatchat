import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./Map.css";
import MapPost from "../modules/MapPost";
import { get } from "../../utilities";
import { socket } from "../../client-socket";

const Map = (props) => {
  const { userId } = props;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM",
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: 42.3601, lng: -71.0942 }), []);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get("/api/posts").then((postObjs) => {
      setPosts(postObjs);
    });
    const getPost = () => {
      get("/api/posts").then((postObjs) => {
        setPosts(postObjs);
      });
    };
    socket.on("post", getPost);
    return () => {
      socket.off("post", getPost);
    };
  }, []);

  let postsList = null;
  const hasPosts = posts.length !== 0;
  if (hasPosts) {
    postsList = posts.map((postObj) => (
      <MapPost
        key={`Marker_${postObj._id}`}
        _id={postObj._id}
        creator_name={postObj.creator_name}
        creator_id={postObj.creator_id}
        userId={postObj.userId}
        caption={postObj.caption}
        coord={postObj.coord}
      />
    ));
  }

  const handleDeletePost = (postId) => {
    // Update the posts state to exclude the deleted post
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="Map">
            
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : loadError ? (
        <h1>Error loading maps</h1>
      ) : (
        <>
                    
          <GoogleMap
            mapContainerClassName="map-container"
            center={selectedMarker || center}
            zoom={15}
          >
            {/* Render MapPost components as children */}
            {posts.map((postObj) => (
              <MapPost
                key={`Marker_${postObj._id}`}
                creator_name={postObj.creator_name}
                caption={postObj.caption}
                coord={postObj.coord}
                _id={postObj._id}
                isCurrentUser={postObj.creator_id === userId}
                onDelete={handleDeletePost}
              />
            ))}
                      
          </GoogleMap>
                        
        </>
      )}
      {postsList}
    </div>
  );
};

export default Map;
