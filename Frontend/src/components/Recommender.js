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
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useForceUpdate,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { GeolocationContext } from './GeoContext';
import { MapContext } from './MapContext';
import { APIContext } from './APIContext';

export default function Recommender({ recommendOpenFunc, recommendCloseFunc }) {
  // const { geolocation } = useContext(GeolocationContext);
  const { apiAttractions } = useContext(APIContext);

  // console.log(geolocation, 'this is the geo from context');

  const { activeDrawer, isDrawerOpen, setIsDrawerOpen, geolocation } =
    useContext(MapContext);

  //geolocation, cant be null or error occurs
  // const userLocation = geolocation
  //   ? { lat: geolocation.latitude, lng: geolocation.longitude }
  //   : { lat: 40.7484405, lng: -73.9856974 }; // hardcoded user location as a fallback if user opts out

  // console.log(
  //   userLocation,
  //   'this is reformatted userlocation from geolocation'
  // );

  const [nearestAttractions, setNearestAttractions] = useState([]);
  const [quietestAttractions, setQuietestAttractions] = useState([]);
  const [combinedAttractions, setCombinedAttractions] = useState([]);

  const fetchDistances = () => {
    if (geolocation) {
      const origin = geolocation;
      const destinations = apiAttractions.map(
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
          travelMode: 'WALKING',
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        callback
      );
    }
  };

  useEffect(() => {
    if (geolocation && activeDrawer === 'recommender') {
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
  }, []);

  const callback = (response, status) => {
    if (status === window.google.maps.DistanceMatrixStatus.OK) {
      const results = response.rows[0].elements;

      const attractionsWithDistances = apiAttractions.map(
        (attraction, index) => {
          const distance = results[index].distance.text;
          const convertedDistance = convertToKilometers(distance);
          return {
            ...attraction,
            distance: convertedDistance,
          };
        }
      );

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

  useEffect(() => {
    const leastBusyAttractions = nearestAttractions.sort((a, b) => {
      const busynessA = parseFloat(a.busyness_score);
      const busynessB = parseFloat(b.busyness_score);
      return busynessA - busynessB;
    });

    setQuietestAttractions(leastBusyAttractions);
  }, []);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Nearest Attractions</Tab>
          <Tab>Quietest Attractions</Tab>
          <Tab>Nearest + Quietest</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {nearestAttractions.map(attraction => (
              <SimpleGrid
                alignItems="left"
                justifyItems="left"
                border="3px solid orangered"
                borderRadius="20px"
                marginTop="5px"
                marginLeft="10px"
                overflow="hidden"
                spacing={8}
                p="10px"
              >
                <Flex key={attraction.id} mb={4}>
                  <p>
                    {' '}
                    <img
                      src={`/images/${attraction.name_alias}.jpg`}
                      alt={attraction.name_alias}
                      style={{
                        width: '100px',
                        height: '100px',
                        marginRight: '10px',
                        border: '3px solid orangered',
                        borderRadius: '5px',
                      }}
                    />
                  </p>

                  <div>
                    <Heading size="md">{attraction.name}</Heading>{' '}
                    <p>Busyness Score: {attraction.busyness_score}</p>
                    <p>Distance: {attraction.distance}</p>
                  </div>
                </Flex>
              </SimpleGrid>
            ))}
          </TabPanel>
          <TabPanel>
            {quietestAttractions.map(attraction => (
              <Flex key={attraction.id} mb={4}>
                <p>
                  {' '}
                  <img
                    src={`/images/${attraction.name_alias}.jpg`}
                    alt={attraction.name_alias}
                    style={{
                      width: '100px',
                      height: '100px',
                      marginRight: '10px',
                      border: '3px solid orangered',
                      borderRadius: '5px',
                    }}
                  />
                </p>
                <div>
                  <Heading size="md">{attraction.name}</Heading>{' '}
                  <p>Busyness Score: {attraction.busyness_score}</p>
                  <p>Distance: {attraction.distance}</p>
                </div>
              </Flex>
            ))}
          </TabPanel>
          <TabPanel>
            <p>Nearest + Quietest Here!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
