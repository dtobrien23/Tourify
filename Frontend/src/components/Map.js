import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import attractions from '../data/attractions.json';
import '../App.css';

const mapOptions = {
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#333333',
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
  ],
};

// const [polygons, setPolygons] = useState([]);
// const [map, setMap] = useState(null);

// useEffect(() => {
//   fetch('/manhattan_zones.geojson') // Assuming the GeoJSON file is in the public directory
//     .then(response => response.json())
//     .then(data => {
//       const newPolygons = data.features.map(zone => {
//         const coordinates = zone.geometry.coordinates[0][0];

//         // Convert coordinates to LatLng objects
//         const convertedCoordinates = coordinates.map(coord => ({
//           lat: coord[1],
//           lng: coord[0],
//         }));

//         console.log(convertedCoordinates);
//         return new window.google.maps.Polygon({
//           paths: convertedCoordinates,
//           fillColor: 'blue',
//           fillOpacity: 0.5,
//           strokeColor: 'red',
//           strokeOpacity: 1,
//           strokeWeight: 1,
//         });
//       });
//       setPolygons(newPolygons);
//     })
//     .catch(error => {
//       console.error('Error fetching GeoJSON:', error);
//     });
// }, []);

// if (map) {
//   polygons.forEach(polygon => {
//     polygon.setMap(map);
//   });
// }

export default function Map() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');

  const google = window.google;
  const libraries = ['places'];
  const mapCenter = { lat: 40.755091, lng: -73.978285 };
  const mapZoom = 13;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
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
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          // border: 'solid 1px orangered',
          zIndex: 1,
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
            <div>
              <input
                style={{
                  border: 'solid 1px orangered',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                }}
                {...getInputProps({ placeholder: 'Explore Manhattan' })}
              />
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
      </div>
    </GoogleMap>
  );
}
