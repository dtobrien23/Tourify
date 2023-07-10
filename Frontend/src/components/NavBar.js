import React, { useState } from 'react';
import {
  Box,
  Flex,
  TabList,
  Tab,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import SignUpForm from './SignUpForm';
import LocationInput from './LocationInput';
import SearchBar from './SearchBar';

export default function NavBar({
  isLoggedIn,
  handleLogin,
  isMobile,
  setIsMobile,
  handleLogout,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //refresh the page when clicking the logo
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <Flex align="center" justify="space-between" h="75px" mt="10px" px="4">
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
        <TabList>
          <Tab color="orangered">Map</Tab>
          <Tab isDisabled={false} color="orangered">
            Attractions
          </Tab>
          <Tab isDisabled={false} color="orangered">
            Badges
          </Tab>
        </TabList>
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
              <TabList flexDirection="column">
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                >
                  Map
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                >
                  Attractions
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#ff4500' }}
                  onClick={handleMenuToggle}
                >
                  Badges
                </Tab>
              </TabList>
              <Flex>
                <SignUpForm />
              </Flex>
            </MenuList>
          </Menu>
        </Box>
      )}
      {!isMobile && (
        <Flex>
          <SignUpForm align="center" />
        </Flex>
      )}
    </Flex>
  );
}
