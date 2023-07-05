import React, { useEffect, useState, useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react';
import attractions from '../static/attractions.json';
import { GeolocationContext } from './GeoContext';

export default function Recommender({ recommendOpenFunc, recommendCloseFunc }) {
  const { geolocation } = useContext(GeolocationContext);
  console.log(geolocation, 'this is the geo from context');

  const userLocation = { lat: 40.7484405, lng: -73.9856974 }; // hardcoded user location
  
  //geolocation, cant be null or error occurs
 // const userLocation = geolocation ? {lat: geolocation.latitude, lng: geolocation.longitude} :null;
  
  console.log(userLocation,'this is reformatted userlocation from geolocation')

  const [nearestAttractions, setNearestAttractions] = useState([]);

  const fetchDistances = () => {
    
    const origin = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);
    const destinations = attractions.map(
      attraction => new window.google.maps.LatLng(attraction.coordinates_lat, attraction.coordinates_lng)
    );
    console.log('Origin:', origin);
    console.log('Destinations:', destinations);

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: 'WALKING',
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      callback
    );
  };

  useEffect(() => {
    if (recommendOpenFunc) {
      const loadGoogleMapsAPI = () => {
        const script = document.createElement('script');
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
        script.onload = fetchDistances;
        document.head.appendChild(script);
      };

      if (!window.google || !window.google.maps) {
        loadGoogleMapsAPI();
      } else {
        fetchDistances();
      }
    }
  }, [recommendOpenFunc]);

  const callback = (response, status) => {
    if (status === window.google.maps.DistanceMatrixStatus.OK) {
      const results = response.rows[0].elements;

      const attractionsWithDistances = attractions.map((attraction, index) => {
        const distance = results[index].distance.text;
        const convertedDistance = convertToKilometers(distance);
        return {
          ...attraction,
          distance: convertedDistance,
        };
      });

      const sortedAttractions = attractionsWithDistances.sort((a, b) => {
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);
        return distanceA - distanceB;
      });

      setNearestAttractions(sortedAttractions);
    } else {
      console.error('Error fetching distances:', status);
    }
  };

  const convertToKilometers = distance => {
    const isDistanceInKilometers = distance.includes('km');
    if (isDistanceInKilometers) {
      return distance;
    } else {
      const distanceInMeters = parseFloat(distance);
      const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
      return `${distanceInKilometers} km`;
    }
  };

  const topFiveNearestAttractions = nearestAttractions.slice(0, 5);
  console.log(topFiveNearestAttractions, 'TOP 5 NEAREST');

  return (
    <Drawer isOpen={recommendOpenFunc} placement="right" onClose={recommendCloseFunc}>
      <DrawerOverlay />
      <DrawerContent bg="white" border="5px solid orangered" borderRadius="20px" p="20px" w="80%">
        <DrawerCloseButton />
        <DrawerHeader>Nearest Attractions</DrawerHeader>
        <DrawerBody>
          {topFiveNearestAttractions.map(attraction => (
            <Flex key={attraction.id} mb={4}>
              <img
                src={attraction.image}
                alt={attraction.name}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
              <div>
                <h3>{attraction.name}</h3>
                <p>Busyness Score: {attraction.busyness_score}</p>
                <p>Distance: {attraction.distance}</p>
              </div>
            </Flex>
          ))}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
