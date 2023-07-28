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
import ProductTour from './components/ProductTour';

function App() {
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {
    map,
    setMap,
    isMobile,
    setIsMobile,
    // detectTouchScreen,
    hasTouchScreen,
    setHasTouchScreen,
  } = useContext(MapContext);
  // const [map, setMap] = useState(null);

  const { apisLoaded } = useContext(APIContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 810); // Adjust the breakpoint as needed
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

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  const detectTouchScreen = () => {
    console.log('HEEEEEEEELLLLLOOOOOOO');
    if ('maxTouchPoints' in navigator) {
      setHasTouchScreen(navigator.maxTouchPoints > 0);
      console.log('touch screen???', hasTouchScreen);
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
      {apisLoaded === false ? (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <CircularProgress isIndeterminate color="orange.400" size="100px" />
        </Flex>
      ) : (
        <>
          {!hasTouchScreen ? (
            <>
              {/* Call the ProductTour component */}
              <ProductTour />
              <NavBar map={map} />
              <Map map={map} setMap={setMap} />
            </>
          ) : (
            <>
              {/* Call the ProductTour component */}
              <ProductTour />
              <Map map={map} setMap={setMap} />
              <NavBar map={map} />
            </>
          )}
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
