import React, { useEffect, useState,useContext } from 'react';
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
import { GeolocationProvider, GeolocationContext } from './GeoContext';

export default function Recommender({ recommendOpenFunc, recommendCloseFunc }) {

const { geolocation } = useContext(GeolocationContext);
 console.log(geolocation,'this is the geo from context')
// change user location if needed 
//const userLocation = { lat: 40.7484405, lng: -73.9856644 };
const userLocation = geolocation ? { lat: geolocation.latitude, lng: geolocation.longitude } : null;
//console.log(userLocation,'this is from context')





  
const [nearestAttractions, setNearestAttractions] = useState([]);

  const fetchDistances = () => {
    const origin = new window.google.maps.LatLng(
      userLocation.lat,
      userLocation.lng,
      
    );
    const destinations = attractions.map(
      attraction =>
        new window.google.maps.LatLng(
          attraction.coordinates_lat,
          attraction.coordinates_lng
        )
    );
    console.log('Origin:', origin);
  console.log('Destinations:', destinations);

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      callback
    );
  };

  //Using google distance matrix API to calculate shortest distance from user to attractions
  // different method used if the request is serverside, here its clientside
  useEffect(() => {
    // only trigger API call when button is clicked 
    if (recommendOpenFunc) {
      // Load the Google Maps JavaScript API
      const loadGoogleMapsAPI = () => {
        const script = document.createElement('script');
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGZTEGKP8Eg-so6OKWdBMvMmDWyW7nkAk&libraries=places';
        script.onload = fetchDistances;
        document.head.appendChild(script);
      };

      if (!window.google || !window.google.maps) {
        // Google Maps API script not loaded, so load it
        loadGoogleMapsAPI();
      } else {
        // Google Maps API already loaded, so directly call fetchDistances
        fetchDistances();
      }
    }
  }, [recommendOpenFunc, geolocation]);

  const callback = (response, status) => {
    // if the respsonse from google is OK store the results 
    if (status === window.google.maps.DistanceMatrixStatus.OK) {
      const results = response.rows[0].elements;
      console.log(results,'these are the reuslt from google')
     
      // map over attractions array,create new array with distance results added in
      const attractionsWithDistances = attractions.map((attraction, index) => ({
        ...attraction,
        distance: results[index].distance.text,
      }));

      // Sort attractions by distance
      const sortedAttractions = attractionsWithDistances.sort((a, b) => {
        // extract the numerical values for comparison, replace non numerics with empty string
        const distanceA = parseInt(a.distance.replace(/[^0-9.-]+/g, ''));
        const distanceB = parseInt(b.distance.replace(/[^0-9.-]+/g, ''));
        return distanceA - distanceB;
      });

      setNearestAttractions(sortedAttractions);
    } else {
      console.error('Error fetching distances:', status);
    }
  };

  const topFiveNearestAttractions = nearestAttractions.slice(0, 5);
  console.log(topFiveNearestAttractions, 'TOP 5 NEAREST');


//   SORTED BY BUSYNESS
//   const recommendAttractions = attractions.filter(
//     attraction => attraction.busyness_score <= 50
//   );
//   const topFiveQuietAttractions = recommendAttractions.slice(0, 5);

  return (
    <Drawer
      isOpen={recommendOpenFunc}
      placement="right"
      onClose={recommendCloseFunc}
    >
      <DrawerOverlay />

      <DrawerContent
        bg="white"
        border="5px solid orangered"
        borderRadius="20px"
        p="20px"
        w="80%"
      >
        <DrawerCloseButton />

        <DrawerHeader>Nearest Attractions</DrawerHeader>

        <DrawerBody>
          
          {/* Display attractions based on distance */}
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
              </div>
            </Flex>
          ))}
          {/* Display Attractions based on busyness*/}
          {/* {topFiveQuietAttractions.map(attraction => (
            <Flex key={attraction.id} mb={4}>
              <img
                src={attraction.image}
                alt={attraction.name}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
              <div>
                <h3>{attraction.name}</h3>
                <p>Busyness Score: {attraction.busyness_score}</p>
              </div>
            </Flex>
          ))} */}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
