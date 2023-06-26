import React, { useState, useEffect } from 'react';
import './App.css';
import MapBox from './components/MapBox';
import Map from './components/Map';
import AttractionsList from './components/AttractionsList';
import NavBar from './components/NavBar';
import {
  ChakraProvider,
  Box,
  theme,
  Tabs,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleTabSelect = index => {
    setSelectedTabIndex(index);
  };

  const tabVariant = isMobile ? 'solid-rounded' : 'line';

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Tabs
          align="center"
          flexDirection="column"
          variant={tabVariant}
          onChange={handleTabSelect}
          selectedIndex={selectedTabIndex}
        >
          <NavBar
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isMobile={isMobile}
          />
          <TabPanels>
            <TabPanel>
              <MapBox tabIndex={selectedTabIndex} />
            </TabPanel>
            <TabPanel>
              <AttractionsList isMobile={isMobile} />
            </TabPanel>
            <TabPanel>Coming soon!</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
}

export default App;
