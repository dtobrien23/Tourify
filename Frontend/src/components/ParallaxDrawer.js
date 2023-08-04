import React, { useState, useContext } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
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
            <li>
              <strong>Step 1:</strong> Go to the top of the page and click on
              Attractions
              <br />
              <br />
              <img src="\images\tutorial\1.1.png" alt="Attractions" />
            </li>
            <br />
            <br />
            <li>
              <strong>Step 2:</strong> Here you have 2 tabs: Attractions to
              Visit and Visited Attractions
              <br />
              <br />
              <img src="\images\tutorial\1.2.png" alt="Attractions" />
            </li>
            <br />
            <li>
              <strong>Step 3:</strong> Go to a location and press Check-in to
              receive your own custom NFT badge (make sure you've enabled
              geolocation on your browser!)
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
              <strong>Step 1:</strong> Go to the top of the page and click on
              Recommendations
              <br />
              <br />
              <img src="\images\tutorial\1.1.png" alt="Attractions" />
            </li>
            <br />
            <br />
            <li>
              <strong>Step 2:</strong> Here you have 3 tabs: Nearest
              Attractions, Quietest Attractions, and a mix of the two
              <br />
              <br />
              <img src="\images\tutorial\2.1.png" alt="Recommender" />
            </li>
            <br />
            <li>
              <strong>Step 3:</strong> These features can be used to find the
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
              <strong>Step 1:</strong> Go to the top of the page and click on
              User Options/Add Wallet after logging in
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
              <strong>Step 3:</strong> After successfully checking in to a
              location, connect your wallet to OpenSeas to get your own custom
              minted NFT!
              <br />
              <br />
              <img src="\images\tutorial\3.4.jpg" alt="NFTs" />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ParallaxDrawer;
