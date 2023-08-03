import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

const ParallaxDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <>
      {/* <Button variant="outline" colorScheme="orange" onClick={onOpen}>Guide</Button> */}
      <Button
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          onClick={onOpen}
        >
          <img
            src="/images/navbar-icons/guide.svg"
            alt="Badges"
            style={{ paddingTop: '8px', width: '40px', height: '40px' }}
          />
          <Text fontWeight="normal" fontSize="11px" pb="6px" m="0">
            Guide
          </Text>
        </Button>

      <Drawer isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Tutorial</DrawerHeader>
            <DrawerBody overflowY="auto">
              <Tabs index={activeTabIndex} onChange={handleTabClick} isLazy>
                <TabList flex="1" justifyContent="space-evenly" spacing={4} flexWrap="wrap">
                  <Tab
                    _selected={{
                      color: 'white',
                      bg: 'orangered',
                    }}
                  >
                    Attractions
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'white',
                      bg: 'orangered',
                    }}
                  >
                    Recommender
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'white',
                      bg: 'orangered',
                    }}
                  >
                    NFTs
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ul style={{ listStyleType: 'circle', paddingLeft: '20px', paddingTop: '50px' }}>
                      <li>
                        <strong>Step 1:</strong> Go to the top of the page and click on Attractions
                        <br />
                        <br />
                        <img src="\images\tutorial\1.1.png" alt="Attractions" />
                      </li>
                      <br />
                      <br />
                      <li>
                        <strong>Step 2:</strong> Here you have 2 tabs: Attractions to Visit and Visited Attractions
                        <br />
                        <br />
                        <img src="\images\tutorial\1.2.png" alt="Attractions" />
                      </li>
                      <br />
                      <li>
                        <strong>Step 3:</strong> Go to a location and press Check-in to receive your own custom  NFT badge (make sure you've enabled geolocation on your browser!)
                        <br />
                        <br />
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                  <ul style={{ listStyleType: 'circle', paddingLeft: '20px', paddingTop: '50px' }}>
                      <li>
                        <strong>Step 1:</strong> Go to the top of the page and click on Recommendations
                        <br />
                        <br />
                        <img src="\images\tutorial\1.1.png" alt="Attractions" />
                      </li>
                      <br />
                      <br />
                      <li>
                        <strong>Step 2:</strong> Here you have 3 tabs: Nearest Attractions, Quietest Attractions, and a mix of the two
                        <br />
                        <br />
                        <img src="\images\tutorial\2.1.png" alt="Recommender" />
                      </li>
                      <br/>
                      <li>
                        <strong>Step 3:</strong> These features can be used to find the attractions closest to you or if you want to find the least busiest attraction closest to you!
                        <br />
                        <br />
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                  <ul style={{ listStyleType: 'circle', paddingLeft: '20px', paddingTop: '50px' }}>
                      <li>
                        <strong>Step 1:</strong> Go to the top of the page and click on User Options/Add Wallet after logging in
                        <br />
                        <br />
                        <img src="\images\tutorial\3.1.jpg" alt="NFTs" />
                        <br />
                      </li>
                      <br />
                      <br />
                      <li>
                        <strong>Step 2:</strong> Add your wallet address here
                        <br />
                        <br />
                        <img src="\images\tutorial\3.2.jpg" alt="NFTs" />
                      </li>
                      <br />
                      <li>
                        <strong>Step 3:</strong> After successfully checking in to a location, connect your wallet to OpenSeas to get your own custom minted NFT!
                        <br />
                        <br />
                        <img src="\images\tutorial\3.4.jpg" alt="NFTs" />
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <ParallaxContent onClose={onClose} /> 
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ParallaxDrawer;
