import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export default function LocationInput({ map }) {
  const autocompleteRef = useRef(null);
  const google = window.google;

  const autocompleteOptions = {
    bounds: {
      // Bounds for Manhattan
      south: 40.700421,
      west: -74.018534,
      north: 40.882214,
      east: -73.907005,
    },
    fields: ['geometry', 'formatted_address'],
    types: ['establishment'],
  };

  const handlePlaceSelect = () => {
    const selectedPlace = autocompleteRef.current.getPlace();
    let latLng;

    if (map) {
      if (
        selectedPlace &&
        selectedPlace.geometry &&
        selectedPlace.geometry.location
      ) {
        latLng = selectedPlace.geometry.location;
        // const latitude = lat();
        // const longitude = lng();
      }

      map.panTo(latLng);
      map.setZoom(15);
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: selectedPlace.formatted_address,
        icon: '/images/you-are-here.png',
      });
    }
  };

  return (
    <Autocomplete
      onLoad={autocomplete => {
        autocompleteRef.current = autocomplete;
      }}
      onPlaceChanged={handlePlaceSelect}
      options={autocompleteOptions}
    >
      <input
        type="text"
        placeholder="Explore Manhattan"
        style={{
          // boxSizing: 'border-box',
          // width: '100%',
          // height: '40px',
          // padding: '0 12px',
          // borderRadius: '4px',
          // border: '1px solid #ced4da',
          // fontSize: '14px',
          padding: '5px',
          paddingLeft: '15px',
          borderRadius: '20px',
        }}
      />
    </Autocomplete>
  );
}
