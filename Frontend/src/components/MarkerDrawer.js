import React, { useContext, useEffect, useState } from 'react';
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
  useEditable,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaGlobe, FaClock, FaDollarSign } from 'react-icons/fa';
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
  const { attractionsWithBusyness, setIsDrawerOpen } = useContext(MapContext);
  const [openingHoursAdded, setOpeningHoursAdded] = useState(false);

  useEffect(() => {
    // for checking if an attraction is open
    const checkIsAttractionOpen = () => {
      if (attractionsWithBusyness !== null) {
        const currentTime = new Date();

        // to convert time to NYC time
        const options = {
          timeZone: 'America/New_York',
          hour12: false,
        };

        const currentTimeEDT = currentTime.toLocaleString('en-US', options);

        const currentDay = currentTime.getDay();

        const dayMapping = {
          0: 'sunday',
          1: 'monday',
          2: 'tuesday',
          3: 'wednesday',
          4: 'thursday',
          5: 'friday',
          6: 'saturday',
        };

        attractionsWithBusyness.forEach(attraction => {
          const openingHours = attraction['openHour'];
          const currentDayKey = dayMapping[currentDay].toLowerCase() + 'Open';
          const currentDayOpeningTime = openingHours[currentDayKey];
          const currentDayClosingTime =
            openingHours[currentDayKey.replace('Open', 'Close')];

          if (
            currentDayOpeningTime !== null &&
            currentDayClosingTime !== null
          ) {
            const currentHoursEDT = new Date(currentTimeEDT).getHours();
            const currentMinutesEDT = new Date(currentTimeEDT).getMinutes();
            const openingHour = parseInt(currentDayOpeningTime.split(':')[0]);
            const openingMinute = parseInt(currentDayOpeningTime.split(':')[1]);
            const closingHour = parseInt(currentDayClosingTime.split(':')[0]);
            const closingMinute = parseInt(currentDayClosingTime.split(':')[1]);

            if (
              (currentHoursEDT > openingHour ||
                (currentHoursEDT === openingHour &&
                  currentMinutesEDT >= openingMinute)) &&
              (currentHoursEDT < closingHour ||
                (currentHoursEDT === closingHour &&
                  currentMinutesEDT < closingMinute))
            ) {
              console.log(`${attraction.name} is open right now.`);
              attraction.isOpen = true;
            } else {
              console.log(
                `${attraction.name} is open today but not right now.`
              );
              attraction.isOpen = false;
            }
          } else {
            console.log(`${attraction.name} is closed today.`);
            attraction.isOpen = false;
          }
          setOpeningHoursAdded(true);
        });
      }
    };
    checkIsAttractionOpen();
  }, [attractionsWithBusyness]);

  if (!markerObject) {
    return null; // Return null when markerObject is null
  }

  // for displaying opening hours in marker info
  const formatTime = timeString => {
    if (timeString !== null) {
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

      const formattedMinutes = parseInt(minutes, 10)
        .toString()
        .padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}${period}`;
    }
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

  // for converting opening hours into ints
  const extractTime = timeString => {
    const [hours, minutes] = timeString.split(':');
    return {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
    };
  };

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
          // border="1px solid orangered"
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
          {openingHoursAdded && (
            <DrawerBody>
              <img
                src={`/images/${markerObject.name.name.replaceAll(
                  ' ',
                  '_'
                )}.jpg`}
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
                              <Flex h="100%">
                                <FaMapMarkerAlt
                                  size="20"
                                  style={{ marginRight: '3px' }}
                                />
                              </Flex>
                              <Flex maxW="100%">
                                &nbsp;&nbsp;
                                <p>
                                  {attraction.full_address.replace(
                                    /, United States$/,
                                    '' | /, USA$/,
                                    '' | / United States$/,
                                    '' | /United States$/,
                                    ''
                                  )}
                                </p>
                              </Flex>
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
                                    ? 'green'
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
                            <Flex alignItems="center">
                              <Flex h="100%">
                                <FaGlobe
                                  size="20"
                                  style={{ marginRight: '4px' }}
                                />
                              </Flex>
                              <Flex maxW="100%">
                                &nbsp;&nbsp;
                                <p>
                                  <a
                                    href={attraction.link}
                                    target="_blank"
                                    style={{ color: 'blue' }}
                                  >
                                    {attraction.link}
                                  </a>
                                </p>
                              </Flex>
                            </Flex>
                            <Flex mt="10px" alignItems="center">
                              <Flex h="100%">
                                <FaDollarSign
                                  size="21"
                                  style={{ marginRight: '3px' }}
                                />
                              </Flex>
                              <Flex>
                                <p>&nbsp;&nbsp;{attraction.price}</p>
                              </Flex>
                            </Flex>
                            <Flex mt="10px">
                              <FaClock
                                size="21"
                                style={{ marginRight: '3px', marginTop: '2px' }}
                              />
                              &nbsp;&nbsp;
                              <Flex flexDirection="column">
                                <p
                                  style={{
                                    fontWeight: 'bold',
                                    color:
                                      attraction.isOpen === true
                                        ? 'green'
                                        : 'red',
                                  }}
                                >
                                  {attraction.isOpen === true
                                    ? 'Open'
                                    : 'Closed'}
                                </p>
                                <p>Monday</p>
                                <p>Tuesday</p>
                                <p>Wednesday</p>
                                <p>Thursday</p>
                                <p>Friday</p>
                                <p>Saturday</p>
                                <p>Sunday</p>
                                <br />
                              </Flex>
                              <Flex flexDirection="column" ml="15px">
                                <br />
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
                            <Flex marginLeft="-10px">
                              {chartVisible && attraction.id === activeChart ? (
                                <PredBarChart />
                              ) : (
                                <img
                                  src="/images/crowd.jpeg"
                                  alt="Crowd of People"
                                />
                              )}
                            </Flex>
                          </Flex>
                        );
                      }
                      return null;
                    })}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          )}

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MarkerDrawer;
