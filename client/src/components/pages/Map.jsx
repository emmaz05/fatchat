import React, { useMemo, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import "./Skeleton.css";
import { postsList } from "./Feed.jsx" ;

const Map = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM",
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: 42.3601, lng: -71.0942 }), []);

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [posts, setPosts] = useState([]);

  // const onMapClick = (event) => {
  //   const newMarker = {
  //     position:
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     },
  //     icon: {
  //       url: "https://cdn.iconscout.com/icon/free/png-256/free-ice-cream-1769297-1505070.png",
  //       scaledSize: new window.google.maps.Size(50, 50),
  //     },
  //   };

  //   setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  // };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const addNewPost = (post) => {
    setPosts([post].concat(posts));
  };

  const renderInfoWindowContent = () => {
    // Customize the content of the InfoWindow here
    return (
      <div>
        <h3>Custom InfoWindow</h3>
        <p>This is a custom InfoWindow content.</p>
      </div>
    );
  };

  const renderPostMarkers = () => {

  }

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : loadError ? (
        <h1>Error loading maps</h1>
      ) : (
        <>
          {/* <LoadScript
            googleMapsApiKey="AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM"
            libraries={["places"]}
          > */}
          <GoogleMap
            mapContainerClassName="map-container"
            center={selectedMarker || center}
            zoom={15}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                icon={marker.icon}
              />
            ))}
            {selectedMarker && (
              <InfoWindow position={selectedMarker.position} onCloseClick={handleInfoWindowClose}>
                {renderInfoWindowContent()}
              </InfoWindow>
            )}
          </GoogleMap>
          {/* </LoadScript> */}
        </>
      )}
    </div>
  );
};

export default Map;