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
import TutorialTooltip from './components/TutorialTooltip';

function App() {
  const {
    map,
    setMap,
    isMobile,
    setIsMobile,
    hasTouchScreen,
    setHasTouchScreen,
  } = useContext(MapContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 810);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    detectTouchScreen();
  }, []);

  const detectTouchScreen = () => {
    // ... (Your existing detectTouchScreen logic)
  };

  return (
    <ChakraProvider theme={theme}>
      <TutorialTooltip />
      {!hasTouchScreen ? (
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
