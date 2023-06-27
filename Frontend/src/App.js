import React, { useState, useEffect } from 'react';
import './App.css';
import MapBox from './components/MapBox';
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
import LocationComponent from './components/LocationComponent';

function App() {
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

  const handleTabSelect = index => {
    setSelectedTabIndex(index);
  };

  const tabVariant = isMobile ? 'solid-rounded' : 'line';

  return (
    <ChakraProvider theme={theme}>
      <LocationComponent />

      <Box>
        <Tabs
          align="center"
          flexDirection="column"
          variant={tabVariant}
          onChange={handleTabSelect}
          selectedIndex={selectedTabIndex}
        >
          <NavBar isMobile={isMobile} />
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
