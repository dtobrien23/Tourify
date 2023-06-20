import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import LoginButtons from './LoginButtons';
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

export default function NavBar({ isLoggedIn, handleLogin, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Flex align="center" justify="space-between" h="75px" mt="10px" px="4">
      <Box>
        <img src="logo.png" alt="Tourify Logo" />
      </Box>
      {!isMobile ? (
        <>
          <Flex
            flex="1"
            justifyContent="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <TabList>
              <Tab color="orangered">Map</Tab>
              <Tab color="orangered">Attractions</Tab>
              <Tab color="orangered">Badges</Tab>
            </TabList>
          </Flex>
          <Box>
            {isLoggedIn ? (
              <UserMenu handleLogout={handleLogout} />
            ) : (
              <LoginButtons handleLogin={handleLogin} />
            )}
          </Box>
        </>
      ) : (
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={handleMenuToggle}
            />
            <MenuList>
              <TabList>
                <Tab color="orangered">Map</Tab>
                <Tab color="orangered">Attractions</Tab>
                <Tab color="orangered">Badges</Tab>
              </TabList>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
}
