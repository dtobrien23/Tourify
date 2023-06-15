import React, { useState } from 'react';
import "./App.css";
import Map from './components/Map';
import UserMenu from './components/UserMenu'
import LoginButtons from './components/LoginButtons'
import AttractionsList from './components/AttractionsList';
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
} from '@chakra-ui/react'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
  };

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
              {isLoggedIn ? (
                <UserMenu handleLogout={handleLogout}/>
              ) : (
                <Flex>
                  <LoginButtons handleLogin={handleLogin}/>
                </Flex>
              )}
            </Box>
          </Flex>

          <TabPanels>
            <TabPanel>
              <Map />
            </TabPanel>
            <TabPanel>
              <AttractionsList />
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
