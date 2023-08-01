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
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { MapContext } from './MapContext';
import { APIContext } from './APIContext';
import { FaWalking } from 'react-icons/fa';

export default function Recommender({ recommendOpenFunc, recommendCloseFunc }) {
  const { apiAttractions } = useContext(APIContext);
  const {
    activeDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    sourceCoords,
    setSourceCoords,
    geolocation,
    attractionsWithBusyness,
    handleAttractionSelect,
  } = useContext(MapContext);

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
      const destinations = attractionsWithBusyness.map(
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

      const attractionsWithDistances = attractionsWithBusyness.map(
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
    const leastBusyAttractions = nearestAttractions.slice().sort((a, b) => {
      const busynessA = parseFloat(a.businessRate);
      const busynessB = parseFloat(b.businessRate);
      return busynessA - busynessB;
    });

    setQuietestAttractions(leastBusyAttractions);
  }, [nearestAttractions]);

  useEffect(() => {
    if (nearestAttractions && quietestAttractions) {
      const combinedAttractionsArray = [];

      nearestAttractions.forEach(attraction => {
        const nearestIndex = nearestAttractions.indexOf(attraction);
        const matchingAttraction = quietestAttractions.find(
          sameAttraction => sameAttraction.name === attraction.name
        );

        if (matchingAttraction) {
          const quietestIndex = quietestAttractions.indexOf(matchingAttraction);
          const newName = matchingAttraction.name;
          const newIndex = nearestIndex + quietestIndex;

          combinedAttractionsArray.push({
            // name: matchingAttraction.name,
            // id: matchingAttraction.id,
            // combinedIndex: newIndex,
            // businessRate: matchingAttraction.businessRate,
            // distance: matchingAttraction.distance,
            // name_alias: matchingAttraction.name_alias,
            // isOpen: matchingAttraction.isOpen,
            ...matchingAttraction,
          });
        }
      });

      // Sort the combined attractions array by combinedIndex
      combinedAttractionsArray.sort(
        (a, b) => a.combinedIndex - b.combinedIndex
      );

      setCombinedAttractions(combinedAttractionsArray);
    }
  }, [nearestAttractions, quietestAttractions]);

  useEffect(() => {
    if (combinedAttractions) {
      console.log(combinedAttractions, 'COMBINED ATTRACTIONS');
    }
  }, [combinedAttractions]);

  return (
    <>
      <Tabs>
        <TabList width="100%">
          <Tab width="33.3%" color="orangered">
            Nearest
          </Tab>
          <Tab width="33.3%" color="orangered">
            Quietest
          </Tab>
          <Tab width="33.3%" color="orangered">
            Best
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {nearestAttractions.map(attraction => (
              <>
                {attraction.isOpen === true && (
                  <Flex
                    border="2px solid orangered"
                    borderRadius="20px"
                    marginTop="5px"
                    overflow="hidden"
                    spacing="20px"
                    p="10px"
                    width="425px"
                    mb="15px"
                  >
                    <Flex
                      key={attraction}
                      // mb={4}
                      width="100%"
                      flexDirection="column"
                    >
                      <Flex flexDirection="row">
                        {' '}
                        <img
                          src={`/images/${attraction.name_alias}.jpg`}
                          alt={attraction.name_alias}
                          style={{
                            maxWidth: '100px',
                            height: '100px',
                            marginRight: '10px',
                            // border: '2px solid orangered',
                            borderRadius: '20px',
                          }}
                        />
                        <div style={{ width: '100%' }}>
                          <Heading size="md">{attraction.name}</Heading>{' '}
                          {/* <p> {attractionInfo.full_address}</p> */}
                          <Flex
                            mt="10px"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Flex flexDirection="column">
                              <Alert
                                pl="0"
                                width="fit-content"
                                status="info"
                                colorScheme={'white'}
                                borderRadius={20}
                                mt="-10px"
                              >
                                <Flex alignItems="center">
                                  <AlertIcon
                                    boxSize={5}
                                    mr="8px"
                                    color={
                                      attraction.isOpen === false
                                        ? 'grey'
                                        : attraction.businessRate < 35
                                        ? 'green'
                                        : 35 <= attraction.businessRate &&
                                          attraction.businessRate < 70
                                        ? 'gold'
                                        : 'red'
                                    }
                                  />
                                  <Flex flexDirection="column">
                                    <AlertTitle>
                                      {attraction.isOpen === false
                                        ? 'Closed'
                                        : attraction.businessRate < 35
                                        ? 'Quiet'
                                        : 35 <= attraction.businessRate &&
                                          attraction.businessRate < 70
                                        ? 'Not Too Busy'
                                        : 'Busy'}
                                    </AlertTitle>
                                    <AlertDescription>
                                      <p>
                                        Busyness Index:&nbsp;
                                        {attraction.isOpen === false
                                          ? '0'
                                          : attraction.businessRate}
                                      </p>
                                    </AlertDescription>
                                  </Flex>
                                </Flex>
                              </Alert>
                              <Flex alignItems="center">
                                <Flex h="100%">
                                  <FaWalking
                                    size="20"
                                    // style={{ marginRight: '3px' }}
                                  />
                                </Flex>
                                <Flex maxW="100%">
                                  &nbsp;&nbsp;
                                  <p>Distance: {attraction.distance}</p>
                                </Flex>
                              </Flex>
                            </Flex>
                            <Flex justifyContent="flex-end">
                              <Button
                                bg="orange"
                                _hover={{
                                  bg: 'orangered',
                                  color: 'white',
                                }}
                                style={{
                                  color: 'white',
                                  border: 'solid 1px orangered',
                                  borderRadius: '20px',
                                  marginBottom: '12px',
                                  justifySelf: 'flex-end',
                                }}
                                onClick={
                                  () => {
                                    handleAttractionSelect(attraction);
                                    setIsDrawerOpen(false);
                                  }
                                  // mintNft()
                                }
                              >
                                Go Here!
                              </Button>
                            </Flex>
                          </Flex>
                        </div>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </>
            ))}
          </TabPanel>
          <TabPanel>
            {quietestAttractions.map(attraction => (
              <>
                {attraction.isOpen === true && (
                  <Flex
                    border="2px solid orangered"
                    borderRadius="20px"
                    marginTop="5px"
                    overflow="hidden"
                    spacing="20px"
                    p="10px"
                    width="425px"
                    mb="15px"
                  >
                    <Flex
                      key={attraction}
                      // mb={4}
                      width="100%"
                      flexDirection="column"
                    >
                      <Flex flexDirection="row">
                        {' '}
                        <img
                          src={`/images/${attraction.name_alias}.jpg`}
                          alt={attraction.name_alias}
                          style={{
                            maxWidth: '100px',
                            height: '100px',
                            marginRight: '10px',
                            // border: '2px solid orangered',
                            borderRadius: '20px',
                          }}
                        />
                        <div style={{ width: '100%' }}>
                          <Heading size="md">{attraction.name}</Heading>{' '}
                          {/* <p> {attractionInfo.full_address}</p> */}
                          <Flex
                            mt="10px"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Flex flexDirection="column">
                              <Alert
                                pl="0"
                                width="fit-content"
                                status="info"
                                colorScheme={'white'}
                                borderRadius={20}
                                mt="-10px"
                              >
                                <Flex alignItems="center">
                                  <AlertIcon
                                    boxSize={5}
                                    mr="8px"
                                    color={
                                      attraction.isOpen === false
                                        ? 'grey'
                                        : attraction.businessRate < 35
                                        ? 'green'
                                        : 35 <= attraction.businessRate &&
                                          attraction.businessRate < 70
                                        ? 'gold'
                                        : 'red'
                                    }
                                  />
                                  <Flex flexDirection="column">
                                    <AlertTitle>
                                      {attraction.isOpen === false
                                        ? 'Closed'
                                        : attraction.businessRate < 35
                                        ? 'Quiet'
                                        : 35 <= attraction.businessRate &&
                                          attraction.businessRate < 70
                                        ? 'Not Too Busy'
                                        : 'Busy'}
                                    </AlertTitle>
                                    <AlertDescription>
                                      <p>
                                        Busyness Index:&nbsp;
                                        {attraction.isOpen === false
                                          ? '0'
                                          : attraction.businessRate}
                                      </p>
                                    </AlertDescription>
                                  </Flex>
                                </Flex>
                              </Alert>
                              <Flex alignItems="center">
                                <Flex h="100%">
                                  <FaWalking
                                    size="20"
                                    // style={{ marginRight: '3px' }}
                                  />
                                </Flex>
                                <Flex maxW="100%">
                                  &nbsp;&nbsp;
                                  <p>Distance: {attraction.distance}</p>
                                </Flex>
                              </Flex>
                            </Flex>
                            <Flex justifyContent="flex-end">
                              <Button
                                bg="orange"
                                _hover={{
                                  bg: 'orangered',
                                  color: 'white',
                                }}
                                style={{
                                  color: 'white',
                                  border: 'solid 1px orangered',
                                  borderRadius: '20px',
                                  marginBottom: '12px',
                                  justifySelf: 'flex-end',
                                }}
                                onClick={
                                  () => {
                                    handleAttractionSelect(attraction);
                                    setIsDrawerOpen(false);
                                  }
                                  // mintNft()
                                }
                              >
                                Go Here!
                              </Button>
                            </Flex>
                          </Flex>
                        </div>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </>
            ))}
          </TabPanel>
          <TabPanel>
            {combinedAttractions &&
              combinedAttractions.map(attraction => (
                <>
                  {attraction.isOpen === true && (
                    <Flex
                      border="2px solid orangered"
                      borderRadius="20px"
                      marginTop="5px"
                      overflow="hidden"
                      spacing="20px"
                      p="10px"
                      width="425px"
                      mb="15px"
                    >
                      <Flex
                        key={attraction}
                        // mb={4}
                        width="100%"
                        flexDirection="column"
                      >
                        <Flex flexDirection="row">
                          {' '}
                          <img
                            src={`/images/${attraction.name_alias}.jpg`}
                            alt={attraction.name_alias}
                            style={{
                              maxWidth: '100px',
                              height: '100px',
                              marginRight: '10px',
                              // border: '2px solid orangered',
                              borderRadius: '20px',
                            }}
                          />
                          <div style={{ width: '100%' }}>
                            <Heading size="md">{attraction.name}</Heading>{' '}
                            {/* <p> {attractionInfo.full_address}</p> */}
                            <Flex
                              mt="10px"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Flex flexDirection="column">
                                <Alert
                                  pl="0"
                                  width="fit-content"
                                  status="info"
                                  colorScheme={'white'}
                                  borderRadius={20}
                                  mt="-10px"
                                >
                                  <Flex alignItems="center">
                                    <AlertIcon
                                      boxSize={5}
                                      mr="8px"
                                      color={
                                        attraction.isOpen === false
                                          ? 'grey'
                                          : attraction.businessRate < 35
                                          ? 'green'
                                          : 35 <= attraction.businessRate &&
                                            attraction.businessRate < 70
                                          ? 'gold'
                                          : 'red'
                                      }
                                    />
                                    <Flex flexDirection="column">
                                      <AlertTitle>
                                        {attraction.isOpen === false
                                          ? 'Closed'
                                          : attraction.businessRate < 35
                                          ? 'Quiet'
                                          : 35 <= attraction.businessRate &&
                                            attraction.businessRate < 70
                                          ? 'Not Too Busy'
                                          : 'Busy'}
                                      </AlertTitle>
                                      <AlertDescription>
                                        <p>
                                          Busyness Index:&nbsp;
                                          {attraction.isOpen === false
                                            ? '0'
                                            : attraction.businessRate}
                                        </p>
                                      </AlertDescription>
                                    </Flex>
                                  </Flex>
                                </Alert>
                                <Flex alignItems="center">
                                  <Flex h="100%">
                                    <FaWalking
                                      size="20"
                                      // style={{ marginRight: '3px' }}
                                    />
                                  </Flex>
                                  <Flex maxW="100%">
                                    &nbsp;&nbsp;
                                    <p>Distance: {attraction.distance}</p>
                                  </Flex>
                                </Flex>
                              </Flex>
                              <Flex justifyContent="flex-end">
                                <Button
                                  bg="orange"
                                  _hover={{
                                    bg: 'orangered',
                                    color: 'white',
                                  }}
                                  style={{
                                    color: 'white',
                                    border: 'solid 1px orangered',
                                    borderRadius: '20px',
                                    marginBottom: '12px',
                                    justifySelf: 'flex-end',
                                  }}
                                  onClick={
                                    () => {
                                      handleAttractionSelect(attraction);
                                      setIsDrawerOpen(false);
                                    }
                                    // mintNft()
                                  }
                                >
                                  Go Here!
                                </Button>
                              </Flex>
                            </Flex>
                          </div>
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                </>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
