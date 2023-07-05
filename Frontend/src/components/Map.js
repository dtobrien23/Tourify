import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import attractions from '../static/attractions.json';
import { libraries, mapOptions } from '../static/mapConfig.js';
import { Flex } from '@chakra-ui/react';
import '../App.css';
import SliderBar from './SliderBar';
import MarkerDrawer from './MarkerDrawer';
import SearchBar from './SearchBar';
import { Button } from '@chakra-ui/react';
import Recommender from './Recommender';
import { GeolocationProvider } from './GeoContext';

export default function Map() {
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
  const [sliderList, setSliderList] = useState(attractions);
  const [markerState, setMarkerState] = useState(false); //marker click state to open drawer
  const [markerObject, setMarkerObject] = useState(null); // get the marker object info when clicking on a marker
  const [markers, setMarkers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [sourceCoords, setSourceCoords] = useState(null); // for routing source
  const [selectedAttraction, setSelectedAttraction] = useState(null); // for routing destination
  const [directionsRenderers, setDirectionsRenderers] = useState([]);
  const [locationMarker, setLocationMarker] = useState([]); // for current location marker
  const [showSourceErrorComponent, setShowSourceErrorComponent] = // for source location error, not finished
    useState(false);

  const google = window.google; // to access Google objects, i.e. markers, directionRenderers
  const mapZoom = 13; // default map zoom

  // used for filtering attractions markers
  const attractionTypes = [
    { label: 'All', value: 'all' },
    { label: 'Landmarks', value: 'landmark' },
    { label: 'Museums', value: 'museum' },
    { label: 'Parks', value: 'park' },
    { label: 'Theatres', value: 'theater' },
    { label: 'Neighborhoods', value: 'neighborhood' },
    { label: 'Dining', value: 'dining' },
    { label: 'Galleries', value: 'gallery' },
    { label: 'Libraries', value: 'library' },
    { label: 'Historic Sites', value: 'historic_site' },
    { label: 'Observatories', value: 'observatory' },
  ];

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
    if (map) {
      // clear existing markers from the map for filter
      markers.forEach(marker => {
        marker.setMap(null);
      });

      // filter attractions based on the selected filter value
      const filteredMarkers = selectedFilters.includes('all')
        ? sliderList
        : sliderList.filter(attraction =>
            selectedFilters.includes(attraction.type)
          );

      // add filtered markers
      const newMarkers = filteredMarkers.map(attraction => {
        const marker = new google.maps.Marker({
          name: { name: attraction.name },
          position: {
            lat: attraction.coordinates_lat,
            lng: attraction.coordinates_lng,
          },
          map: map,
          price_dollars: { price_dollars: attraction.price_dollars },
          image: { image: attraction.image },
        });

        marker.addListener('click', () => handleMarkerClick(marker));
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        console.log(marker, 'markerinfo here');

        return marker;
      });

      // set the markers state
      setMarkers(newMarkers);
    }
  }, [map, sliderList, selectedFilters]);

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
      console.log(results);
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
      <GeolocationProvider>
        <Flex
          flexDirection="column"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
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
            setShowSourceErrorComponent={setShowSourceErrorComponent}
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
          <Flex
            flexDirection="column"
            style={{
              zIndex: 0,
              height: 0,
            }}
          >
            {attractionTypes.map(attractionType => (
              <button
                key={attractionType.value}
                onClick={() => {
                  if (attractionType.value === 'all') {
                    if (selectedFilters.includes('all')) {
                      setSelectedFilters([]); // Unselect all filters
                    } else {
                      setSelectedFilters(['all']); // Select 'All' filter
                    }
                  } else {
                    if (selectedFilters.includes('all')) {
                      setSelectedFilters([attractionType.value]); // Select the clicked filter only
                    } else if (selectedFilters.includes(attractionType.value)) {
                      setSelectedFilters(
                        selectedFilters.filter(
                          filter => filter !== attractionType.value
                        )
                      ); // Unselect the clicked filter
                    } else {
                      setSelectedFilters([
                        ...selectedFilters,
                        attractionType.value,
                      ]); // Add the clicked filter
                    }
                  }
                }}
                style={{
                  // width: 'fit-content',
                  width: '145px',
                  marginTop: '10px',
                  padding: '5px',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  border: 'solid 2px orangered',
                  borderRadius: '20px',
                  background: selectedFilters.includes(attractionType.value)
                    ? 'orangered'
                    : 'white',
                  color: selectedFilters.includes(attractionType.value)
                    ? 'white'
                    : 'black',
                }}
              >
                {attractionType.label}
              </button>
            ))}
          </Flex>
        </Flex>
        {/* passing the setSliderListFunc to the slider from map 
         data it receives will be used by setSliderList method to update
        the sliderList state */}
        <SliderBar setSliderListFunc={setSliderList} />

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
