import React, { useRef, useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import LocationButton from './LocationButton';
import { Flex } from '@chakra-ui/react';

export default function SourceInput({ map, setSourceCoords }) {
  const google = window.google;
  const autocompleteRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(1); // to update input box each time current location button is clicked
  const [inputValue, setInputValue] = useState('');
  const [locationMarker, setLocationMarker] = useState([]);

  useEffect(() => {
    if (autocompleteRef.current && currentLocation !== null) {
      setInputValue(currentLocation);
    }
  }, [currentLocation, buttonClicked]);

  const autocompleteOptions = {
    bounds: {
      // bounds for Manhattan
      south: 40.700421,
      west: -74.018534,
      north: 40.882214,
      east: -73.907005,
    },
    fields: ['geometry', 'formatted_address'],
    types: ['establishment'],
  };

  // getting user's current location
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert('Sorry, Geolocation is not supported by this browser.');
    }
  };

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
          alert(
            'Enable location permissions for this website in your browser settings.'
          );
        }
      });
    } else {
      alert(
        'Unable to access your location. You can continue by submitting location manually.'
      );
    }
  };

  const showPosition = position => {
    const latlng = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    const geocoder = new google.maps.Geocoder();

    geocoder
      .geocode({ location: latlng })
      .then(response => {
        if (response.results[0]) {
          if (locationMarker.length !== 0) {
            locationMarker[0].setMap(null);
          }
          const formattedAddress = response.results[0].formatted_address;
          setCurrentLocation(formattedAddress);
          setSourceCoords(latlng);
          map.panTo(latlng);
          map.setZoom(15);

          // eslint-disable-next-line
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: '/images/you-are-here.png',
          });
          setLocationMarker([marker]);
        } else {
          window.alert('No results found');
        }
      })
      .catch(e => window.alert('Geocoder failed due to: ' + e));
    setButtonClicked(buttonClicked + 1);
  };

  // when user selects their current location
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
      }

      if (locationMarker.length !== 0) {
        locationMarker[0].setMap(null);
      }

      setSourceCoords(latLng);
      map.panTo(latLng);
      map.setZoom(15);
      // eslint-disable-next-line
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: selectedPlace.formatted_address,
        icon: '/images/you-are-here.png',
      });
      setLocationMarker([marker]);
    }
  };

  return (
    <Flex w={'270px'}>
      <Autocomplete
        onLoad={autocomplete => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceSelect}
        options={autocompleteOptions}
      >
        <input
          type="text"
          placeholder="I am currently at..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{
            padding: '5px',
            paddingLeft: '15px',
            borderRadius: '20px',
            fontSize: '16px',
          }}
        />
      </Autocomplete>
      <LocationButton getPosition={getPosition}></LocationButton>
    </Flex>
  );
}
