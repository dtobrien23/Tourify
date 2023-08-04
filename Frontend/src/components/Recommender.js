import React, { useEffect, useState, useContext } from 'react';
import {
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Divider,
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
  const { apiAttractions, attractionsWithBusyness } = useContext(APIContext);
  const {
    activeDrawer,
    setIsDrawerOpen,
    geolocation,
    handleAttractionSelect,
    hasTouchScreen,
  } = useContext(MapContext);

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
            // businessRate: matchingAttraction.businessRate,
            // distance: matchingAttraction.distance,
            // name_alias: matchingAttraction.name_alias,
            // isOpen: matchingAttraction.isOpen,
            ...matchingAttraction,
            combinedIndex: newIndex,
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
      <Tabs variant="soft-rounded" justifyContent="space-evenly">
        <TabList width="100%">
          <Tab
            _selected={{ color: 'white', bg: 'orangered' }}
            m="0px 5px 0px 5px"
            width="33.3%"
          >
            Nearest
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'orangered' }}
            m="0px 5px 0px 5px"
            width="33.3%"
          >
            Quietest
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'orangered' }}
            m="0px 5px 0px 5px"
            width="33.3%"
          >
            Best
          </Tab>
        </TabList>
        <Divider
          orientation="horizontal"
          borderColor="orangered"
          paddingTop="10px"
        />
        <TabPanels>
          <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
            {hasTouchScreen && (
              <p>
                Tap on any of the below attractions to select it as your
                destination and add it to the routing!
                <br />
                <br />
              </p>
            )}
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
                    width={hasTouchScreen ? '100%' : '425px'}
                    mb="15px"
                    onClick={
                      hasTouchScreen
                        ? () => {
                            handleAttractionSelect(attraction);
                            setIsDrawerOpen(false);
                          }
                        : null
                    }
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
                            height: !hasTouchScreen ? '100px' : '80px',
                            marginRight: '10px',
                            // border: '2px solid orangered',
                            borderRadius: '20px',
                          }}
                        />
                        <div style={{ width: '100%' }}>
                          <Heading size={!hasTouchScreen ? 'md' : 'sm'}>
                            {attraction.name}
                          </Heading>{' '}
                          {/* <p> {attractionInfo.full_address}</p> */}
                          <Flex
                            mt="10px"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Flex
                              flexDirection={!hasTouchScreen ? 'column' : 'row'}
                            >
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
                                        {attraction.businessRate}
                                      </p>
                                    </AlertDescription>
                                  </Flex>
                                </Flex>
                              </Alert>
                              <Flex alignItems="center">
                                <Flex>
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
                            {!hasTouchScreen && (
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
                                  onClick={() => {
                                    handleAttractionSelect(attraction);
                                    setIsDrawerOpen(false);
                                  }}
                                >
                                  Go Here!
                                </Button>
                              </Flex>
                            )}
                          </Flex>
                        </div>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </>
            ))}
          </TabPanel>
          <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
            {hasTouchScreen && (
              <p>
                Tap on any of the below attractions to select it as your
                destination and add it to the routing!
                <br />
                <br />
              </p>
            )}
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
                    width={hasTouchScreen ? '100%' : '425px'}
                    mb="15px"
                    onClick={
                      hasTouchScreen
                        ? () => {
                            handleAttractionSelect(attraction);
                            setIsDrawerOpen(false);
                          }
                        : null
                    }
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
                            height: !hasTouchScreen ? '100px' : '80px',
                            marginRight: '10px',
                            // border: '2px solid orangered',
                            borderRadius: '20px',
                          }}
                        />
                        <div style={{ width: '100%' }}>
                          <Heading size={!hasTouchScreen ? 'md' : 'sm'}>
                            {attraction.name}
                          </Heading>{' '}
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
                                        {attraction.businessRate}
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
                            {!hasTouchScreen && (
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
                            )}
                          </Flex>
                        </div>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </>
            ))}
          </TabPanel>
          <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
            {hasTouchScreen && (
              <p>
                Tap on any of the below attractions to select it as your
                destination and add it to the routing!
                <br />
                <br />
              </p>
            )}
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
                      width={hasTouchScreen ? '100%' : '425px'}
                      mb="15px"
                      onClick={
                        hasTouchScreen
                          ? () => {
                              handleAttractionSelect(attraction);
                              setIsDrawerOpen(false);
                            }
                          : null
                      }
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
                              height: !hasTouchScreen ? '100px' : '80px',
                              marginRight: '10px',
                              // border: '2px solid orangered',
                              borderRadius: '20px',
                            }}
                          />
                          <div style={{ width: '100%' }}>
                            <Heading size={!hasTouchScreen ? 'md' : 'sm'}>
                              {attraction.name}
                            </Heading>{' '}
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
                                          {attraction.businessRate}
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
                              {!hasTouchScreen && (
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
                              )}
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
