import React, { useEffect, useState, useContext } from 'react';
// import { NFTStorage } from "nft.storage";

import { useReward } from 'react-rewards';
import FlipCard from './FlipCard';
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

  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward('confettiReward', 'confetti', {
      lifetime: 2400,
      elementSize: 16,
      elementCount: 100,
    });

  const handleCheckIn = async attractionID => {
    // const apiEndpoint = 'https://csi6220-2-vm1.ucd.ie/backend/api/user/update';
    const apiEndpoint = 'http://localhost:8001/api/user/update';
    const cachedUserCredential = localStorage.getItem('userCredential');

    const idToken = cachedUserCredential; // get this from credential in signupform
    console.log(cachedUserCredential, 'this is the global credential');

    const requestBody = {
      id_token: idToken,
      attraction_id: attractionID,
      lat: '40.7484405', //hardcoded for testing replace with geolocation variable
      lng: '-73.9856644', //hardcoded for testing reaplace with geolocation variable
    };

    axios
      .post(apiEndpoint, requestBody)
      .then(response => {
        console.log('API call successful:', response.data);
        console.log(response, 'this is response data');
        // Handle the response data here
        if (response.data.code === 200) {
          //   // set logic that your marker has been ticked off
          setCheckinState(true);
          console.log(checkinState, 'checkinstate - contentdrawer');
          confettiReward();
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

        // //nft minting if badge status has changed since last user info check
        // if (response.data.code == 200 && 'badge status has changed since last check'){
        //   setCheckinState(true);
        //   // mintNft();
        //   confettiReward()
        //   toastCheckIn({
        //     title: 'Check in Successful.',
        //     description: "You've Checked in Successfully.",
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        //   toastNFT({
        //     title: 'NFT Minted!',
        //     description: "You're Badge has been minted as an NFT and sent to your Metamask Wallet!",
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        // }
      })
      .catch(error => {
        console.error('Error in API call:', error);
        // Handle errors here
      });
  };

  const areAllBadgesTrue = () => {
    if (globalUserInfo && globalUserInfo.data && globalUserInfo.data.badgeDO) {
      const badgesStatusArray = Object.values(globalUserInfo.data.badgeDO);
      return badgesStatusArray.every(status => status === true);
    }
    return false;
  };

  const areAllBadgesFalse = () => {
    if (globalUserInfo && globalUserInfo.data && globalUserInfo.data.badgeDO) {
      const badgesStatusArray = Object.values(globalUserInfo.data.badgeDO);
      return badgesStatusArray.every(status => status === false);
    }
    return false;
  };

  const areAllAttractionsTrue = () => {
    if (
      globalUserInfo &&
      globalUserInfo.data &&
      globalUserInfo.data.attractionStatusDO
    ) {
      const attractionStatusArray = Object.values(
        globalUserInfo.data.attractionStatusDO
      );
      return attractionStatusArray.every(status => status === true);
    }
    return false;
  };

  const areAllAttractionsFalse = () => {
    if (
      globalUserInfo &&
      globalUserInfo.data &&
      globalUserInfo.data.attractionStatusDO
    ) {
      const attractionStatusArray = Object.values(
        globalUserInfo.data.attractionStatusDO
      );
      return attractionStatusArray.every(status => status === false);
    }
    return false;
  };

  /// moved this into the badgechecker code in the signup form for testing

  //   ////////////////////////////////
  //   /////                      /////
  //   ////     NFT MINTING CODE  /////
  //   ////                       /////
  //   ////////////////////////////////

  // // this cleans up the url after uploading the NFT art
  // const cleanupIPFS = (url) => {
  //   if(url.includes("ipfs://")) {
  //     return url.replace("ipfs://", "https://ipfs.io/ipfs/")
  //   }
  // }

  // // Fetch the image file data from the URL
  // const empireStateBadgeImagePath = '../../../public/images/badgeimages/empire_State_Badge.jpg';

  // // Function to fetch image as Blob
  // const fetchImageAsBlob = async (url) => {
  // const response = await fetch(url);
  // const blob = await response.blob();
  // return blob;
  // };

  // // this uploads the art to blockchain storage
  // const uploadArtToIpfs = async () => {
  // try {
  //   const nftstorage = new NFTStorage({
  //     token: process.env.REACT_APP_NFT_STORAGE,
  //   });

  //   const imageBlob = await fetchImageAsBlob(empireStateBadgeImagePath);

  //   const file = new File([imageBlob], "empire_State_Badge.jpg", {
  //     type: "image/jpg", // Change this to the correct file type if needed (e.g., "image/png" for PNG images)
  //   });

  //   const store = await nftstorage.store({
  //     name: "EMPIRE STATE BADGE2 TEST", // badge name from json url
  //     description: 'You visited the Empire State Building2', // generate description or use name again
  //     image: file
  //   });

  //   return cleanupIPFS(store.data.image.href);
  // } catch (err) {
  //   console.log(err);
  //   return null;
  // }
  // };

  // // THIS MINTS THE NFTS
  // const mintNft = async () => {
  // try {
  //   const imageURL = await uploadArtToIpfs();

  //   if (!imageURL) {
  //     console.log("Error uploading image to IPFS.");
  //     return;
  //   }

  //   // mint as an NFT on nftport
  //   const response = await axios.post(
  //     `https://api.nftport.xyz/v0/mints/easy/urls`,
  //     {
  //       file_url: imageURL,
  //       chain: "polygon",
  //       name: "Empire State Building Badge2",
  //       description: "You visited The Empire State Building Badge2",
  //       mint_to_address: "0xA649D68a977AB4d4Ab3ddd275aC3a84D03889Ee4",
  //     },
  //     {
  //       headers: {
  //         Authorization: process.env.REACT_APP_NFT_PORT,
  //       }
  //     }
  //   );
  //   const data = await response.data;
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }
  // };
  // /////////////////////////////////
  // /////       END OF         /////
  // ////     NFT MINTING CODE  /////
  // ////                       /////
  // ////////////////////////////////

  return (
    <Drawer
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      placement="left"
      size={hasTouchScreen ? 'md' : 'md'}
      style={{ zIndex: 0 }}
    >
      <DrawerContent
        pointerEvents="all"
        containerProps={{ pointerEvents: 'none', height: '100%' }}
        style={{
          position: 'absolute',
          top: '1',
          height: 'calc(100% - 74px)',
          border: 'solid 1px orangered',
          borderLeft: '0px',
          borderRadius: '20px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          zIndex: -1,
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
            <DrawerHeader>
              {`My Attractions`}
              <span id="confettiReward" />
            </DrawerHeader>
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
                                            attractionInfo.businessRate < 35
                                              ? 'green'
                                              : 35 <
                                                  attractionInfo.businessRate &&
                                                attractionInfo.businessRate < 70
                                              ? 'gold'
                                              : 'red'
                                          }
                                        />

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
                                      </Alert>
                                    </div>
                                  </Flex>
                                  <Flex mt={4}>
                                    <Stack
                                      spacing={10}
                                      justifyContent="center"
                                      alignItems="center"
                                      width="40%"
                                    >
                                      <Button
                                        style={{
                                          backgroundColor: 'white',
                                          color: 'black',
                                          border: 'solid 2px gold',
                                          borderRadius: '20px',
                                          marginTop: '5px',
                                          padding: '10px 20px',
                                          boxShadow:
                                            '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={
                                          () => handleCheckIn(attractionInfo.id)
                                          // mintNft()
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

                    {areAllAttractionsTrue() && (
                      <FlipCard
                        frontContent={
                          <p>
                            <img
                              src={'/images/all_Attractions_Visited.jpg'}
                              alt="All Attractions are True"
                              style={{
                                maxWidth: '500px',
                                height: '500px',
                                marginRight: '10px',
                                border: '2px solid orangered',
                                borderRadius: '5px',
                              }}
                            />
                          </p>
                        }
                        backContent={
                          <div>
                            <Heading>
                              You've Visited All the Attractions!
                            </Heading>
                          </div>
                        }
                      />
                    )}
                    {/* Conditional rendering for the image when all attractions are false */}
                    {areAllAttractionsFalse() && (
                      <p>
                        <img
                          src={'/images/no_Attractions_Visited.jpg'}
                          alt="All Attractions are False"
                          style={{ maxWidth: '500px', height: '500px' }}
                        />
                      </p>
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
                        {Object.entries(globalUserInfo.data.badgeDO).map(
                          ([badge, status]) => {
                            if (status) {
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
                                  <Flex key={badge} width="100%">
                                    {' '}
                                    <img
                                      src={`/images/badgeimages/${badge}.jpg`}
                                      alt={badge}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        border: '2px solid orangered',
                                        borderRadius: '5px',
                                      }}
                                    />
                                    <div>
                                      <Heading size="md">{badge}</Heading>
                                      <p> Badge info: Some badge info</p>
                                    </div>
                                  </Flex>
                                </SimpleGrid>
                              );
                            }
                            return null;
                          }
                        )}
                        {areAllBadgesFalse() && (
                          <p>
                            {''}
                            <br />
                            <Heading>You Dont Have Any Badges Yet!</Heading>
                            <br />
                            <img
                              src={'/images/badgeimages/no_badges.jpg'}
                              alt="All Badges are True"
                              style={{
                                maxWidth: '500px',
                                height: '500px',
                                marginRight: '10px',
                                border: '2px solid orangered',
                                borderRadius: '5px',
                              }}
                            />
                          </p>
                        )}
                      </div>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex>
                      <div>
                        {Object.entries(globalUserInfo.data.badgeDO).map(
                          ([badge, status]) => {
                            if (!status) {
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
                                  <Flex key={badge} width="100%">
                                    {' '}
                                    <img
                                      src={`/images/badgeimages/${badge}.jpg`}
                                      alt={badge}
                                      style={{
                                        maxWidth: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        border: '2px solid orangered',
                                        borderRadius: '5px',
                                      }}
                                    />
                                    <div>
                                      <Heading size="md">{badge}</Heading>
                                      <p> Badge info: Some badge info</p>
                                    </div>
                                  </Flex>
                                </SimpleGrid>
                              );
                            }
                            return null;
                          }
                        )}
                        {areAllBadgesTrue() && (
                          <FlipCard
                            frontContent={
                              <p>
                                <img
                                  src={'/images/badgeimages/all_Badges.jpg'}
                                  alt="All Attractions are True"
                                  style={{
                                    maxWidth: '500px',
                                    height: '500px',
                                    marginRight: '10px',
                                    border: '2px solid orangered',
                                    borderRadius: '5px',
                                  }}
                                />
                              </p>
                            }
                            backContent={
                              <div>
                                <Heading>You've Got All The Badges!</Heading>
                              </div>
                            }
                          />
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
