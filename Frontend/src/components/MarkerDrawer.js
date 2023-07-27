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
import { FaMapMarkerAlt } from 'react-icons/fa';
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
                            <FaMapMarkerAlt />
                            {attraction.full_address.replace(
                              /, United States$/,
                              '' | /, USA$/,
                              '' | / United States$/,
                              '' | /United States$/,
                              ''
                            )}
                          </Flex>
                          <br></br>
                          <Alert
                            width="fit-content"
                            status="info"
                            colorScheme={
                              attraction.businessRate < 35
                                ? 'green'
                                : 35 < attraction.businessRate &&
                                  attraction.businessRate < 70
                                ? 'yellow'
                                : 'red'
                            }
                            borderRadius={20}
                            mt={5}
                          >
                            <AlertIcon />

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
                          <p>
                            Website:{' '}
                            <a
                              href={attraction.link}
                              target="_blank"
                              style={{ color: 'blue' }}
                            >
                              {attraction.link}
                            </a>
                          </p>
                          <br></br>
                          <p fontWeight="bold">Opening Hours:</p>
                          <p>
                            Monday: {attraction.openHour.mondayOpen} -{' '}
                            {attraction.openHour.mondayClose}
                          </p>
                          <p>
                            Tuesday: {attraction.openHour.tuesdayOpen} -{' '}
                            {attraction.openHour.tuesdayClose}
                          </p>
                          <p>
                            Wednsday: {attraction.openHour.wednesdayOpen} -{' '}
                            {attraction.openHour.wednesdayClose}
                          </p>
                          <p>
                            Thursday: {attraction.openHour.thursdayOpen} -{' '}
                            {attraction.openHour.thursdayClose}
                          </p>
                          <p>
                            Friday: {attraction.openHour.fridayOpen} -{' '}
                            {attraction.openHour.fridayClose}
                          </p>
                          <p>
                            Saturday: {attraction.openHour.saturdayOpen} -{' '}
                            {attraction.openHour.saturdayClose}
                          </p>
                          <p>
                            Sunday: {attraction.openHour.sundaydayOpen} -{' '}
                            {attraction.openHour.sundaydayClose}
                          </p>
                          <br />
                          Price: $ {attraction.price}
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
                          <Flex w="100%">
                            <Button
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
