import React, { useState, useEffect, useContext } from 'react';
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
import BadgePanel from './components/BadgePanel';
import './App.css';
import { MapContext } from './components/MapContext';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { map, setMap } = useContext(MapContext);
  // const [map, setMap] = useState(null);

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

  // const handleTabSelect = index => {
  //   setSelectedTabIndex(index);
  // };

  // const tabVariant = isMobile ? 'solid-rounded' : 'line';

  return (
    <ChakraProvider theme={theme}>
      <Box>
        {/* <Tabs
          align="center"
          flexDirection="column"
          variant={tabVariant}
          onChange={handleTabSelect}
          selectedIndex={selectedTabIndex}
        > */}
        <NavBar isMobile={isMobile} map={map} />
        {/* <TabPanels>
            <TabPanel> */}
        <Map isMobile={isMobile} map={map} setMap={setMap} />
        {/* </TabPanel>
            <TabPanel>
              <AttractionsList isMobile={isMobile} />
            </TabPanel>
            <TabPanel>
              <BadgePanel />
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
