import React, { useRef, useState, useEffect, useContext } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import LocationButton from './LocationButton';
import { Flex, useToast } from '@chakra-ui/react';
import { GeolocationProvider, GeolocationContext } from './GeoContext';
import { MapContext } from './MapContext';

export default function LocationInput({}) {
  const autocompleteRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(1); // to update input box each time current location button is clicked

  const {
    map,
    setMap,
    selectedAttraction,
    setSelectedAttraction,
    setSourceCoords,
    locationMarker,
    isSourceAlertOpen,
    setLocationMarker,
    setIsSourceAlertOpen,
    buttonState,
    setButtonState,
    handleRecommenderClick,
    clearRoute,
    calculateRoute,
    setGeolocation,
    google,
    isMobile,
    hasTouchScreen,
    inputValue,
    setInputValue,
  } = useContext(MapContext);

  //settr for geolocation to be passed to recommender component via context
  const [inputWidth, setInputWidth] = useState('270px');
  const toastInvalidSource = useToast();
  const toastOutsideNYC = useToast();

  // used to ensure user's current location is within NYC
  const minLatitude = 40.4774;
  const maxLatitude = 40.9176;
  const minLongitude = -74.2591;
  const maxLongitude = -73.7004;
  const rangeThreshold = 0.5;

  useEffect(() => {
    if (autocompleteRef.current && currentLocation !== null) {
      setInputValue(currentLocation);
    }
  }, [currentLocation, buttonClicked]);

  useEffect(() => {
    if (hasTouchScreen) {
      setInputWidth('100%');
    } else {
      setInputWidth('270px');
    }
  }, [hasTouchScreen]);

  const autocompleteOptions = {
    bounds: {
      // bounds for Manhattan
      south: 40.700421,
      west: -74.018534,
      north: 40.882214,
      east: -73.907005,
    },
    fields: ['geometry', 'formatted_address'],
    types: ['establishment'],
  };

  // getting user's current location
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert('Sorry, Geolocation is not supported by this browser.');
    }
  };

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
          alert(
            'Enable location permissions for this website in your browser settings.'
          );
        }
      });
    } else {
      alert(
        'Unable to access your location. You can continue by submitting location manually.'
      );
    }
  };

  const showPosition = position => {
    const latlng = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };

    // if current location is outside of NYC, default to Times Square
    if (
      !(
        latlng.lat >= minLatitude &&
        latlng.lat <= maxLatitude &&
        latlng.lng >= minLongitude &&
        latlng.lng <= maxLongitude
      )
    ) {
      latlng.lat = 40.758;
      latlng.lng = -73.9855;
      toastOutsideNYC({
        title: 'You Are Not In NYC!',
        description:
          "We have set your location to Times Square - we know you'd rather be there",
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }

    const geocoder = new google.maps.Geocoder();

    geocoder
      .geocode({ location: latlng })
      .then(response => {
        if (response.results[0]) {
          if (locationMarker.length !== 0) {
            for (const marker of locationMarker) {
              marker.setMap(null);
            }
            setLocationMarker([]);
          }
          const formattedAddress = response.results[0].formatted_address;
          setCurrentLocation(formattedAddress);

          setGeolocation(latlng); // Update the geolocation value in the context
          console.log(latlng, 'this is lat lang');

          setSourceCoords(latlng);
          map.panTo(latlng);
          map.setZoom(15);

          // eslint-disable-next-line
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: '/images/you-are-here.png',
          });
          setLocationMarker([marker]);
        } else {
          window.alert('No results found');
        }
      })
      .catch(e => window.alert('Geocoder failed due to: ' + e));
    setButtonClicked(buttonClicked + 1);
  };

  // when user selects their current location
  const handlePlaceSelect = () => {
    const selectedPlace = autocompleteRef.current.getPlace();
    let latLng;

    try {
      if (map) {
        if (
          selectedPlace &&
          selectedPlace.geometry &&
          selectedPlace.geometry.location
        ) {
          latLng = selectedPlace.geometry.location;
        }

        if (locationMarker.length !== 0) {
          for (const marker of locationMarker) {
            marker.setMap(null);
          }
          setLocationMarker([]);
        }

        setInputValue(selectedPlace.name);
        setSourceCoords(latLng);
        map.panTo(latLng);
        map.setZoom(15);
        // eslint-disable-next-line
        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: selectedPlace.formatted_address,
          icon: '/images/you-are-here.png',
        });
        setLocationMarker([marker]);
      }
    } catch {
      setInputValue('');
      toastInvalidSource({
        title: 'Source Error!',
        description: 'Please Select your Location from the Dropdown.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setInputValue('');
    }
  };

  return (
    <Flex
      w={inputWidth}
      ml={1}
      alignItems="center"
      justifyContent="space-between"
      zIndex="100"
    >
      {google && (
        <>
          <Flex w="100%">
            <Autocomplete
              onLoad={autocomplete => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceSelect}
              options={autocompleteOptions}
              menuStyle={{ backgroundColor: 'red', color: 'white' }}
              itemStyle={{ fontSize: '100px' }}
            >
              <input
                type="text"
                placeholder="I am currently at..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{
                  // padding: '3px',
                  paddingLeft: '8px',
                  borderRadius: '20px',
                  fontSize: '16px',
                  width: '112%',
                }}
              />
            </Autocomplete>
          </Flex>
          <LocationButton getPosition={getPosition}></LocationButton>
        </>
      )}
    </Flex>
  );
}
