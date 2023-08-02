import React, { useEffect, useState, useContext } from 'react';
import { NFTStorage } from 'nft.storage';

import { useReward } from 'react-rewards';
import FlipCard from './FlipCard';
import axios from 'axios';
import {
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
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
import { generate, count } from 'random-words';

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

  const toastAttractionClosed = useToast();
  const toastCheckIn = useToast();
  const toastNotCheckIn = useToast();
  const toastNFT = useToast();
  const randomWord = generate();
  //const PROMPT_TEST = 'man with banana'+ randomWord;

  const [prompt, setPrompt] = useState(null);
  const [promptIsSet, setPromptIsSet] = useState(false);

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

  const handleCheckIn = async (
    attractionID,
    attractionName,
    isOpen,
    randomWord
  ) => {
    if (isOpen === false) {
      toastAttractionClosed({
        title: 'Attraction Closed!',
        description: 'Come back later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // const apiEndpoint = 'https://csi6220-2-vm1.ucd.ie/backend/api/user/update';
      const apiEndpoint = 'http://localhost:8001/api/user/update';
      const cachedUserCredential = localStorage.getItem('userCredential');

      const idToken = cachedUserCredential; // get this from credential in signupform
      console.log(cachedUserCredential, 'this is the global credential');

      const requestBody = {
        id_token: idToken,
        attraction_id: attractionID,
        lat: '40.7060855', //hardcoded for testing replace with geolocation variable
        lng: '-73.9968643', //hardcoded for testing reaplace with geolocation variable
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
            const PROMPT_TEST = `${attractionName} ${randomWord}`;
            setPrompt(PROMPT_TEST);
            console.log(PROMPT_TEST, 'PROMPT_TEST');
            //generatArt();
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
        })
        .catch(error => {
          console.error('Error in API call:', error);
          // Handle errors here
        });
    }
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

  ////////////////////////////////
  /////                      /////
  ////     NFT MINTING CODE  /////
  ////                       /////
  ////////////////////////////////

  const [imageBlob, setImageBlob] = useState(null);

  const [fileMade, setFile] = useState(null);

  // Update generateArt function to include uploadArtToIpfs logic
  const generateArt = async prompt => {
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE}`,
          },
          method: 'POST',
          inputs: prompt,
        },
        { responseType: 'blob' }
      );
      // convert blob to an image file type
      const generatedFile = new File([response.data], 'image.png', {
        type: 'image/png',
      });
      // saving the file in a state
      setFile(generatedFile);

      const url = URL.createObjectURL(response.data);
      console.log(url, 'this is the url');
      setImageBlob(url);

      // Upload the art to IPFS and get the imageURL
      const imageURL = await uploadArtToIpfs(prompt, generatedFile);

      // Call mintNft with the prompt and imageURL
      await mintNft(prompt, imageURL, nftWalletAddress);
    } catch (err) {
      console.log(err);
    }
  };

  // this cleans up the url after uploading the NFT art
  const cleanupIPFS = url => {
    if (url.includes('ipfs://')) {
      return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
  };

  // Update uploadArtToIpfs function to accept the file and set it
  const uploadArtToIpfs = async (PROMPT_TEST, generatedFile) => {
    try {
      const nftstorage = new NFTStorage({
        token: process.env.REACT_APP_NFT_STORAGE,
      });

      const store = await nftstorage.store({
        name: `Badge - ${PROMPT_TEST}`,
        description: `You got the ${PROMPT_TEST} Badge!`,
        image: generatedFile,
      });
      console.log(store, 'this is the store');
      return cleanupIPFS(store.data.image.href);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(localStorage.getItem('loggedInfo'), 'this is logged info');

  // nft wallet address from cached user info
  const [nftWalletAddress, setNFTWalletAddress] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem('loggedInfo') === 'true' &&
      globalUserInfo.data.nftLink
    ) {
      setNFTWalletAddress(globalUserInfo.data.nftLink);
    }
  }, [globalUserInfo]);

  // Update mintNft function to accept the prompt and imageURL as parameters
  const mintNft = async (promptFromFunc, imageURL, nftWalletAddress) => {
    try {
      console.log('URL for image ', imageURL);

      if (!imageURL) {
        console.log('Error uploading image to IPFS.');
        return;
      }

      // mint as an NFT on nftport
      const response = await axios.post(
        `https://api.nftport.xyz/v0/mints/easy/urls`,
        {
          file_url: imageURL,
          chain: 'polygon',
          name: prompt,
          description: `You got the ${promptFromFunc} Badge.`,
          mint_to_address: nftWalletAddress,
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_NFT_PORT,
          },
        }
      );

      const data = response.data;
      console.log(data, 'data from mintNFT function');

      // Check if the minting was successful (e.g., status 200 or 201)
      if (response.status === 200 || response.status === 201) {
        confettiReward();
        toastNFT({
          title: 'NFT MINTED!',
          description: `You've acquired the "${promptFromFunc} NFT!".`,
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
        setPrompt(null);
        setPromptIsSet(false);
        // console.log(prompt,'prompt after mint')
        // console.log(promptIsSet,'prompt bool after mint')
      } else {
        // Handle other possible response statuses or errors here
        console.log('Error minting NFT.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Use useEffect to set promptIsSet to true after prompt has been set
  useEffect(() => {
    if (prompt !== null && promptIsSet === false) {
      setPromptIsSet(true);
    }
  }, [prompt]);

  // Use useEffect to call generateArt() when promptIsSet is true
  useEffect(() => {
    if (
      promptIsSet &&
      prompt !== null &&
      nftWalletAddress !== null &&
      nftWalletAddress !== '' &&
      nftWalletAddress.startsWith('0x') &&
      nftWalletAddress.length === 42
    ) {
      generateArt(prompt);
    }

    if (
      promptIsSet &&
      prompt !== null &&
      (nftWalletAddress === '' || nftWalletAddress === null)
    ) {
      toastNotCheckIn({
        title: 'NFT Wallet Address Error.',
        description:
          'Please set your wallet address to mint and receive NFT Badges!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [promptIsSet, prompt, nftWalletAddress]);

  /////////////////////////////////
  /////       END OF         /////
  ////     NFT MINTING CODE  /////
  ////                       /////
  ////////////////////////////////

  return (
    <Drawer
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      isOpen={isDrawerOpen}
      placement={hasTouchScreen ? 'bottom' : 'left'}
      size={hasTouchScreen ? 'xs' : 'md'}
      style={{ zIndex: 0 }}
    >
      <DrawerOverlay
        style={{ zIndex: '19' }}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      />

      <DrawerContent
        pointerEvents="all"
        containerProps={{ pointerEvents: 'none', height: '100%' }}
        height={hasTouchScreen ? '60vh' : '100%'}
        style={{
          position: 'absolute',
          // top: '1',
          // height: 'calc(100% - 74px)',
          // border: 'solid 1px orangered',
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
              <span zIndex={9999999} id="confettiReward" />
            </DrawerHeader>
            <DrawerBody>
              <Tabs>
                <TabList width="100%">
                  <Tab width="50%" color="orangered">
                    Attractions to Visit
                  </Tab>
                  <Tab width="50%" color="orangered">
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
                                    <div style={{ width: '100%' }}>
                                      <Heading size="md">
                                        {attractionInfo.name}
                                      </Heading>
                                      {/* <p> {attractionInfo.full_address}</p> */}
                                      <Flex
                                        mt="10px"
                                        alignItems="center"
                                        justifyContent="space-between"
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
                                                attractionInfo.isOpen === false
                                                  ? 'grey'
                                                  : attractionInfo.businessRate <
                                                    35
                                                  ? 'green'
                                                  : 35 <=
                                                      attractionInfo.businessRate &&
                                                    attractionInfo.businessRate <
                                                      70
                                                  ? 'gold'
                                                  : 'red'
                                              }
                                            />
                                            <Flex flexDirection="column">
                                              <AlertTitle>
                                                {attractionInfo.isOpen === false
                                                  ? 'Closed'
                                                  : attractionInfo.businessRate <
                                                    35
                                                  ? 'Quiet'
                                                  : 35 <=
                                                      attractionInfo.businessRate &&
                                                    attractionInfo.businessRate <
                                                      70
                                                  ? 'Not Too Busy'
                                                  : 'Busy'}
                                              </AlertTitle>
                                              <AlertDescription>
                                                <p>
                                                  Busyness Index:&nbsp;
                                                  {attractionInfo.isOpen ===
                                                  false
                                                    ? '0'
                                                    : attractionInfo.businessRate}
                                                </p>
                                              </AlertDescription>
                                            </Flex>
                                          </Flex>
                                        </Alert>
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
                                              () =>
                                                handleCheckIn(
                                                  attractionInfo.id,
                                                  attractionInfo.name,
                                                  attractionInfo.isOpen,
                                                  randomWord
                                                )
                                              // mintNft()
                                            }
                                          >
                                            Check In!
                                          </Button>
                                        </Flex>
                                      </Flex>
                                    </div>
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
                                border="2px solid green"
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
                                    <div style={{ width: '100%' }}>
                                      <Heading size="md">
                                        {attractionInfo.name}
                                      </Heading>
                                      {/* <p> {attractionInfo.full_address}</p> */}
                                      <Flex
                                        mt="10px"
                                        alignItems="center"
                                        justifyContent="space-between"
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
                                                attractionInfo.isOpen === false
                                                  ? 'grey'
                                                  : attractionInfo.businessRate <
                                                    35
                                                  ? 'green'
                                                  : 35 <=
                                                      attractionInfo.businessRate &&
                                                    attractionInfo.businessRate <
                                                      70
                                                  ? 'gold'
                                                  : 'red'
                                              }
                                            />
                                            <Flex flexDirection="column">
                                              <AlertTitle>
                                                {attractionInfo.isOpen === false
                                                  ? 'Closed'
                                                  : attractionInfo.businessRate <
                                                    35
                                                  ? 'Quiet'
                                                  : 35 <=
                                                      attractionInfo.businessRate &&
                                                    attractionInfo.businessRate <
                                                      70
                                                  ? 'Not Too Busy'
                                                  : 'Busy'}
                                              </AlertTitle>
                                              <AlertDescription>
                                                <p>
                                                  Busyness Index:&nbsp;
                                                  {attractionInfo.isOpen ===
                                                  false
                                                    ? '0'
                                                    : attractionInfo.businessRate}
                                                </p>
                                              </AlertDescription>
                                            </Flex>
                                          </Flex>
                                        </Alert>
                                        <Flex justifyContent="flex-end">
                                          <Button
                                            style={{
                                              backgroundColor: '#17B169',
                                              color: 'white',
                                              border: 'solid 1px green',
                                              borderRadius: '20px',
                                              marginBottom: '12px',
                                            }}
                                          >
                                            Visited!
                                          </Button>
                                        </Flex>
                                      </Flex>
                                    </div>
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
              <Tabs colorScheme="orange">
                <TabList width="100%">
                  <Tab width="50%" color="orangered">
                    Badges to Collect
                  </Tab>
                  <Tab width="50%" color="orangered">
                    My Badges
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    {Object.entries(globalUserInfo.data.badgeDO).map(
                      ([badge, status]) => {
                        if (!status) {
                          return (
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
                                key={badge}
                                width="100%"
                                flexDirection="column"
                              >
                                <Flex flexDirection="row">
                                  <img
                                    src={`/images/badgeimages/${badge}.jpg`}
                                    alt={badge}
                                    style={{
                                      maxWidth: '100px',
                                      height: '100px',
                                      marginRight: '10px',
                                      border: '1px solid orangered',
                                      borderRadius: '20px',
                                    }}
                                  />
                                  <div style={{ width: '100%' }}>
                                    <Heading size="md">{badge}</Heading>
                                    <p> Badge info: Some badge info</p>
                                  </div>
                                </Flex>
                              </Flex>
                            </Flex>
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
                  </TabPanel>
                  <TabPanel>
                    {Object.entries(globalUserInfo.data.badgeDO).map(
                      ([badge, status]) => {
                        if (status) {
                          return (
                            <Flex
                              border="2px solid gold"
                              borderRadius="20px"
                              marginTop="5px"
                              overflow="hidden"
                              spacing="20px"
                              p="10px"
                              width="425px"
                              mb="15px"
                            >
                              <Flex
                                key={badge}
                                width="100%"
                                flexDirection="column"
                              >
                                <Flex flexDirection="row">
                                  <img
                                    src={`/images/badgeimages/${badge}.jpg`}
                                    alt={badge}
                                    style={{
                                      maxWidth: '100px',
                                      height: '100px',
                                      marginRight: '10px',
                                      border: '1px solid gold',
                                      borderRadius: '20px',
                                    }}
                                  />
                                  <div style={{ width: '100%' }}>
                                    <Heading size="md">{badge}</Heading>
                                    <p> Badge info: Some badge info</p>
                                  </div>
                                </Flex>
                              </Flex>
                            </Flex>
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
