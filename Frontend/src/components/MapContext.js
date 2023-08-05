import React, { createContext, useState, useRef, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 40.755091,
    lng: -73.978285,
  });
  // const [sliderList, setSliderList] = useState(null);
  const [markerState, setMarkerState] = useState(false); //marker click state to open drawer
  const [markerObject, setMarkerObject] = useState(null); // get the marker object info when clicking on a marker
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['ALL']);
  const [sourceCoords, setSourceCoords] = useState(null); // for routing source
  const [selectedAttraction, setSelectedAttraction] = useState(null); // for routing destination
  const [directionsRenderers, setDirectionsRenderers] = useState([]);
  const [locationMarker, setLocationMarker] = useState([]); // for current location marker
  const [dataArray, setDataArray] = useState(null);
  const [isSourceAlertOpen, setIsSourceAlertOpen] = useState(false);
  const [geolocation, setGeolocation] = useState();
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isAttractionsDrawerOpen, setIsAttractionsDrawerOpen] = useState(false); // for My Attractions drawer
  const [isBadgesDrawerOpen, setIsBadgesDrawerOpen] = useState(false); // for My Badges drawer
  const [hasTouchScreen, setHasTouchScreen] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputColour, setInputColour] = useState('#718096');
  const [isHovered, setIsHovered] = useState(false);
  const [waitingOnRoute, setWaitingOnRoute] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [allowedLocation, setAllowedLocation] = useState(null);
  const navBarRef = useRef(null);
  const mapRef = useRef(null);
  const [mapWidth, setMapWidth] = useState('100%');

  const toastNoSource = useToast();
  const toastNoDest = useToast();
  const toastNothing = useToast();
  const toastZeroResults = useToast();
  const toastDirectionsError = useToast();

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

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

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve the logged-in status from the cache
    const cachedStatus = localStorage.getItem('loggedInfo');
    return cachedStatus === 'true'; // Convert to boolean
  });

  const google = window.google;

  /////////////
  // ROUTING //
  /////////////

  async function calculateRoute() {
    if (geolocation && selectedAttraction) {
      setWaitingOnRoute(true);
      if (directionsRenderers.length !== 0) {
        for (const renderer of directionsRenderers) {
          renderer.setMap(null);
        }
        setDirectionsRenderers([]);
      }

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // source
      const sourceLatLng = geolocation;

      // destination
      const destLat = parseFloat(selectedAttraction.coordinates_lat);
      const destLng = parseFloat(selectedAttraction.coordinates_lng);
      const destLatLng = { lat: destLat, lng: destLng };
      try {
        const results = await directionsService.route(
          {
            origin: sourceLatLng,
            destination: destLatLng,
            travelMode: google.maps.TravelMode.WALKING,
          },
          (results, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setOptions({
                directions: results,
                polylineOptions: {
                  strokeColor: 'orangered',
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                },
                suppressMarkers: true,
              });
              setDirectionsRenderers([directionsRenderer]);
            }
          }
        );
      } catch (error) {
        if (error.message.includes('ZERO_RESULTS')) {
          toastZeroResults({
            title: 'No Route Available!',
            description:
              'There is no valid route from your location to your selected attraction.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            containerStyle: { maxWidth: '80vw' },
          });
        } else {
          toastDirectionsError({
            title: 'Routing Error!',
            description:
              'Sorry - There was an Error in Routing. Please Try Again Later.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            containerStyle: { maxWidth: '80vw' },
          });
        }
      }
    } else if (sourceCoords) {
      toastNoDest({
        title: 'No Destination Selected!',
        description: 'Please Select an Attraction.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        containerStyle: { maxWidth: '80vw' },
      });
    } else if (selectedAttraction) {
      toastNoSource({
        title: 'No Location Selected!',
        description: 'Please Provide your Location.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        containerStyle: { maxWidth: '80vw' },
      });
    } else {
      toastNothing({
        title: 'No Information Provided!',
        description: 'Please Provide your Location and Select an Attraction.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        containerStyle: { maxWidth: '80vw' },
      });
    }
    setWaitingOnRoute(false);
  }

  function clearRoute() {
    // setLocationMarker([]);
    // if (directionsRenderers.length !== 0) {
    for (const renderer of directionsRenderers) {
      renderer.setMap(null);
    }
    setDirectionsRenderers([]);
    // }
    if (locationMarker.length !== 0) {
      for (const marker of locationMarker) {
        marker.setMap(null);
      }
      setLocationMarker([]);
    }
    setInputColour('#718096');
    setSelectedAttraction(null);
    setSourceCoords(null);
    setInputValue('');
    setGeolocation(null);
    setAllowedLocation(null);
    setIsHovered(false); // to turn the location button back grey
  }

  const [buttonState, setButtonState] = useState();
  const handleRecommenderClick = () => {
    //state opens drawer
    setButtonState(true);
  };

  const handleAttractionSelect = attraction => {
    setSelectedAttraction(attraction);
    setInputColour('black');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1125);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        selectedAttraction,
        setSelectedAttraction,
        setSourceCoords,
        locationMarker,
        setLocationMarker,
        isSourceAlertOpen,
        setIsSourceAlertOpen,
        buttonState,
        setButtonState,
        handleRecommenderClick,
        clearRoute,
        calculateRoute,
        geolocation,
        setGeolocation,
        google,
        isAttractionsDrawerOpen,
        setIsAttractionsDrawerOpen,
        isBadgesDrawerOpen,
        setIsBadgesDrawerOpen,
        isDrawerOpen,
        setIsDrawerOpen,
        activeDrawer,
        setActiveDrawer,
        isMobile,
        setIsMobile,
        hasTouchScreen,
        setHasTouchScreen,
        mapCenter,
        setMapCenter,
        inputValue,
        setInputValue,
        inputColour,
        setInputColour,
        sourceCoords,
        setSourceCoords,
        isHovered,
        setIsHovered,
        waitingOnRoute,
        handleAttractionSelect,
        selectedFilters,
        setSelectedFilters,
        // sliderList,
        // setSliderList,
        isLoggedIn,
        setIsLoggedIn,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen,
        closeMobileDrawer,
        allowedLocation,
        setAllowedLocation,
        navBarRef,
        mapRef,
        mapWidth,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
