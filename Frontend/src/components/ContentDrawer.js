import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { getGlobalCredential } from './auth'; //REMOVE

import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  SimpleGrid,
  Heading,
  Stack,useToast
} from '@chakra-ui/react';
import { MapContext } from './MapContext';
import Recommender from './Recommender';
import { APIContext } from './APIContext';
import { getUserGeolocation } from './GeoContext';

export default function ContentDrawer() {
  const { globalUserInfo, apiAttractions } = useContext(APIContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const {
    isAttractionsDrawerOpen,
    setIsAttractionsDrawerOpen,
    activeDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    hasTouchScreen,
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
    const attraction = apiAttractions.find(
      attraction => attraction.name_alias === formattedAttractionName
    );
    return attraction || {};
  };

  const handleCheckIn = async (attractionID) => {

    const { latitude, longitude } = await getUserGeolocation();
    setLatitude(latitude);
    setLongitude(longitude);
    
    // Make your API call here using latitude and longitude
    // console.log('Latitude:', latitude);
    // console.log('Longitude:', longitude);
    // Your API call goes here...

    const apiEndpoint = 'http://localhost:8001/api/user/update';

    const idToken = getGlobalCredential(); // get this from credential in signupform
    
    const requestBody = {
      id_token: idToken,
      attraction_id: attractionID,
      lat: latitude,
      lng: longitude,
    };

    axios
      .post(apiEndpoint, requestBody)
      .then(response => {
        console.log('API call successful:', response.data);
        console.log(response,'this is response data')
        // Handle the response data here
        if (response.data.code === 0) {
        //   // set logic that your market has been ticked off

        toastCheckIn({
          title: 'Check in Successful.',
          description: "You've Checked in Successfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        //   // set logic that distance too long
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
      })
    }
    
  return (
    <Drawer
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      placement="left"
      size={hasTouchScreen ? 'md' : 'sm'}
    >
      <DrawerContent
        pointerEvents="all"
        containerProps={{ pointerEvents: 'none', height: '100%' }}
        style={{ position: 'absolute', top: '1', height: 'calc(100% - 75px)' }}
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
              <Tabs>
                <TabList>
                  <Tab>My Visited Attractions</Tab>
                  <Tab>Attractions to Visit</Tab>
                </TabList>

                <TabPanels>
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
                                width="425px"
                              >
                                <Flex key={attraction} mb={4} width="100%">
                                  <p>
                                    {' '}
                                    <img
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        border: '2px solid orangered',
                                        borderRadius: '5px',
                                      }}
                                    />
                                  </p>
                                  <div>
                                    <Heading size="md">
                                      {attractionInfo.name}
                                    </Heading>
                                    <p>
                                      Address: {attractionInfo.full_address}
                                    </p>
                                  </div>
                                </Flex>
                              </SimpleGrid>
                            );
                          }
                        }
                        return null;
                      })
                    ) : (
                      <p>Loading attractions to visit...</p>
                    )}
                  </TabPanel>

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
                                width="425px"
                              >
                                <Flex key={attraction} mb={4} width="100%">
                                  <p>
                                    {' '}
                                    <img
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        border: '2px solid orangered',
                                        borderRadius: '5px',
                                      }}
                                    />
                                  <Stack spacing={10}>
                                <Button
                                  colorScheme="blue"
                                  style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    borderRadius: '8px',
                                    marginTop: '5px',
                                    padding: '10px 20px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                  }}
                                  onClick={() => handleCheckIn(attractionInfo.id)} 
                                >
                                  Check In!
                                </Button>                                  
                                </Stack>
                                  </p>
                                  <div>
                                    <Heading size="md">
                                      {attractionInfo.name}
                                    </Heading>
                                    <p>
                                      {' '}
                                      Address: {attractionInfo.full_address}
                                    </p>
                                  </div>
                                </Flex>
                              </SimpleGrid>
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