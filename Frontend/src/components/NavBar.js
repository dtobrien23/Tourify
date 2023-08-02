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
  Text,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import SignUpForm from './SignUpForm';
import SearchBar from './SearchBar';
import { MapContext } from './MapContext';
import ParallaxDrawer from './ParallaxDrawer';

const NavBar = React.forwardRef((props, ref) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve the logged-in status from the cache
    const cachedStatus = localStorage.getItem('loggedInfo');
    return cachedStatus === 'true'; // Convert to boolean
  });

  const toastNoSourceLocation = useToast();

  const {
    setActiveDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    isMobile,
    hasTouchScreen,
    sourceCoords,
    geolocation,
  } = useContext(MapContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Refresh the page when clicking the logo
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      h="75px"
      maxWidth="100%"
      // mt="10px"
      px="4px"
      pr="10px"
      style={{ borderBottom: 'solid 1px orangered' }}
    >
      {!hasTouchScreen && (
        <Box flexShrink={0}>
          <img
            ml={0}
            style={{ cursor: 'pointer', overflow: 'visible' }} // cursor change on hover
            onClick={handleLogoClick}
            src="logo.svg"
            alt="Tourify Logo"
          />
        </Box>
      )}
      <Flex flex="1" flexShrink={hasTouchScreen ? 0 : 1} alignItems="center">
        {!hasTouchScreen && <SearchBar />}
        <Button
          ref={ref} // Use the forwarded ref here
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            if (geolocation) {
              setActiveDrawer('recommender');
              {
                !isDrawerOpen && setIsDrawerOpen(true);
              }
            } else {
              toastNoSourceLocation({
                title: 'Recommender Unavailable!',
                description:
                  'Please allow your current location or select a location from the dropdown',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <img
            src="/images/navbar-icons/recommender-icon.svg"
            alt="Recommender"
            style={{ paddingTop: '8px', width: '40px', height: '40px' }}
          />
          <Text fontWeight="normal" fontSize="11px" pb="6px" m="0">
            Recommender
          </Text>
        </Button>
        <Button
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            setActiveDrawer('attractions');
            {
              !isDrawerOpen && setIsDrawerOpen(true);
            }
          }}
        >
          <img
            src="/images/navbar-icons/attractions-icon.svg"
            alt="Attractions"
            style={{ paddingTop: '8px', width: '40px', height: '40px' }}
          />
          <Text fontWeight="normal" fontSize="11px" pb="6px" m="0">
            Attractions
          </Text>
        </Button>
        <Button
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            setActiveDrawer('badges');
            {
              !isDrawerOpen && setIsDrawerOpen(true);
            }
          }}
        >
          <img
            src="/images/navbar-icons/badges-icon.svg"
            alt="Badges"
            style={{ paddingTop: '8px', width: '40px', height: '40px' }}
          />
          <Text fontWeight="normal" fontSize="11px" pb="6px" m="0">
            Badges
          </Text>
        </Button>
        <ParallaxDrawer />
      </Flex>
      {!hasTouchScreen && (
        <Flex>
          <SignUpForm setIsLoggedIn={setIsLoggedIn} align="center" />
        </Flex>
      )}
    </Flex>
  );
});

export default NavBar;
