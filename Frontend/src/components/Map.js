import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { libraries, mapOptions } from '../static/mapConfig.js';
import '../App.css';
import SliderBar from './SliderBar';
import MarkerDrawer from './MarkerDrawer';
import SearchBar from './SearchBar';
import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Tooltip,
} from '@chakra-ui/react';
import Recommender from './Recommender';
import { GeolocationProvider } from './GeoContext';
import attractions from '../static/attractions.json';
import FiltersNavBar from './FiltersNavBar.js';

export default function Map({ isMobile }) {
  ////////////////
  // USE STATES //
  ////////////////

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 40.755091,
    lng: -73.978285,
  });
  //user location from locationInput
  const [userLocation, setUserLocation] = useState(null);
  //receiving filtered attractions from slider
  //pass setSliderList method into slider to receive sliders filtered
  //attractions list, update sliderList state with that list we receive

  const [sliderList, setSliderList] = useState(null);
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

  const google = window.google; // to access Google objects, i.e. markers, directionRenderers
  const mapZoom = 13; // default map zoom

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:8001/api/attraction/getAllAttraction'
      );
      const data = await response.json();
      console.log(data, 'THIS CAME FROM THE BACK END');
      const dataData = data.data;
      setDataArray(dataData);
      console.log(dataArray, 'back end data without wrapper');
      // setSliderList(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  /////////////////
  // RECOMMENDER //
  /////////////////

  //function call on marker click
  const handleMarkerClick = marker => {
    // just take desired object info
    const markerData = {
      name: marker.name,
      coordinates_lat: marker.position.lat(),
      coordinates_lng: marker.position.lng(),
      price_dollars: marker.price_dollars,
      image: marker.image,
    };
    setMarkerObject(markerData);

    //state opens drawer
    setMarkerState(true);
  };

  // close the drawer when state goes to false
  const handleClose = () => {
    setMarkerState(false);
  };

  //Recommendation Button
  const [buttonState, setButtonState] = useState();
  const handleRecommenderClick = () => {
    //state opens drawer
    setButtonState(true);
  };

  const recommendClose = () => {
    setButtonState(false);
  };

  /////////////
  // MARKERS //
  /////////////

  useEffect(() => {
    if (map && dataArray !== null) {
      console.log('yup', dataArray);
      console.log(attractions);
      // setSliderList(dataArray);
      // clear existing markers from the map for filter
      markers.forEach(marker => {
        marker.setMap(null);
      });

      // filter attractions based on the selected filter value
      const filteredMarkers = selectedFilters.includes('ALL')
        ? dataArray
        : dataArray.filter(attraction =>
            selectedFilters.includes(attraction.attractionTypeEnum)
          );

      // add filtered markers
      const newMarkers = filteredMarkers.map(attraction => {
        console.log(attraction);
        const marker = new google.maps.Marker({
          name: { name: attraction.name },
          position: {
            lat: parseFloat(attraction.coordinates_lat),
            lng: parseFloat(attraction.coordinates_lng),
          },
          map: map,
          price_dollars: { price_dollars: attraction.price_dollars },
          image: { image: attraction.image },
        });

        marker.addListener('click', () => handleMarkerClick(marker));
        console.log(marker, 'markerrrrrr');
        return marker;
      });

      // set the markers state
      setMarkers(newMarkers);
    }
  }, [map, selectedFilters, dataArray]);

  /////////////
  // ROUTING //
  /////////////

  async function calculateRoute() {
    if (sourceCoords && selectedAttraction) {
      if (directionsRenderers.length !== 0) {
        directionsRenderers[0].setMap(null);
        setDirectionsRenderers([]);
      }

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // source
      const sourceLatLng = sourceCoords;

      // destination
      const destLat = selectedAttraction.coordinates_lat;
      const destLng = selectedAttraction.coordinates_lng;
      const destLatLng = { lat: destLat, lng: destLng };

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
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
      setDirectionsRenderers([directionsRenderer]);
      locationMarker[0].setMap(map); // in case this is set to null by clearRoute
    }
  }

  function clearRoute() {
    if (directionsRenderers.length !== 0) {
      directionsRenderers[0].setMap(null);
      setDirectionsRenderers([]);
    }
    if (locationMarker.length !== 0) {
      locationMarker[0].setMap(null);
    }
  }

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={mapZoom}
      center={mapCenter}
      options={mapOptions}
      mapContainerClassName="map"
      onLoad={map => {
        setMap(map);
      }}
      onDragEnd={() => {
        if (map) {
          // Get the coordinates of the map center after the drag ends
          const center = map.getCenter();
          setMapCenter({ lat: center.lat(), lng: center.lng() });
        }
      }}
    >
      {/* inert backdrop */}
      {isSourceAlertOpen && (
        <div
          onClick={() => setIsSourceAlertOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        />
      )}
      {isSourceAlertOpen && (
        <Alert
          status="error"
          position="fixed"
          top="40%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="50vw"
          h="25vh"
          zIndex={10000}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Box>
            <AlertTitle>Source Location Error!</AlertTitle>
            <AlertDescription>
              Please select a valid location from the dropdown.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="absolute"
            right={2}
            top={2}
            onClick={() => setIsSourceAlertOpen(false)}
          />
        </Alert>
      )}
      <GeolocationProvider>
        <Flex
          flexDirection="column"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            height: 'calc(100% - 20px)',
            // width: 'calc(100% - 20px)', // Adjust the height as needed
          }}
        >
          {/* Seachbar contains location/destination input + locationbutton */}
          <SearchBar
            map={map}
            selectedAttraction={selectedAttraction}
            setSelectedAttraction={setSelectedAttraction}
            setSourceCoords={setSourceCoords}
            calculateRoute={calculateRoute}
            clearRoute={clearRoute}
            locationMarker={locationMarker}
            setLocationMarker={setLocationMarker}
            setIsSourceAlertOpen={setIsSourceAlertOpen}
            handleRecommenderClick={handleRecommenderClick}
            style={{ zIndex: 1 }}
          />
          {/* Recommendation button */}
          <Button
            onClick={handleRecommenderClick}
            style={{
              // width: 'fit-content',
              width: '545px',
              marginTop: '10px',
              padding: '5px',
              paddingRight: '10px',
              paddingLeft: '10px',
              border: 'solid 2px orangered',
              borderRadius: '20px',
              background: 'orangered',

              color: 'white',
            }}
          >
            Recommend Location!!!
          </Button>
          <FiltersNavBar
            isMobile={isMobile}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Flex>
        {/* passing the setSliderListFunc to the slider from map 
         data it receives will be used by setSliderList method to update
        the sliderList state */}
        {/* <SliderBar setSliderListFunc={setSliderList} /> */}

        <MarkerDrawer
          //marker state true opens drawer
          //false closes it
          //have to pass set state method into
          //drawer so the X button can change state to false and close the drawer
          // also pass in marker object to render infor in drawer
          isOpenFunc={markerState}
          isCloseFunc={handleClose}
          markerObject={markerObject}
        />

        <Recommender
          recommendOpenFunc={buttonState}
          recommendCloseFunc={recommendClose}
        />
      </GeolocationProvider>
    </GoogleMap>
  );
}
