import React, { useEffect, useState, useContext } from 'react';
import { NFTStorage } from 'nft.storage';

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
  AbsoluteCenter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
  const toastNFT = useToast();

  const getRandomAdjective = () => {
    const adjectives = [
      'Enchanting',
      'Majestic',
      'Vibrant',
      'Exotic',
      'Breathtaking',
      'Serene',
      'Captivating',
      'Whimsical',
      'Picturesque',
      'Alluring',
      'Mystical',
      'Spectacular',
      'Thrilling',
      'Dazzling',
      'Lush',
      'Tranquil',
      'Charming',
      'Blissful',
      'Awe-inspiring',
      'Spellbinding',
      'Fascinating',
      'Colorful',
      'Ethereal',
      'Glorious',
      'Unique',
      'Mesmerizing',
      'Enthralling',
      'Astonishing',
      'Dramatic',
      'Magical',
      'Opulent',
      'Radiant',
      'Wonderous',
      'Celestial',
      'Glistening',
      'Fantastic',
      'Intriguing',
      'Stunning',
      'Gorgeous',
      'Resplendent',
      'Brilliant',
      'Extraordinary',
      'Majestic',
      'Panoramic',
      'Enormous',
      'Unforgettable',
      'Dreamy',
      'Luminous',
      'Pristine',
      'Epic',
      'Transcendent',
      'Charming',
      'Ravishing',
      'Splendid',
      'Elegant',
      'Surreal',
      'Aromatic',
      'Astonishing',
      'Dazzling',
      'Dramatic',
      'Mystifying',
      'Pristine',
      'Sensational',
      'Tantalizing',
      'Unexplored',
      'Wonderful',
      'Zestful',
      'Zealous',
    ];

    const randomIndex = Math.floor(Math.random() * adjectives.length);
    return adjectives[randomIndex];
  };

  const randomWord = getRandomAdjective();
  //console.log(randomWord, 'randomword');

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
    useReward('confettiReward1', 'confetti', {
      lifetime: 2400,
      elementSize: 16,
      elementCount: 100,
    });

  const [placeHolderImageUrl, setPlaceHolderImaegUrl] = useState();

  const handleCheckIn = async (
    attractionID,
    attractionName,
    randomWord,
    attractionNameAlias
  ) => {
    const apiEndpoint = 'http://localhost:8001/api/user/update';
    const cachedUserCredential = localStorage.getItem('userCredential');

    const placeHolder = attractionNameAlias;
    setPlaceHolderImaegUrl(placeHolder);

    const idToken = cachedUserCredential; // get this from credential in signupform
    console.log(cachedUserCredential, 'this is the global credential');

    const requestBody = {
      id_token: idToken,
      attraction_id: attractionID,
      lat: '40.8115504', //hardcoded for testing replace with geolocation variable
      lng: '-73.9464769', //hardcoded for testing reaplace with geolocation variable
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
          setPlaceHolderImaegUrl(placeHolder);

          console.log(PROMPT_TEST, 'PROMPT_TEST');
          console.log(checkinState, 'checkinstate - contentdrawer');
          confettiReward();
          toastCheckIn({
            title: 'Check in Successful.',
            description: "You've Checked in Successfully.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          // Get the current timestamp and date
          const currentTimeStamp = new Date().getTime();
          const currentDate = new Date().toLocaleDateString();

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

  const generateArt = async (passedPrompt, safetyImage) => {
    if (passedPrompt !== null && safetyImage !== null) {
      try {
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE}`,
            },
            method: 'POST',
            inputs: passedPrompt,
          },
          { responseType: 'blob' }
        );

        // // Check if the response status is successful
        if (response.status === 200) {
          console.log('huggingface api responded')
          const generatedFile = new File([response.data], 'image.png', {
            type: 'image/png',
          });
          setFile(generatedFile);

          const url = URL.createObjectURL(response.data);
          setImageBlob(url);
        } else {
          // Use a placeholder image when the API call fails
          const safetyImageUrl = `/images/${safetyImage}.jpg`;

          // Fetch the placeholder image as a Blob
          const safetyImageBlob = await fetch(safetyImageUrl).then(res =>
            res.blob()
          );
          const generatedFile = new File([safetyImageBlob], 'image.jpg', {
            type: 'image/jpg',
          });
          setFile(generatedFile);

          // Use the object URL of the fetched Blob as the image blob
          const url = URL.createObjectURL(safetyImageBlob);
          setImageBlob(url);
          console.log('API call unsuccessful. Using placeholder image.');
        }
      } catch (err) {
        // Handle errors here and use the placeholder image
        const safetyImageUrl = `/images/${safetyImage}.jpg`;

        // Fetch the placeholder image as a Blob
        const safetyImageBlob = await fetch(safetyImageUrl).then(res =>
          res.blob()
        );
        const generatedFile = new File([safetyImageBlob], 'image.jpg', {
          type: 'image/jpg',
        });
        setFile(generatedFile);

        // Use the object URL of the fetched Blob as the image blob
        const url = URL.createObjectURL(safetyImageBlob);
        setImageBlob(url);
        console.log('API call unsuccessful. Using placeholder image.', err);
      }
    } else {
      console.log('THE PROMPT WAS NULL!!! WHY?? ');
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
      console.log(imageURL,'THIS IS THE IMAGE URL')
      console.log(prompt,'NFT PORT PROMPT')


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
    console.log('promptIsSet:', promptIsSet);
    console.log('Prompt:', prompt);
    if (
      promptIsSet &&
      prompt !== null &&
      nftWalletAddress !== null &&
      nftWalletAddress !== '' &&
      nftWalletAddress.startsWith('0x') &&
      nftWalletAddress.length === 42
    ) {
      generateArt(prompt, placeHolderImageUrl);
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

  // Use useEffect to upload image to IPFS when fileMade is updated
  useEffect(() => {
    if (fileMade) {
      // Call the function to upload the art to IPFS and get the imageURL
      const uploadToIPFS = async () => {
        const imageURL = await uploadArtToIpfs(prompt, fileMade);

        // Call mintNft with the prompt and imageURL
        await mintNft(prompt, imageURL, nftWalletAddress);
      };

      uploadToIPFS();
    }
  }, [fileMade]);

  /////////////////////////////////
  /////       END OF         /////
  ////     NFT MINTING CODE  /////
  ////                       /////
  ////////////////////////////////

  // Helper function to format badge names
  const formatBadgeName = name => {
    const words = name.split('_');
    const capitalizedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ');
  };

  ////////////////////////////////////
  //////    wiki on this day api /////
  /////                          /////
  ////////////////////////////////////

  const wikiApiCall = async () => {
    try {
      ///get the date from backend api call for user
      const month = 2;
      const day = 2;
      const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_WIKI}`,
        },
      });

      const data = await response.json();
      console.log(data,'WIKI DATA!!!!!!')

      // Extract the relevant information from the 0th index entry
      const entry = data.births[0];
      const text = entry.text;
      const extract = entry.pages[0].extract;

      // Create an object containing the desired information
      const wikiResult = {
        text: text,
        extract: extract,
      };

      
      console.log(data, 'THIS IS THE WIKI RESPONSE');
      console.log('entry:', entry);
      console.log('text:', text);
      console.log(' extract:', extract);
      setWikiData(wikiResult);
      return wikiResult;
    } catch (error) {
      throw new Error('Error fetching data from the API');
    }
  };
  const [wikiData, setWikiData] = useState({});

  const {
    isOpen: isWikiModalOpen,
    onOpen: onWikiModalOpen,
    onClose: onWikiModalClose,
  } = useDisclosure();

  useEffect(() => {
     
      const fetchData = async () => {
        try {
          const wikiApiResult = await wikiApiCall(); // Await the result
          setWikiData(wikiApiResult);
          onWikiModalOpen();

        } catch (error) {
          console.error(error);
        }
      
  
      fetchData();
    }
  }, [checkinState]);
  
  // useEffect(() => {
  //   if (Object.keys(wikiData).length > 0) {
  //     onWikiModalOpen();
  //   }
  // }, [wikiData]);
  
  

  const WikiModal = ({ isOpen, onClose, text, extract }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{extract}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
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
          height: 'calc(100% - 74px)',
          border: 'solid 1px orangered',
          borderLeft: '0px',
          borderRadius: '20px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          zIndex: '10',
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
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={9999999}
                id="confettiReward1"
              />
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
                                          backgroundColor: 'white',
                                          color: 'black',
                                          border: 'solid 2px gold',
                                          borderRadius: '20px',
                                          marginTop: '5px',
                                          padding: '10px 20px',
                                          boxShadow:
                                            '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={() =>
                                          handleCheckIn(
                                            attractionInfo.id,
                                            attractionInfo.name,
                                            randomWord,
                                            attractionInfo.name_alias
                                          )
                                          //  wikiApiCall()
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
                              const formattedBadgeName = formatBadgeName(badge);
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
                                      <Heading size="md">
                                        {formattedBadgeName}
                                      </Heading>
                                      <p>
                                        {' '}
                                        You got the {formattedBadgeName}! Great
                                        Job!
                                      </p>
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
                              const formattedBadgeName = formatBadgeName(badge);
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
                                      <Heading size="md">
                                        {formattedBadgeName}
                                      </Heading>
                                      <p>
                                        {' '}
                                        You still have to get the{' '}
                                        {formattedBadgeName}!
                                      </p>
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
              {Object.keys(wikiData).length > 0 && ( // Check if there is data in wikiData
                <WikiModal
                  isOpen={isWikiModalOpen}
                  onClose={onWikiModalClose}
                  text={wikiData.text}
                  extract={wikiData.extract}
                />
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
