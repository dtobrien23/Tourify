import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import attractions from '../static/attractions.json';
import { libraries, mapOptions } from '../static/mapConfig.js';
import { Button, Flex, Divider } from '@chakra-ui/react';
import '../App.css';
import LocationButton from './LocationButton';

export default function Map() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');

  const google = window.google;
  const mapCenter = { lat: 40.755091, lng: -73.978285 };
  const mapZoom = 13;

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
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log('Success!');
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (map) {
      attractions.forEach(attraction => {
        const marker = new google.maps.Marker({
          position: {
            lat: attraction.coordinates_lat,
            lng: attraction.coordinates_lng,
          },
          map: map,
          title: attraction.name,
          attractionType: attraction.type,
        });
      });
    }
  }, [map]);

  const handleChange = newAddress => {
    setAddress(newAddress);
  };

  const handleSelect = async newAddress => {
    try {
      const results = await geocodeByAddress(newAddress);
      const latLng = await getLatLng(results[0]);

      map.panTo(latLng);
      map.setZoom(15);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={mapZoom}
      center={mapCenter}
      options={mapOptions}
      mapContainerClassName="map"
      onLoad={map => {
        setMap(map);
      }}
    >
      <Flex
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          border: 'solid 2px orangered',
          borderRadius: '20px',
          backgroundColor: 'white',
          zIndex: 1,
          height: '38px',
        }}
      >
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div
              style={{
                borderRadius: '20px',
                padding: '5px',
                paddingLeft: '10px',
                flex: 1,
              }}
            >
              <input {...getInputProps({ placeholder: 'Explore Manhattan' })} />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? '#eaeaea' : '#fff',
                    cursor: 'pointer',
                    padding: '5px 10px',
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Divider orientation="vertical" />
        <input
          style={{
            paddingLeft: '10px',
          }}
          placeholder={'Current Map View'}
        />
        <LocationButton getPosition={getPosition} />
      </Flex>
    </GoogleMap>
  );
}
