import React from 'react';
import "./App.css";
import Map from './components/Map';
import UserDropdown from './components/UserDropdown';
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Button, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Tabs align="center" flexDirection="row">
          <Flex align="center" justify="space-between" h="75px" mt="10px"> 
            <Box position="absolute" left="10">
              <img src="logo.png" alt="Tourify Logo" />
            </Box>
            <Flex flex="1" justifyContent="center">
              <TabList>
                <Tab color="orangered">Map</Tab>
                <Tab color="orangered">Attractions</Tab>
                <Tab color="orangered">Badges</Tab>
              </TabList>
            </Flex>
            <Box position="absolute" right="10">
              <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />} h="60px" bg="white" border="1px" borderColor="orangered">
                  <UserDropdown />
                </MenuButton>
                <MenuList>
                  <MenuItem>My Profile</MenuItem>
                  <MenuItem>My Data</MenuItem>
                  <MenuItem color="red">Log Out</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>

          <TabPanels>
            <TabPanel>
              <Map />
            </TabPanel>
            <TabPanel>
              <p>Coming soon!</p>
            </TabPanel>
            <TabPanel>   
              <p>Coming soon!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>      
    </ChakraProvider>
  );
}

export default App;
