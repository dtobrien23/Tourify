import React, { useEffect, useState, useContext } from 'react';
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
} from '@chakra-ui/react';
import { MapContext } from './MapContext';
import Recommender from './Recommender';
import { APIContext } from './APIContext';

export default function ContentDrawer() {
  const { globalUserInfo, apiAttractions } = useContext(APIContext);

  const {
    isAttractionsDrawerOpen,
    setIsAttractionsDrawerOpen,
    activeDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useContext(MapContext);

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

  return (
    <Drawer
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      placement="left"
      size="md"
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
                                border="1px solid orangered"
                                borderRadius="20px"
                                marginTop="5px"
                                marginLeft="10px"
                                overflow="hidden"
                                spacing={8}
                                p="10px"
                              >
                                <Flex key={attraction} mb={4}>
                                  <p>
                                    {' '}
                                    <img
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                        marginRight: '50px',
                                      }}
                                    />
                                  </p>
                                  <div>
                                    <Heading size="md">
                                      {attractionInfo.name}
                                    </Heading>
                                    <p marginLeft="10px">
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
                                border="1px solid orangered"
                                borderRadius="20px"
                                marginTop="5px"
                                marginLeft="10px"
                                overflow="hidden"
                                spacing={8}
                                p="10px"
                              >
                                <Flex key={attraction} mb={4}>
                                  <p>
                                    {' '}
                                    <img
                                      src={`/images/${attractionInfo.name_alias}.jpg`}
                                      alt={attractionInfo.name_alias}
                                      style={{
                                        width: '100px',
                                        height: '100px',
                                        marginRight: '50px',
                                      }}
                                    />
                                  </p>
                                  <div>
                                    <Heading size="md">
                                      {attractionInfo.name}
                                    </Heading>
                                    <p marginLeft="10px">
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
