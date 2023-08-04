import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  useToast,
  useBreakpointValue
} from '@chakra-ui/react';

import SignUpForm from './SignUpForm';
import SearchBar from './SearchBar';
import { MapContext } from './MapContext';
import ParallaxDrawer from './ParallaxDrawer';

const NavBar = React.forwardRef((props, ref) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   // Retrieve the logged-in status from the cache
  //   const cachedStatus = localStorage.getItem('loggedInfo');
  //   return cachedStatus === 'true'; // Convert to boolean
  // });

  const toastNoSourceLocation = useToast();

  const {
    setActiveDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    isMobile,
    hasTouchScreen,
    sourceCoords,
    geolocation,
    isLoggedIn,
    setIsLoggedIn,
    setIsMobileDrawerOpen,
  } = useContext(MapContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // isDisabled(true);
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
      //maxWidth="100vw"
      width ="100vw"
      // mt="10px"
      px="4px"
      pr="10px"
      style={
        !hasTouchScreen
          ? { borderBottom: 'solid 1px orangered' }
          : {
              border: 'solid 1px orangered',
              borderRadius: '25px',
              padding: '5px',
            }
      }
    >
      {!hasTouchScreen && (
        <Box flexShrink={0}>
          <img
            ml={0}
            style={{ cursor: 'pointer', overflow: 'visible' }} // cursor change on hover
            onClick={handleLogoClick}
            src="logo.svg"
            alt="Tourify Logo"
            width="100%"
            
          />
        </Box>
      )}
      <Flex
        flex="1"
        flexShrink={hasTouchScreen ? 0 : 1}
        alignItems="center"
        justifyContent={hasTouchScreen && 'space-between'}
        pl={hasTouchScreen && '10px'}
        pr={hasTouchScreen && '10px'}
      >
        {!hasTouchScreen && <SearchBar />}
        <Button
          ref={ref} // Use the forwarded ref here
          display="flex"
          flexDirection="column"
          p={hasTouchScreen && 0}
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            if (geolocation) {
              setIsMobileDrawerOpen(false);
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
                containerStyle: { maxWidth: '80vw' },
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
          p={hasTouchScreen && 0}
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            setIsMobileDrawerOpen(false);
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
          p={hasTouchScreen && 0}
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            setIsMobileDrawerOpen(false);
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
        <Button
          p={hasTouchScreen && 0}
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          onClick={() => {
            setIsMobileDrawerOpen(false);
            setActiveDrawer('guide');
            {
              !isDrawerOpen && setIsDrawerOpen(true);
            }
          }}
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
      </Flex>
      {hasTouchScreen ? (
        <div></div>
      ) : (
        
        <Flex> 
          <SignUpForm setIsLoggedIn={setIsLoggedIn} align="center" />
        </Flex>
      )}
    </Flex>
  );
});

export default NavBar;
