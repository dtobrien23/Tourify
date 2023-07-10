import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  TabList,
  Tab,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import SignUpForm from './SignUpForm';
import LocationInput from './LocationInput';
import SearchBar from './SearchBar';
import { MapContext } from './MapContext';

export default function NavBar({ isMobile, setIsMobile }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve the logged-in status from the cache
    const cachedStatus = localStorage.getItem('loggedInfo');
    return cachedStatus === 'true'; // Convert to boolean
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    handleRecommenderClick,
    setIsAttractionsDrawerOpen,
    setIsBadgesDrawerOpen,
  } = useContext(MapContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // isDisabled(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // isDisabled(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //refresh the page when clicking the logo
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      h="75px"
      mt="10px"
      px="4"
      style={{ borderBottom: 'solid 1px orangered' }}
    >
      <Box>
        <img
          style={{ cursor: 'pointer' }} // cursor change on hover
          onClick={handleLogoClick}
          src="logo.png"
          alt="Tourify Logo"
        />
      </Box>
      <Flex
        flex="1"
        justifyContent="center"
        display={{ base: 'none', md: 'flex' }}
      >
        <SearchBar />
        <Button isDisabled={!isLoggedIn} onClick={handleRecommenderClick}>
          Recommender
        </Button>
        <Button
          isDisabled={isLoggedIn}
          onClick={() => {
            setIsAttractionsDrawerOpen(true);
          }}
        >
          My Attractions
        </Button>
        <Button
          isDisabled={!isLoggedIn}
          onClick={() => {
            setIsBadgesDrawerOpen(true);
          }}
        >
          My Badges
        </Button>
        {/* <TabList>
          <Tab color="orangered">Map</Tab>
          <Tab isDisabled={!isLoggedIn} color="orangered">
            Attractions
          </Tab>
          <Tab isDisabled={!isLoggedIn} color="orangered">
            Badges
          </Tab>
        </TabList> */}
      </Flex>
      {isMobile && (
        <Box display={{ base: 'block', md: 'none' }} style={{ zIndex: '2' }}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={handleMenuToggle}
              l={1}
            />
            <MenuList>
              {/* <TabList flexDirection="column">
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                >
                  Map
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                  isDisabled={!isLoggedIn}
                >
                  Attractions
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                  isDisabled={!isLoggedIn}
                >
                  Badges
                </Tab>
              </TabList> */}
              <Flex>
                <SignUpForm setIsLoggedIn={setIsLoggedIn} />
              </Flex>
            </MenuList>
          </Menu>
        </Box>
      )}
      {!isMobile && (
        <Flex>
          <SignUpForm setIsLoggedIn={setIsLoggedIn} align="center" />
        </Flex>
      )}
    </Flex>
  );
}
