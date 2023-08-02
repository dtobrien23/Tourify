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
  Flex,
  CircularProgress,
} from '@chakra-ui/react';
import BadgePanel from './components/BadgePanel';
import './App.css';
import { MapContext } from './components/MapContext';
import { APIContext } from './components/APIContext';
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

  const { apisLoaded, setAPIIsLoaded, showLoading } = useContext(APIContext);

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
      {showLoading === true && (
        <Flex
          height="100vh"
          width="100vw"
          alignItems="center"
          justifyContent="center"
          style={{
            position: 'fixed',
            opacity: apisLoaded ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: apisLoaded ? 'none' : 'auto',
            backgroundColor: '#ffffff',
            zIndex: 99999999,
          }}
        >
          <CircularProgress isIndeterminate color="orange.400" size="100px" />
        </Flex>
      )}
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
