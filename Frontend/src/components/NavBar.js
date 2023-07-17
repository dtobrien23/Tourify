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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import SignUpForm from './SignUpForm';
import SearchBar from './SearchBar';
import { MapContext } from './MapContext';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve the logged-in status from the cache
    const cachedStatus = localStorage.getItem('loggedInfo');
    return cachedStatus === 'true'; // Convert to boolean
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    setActiveDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    isMobile,
    hasTouchScreen,
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
          display="flex"
          flexDirection="column"
          bg="white"
          h="fit-content"
          w="fit-content"
          isDisabled={!isLoggedIn}
          onClick={() => {
            setActiveDrawer('recommender');
            {
              !isDrawerOpen && setIsDrawerOpen(true);
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
      </Flex>
      {hasTouchScreen ? (
        <Box display={{ base: 'block', md: 'none' }} style={{ zIndex: '2' }}>
          <Menu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            style={{ width: '100px' }}
          >
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={handleMenuToggle}
              l={1}
            />
            <MenuList minW="0" w="fit-content">
              <MenuItem style={{ width: '100px' }}>
                <SignUpForm setIsLoggedIn={setIsLoggedIn} />
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Flex>
          <SignUpForm setIsLoggedIn={setIsLoggedIn} align="center" />
        </Flex>
      )}
    </Flex>
  );
}
