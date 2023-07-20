import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  SimpleGrid,
  Heading,
  Stack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { MapContext } from './MapContext';
import Recommender from './Recommender';
import { APIContext } from './APIContext';

export default function ContentDrawer() {
  const { globalUserInfo, setCheckinState, checkinState } =
    useContext(APIContext);

  const {
    activeDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    hasTouchScreen,
    attractionsWithBusyness,
  } = useContext(MapContext);

  const toastCheckIn = useToast();
  const toastNotCheckIn = useToast();

  const kebabToCamelCase = str => {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getAttractionInfo = attractionName => {
    const formattedAttractionName = capitalizeFirstLetter(
      kebabToCamelCase(attractionName)
    );
    const attraction = attractionsWithBusyness.find(
      attraction => attraction.name_alias === formattedAttractionName
    );
    return attraction || {};
  };

  const handleCheckIn = async attractionID => {
    const apiEndpoint = 'http://localhost:8001/api/user/update';
    const cachedUserCredential = localStorage.getItem('userCredential');

    const idToken = cachedUserCredential; // get this from credential in signupform
    console.log(cachedUserCredential, 'this is the global credential');

    const requestBody = {
      id_token: idToken,
      attraction_id: attractionID,
      lat: '40.742045', //hardcoded for testing
      lng: '-73.9900845', //hardcoded for testing
    };

    axios
      .post(apiEndpoint, requestBody)
      .then(response => {
        console.log('API call successful:', response.data);
        console.log(response, 'this is response data');
        // Handle the response data here
        if (response.data.code === 200) {
          //   // set logic that your market has been ticked off
          setCheckinState(true);
          console.log(checkinState, 'checkinstate - contentdrawer');
          toastCheckIn({
            title: 'Check in Successful.',
            description: "You've Checked in Successfully.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          // get the updated user info from the backend
        }
        if (response.data.code === 10050) {
          // distance too long
          setCheckinState(false);
          console.log(response.data.code, 'this is the repsonse code!');
          toastNotCheckIn({
            title: 'Check in Unsuccessful.',
            description: "You're too far away.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        console.error('Error in API call:', error);
        // Handle errors here
      });
  };

  return (
    <Drawer
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      placement="left"
      size={hasTouchScreen ? 'md' : 'md'}
    >
      <DrawerContent
        pointerEvents="all"
        containerProps={{ pointerEvents: 'none', height: '100%' }}
        style={{
          position: 'absolute',
          top: '1',
          height: 'calc(100% - 75px)',
        }}
      >
        <DrawerCloseButton />
        {activeDrawer === 'recommender' && (
          <>
            {' '}
            <DrawerHeader>{`Recommender`}</DrawerHeader>
            <DrawerBody>
              <Recommender />
            </DrawerBody>
          </>
        )}
        {activeDrawer === 'attractions' && (
          <>
            {' '}
            <DrawerHeader>{`My Attractions`}</DrawerHeader>
            <DrawerBody>
              <Tabs variant="soft-rounded" colorScheme="orange">
                <TabList>
                  <Tab
                    _selected={{
                      color: 'white',
                      bg: 'orangered',
                      // border: 'solid 1px orangered',
                    }}
                  >
                    Attractions to Visit
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'white',
                      bg: 'orangered',
                      // border: 'solid 1px orangered',
                    }}
                  >
                    Visited Attractions
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* ATTRACTIONS TO VISIT */}
                  <TabPanel>
                    {globalUserInfo &&
                    globalUserInfo.data &&
                    globalUserInfo.data.attractionStatusDO ? (
                      Object.entries(
                        globalUserInfo.data.attractionStatusDO
                      ).map(([attraction, status]) => {
                        if (!status) {
                          const attractionInfo = getAttractionInfo(attraction);
                          if (attractionInfo) {
                            return (
                              <Flex
                                // alignItems="left"
                                // justifyItems="left"
                                border="2px solid orangered"
                                borderRadius="20px"
                                marginTop="5px"
                                marginLeft="10px"
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
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        // border: '2px solid orangered',
                                        borderRadius: '20px',
                                      }}
                                    />
                                    <div>
                                      <Heading size="md">
                                        {attractionInfo.name}
                                      </Heading>
                                      <p> {attractionInfo.full_address}</p>
                                      <br />
                                    </div>
                                  </Flex>
                                  <Flex mt={4}>
                                    <Alert
                                      status="info"
                                      colorScheme={
                                        attractionInfo.businessRate < 35
                                          ? 'green'
                                          : 35 < attractionInfo.businessRate &&
                                            attractionInfo.businessRate < 70
                                          ? 'yellow'
                                          : 'red'
                                      }
                                      borderRadius={20}
                                      width="60%"
                                      // boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
                                    >
                                      <AlertIcon />
                                      <Box>
                                        <AlertTitle>
                                          {attractionInfo.businessRate < 35
                                            ? 'Quiet'
                                            : 35 <
                                                attractionInfo.businessRate &&
                                              attractionInfo.businessRate < 70
                                            ? 'Not Too Busy'
                                            : 'Busy'}
                                        </AlertTitle>
                                        <AlertDescription>
                                          <p>
                                            Busyness Index:{' '}
                                            {attractionInfo.businessRate}
                                          </p>
                                        </AlertDescription>
                                      </Box>
                                    </Alert>
                                    <Stack
                                      spacing={10}
                                      justifyContent="center"
                                      alignItems="center"
                                      width="40%"
                                    >
                                      <Button
                                        style={{
                                          backgroundColor: 'gold',
                                          color: 'white',
                                          border: 'solid 1px goldenrod',
                                          borderRadius: '20px',
                                          marginTop: '5px',
                                          padding: '10px 20px',
                                          // boxShadow:
                                          //   '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={() =>
                                          handleCheckIn(attractionInfo.id)
                                        }
                                      >
                                        Check In!
                                      </Button>
                                    </Stack>
                                  </Flex>
                                </Flex>
                              </Flex>
                            );
                          }
                        }
                        return null;
                      })
                    ) : (
                      <p>Loading attractions to visit...</p>
                    )}
                  </TabPanel>

                  {/* VISITED ATTRACTIONS */}
                  <TabPanel>
                    {globalUserInfo &&
                    globalUserInfo.data &&
                    globalUserInfo.data.attractionStatusDO ? (
                      Object.entries(
                        globalUserInfo.data.attractionStatusDO
                      ).map(([attraction, status]) => {
                        if (status) {
                          const attractionInfo = getAttractionInfo(attraction);
                          if (attractionInfo) {
                            return (
                              <Flex
                                // alignItems="left"
                                // justifyItems="left"
                                border="2px solid green"
                                borderRadius="20px"
                                marginTop="5px"
                                marginLeft="10px"
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
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        // border: '2px solid orangered',
                                        borderRadius: '20px',
                                      }}
                                    />
                                    <div>
                                      <Heading size="md">
                                        {attractionInfo.name}
                                      </Heading>
                                      <p> {attractionInfo.full_address}</p>
                                      <br />
                                    </div>
                                  </Flex>
                                  <Flex mt={4}>
                                    <Alert
                                      status="info"
                                      colorScheme={
                                        attractionInfo.businessRate < 35
                                          ? 'green'
                                          : 35 < attractionInfo.businessRate &&
                                            attractionInfo.businessRate < 70
                                          ? 'yellow'
                                          : 'red'
                                      }
                                      borderRadius={20}
                                      width="60%"
                                      // boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
                                    >
                                      <AlertIcon />
                                      <Box>
                                        <AlertTitle>
                                          {attractionInfo.businessRate < 35
                                            ? 'Quiet'
                                            : 35 <
                                                attractionInfo.businessRate &&
                                              attractionInfo.businessRate < 70
                                            ? 'Not Too Busy'
                                            : 'Busy'}
                                        </AlertTitle>
                                        <AlertDescription>
                                          <p>
                                            Busyness Index:{' '}
                                            {attractionInfo.businessRate}
                                          </p>
                                        </AlertDescription>
                                      </Box>
                                    </Alert>
                                    <Stack
                                      spacing={10}
                                      justifyContent="center"
                                      alignItems="center"
                                      width="40%"
                                    >
                                      <Button
                                        style={{
                                          backgroundColor: '#17B169',
                                          color: 'white',
                                          border: 'solid 1px green',
                                          borderRadius: '20px',
                                          marginTop: '5px',
                                          padding: '10px 20px',
                                          // boxShadow:
                                          //   '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        }}
                                      >
                                        Visited!
                                      </Button>
                                    </Stack>
                                  </Flex>
                                </Flex>
                              </Flex>
                            );
                          }
                        }
                        return null;
                      })
                    ) : (
                      <p>Loading attractions to visit...</p>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          </>
        )}
        {activeDrawer === 'badges' && (
          <>
            {' '}
            <DrawerHeader>{`My Badges`}</DrawerHeader>
            <DrawerBody>
              <Tabs>
                <TabList>
                  <Tab>My Badges</Tab>
                  <Tab>Badges to Collect</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex>
                      <div>
                        <h3>Badges</h3>
                        {Object.entries(globalUserInfo.data.badgeDO).map(
                          ([badge, status]) => {
                            if (status) {
                              return <p key={badge}>{badge}</p>;
                            }
                            return null;
                          }
                        )}
                      </div>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex>
                      <div>
                        <h3>Badges</h3>
                        {Object.entries(globalUserInfo.data.badgeDO).map(
                          ([badge, status]) => {
                            if (!status) {
                              return <p key={badge}>{badge}</p>;
                            }
                            return null;
                          }
                        )}
                      </div>
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
