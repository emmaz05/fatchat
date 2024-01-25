import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";
import "./Skeleton.css";
var marker;

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNz_OjSyy7O-PHIGGVVwnvOvCVdxL0pwM",
  });
  const center = useMemo(() => ({ lat: 42.3601, lng: -71.0942 }), []);

  const image = "ice cream.png";

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
          <Marker position={{ lat: 42.3601, lng: -71.0942 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
