import React, { useRef, useState, useEffect, useContext } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import LocationButton from './LocationButton';
import { Flex, useToast, Tooltip } from '@chakra-ui/react';
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
    geolocation,
    setGeolocation,
    google,
    isMobile,
    hasTouchScreen,
    inputValue,
    setInputValue,
    sourceCoords,
  } = useContext(MapContext);

  //settr for geolocation to be passed to recommender component via context
  const [inputWidth, setInputWidth] = useState('270px');
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
      navigator.geolocation.getCurrentPosition(showPosition, error => {
        console.log('Error getting geolocation:', error);
        posError();
      });
    } else {
      alert('Sorry, Geolocation is not supported by this browser.');
    }
  };
  const deniedCoords = { lat: 40.758, lng: -73.9855 };
  const [defaultGeolocationSet, setDefaultGeolocationSet] = useState(null);

  // useEffect(() => {
  //   if (!geolocation && !defaultGeolocationSet) {
  //     // Set the default geolocation when geolocation is not available or denied
  //     setGeolocation(deniedCoords);
  //     setDefaultGeolocationSet(true);
  //   }
  // }, [geolocation, defaultGeolocationSet]);

  const posError = error => {
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

                setGeolocation(deniedCoords); // Update the geolocation value in the context
                console.log(deniedCoords, 'this is lat lang');
                setSourceCoords(deniedCoords);
                console.log(sourceCoords);
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
            title: 'Geolocation Permission Denied.',
            description: 'We have set your location to Times Square',
            status: 'info',
            duration: 5000,
            isClosable: true,
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

            setGeolocation(deniedCoords); // Update the geolocation value in the context
            console.log(deniedCoords, 'this is lat lang');
            setSourceCoords(deniedCoords);
            console.log(sourceCoords);
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
        title: 'Unable to access location.',
        description: 'We have set your location to Times Square',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
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
          console.log(sourceCoords);
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

  // // Use useEffect with geolocation as the dependency to handle the panning
  // useEffect(() => {
  //   if (geolocation && google) {
  //     console.log(geolocation, 'THIS IS GEOOOOOOOO');
  //     // Check if geolocation and google are available
  //     const geocoder = new google.maps.Geocoder();
  //     const latLng = new google.maps.LatLng(geolocation.lat, geolocation.lng);

  //     geocoder
  //       .geocode({ location: latLng })
  //       .then(response => {
  //         if (response.results[0]) {
  //           if (locationMarker.length !== 0) {
  //             for (const marker of locationMarker) {
  //               marker.setMap(null);
  //             }
  //             setLocationMarker([]);
  //           }
  //           const formattedAddress = response.results[0].formatted_address;
  //           setCurrentLocation(formattedAddress);
  //           setGeolocation(geolocation);
  //           setSourceCoords(geolocation);
  //           map.panTo(geolocation); // Pan the map to the current location using geolocation
  //           map.setZoom(15);

  //           // eslint-disable-next-line
  //           const marker = new google.maps.Marker({
  //             position: geolocation, // Use the geolocation context variable here
  //             map: map,
  //             icon: '/images/you-are-here.png',
  //           });
  //           setLocationMarker([marker]);
  //         } else {
  //           window.alert('No results found');
  //         }
  //       })
  //       .catch(e => window.alert('Geocoder failed due to: ' + e));
  //   }
  // }, [geolocation, google]);

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
          console.log(latLng, '??????????');
        }

        if (locationMarker.length !== 0) {
          for (const marker of locationMarker) {
            marker.setMap(null);
          }
          setLocationMarker([]);
        }

        setInputValue(selectedPlace.name);
        setSourceCoords(latLng);
        // setGeolocation(sourceCoords);
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
          <div className="tutorial-input">
            <input
              type="text"
              placeholder="I am currently at..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                paddingLeft: '8px',
                borderRadius: '20px',
                fontSize: '16px',
                width: '112%',
              }}
            />
          </div>
            </Autocomplete>
          </Flex>
          <LocationButton getPosition={getPosition}></LocationButton>
        </>
      )}
    </Flex>
  );
}
