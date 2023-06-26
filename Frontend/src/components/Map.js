import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapOptions = {
  styles: [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
        {
          color: '#f49f53',
        },
      ],
    },
    {
      featureType: 'landscape',
      stylers: [
        {
          color: '#f9ddc5',
        },
        {
          lightness: -7,
        },
      ],
    },
    {
      featureType: 'road',
      stylers: [
        {
          color: '#813033',
        },
        {
          lightness: 43,
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          color: '#645c20',
        },
        {
          lightness: 38,
        },
      ],
    },
    {
      featureType: 'water',
      stylers: [
        {
          color: '#1994bf',
        },
        {
          saturation: -69,
        },
        {
          gamma: 0.99,
        },
        {
          lightness: 43,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#f19f53',
        },
        {
          weight: 1.3,
        },
        {
          visibility: 'on',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi.business',
    },
    {
      featureType: 'poi.park',
      stylers: [
        {
          color: '#645c20',
        },
        {
          lightness: 39,
        },
      ],
    },
    {
      featureType: 'poi.school',
      stylers: [
        {
          color: '#a95521',
        },
        {
          lightness: 35,
        },
      ],
    },
    {},
    {
      featureType: 'poi.medical',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#813033',
        },
        {
          lightness: 38,
        },
        {
          visibility: 'off',
        },
      ],
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
      elementType: 'labels',
    },
    {
      featureType: 'poi.sports_complex',
      stylers: [
        {
          color: '#9e5916',
        },
        {
          lightness: 32,
        },
      ],
    },
    {},
    {
      featureType: 'poi.government',
      stylers: [
        {
          color: '#9e5916',
        },
        {
          lightness: 46,
        },
      ],
    },
    {
      featureType: 'transit.station',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.line',
      stylers: [
        {
          color: '#813033',
        },
        {
          lightness: 22,
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          lightness: 38,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#f19f53',
        },
        {
          lightness: -10,
        },
      ],
    },
    {},
    {},
    {},
  ],
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const mapCenter = { lat: 40.755091, lng: -73.978285 };
  const mapZoom = 13;

  return (
    <GoogleMap
      zoom={mapZoom}
      center={mapCenter}
      options={mapOptions}
      mapContainerClassName="map"
    />
  );
}
