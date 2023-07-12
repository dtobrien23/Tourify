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
                                alignItems="center"
                                justifyItems="center"
                                border="1px solid orangered"
                                borderRadius='20px'

                                spacing={8}
                              >
                                <div key={attraction}>
                                  <h3>{attractionInfo.name}</h3>
                                  {attractionInfo.openHour && (
                                    <div>
                                      <p>Opening Hours:</p>
                                      <p>
                                        Monday:{' '}
                                        {attractionInfo.openHour.mondayOpen} -{' '}
                                        {attractionInfo.openHour.mondayClose}
                                      </p>
                                      <p>
                                        Tuesday:{' '}
                                        {attractionInfo.openHour.tuesdayOpen} -{' '}
                                        {attractionInfo.openHour.tuesdayClose}
                                      </p>
                                      <p>
                                        Wednsday:{' '}
                                        {attractionInfo.openHour.wednesdayOpen}{' '}
                                        -{' '}
                                        {attractionInfo.openHour.wednesdayClose}
                                      </p>
                                      <p>
                                        Thursday:{' '}
                                        {attractionInfo.openHour.thursdayOpen} -{' '}
                                        {attractionInfo.openHour.thursdayClose}
                                      </p>
                                      <p>
                                        Friday:{' '}
                                        {attractionInfo.openHour.fridayOpen} -{' '}
                                        {attractionInfo.openHour.fridayClose}
                                      </p>
                                      <p>
                                        Saturday:{' '}
                                        {attractionInfo.openHour.saturdayOpen} -{' '}
                                        {attractionInfo.openHour.saturdayClose}
                                      </p>
                                      <p>
                                        Sunday:{' '}
                                        {attractionInfo.openHour.sundaydayOpen}{' '}
                                        -{' '}
                                        {attractionInfo.openHour.sundaydayClose}
                                      </p>
                                      <p>
                                        {' '}
                                        <img
                                          src={`/images/${attractionInfo.name_alias}.jpg`}
                                          alt={attractionInfo.name_alias}
                                        />
                                      </p>
                                    </div>
                                  )}
                                  <p>Price: {attractionInfo.price}</p>
                                </div>
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
                              alignItems="center"
                              justifyItems="center"
                              border="1px solid orangered"
                              borderRadius='20px'

                              spacing={8}
                            >
                              <div key={attraction}>
                                <h3>{attractionInfo.name}</h3>
                                {attractionInfo.openHour && (
                                  <div>
                                    <p>Opening Hours:</p>
                                    <p>
                                      Monday:{' '}
                                      {attractionInfo.openHour.mondayOpen} -{' '}
                                      {attractionInfo.openHour.mondayClose}
                                    </p>
                                    <p>
                                      Tuesday:{' '}
                                      {attractionInfo.openHour.tuesdayOpen} -{' '}
                                      {attractionInfo.openHour.tuesdayClose}
                                    </p>
                                    <p>
                                      Wednsday:{' '}
                                      {attractionInfo.openHour.wednesdayOpen} -{' '}
                                      {attractionInfo.openHour.wednesdayClose}
                                    </p>
                                    <p>
                                      Thursday:{' '}
                                      {attractionInfo.openHour.thursdayOpen} -{' '}
                                      {attractionInfo.openHour.thursdayClose}
                                    </p>
                                    <p>
                                      Friday:{' '}
                                      {attractionInfo.openHour.fridayOpen} -{' '}
                                      {attractionInfo.openHour.fridayClose}
                                    </p>
                                    <p>
                                      Saturday:{' '}
                                      {attractionInfo.openHour.saturdayOpen} -{' '}
                                      {attractionInfo.openHour.saturdayClose}
                                    </p>
                                    <p>
                                      Sunday:{' '}
                                      {attractionInfo.openHour.sundaydayOpen} -{' '}
                                      {attractionInfo.openHour.sundaydayClose}
                                    </p>
                                    <p>
                                      {' '}
                                      <img
                                        src={`/images/${attractionInfo.name_alias}.jpg`}
                                        alt={attractionInfo.name_alias}
                                      />
                                    </p>
                                  </div>
                                )}
                                <p>Price: {attractionInfo.price}</p>
                              </div>
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
