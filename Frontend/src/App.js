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
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { map, setMap, isMobile, setIsMobile } = useContext(MapContext);
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

  return (
    <ChakraProvider theme={theme}>
      {!isMobile ? (
        <>
          <NavBar map={map} />
          <Map map={map} setMap={setMap} />
        </>
      ) : (
        <>
          <Map map={map} setMap={setMap} />
          <NavBar map={map} />
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
