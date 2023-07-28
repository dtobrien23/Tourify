import React, { useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaGlobe, FaClock } from 'react-icons/fa';
import { APIContext } from './APIContext';
import { MapContext } from './MapContext';
import PredBarChart from './PredBarChart';

// passing it marker state and method to change state so the X button can close the drawer
// also passing in marker object to render info in drawer
function MarkerDrawer({ isOpenFunc, isCloseFunc, markerObject }) {
  const {
    apiAttractions,
    fetchBusynessPredictions,
    day1Params,
    day2Params,
    day3Params,
    day4Params,
    chartVisible,
    busynessPred,
    activeChart,
  } = useContext(APIContext);
  const { attractionsWithBusyness } = useContext(MapContext);

  if (!markerObject) {
    return null; // Return null when markerObject is null
  }

  const formatTime = timeString => {
    const [hours, minutes] = timeString.split(':');
    let period = ' a.m.';

    let formattedHours = parseInt(hours, 10);
    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours === 12) {
      period = ' p.m.';
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = ' p.m.';
    }

    const formattedMinutes = parseInt(minutes, 10).toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}${period}`;
  };

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <>
      <Drawer
        isOpen={isOpenFunc}
        placement="right"
        size="sm"
        onClose={isCloseFunc}
      >
        <DrawerOverlay style={{ zIndex: '19' }} />

        <DrawerContent
          alignItems="left"
          justifyItems="left"
          border="1px solid orangered"
          borderRadius="20px"
          borderTopRightRadius="0px"
          borderBottomRightRadius="0px"
          borderRight="0px"
          // marginTop="5px"
          marginLeft="10px"
          overflow="hidden"
          spacing={8}
          p="10px"
          style={{ zIndex: '20' }}
        >
          <DrawerCloseButton />

          <DrawerHeader fontWeight="bold">
            {markerObject.name.name}
          </DrawerHeader>

          <DrawerBody>
            <img
              src={`/images/${markerObject.name.name.replaceAll(' ', '_')}.jpg`}
              alt={markerObject.name.name}
            />
            <br></br>
            <Tabs>
              <TabList width="100%">
                <Tab width="50%" color="orangered">
                  Info
                </Tab>
                <Tab width="50%" color="orangered">
                  Busyness Prediction
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {attractionsWithBusyness.map(attraction => {
                    if (attraction.name === markerObject.name.name) {
                      return (
                        <div>
                          <Flex alignItems="center">
                            <FaMapMarkerAlt
                              size="20"
                              style={{ marginRight: '3px' }}
                            />
                            <p>
                              &nbsp;&nbsp;
                              {attraction.full_address.replace(
                                /, United States$/,
                                '' | /, USA$/,
                                '' | / United States$/,
                                '' | /United States$/,
                                ''
                              )}
                            </p>
                          </Flex>
                          <Alert
                            pl="0"
                            width="fit-content"
                            status="info"
                            colorScheme={'white'}
                            borderRadius={20}
                          >
                            <AlertIcon
                              boxSize={5}
                              color={
                                attraction.businessRate < 35
                                  ? 'lightgreen'
                                  : 35 < attraction.businessRate &&
                                    attraction.businessRate < 70
                                  ? 'gold'
                                  : 'red'
                              }
                            />

                            <AlertTitle>
                              {attraction.businessRate < 35
                                ? 'Quiet'
                                : 35 < attraction.businessRate &&
                                  attraction.businessRate < 70
                                ? 'Not Too Busy'
                                : 'Busy'}
                            </AlertTitle>
                            <AlertDescription>
                              <p>Busyness Index: {attraction.businessRate}</p>
                            </AlertDescription>
                          </Alert>
                          <Flex>
                            <FaGlobe size="20" style={{ marginRight: '4px' }} />
                            <p>
                              &nbsp;&nbsp;
                              <a
                                href={attraction.link}
                                target="_blank"
                                style={{ color: 'blue' }}
                              >
                                {attraction.link}
                              </a>
                            </p>
                          </Flex>

                          <Flex mt="10px">
                            <FaClock size="21" style={{ marginRight: '3px' }} />
                            &nbsp;&nbsp;
                            <Flex flexDirection="column">
                              {/* <p fontWeight="bold">Opening Hours:</p> */}
                              <p>Monday</p>
                              <p>Tuesday</p>
                              <p>Wednesday</p>
                              <p>Thursday</p>
                              <p>Friday</p>
                              <p>Saturday</p>
                              <p>Sunday</p>
                              <br />
                              Price: $ {attraction.price}
                            </Flex>
                            <Flex flexDirection="column" ml="15px">
                              {days.map(day => (
                                <p key={day}>
                                  {formatTime(
                                    attraction.openHour[`${day}Open`]
                                  )}{' '}
                                  -{' '}
                                  {formatTime(
                                    attraction.openHour[`${day}Close`]
                                  )}
                                </p>
                              ))}
                            </Flex>
                          </Flex>
                        </div>
                      );
                    }
                    return null;
                  })}
                </TabPanel>
                <TabPanel>
                  {attractionsWithBusyness.map(attraction => {
                    if (attraction.name === markerObject.name.name) {
                      return (
                        <Flex flexDirection="column">
                          <Flex w="100%" justify="space-between" mb="10px">
                            <Button
                              bg="white"
                              border="solid 1px orangered"
                              borderRadius="25px"
                              onClick={() => {
                                fetchBusynessPredictions(
                                  attraction.id,
                                  day1Params
                                );
                              }}
                            >
                              Day 1
                            </Button>
                            <Button
                              bg="white"
                              border="solid 1px orangered"
                              borderRadius="25px"
                              onClick={() => {
                                fetchBusynessPredictions(
                                  attraction.id,
                                  day2Params
                                );
                              }}
                            >
                              Day 2
                            </Button>
                            <Button
                              bg="white"
                              border="solid 1px orangered"
                              borderRadius="25px"
                              onClick={() => {
                                fetchBusynessPredictions(
                                  attraction.id,
                                  day3Params
                                );
                              }}
                            >
                              Day 3
                            </Button>
                            <Button
                              bg="white"
                              border="solid 1px orangered"
                              borderRadius="25px"
                              onClick={() => {
                                fetchBusynessPredictions(
                                  attraction.id,
                                  day4Params
                                );
                              }}
                            >
                              Day 4
                            </Button>
                          </Flex>

                          {chartVisible && attraction.id === activeChart && (
                            <Flex marginLeft="-10px">
                              <PredBarChart />
                            </Flex>
                          )}
                        </Flex>
                      );
                    }
                    return null;
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MarkerDrawer;
