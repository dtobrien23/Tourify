import React, { useState, useEffect, useContext } from 'react';
import Map from './components/Map';
import NavBar from './components/NavBar';
import {
  ChakraProvider,
  theme,
  Flex,
  CircularProgress,
} from '@chakra-ui/react';
import './App.css';
import { MapContext } from './components/MapContext';
import { APIContext } from './components/APIContext';
import TutorialTooltip from './components/TutorialTooltip';
import MobileDrawer from './components/MobileDrawer';

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

  // for phones and small tablets in portrait
  useEffect(() => {
    if (window.innerWidth <= 768) {
      detectTouchScreen();
    }
  }, []);

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  const detectTouchScreen = () => {
    if ('maxTouchPoints' in navigator) {
      setHasTouchScreen(navigator.maxTouchPoints > 0);
    } else if ('msMaxTouchPoints' in navigator) {
      setHasTouchScreen(navigator.msMaxTouchPoints > 0);
    } else {
      const mQ = matchMedia?.('(pointer:coarse)');
      if (mQ?.media === '(pointer:coarse)') {
        setHasTouchScreen(!!mQ.matches);
      } else if ('orientation' in window) {
        setHasTouchScreen(true); // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        const UA = navigator.userAgent;
        setHasTouchScreen(
          /\b(BlackBerry|webOS|iPhone|IEMobile|Kindle|Silk)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }
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
          {/* <NavBar map={map} /> */}
          <MobileDrawer />
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
