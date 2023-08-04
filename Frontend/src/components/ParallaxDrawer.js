import React, { useState, useContext } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { MapContext } from './MapContext';

const ParallaxDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleTabClick = index => {
    setActiveTabIndex(index);
  };

  const { hasTouchScreen, setIsMobileDrawerOpen } = useContext(MapContext);

  return (
    <Tabs
      variant="soft-rounded"
      index={activeTabIndex}
      onChange={handleTabClick}
      isLazy
    >
      <TabList flex="1" width="100%" spacing={4} flexWrap="wrap">
        <Tab
          m={!hasTouchScreen && '0px 5px 0px 5px'}
          _selected={{
            color: 'white',
            bg: 'orangered',
          }}
          width="30%"
        >
          Attractions
        </Tab>
        <Tab
          m={!hasTouchScreen && '0px 5px 0px 5px'}
          _selected={{
            color: 'white',
            bg: 'orangered',
          }}
          width={!hasTouchScreen && '30%'}
        >
          Recommender
        </Tab>
        <Tab
          m={!hasTouchScreen && '0px 5px 0px 5px'}
          _selected={{
            color: 'white',
            bg: 'orangered',
          }}
          width={!hasTouchScreen && '30%'}
        >
          NFTs
        </Tab>
      </TabList>
      <Divider
        orientation="horizontal"
        borderColor="orangered"
        paddingTop="10px"
      />
      <TabPanels>
        <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
          <ul
            style={{
              listStyleType: 'circle',
              paddingLeft: '20px',
            }}
          >
            <Heading size="md">On The Map</Heading>
            <br />
            <li>
              <strong>1:</strong> Each map marker represents a different
              attraction. You can filter these markers by their current busyness
              using the busyness slider, or by their category by using the
              filter buttons.
              <br />
              <br />
              {hasTouchScreen ? (
                <img
                  src="\images\tutorial\filters-mobile.png"
                  alt="Attractions"
                />
              ) : (
                <img src="\images\tutorial\filters.png" alt="Attractions" />
              )}
            </li>
            <br />
            <Heading size="md">Attraction Information</Heading>
            <br />
            <li>
              <strong>1:</strong> Click on a marker to view detailed information
              about an attraction.
              <br />
              <br />
              <img
                src="\images\tutorial\attractions-info-desktop.png"
                alt="Attractions"
              />
            </li>
            <br />
            <br />
            <li>
              <strong>2:</strong> Here you have 2 tabs: Info, for attraction
              information, and Busyness Prediction, for viewing charts
              displaying the future busyness prediction for this attraction.
              <br />
              <br />
              <img
                src="\images\tutorial\prediction-desktop.png"
                alt="Attractions"
              />
            </li>
            <br />
            <li>
              <strong>3:</strong> Click on one of the buttons to get busyness
              predictions for the next 24 hours, 48 hours, etc, displayed in
              graphs of 24 hour periods.
              <br />
              <br />
            </li>
            <Heading size="md">Checking In</Heading>
            <br />
            <li>
              {hasTouchScreen ? (
                <p>
                  <strong>1:</strong> Tap the arrow on the bottom right of your
                  display, and tap on Attractions.
                </p>
              ) : (
                <p>
                  <strong>1:</strong> Go to the top of the page and click on
                  Attractions
                </p>
              )}
              <br />
              <br />
              {hasTouchScreen ? (
                <img src="\images\tutorial\mobile\1.1.png" alt="Attractions" />
              ) : (
                <img src="\images\tutorial\1.1.png" alt="Attractions" />
              )}
            </li>
            <br />
            <br />
            <li>
              <strong>2:</strong> Here you have 2 tabs: Attractions to Visit and
              Visited Attractions
              <br />
              <br />
              <img src="\images\tutorial\1.2.png" alt="Attractions" />
            </li>
            <br />
            <li>
              <strong>3:</strong> When you visit this attraction, press Check In
              to mark this location as visited and to receive your own custom
              NFT badge. Note! Make sure you've allowed your current location
              (location arrow image in the search bar will be highlighted
              orange), otherwise you will not be able to check into a location.
              <br />
              <br />
            </li>
          </ul>
        </TabPanel>
        <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
          <ul
            style={{
              listStyleType: 'circle',
              paddingLeft: '20px',
            }}
          >
            <li>
              {hasTouchScreen ? (
                <p>
                  <strong>1:</strong> Once you have input your location, tap on
                  the arrow in the bottom right of your display, and then tap on
                  Recommender.
                </p>
              ) : (
                <p>
                  <strong>1:</strong> Once you have input your location, go to
                  the top of the page and click on Recommender.
                </p>
              )}

              <br />
              {hasTouchScreen ? (
                <img src="\images\tutorial\mobile\1.1.png" alt="Attractions" />
              ) : (
                <img src="\images\tutorial\1.12.png" alt="Attractions" />
              )}
            </li>
            <br />
            <br />
            <li>
              <strong>2:</strong> Here you have 3 tabs: Nearest Attractions,
              Quietest Attractions, and Best (the attractions with the best
              average of their combined nearest and quietest positions)
              <br />
              <br />
              <img src="\images\tutorial\2.1.png" alt="Recommender" />
            </li>
            <br />
            <li>
              <strong>3:</strong> These features can be used to find the
              attractions closest to you or if you want to find the least
              busiest attraction closest to you!
              <br />
              <br />
            </li>
          </ul>
        </TabPanel>
        <TabPanel pl={hasTouchScreen && 0} pr={hasTouchScreen && 0}>
          <ul
            style={{
              listStyleType: 'circle',
              paddingLeft: '20px',
            }}
          >
            <li>
              {hasTouchScreen ? (
                <p>
                  <strong>1:</strong> After logging in, tap the hamburger menu
                  on the bottom left of your display. Then tap on Add NFT
                  Wallet, and submit your wallet address.
                </p>
              ) : (
                <p>
                  <strong>1:</strong> After logging in, go to the top of the
                  page and click on User Options/Add NFT Wallet, and submit your
                  wallet address.
                </p>
              )}
              <br />
              {hasTouchScreen ? (
                <img src="\images\tutorial\mobile\3.1.png" alt="NFTs" />
              ) : (
                <img src="\images\tutorial\3.1.png" alt="NFTs" />
              )}
              <br />
            </li>
            <br />
            <li>
              <strong>2:</strong> After successfully receiving a badge, and
              provided you have added your wallet address, your NFT will be
              minted!
              <br />
              <br />
              <img src="\images\tutorial\nft-in-progress.png" alt="NFTs" />
              <br />
              <img src="\images\tutorial\minted.png" alt="NFTs" />
            </li>
            <br />
            <li>
              <strong>3:</strong> Be sure to connect your wallet to OpenSeas so
              you can view your NFT.
              <br />
              <br />
              <img src="\images\tutorial\3.4.png" alt="NFTs" />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ParallaxDrawer;
