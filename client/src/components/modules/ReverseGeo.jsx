import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from '@react-google-maps/api';


const ReverseGeo = ({ props, lat, lng }) => {
  const [locationName, setLocationName] = useState('');
  const [locId, setLocId] = useState('');

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

   
    geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              // Accessing the formatted address
              const formattedAddress = results[0].formatted_address;
  
              // Accessing the colloquial name if available
              const premiseName = results[0].address_components.find(
                component => component.types.includes('premise')
              );
              const premiseColloquialName = premiseName ? premiseName.long_name : '';
  
              // Accessing the point_of_interest name if available
              const poiName = results[0].address_components.find(
                component => component.types.includes('point_of_interest')
              );
              const poiColloquialName = poiName ? poiName.long_name : '';

              
  
              // Setting the location name
              setLocationName(props.loc_name || premiseColloquialName || poiColloquialName  || formattedAddress || "");
              console.log(poiColloquialName);

              const locid = results[0].place_id;
              setLocId(locid);
            } else {
              console.error('No results found');
            }
          } else {
            console.error(`Geocoder failed due to: ${status}`);
          }
        }
      );
    }, [lat, lng]);
  return (
    locationName
    //locid
  );
};

export default ReverseGeo;