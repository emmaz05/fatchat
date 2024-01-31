import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Marker, InfoWindow } from "@react-google-maps/api"; // Assuming you have access to the Google Maps API components

/**
 * MapPost is a component that renders a post with a Google Maps marker placeholder
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} caption of the story
 * @param {string} coord of the story
 */
const MapPost = (props) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleMarkerClick = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };
  // Assuming props.coord is an object with lat and lng properties
  const { lat, lng } = props.coord || { lat: 0, lng: 0 };
  const icecream = "https://cdn.iconscout.com/icon/free/png-256/free-ice-cream-1769297-1505070.png";
  const scaledSize = new window.google.maps.Size(50, 50);
  const infoWindowStyles = {
    backgroundColor: "#ff748c",
    color: "white",
    padding: "20px",
    borderRadius: "0px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  const buttonStyle = {
    background: "ffc0cb",
    color: "white",
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent marker click when the delete button is clicked
    // Call a delete function passed as a prop
    if (props.onDelete) {
      props.onDelete(props._id);
    }
  };

  return (
    <div className="Marker-Post">
      <Marker
        position={{ lat, lng }}
        icon={{ url: icecream, scaledSize: scaledSize }}
        onClick={handleMarkerClick}
      >
        {/* Custom Info Window */}
        {isInfoWindowOpen && (
          <InfoWindow onCloseClick={() => setIsInfoWindowOpen(false)}>
            <div style={infoWindowStyles}>
              <h3>{props.creator_name}'s Chat</h3>
              <p>{props.caption}</p>
              <div style={buttonStyle}>
                {props.isCurrentUser && <button onClick={handleDeleteClick}>Delete</button>}
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </div>
  );
};

export default MapPost;
