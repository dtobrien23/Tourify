import React, { useRef, useState, useEffect, useContext } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import LocationButton from './LocationButton';
import { Flex, useToast } from '@chakra-ui/react';
import { MapContext } from './MapContext';

export default function LocationInput({}) {
  const autocompleteRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(1); // to update input box each time current location button is clicked

  const {
    map,
    setSourceCoords,
    locationMarker,
    setLocationMarker,
    setGeolocation,
    google,
    hasTouchScreen,
    inputValue,
    setInputValue,
    sourceCoords,
    setIsHovered,
    allowedLocation,
    setAllowedLocation,
  } = useContext(MapContext);

  //settr for geolocation to be passed to recommender component via context
  const [inputWidth, setInputWidth] = useState('270px');
  const [waitingOnLocation, setWaitingOnLocation] = useState(false);
  const toastInvalidSource = useToast();
  const toastOutsideNYC = useToast();
  const toastDenied = useToast();
  const toastUnable = useToast();

  // used to ensure user's current location is within NYC
  const minLatitude = 40.4774;
  const maxLatitude = 40.9176;
  const minLongitude = -74.2591;
  const maxLongitude = -73.7004;
  const rangeThreshold = 0.5;

  useEffect(() => {
    if (autocompleteRef.current) {
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
    setWaitingOnLocation(true);
    // setCurrentLocation(null); // reset current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error => {
        posError();
      });
    } else {
      alert('Sorry, Geolocation is not supported by this browser.');
    }
  };

  const deniedCoords = { lat: 40.7060855, lng: -73.9968643 };
  const [defaultGeolocationSet, setDefaultGeolocationSet] = useState(null);

  const posError = error => {
    setWaitingOnLocation(false);
    setIsHovered(false);
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
          // setGeolocation(deniedCoords);

          const geocoder = new google.maps.Geocoder();

          geocoder
            .geocode({ location: deniedCoords })
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
                setWaitingOnLocation(false);

                setGeolocation(deniedCoords); // Update the geolocation value in the context
                setAllowedLocation(deniedCoords);
                setSourceCoords(deniedCoords);
                map.panTo(deniedCoords);
                map.setZoom(15);

                // eslint-disable-next-line
                const marker = new google.maps.Marker({
                  position: deniedCoords,
                  map: map,
                  icon: '/images/you-are-here.png',
                });
                setLocationMarker([marker]);
              } else {
                window.alert('No results found');
              }
            })
            .catch(e => window.alert('Geocoder failed due to: ' + e));

          toastDenied({
            title: 'Geolocation Permission Denied',
            description: 'We have set your location to the Brooklyn Bridge',
            status: 'info',
            duration: 5000,
            isClosable: true,
            containerStyle: { maxWidth: '80vw' },
          });
        }
      });
    } else {
      // setGeolocation(deniedCoords);
      const geocoder = new google.maps.Geocoder();

      geocoder
        .geocode({ location: deniedCoords })
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

            // setInputValue(formattedAddress);

            setWaitingOnLocation(false);
            setGeolocation(deniedCoords); // Update the geolocation value in the context
            setAllowedLocation(deniedCoords);
            setSourceCoords(deniedCoords);
            map.panTo(deniedCoords);
            map.setZoom(15);

            // eslint-disable-next-line
            const marker = new google.maps.Marker({
              position: deniedCoords,
              map: map,
              icon: '/images/you-are-here.png',
            });
            setLocationMarker([marker]);
          } else {
            window.alert('No results found');
          }
        })
        .catch(e => window.alert('Geocoder failed due to: ' + e));

      toastUnable({
        title: 'Unable to Access Location',
        description: 'We have set your location to the Brooklyn Bridge',
        status: 'info',
        duration: 5000,
        isClosable: true,
        containerStyle: { maxWidth: '80vw' },
      });
    }
    setButtonClicked(buttonClicked + 1);
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
      latlng.lat = 40.7060855;
      latlng.lng = -73.9968643;
      toastOutsideNYC({
        title: 'You Are Not In NYC!',
        description:
          'We have set your location to the Brooklyn Bridge so you can test our check-in function',
        status: 'info',
        duration: 5000,
        isClosable: true,
        containerStyle: { maxWidth: '80vw' },
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
          // setInputValue(formattedAddress);
          setWaitingOnLocation(false);

          setGeolocation(latlng); // Update the geolocation value in the context
          setAllowedLocation(latlng);

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
    if (autocompleteRef.current) {
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
          setCurrentLocation(selectedPlace.name);
          setInputValue(selectedPlace.name);
          setSourceCoords(latLng);
          setGeolocation(latLng);
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
          containerStyle: { maxWidth: '80vw' },
        });
      }
    }
  };

  return (
    <Flex
      w={hasTouchScreen && inputWidth}
      minWidth={!hasTouchScreen && '175px'}
      width={!hasTouchScreen && '17vw'}
      maxWidth={!hasTouchScreen && '17vw'}
      ml={1}
      alignItems="center"
      justifyContent="space-between"
      zIndex="100"
    >
      {google && (
        <>
          <Flex
            w={hasTouchScreen ? '100%' : '100%'}
            h={hasTouchScreen && '35px'}
            alignItems="center"
          >
            <Autocomplete
              onLoad={autocomplete => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceSelect}
              options={autocompleteOptions}
            >
              <div className="tutorial-input">
                <input
                  type="text"
                  placeholder="I am currently at..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  style={{
                    paddingLeft: hasTouchScreen ? '6px' : '8px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    // width: !hasTouchScreen ? '115%' : '123%',
                    width: !hasTouchScreen ? '14.5vw' : '60vw',
                    minWidth: '145px',
                  }}
                />
              </div>
            </Autocomplete>
          </Flex>
          <Flex mr="1px">
            <LocationButton
              getPosition={getPosition}
              waitingOnLocation={waitingOnLocation}
              currentLocation={currentLocation}
            ></LocationButton>
          </Flex>
        </>
      )}
    </Flex>
  );
}
